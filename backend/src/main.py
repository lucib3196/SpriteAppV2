from fastapi import FastAPI

app = FastAPI()

@app.get("/test")
def read_root():
    return {"Hello": "World"}


@app.post("/test")
def get_root(data: str):
    return {"Hello": f"{data}"}