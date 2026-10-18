# RouteShaper

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)

RouteShaper is an open-source, web-based decision-support tool for industrial
freight route planning with integrated CO₂ emission estimation and quality
(freshness) reporting for perishable goods.

Developed at the School of Technology and Innovations, University of Vaasa,
Finland, within the project
[Optimising distribution transport in the food ecosystem](https://www.uwasa.fi/en/elintarvike-ekosysteemi).

---

## What it does

| Capability | Description |
| --- | --- |
| Route optimization | Capacitated pickup/delivery with time windows, solved by the [vrp-cli](https://github.com/reinterpretcat/vrp) (Rosomaxa) metaheuristic engine. |
| Realistic travel matrices | Distances and durations from the OpenRouteService Matrix API on the `driving-hgv` profile, so results follow the road network and HGV restrictions rather than straight-line distance. |
| CO₂ emission reporting | Per-segment emissions using load-dependent factors by truck type. |
| Freshness reporting | Per-container quality-deterioration cost from category-specific hourly penalty rates. |
| Bulk import | CSV import of jobs and vehicles. |
| Exports | Route plan and emission report as CSV. |

---

## Architecture

```text
routeshaper/
    │
    ├──▶ backend/    (Django application, REST API, calculations, migrations)
    ├──▶ frontend/   (React interface and frontend build configuration)
    ├──▶ docker/     (container configuration, dependencies, solver build)
    ├──▶ templates/  (CSV templates for bulk imports)
    └──▶ scripts/    (installation checks)
```

---

## Requirements

- **Docker Desktop** on Windows/macOS, or **Docker Engine with Docker Compose v2** on Linux.
- Docker running in **Linux containers** mode.
- An [OpenRouteService API key](https://openrouteservice.org/dev/).
- Git, if cloning the repository instead of downloading a ZIP.

---

## Installation

### 1. Download the project

Clone the [RouteShaper repository](https://github.com/r1azmh/routeshaper):

```bash
git clone https://github.com/r1azmh/routeshaper.git
cd routeshaper
```

Alternatively, download and extract the repository ZIP, then open a terminal
in the directory containing `compose.yaml`.

Check that Docker and Compose are available:

```bash
docker --version
docker compose version
```

### 2. Create the configuration file

Linux/macOS:

```bash
cp .env.example .env
```

Windows Command Prompt:

```bash
copy .env.example .env
```

### 3. Configure your keys

Generate a Django secret key:

```bash
docker run --rm python:3.12-slim-bookworm python -c "import secrets; print(secrets.token_urlsafe(64))"
```

Open `.env` in a text editor and enter the generated secret and your
OpenRouteService key:

```dotenv
SECRET_KEY=your-generated-secret-key
ORS_SECRET_KEY=your-openrouteservice-api-key
DEBUG=False
HOST_IP=127.0.0.1
HOST_PORT=8000
ALLOWED_HOSTS=localhost,127.0.0.1
```

Keep `.env` private and retain the same secret key between restarts.
If port `8000` is already in use, change `HOST_PORT`, for example to `8080`.

### 4. Build and start RouteShaper

```bash
docker compose up --build -d
```

The first build may take several minutes because it compiles the native
solver. Database migrations and static-file setup run automatically.

Check startup status and logs:

```bash
docker compose ps
docker compose logs -f web
```

Press `Ctrl+C` to stop following the logs; the application continues running.

### 5. Create an account

Open `http://localhost:8000/signup/` and
register an account. Use the configured port if you changed `HOST_PORT`.

To prepare your first routing task:

1. Create perishability categories and vehicle profiles.
2. Create a Work (routing task).
3. Add jobs and vehicles manually or import CSV files.
4. Select **Get Solution** and wait for optimization to finish.
5. Review the routes, emissions, and freshness results, then export reports.

Bulk-import templates are available in
[`templates/job_bulk_import_template.csv`](templates/job_bulk_import_template.csv)
and [`templates/fleet_bulk_import_template.csv`](templates/fleet_bulk_import_template.csv).
Create the referenced categories and vehicle profiles before importing data.

### 6. Stop, restart, or rebuild

```bash
docker compose stop             # Stop the application
docker compose up -d            # Start it again
docker compose up --build -d    # Rebuild after changing source code
docker compose down             # Remove containers while retaining saved data
```

The database persists across restarts and rebuilds. Using
`docker compose down -v` also deletes the database volume.

To check the running installation:

```bash
docker compose exec web python /app/docker/healthcheck.py
docker compose exec web python /app/docker/check_runtime.py
```

The second command checks the schema and solves a small local test problem.

---

## Video Tutorial

A complete step-by-step video tutorial for installation and implementation of RouteShaper is available here:
[Tutorial Link](https://youtu.be/cLnHZzfpSdo).

---

## Limitations

- OpenRouteService imposes matrix-size and request limits. Larger instances may require a self-hosted ORS backend and additional endpoint configuration. One solve consumes
  one matrix request.
- Travel times are ORS estimates and exclude traffic, driver breaks and delays
  beyond the configured service time.
- Freshness penalties are reported but not optimized; values may vary between runs because the solver can produce different routes.
- Emission factors are European diesel HGV defaults; other fleets require
  substituting the factor table.

---

## Contributing

Issues and pull requests are welcome. Please open an issue describing the
change before submitting substantial pull requests.

## License

Licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE).

Copyright © 2024–2026 Petri Helo and Riaz Mahmud.

## Acknowledgements

Supported by the European Regional Development Fund and the Regional Council
of South Ostrobothnia (grant A80384). RouteShaper builds on
[vrp-cli / Rosomaxa](https://github.com/reinterpretcat/vrp) and
[OpenRouteService](https://openrouteservice.org/) (HeiGIT), and the React, Django, Leaflet, and OpenStreetMap communities.

## Contact

Email: riaz dot mahmud at uwasa.fi 
