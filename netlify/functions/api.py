import os
from mangum import Mangum
from apps.api.main import app

# Ensure FastAPI knows about the base path if necessary
# Netlify functions usually run under /.netlify/functions/api
# We use redirects in netlify.toml so the client calls /api/*

# The Mangum handler wraps the FastAPI application
handler = Mangum(app, lifespan="off", api_gateway_base_path="/.netlify/functions/api")
