import nox


# cache dependencies
nox.options.reuse_existing_virtualenv = True

# dev as default session
nox.options.default_session = "dev"

# define python version
python_version = "3.10"

# define test, lint, format, dev sessions


@nox.session(python=python_version)
def test(session):
    session.install(".[dev]")
    session.run("pytest")


@nox.session(python=python_version)
def lint(session):
    session.install("ruff")
    session.run("ruff", "check", "kanban_api/", "tests/")


@nox.session(python=python_version)
def format(session):
    session.install("ruff", "black")
    session.run("ruff", "format", "kanban_api/", "tests/")
    session.run("black", "kanban_api/", "tests/")


@nox.session(python=python_version)
def dev(session):
    session.install(".[dev]")
    session.run("fastapi", "dev", "kanban_api/main.py", "--host", "0.0.0.0", "--port", "8000")
