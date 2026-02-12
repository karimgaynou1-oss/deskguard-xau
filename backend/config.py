from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "DeskGuard XAU Trading Dashboard"
    app_version: str = "1.0.0"
    cors_origins: list = ["http://localhost:5173", "http://localhost:3000"]
    
    class Config:
        env_file = ".env"

settings = Settings()
