"""
Authentication Tests
"""
import pytest
from httpx import AsyncClient


class TestAuthEndpoints:
    """Test authentication endpoints."""

    @pytest.mark.asyncio
    async def test_google_auth_url(self, client: AsyncClient):
        """Test Google OAuth URL generation."""
        response = await client.get("/api/auth/google/url")

        assert response.status_code == 200
        data = response.json()
        assert "url" in data
        assert "accounts.google.com" in data["url"]

    @pytest.mark.asyncio
    async def test_protected_endpoint_without_token(self, client: AsyncClient):
        """Test that protected endpoints require authentication."""
        response = await client.get("/api/users/profile")

        # Should return 401 or 403 without token
        assert response.status_code in [401, 403]
