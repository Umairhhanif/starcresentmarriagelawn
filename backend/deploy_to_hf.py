"""
Script to deploy the Star Crescent chatbot backend to Hugging Face Spaces
"""
from huggingface_hub import HfApi, create_repo
import os

# Initialize API
api = HfApi()

# Get username from logged in account
whoami = api.whoami()
username = whoami.get("name", "unknown")
print(f"Logged in as: {username}")

# Repository settings
repo_id = f"{username}/starcresent-chatbot-api"
repo_type = "space"

try:
    # Create the space
    print(f"Creating space: {repo_id}")
    url = create_repo(
        repo_id=repo_id,
        repo_type=repo_type,
        space_sdk="docker",
        private=False,
        exist_ok=True
    )
    print(f"Space created/exists at: {url}")

    # Upload files
    print("Uploading files to the space...")
    api.upload_folder(
        folder_path=".",
        repo_id=repo_id,
        repo_type=repo_type,
        ignore_patterns=[
            "__pycache__",
            "*.pyc",
            ".env",
            "deploy_to_hf.py",
            ".git",
            ".gitignore"
        ]
    )
    print("Upload complete!")
    
    # Get the space URL
    whoami = api.whoami()
    username = whoami.get("name", "unknown")
    space_url = f"https://huggingface.co/spaces/{repo_id}"
    print(f"\n✅ Deployment successful!")
    print(f"Space URL: {space_url}")
    print(f"\n⚠️  IMPORTANT: Set these secrets in your Space settings:")
    print(f"   - GEMINI_API_KEY")
    print(f"   - COHERE_API_KEY")
    print(f"   - DATABASE_URL")
    print(f"   - FRONTEND_URL")
    
except Exception as e:
    print(f"Error: {e}")
