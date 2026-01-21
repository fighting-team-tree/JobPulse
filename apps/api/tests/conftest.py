"""
Pytest Configuration and Fixtures
"""
import asyncio
import os
from typing import AsyncGenerator, Generator
import pytest
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.pool import StaticPool
from sqlalchemy.ext.compiler import compiles
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy import ARRAY
from unittest.mock import AsyncMock

# Handle PostgreSQL types in SQLite
@compiles(ARRAY, 'sqlite')
def compile_array(element, compiler, **kw):
    return "JSON"

@compiles(JSONB, 'sqlite')
def compile_jsonb(element, compiler, **kw):
    return "JSON"

# Import app components
from app.main import app as fastapi_app
from app.db.database import Base, get_db
import app.main as main_module

# Patch the engine in app.main to prevent lifespan from trying to create tables
# and locking the SQLite file. Tests handle table creation via db_session fixture.
main_module.engine = AsyncMock()
main_module.engine.dispose = AsyncMock()

# Test database URL
TEST_DATABASE_URL = "sqlite+aiosqlite:///./test.db"

# Create test engine
test_engine = create_async_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)

# Create test session factory
TestSessionLocal = async_sessionmaker(
    bind=test_engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)

async def override_get_db() -> AsyncGenerator[AsyncSession, None]:
    """Override database dependency for testing."""
    async with TestSessionLocal() as session:
        yield session

# Override the dependency
fastapi_app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(scope="session")
def event_loop() -> Generator:
    """Create event loop for async tests."""
    policy = asyncio.get_event_loop_policy()
    loop = policy.new_event_loop()
    yield loop
    loop.close()

@pytest.fixture(scope="function")
async def db_session() -> AsyncGenerator[AsyncSession, None]:
    """Create a fresh database session for each test."""
    # Create all tables
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with TestSessionLocal() as session:
        yield session

    # Drop all tables after test
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)

@pytest.fixture(scope="function")
async def client(db_session: AsyncSession) -> AsyncGenerator[AsyncClient, None]:
    """Create a test client."""
    # We use ASGITransport to test the FastAPI app directly
    transport = ASGITransport(app=fastapi_app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac

@pytest.fixture
def test_user_data() -> dict:
    """Sample user data for testing."""
    return {
        "email": "test@example.com",
        "name": "Test User",
        "target_role": "Software Engineer",
        "target_level": "Senior",
        "target_location": "Seoul",
    }

@pytest.fixture
def test_application_data() -> dict:
    """Sample application data for testing."""
    return {
        "company_name": "Test Company",
        "position_title": "Backend Developer",
        "stage": "applied",
        "channel": "company_website",
        "notes": "Test application",
    }
