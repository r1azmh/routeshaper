# syntax=docker/dockerfile:1
ARG PYTHON_IMAGE=python:3.12-slim-bookworm
ARG NODE_IMAGE=node:22-bookworm-slim
ARG RUST_IMAGE=rust:1.90.0-slim-bookworm

FROM ${NODE_IMAGE} AS frontend-build
WORKDIR /build/frontend
COPY frontend/ ./
RUN corepack enable && corepack prepare yarn@1.22.22 --activate
RUN yarn install --frozen-lockfile --non-interactive
RUN VRP_BACKEND_DIR=/build/backend yarn build

FROM ${RUST_IMAGE} AS rust-toolchain

FROM ${PYTHON_IMAGE} AS python-build
ENV CARGO_HOME=/usr/local/cargo \
    RUSTUP_HOME=/usr/local/rustup \
    PATH=/usr/local/cargo/bin:$PATH \
    PIP_DISABLE_PIP_VERSION_CHECK=1
COPY --from=rust-toolchain /usr/local/cargo /usr/local/cargo
COPY --from=rust-toolchain /usr/local/rustup /usr/local/rustup
RUN apt-get update \
    && apt-get install --yes --no-install-recommends build-essential ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Build the Python 3.12 Linux binding for the pinned solver release.
COPY docker/vendor/vrp-1.24.0.tar.gz /tmp/vrp-1.24.0.tar.gz
RUN echo "8e245a626ff3f0b35eb2e9311111e9e122b50985b9bf403042f25d113a541a03  /tmp/vrp-1.24.0.tar.gz" | sha256sum --check - \
    && mkdir /solver \
    && tar -xzf /tmp/vrp-1.24.0.tar.gz -C /solver --strip-components=1
COPY docker/solver.Cargo.lock /solver/Cargo.lock
WORKDIR /solver
RUN python -m pip install --no-cache-dir maturin==1.7.8
RUN maturin build --release --locked \
    --manifest-path /solver/vrp-cli/Cargo.toml \
    --features py_bindings --interpreter python --out /wheels --compatibility linux

COPY backend/requirements.txt /install/backend/requirements.txt
COPY docker/requirements.txt docker/constraints.txt /install/docker/
RUN python -m pip wheel --no-cache-dir --find-links=/wheels --wheel-dir=/wheels \
    --constraint=/install/docker/constraints.txt --requirement=/install/docker/requirements.txt

FROM ${PYTHON_IMAGE} AS runtime
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    DJANGO_SETTINGS_MODULE=vrp.docker_settings \
    APP_DATA_DIR=/data
WORKDIR /app/backend
COPY --from=python-build /wheels /wheels
COPY --from=python-build /install /install
RUN python -m pip install --no-cache-dir --no-index --find-links=/wheels \
    --constraint=/install/docker/constraints.txt --requirement=/install/docker/requirements.txt \
    && rm -rf /wheels /install

COPY backend/ ./
COPY --from=frontend-build /build/backend/templates/ ./templates/
COPY --from=frontend-build /build/backend/static/ ./static/
COPY frontend/public/ /app/public/
COPY docker/entrypoint.sh docker/gunicorn.conf.py docker/healthcheck.py docker/check_runtime.py /app/docker/
RUN groupadd --gid 10001 routeshaper \
    && useradd --uid 10001 --gid routeshaper --no-create-home routeshaper \
    && mkdir -p /data /app/backend/staticfiles \
    && chown routeshaper:routeshaper /data /app/backend/staticfiles \
    && chmod +x /app/docker/entrypoint.sh
USER routeshaper
EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
    CMD ["python", "/app/docker/healthcheck.py"]
ENTRYPOINT ["/app/docker/entrypoint.sh"]
CMD ["gunicorn", "--config", "/app/docker/gunicorn.conf.py", "vrp.wsgi:application"]
