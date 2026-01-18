"""
Health Check Endpoint Tests
"""
import pytest
from httpx import AsyncClient


class TestHealthEndpoint:
    """Test health check endpoints."""

    @pytest.mark.asyncio
    async def test_health_check(self, client: AsyncClient):
        """Test /api/health returns healthy status."""
        response = await client.get("/api/health")

        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "version" in data

    @pytest.mark.asyncio
    async def test_root_endpoint(self, client: AsyncClient):
        """Test root endpoint returns API info."""
        response = await client.get("/")

        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "JobPulse API"
        assert "version" in data
        assert "docs" in data
