from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
from services.screaping_service import get_data, process_news_urls

# Define un esquema de datos usando Pydantic
class UrlRequest(BaseModel):
    url: str

app = FastAPI()

@app.post('/')
def root(request: UrlRequest):
    # Usa request.url para acceder al campo url en el cuerpo JSON
    return process_news_urls(get_data(request.url))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
