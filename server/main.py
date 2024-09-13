from fastapi import FastAPI
import uvicorn
from services.screaping_service import get_data, process_news_urls
app = FastAPI()

@app.get('/')
def root():
    return process_news_urls(get_data())


if __name__ == "__main__":
    # Aquí se especifica la dirección IP y el puerto en el que el servidor escuchará
    uvicorn.run(app, host="0.0.0.0", port=8000)