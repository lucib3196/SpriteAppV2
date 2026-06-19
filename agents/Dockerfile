ARG PYTHON_VERSION=3.13.7
FROM python:${PYTHON_VERSION}-slim as backend

# Prevent Python from writing pyc files and buffer logs
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app


# Create a non-privileged user that the app will run under.
# See https://docs.docker.com/go/dockerfile-user-best-practices/
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/home/appuser" \
    --uid "${UID}" \
    appuser \
    && mkdir -p /home/appuser \
    && chown -R appuser:appuser /home/appuser

RUN pip install --no-cache-dir uv
COPY pyproject.toml uv.lock* ./

RUN uv sync


    # Install system dependencies for psycopg2 and other build tools
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*
# Copy the source code into the container.
COPY . .
EXPOSE 2024

CMD ["langgraph", "dev","--host", "0.0.0.0", "--port", "2024"]