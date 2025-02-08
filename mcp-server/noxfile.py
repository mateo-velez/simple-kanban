import nox


@nox.session(reuse_venv=True)
def test(session):
    session.install(".")
    session.install("pytest", "mcp")
    session.run("pytest")


@nox.session(reuse_venv=True)
def lint(session):
    session.install("ruff")
    session.run("ruff", "check", "mcp_server/", "tests/")


@nox.session(reuse_venv=True)
def format(session):
    session.install("ruff", "black")
    session.run("ruff", "format", "mcp_server/", "tests/")
    session.run("black", "mcp_server/", "tests/")


@nox.session(venv_backend="none")
def dev(session):
    session.run(
        "fastmcp", "dev", "mcp_server/server.py", "--host", "0.0.0.0", "--port", "8000"
    )
