# Base image for both prod and test
FROM python:3.10-slim AS base

WORKDIR /app

ENV PYTHONUNBUFFERED=1
ENV PORT=8000
ENV PYTHONPATH=/app/src

# Install system deps and clean up in same layer
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*



# Copy only files needed for pip install
COPY pyproject.toml README.md ./

# Create a dummy src directory with __init__.py
RUN mkdir -p src/kanban_api && \
    touch src/kanban_api/__init__.py





# Test image
FROM base AS test
RUN pip install --no-cache-dir ".[dev]"
# Copy actual source and test files
COPY src/ src/
COPY tests/ tests/

CMD ["pytest"]




# Production image
FROM base AS prod
RUN pip install --no-cache-dir .
# Copy actual source files
COPY src/ src/

# Create static directory and copy frontend build
RUN mkdir -p static
COPY static/ static/

EXPOSE 8000
CMD ["uvicorn", "kanban_api.main:app", "--host", "0.0.0.0", "--port", "8000"]