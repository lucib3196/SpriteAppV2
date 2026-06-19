from fastapi import FastAPI
from shared import get_message
import uvicorn

app = FastAPI()


@app.get("/")
def root():
    return {
        "status": "ok",
        "message": get_message(),
    }


@app.get("/health")
def health():
    return {"healthy": True}


if __name__ == "__main__":
    uvicorn.run(
        "src.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )
