from fastapi import FastAPI
import subprocess

app = FastAPI()

@app.get("/ros2/remote")
def remote_command():
    try:
        result = subprocess.run(["/bin/bash", "./run_remote.sh"], capture_output=True, text=True)
        return {"output": result.stdout, "error": result.stderr}
    except Exception as e:
        return {"error": str(e)}

@app.get("/ros2/slam_nav")
def slam_nav_command():
    try:
        result = subprocess.run(["echo SLAM + NAV"], capture_output=True, text=True)
        return {"output": result.stdout, "error": result.stderr}
    except Exception as e:
        return {"error": str(e)}

@app.get("/ros2/map_nav")
def map_nav_command():
    try:
        result = subprocess.run(["echo MAP+NAV"], capture_output=True, text=True)
        return {"output": result.stdout, "error": result.stderr}
    except Exception as e:
        return {"error": str(e)}

@app.get("/ros2/create_map")
def create_map_command():
    try:
        result = subprocess.run(["echo Create Map"], capture_output=True, text=True)
        return {"output": result.stdout, "error": result.stderr}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
