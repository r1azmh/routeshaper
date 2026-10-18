"""Read-only schema checks and a one-second native solver installation check."""

from importlib.metadata import version
import json
from pathlib import Path
import sys

import django
import vrp_cli

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "backend"))


def main():
    django.setup()
    from django.db import connection
    from django.db.migrations.executor import MigrationExecutor

    executor = MigrationExecutor(connection)
    assert not executor.migration_plan(executor.loader.graph.leaf_nodes()), "Unapplied migrations"
    tables = set(connection.introspection.table_names())
    assert {"auth_user", "base_work", "base_job", "base_vehicle", "base_solution"} <= tables
    assert version("vrp-cli") == "1.24.0"
    print("PASS: schema initialized; native vrp-cli 1.24.0 is importable.")

    depot = {"lat": 62.0, "lng": 22.0}
    customer = {"lat": 62.01, "lng": 22.01}
    problem = {
        "plan": {"jobs": [{
            "id": "installation-check",
            "deliveries": [{"places": [{"location": customer, "duration": 60}], "demand": [1]}],
        }]},
        "fleet": {
            "vehicles": [{
                "typeId": "truck", "vehicleIds": ["truck-1"],
                "profile": {"matrix": "driving-hgv"},
                "costs": {"fixed": 0, "distance": 1, "time": 0},
                "shifts": [{
                    "start": {"earliest": "2024-01-01T08:00:00Z", "location": depot},
                    "end": {"latest": "2024-01-01T18:00:00Z", "location": depot},
                }],
                "capacity": [3],
            }],
            "profiles": [{"name": "driving-hgv"}],
        },
    }
    matrix = {"profile": "driving-hgv", "durations": [0, 60, 60, 0], "distances": [0, 1000, 1000, 0]}
    result = json.loads(vrp_cli.solve_pragmatic(
        problem=json.dumps(problem), matrices=[json.dumps(matrix)],
        config=json.dumps({"termination": {"maxTime": 1, "maxGenerations": 10}}),
    ))
    assert result.get("tours") and not result.get("unassigned"), result
    assert result["statistic"]["distance"] == 2000, result
    print("PASS: the native solver solved a two-location problem without an external API call.")


if __name__ == "__main__":
    main()
