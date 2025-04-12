from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from agno.agent import Agent
from agno.models.google import Gemini
from agno.media import Image as AgnoImage
from agno.tools.duckduckgo import DuckDuckGoTools
from typing import List
from pathlib import Path
import tempfile
import os
from typing import Optional

app = FastAPI()

# Allow CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def initialize_agents(api_key: str):
    model = Gemini(id="gemini-2.0-flash-exp", api_key=api_key)

    therapist_agent = Agent(
        model=model,
        name="Therapist Agent",
        instructions=[
            "You are an empathetic therapist that listens and validates...",
        ],
        markdown=True
    )

    closure_agent = Agent(
        model=model,
        name="Closure Agent",
        instructions=[
            "You are a closure specialist that crafts emotional messages...",
        ],
        markdown=True
    )

    routine_planner_agent = Agent(
        model=model,
        name="Routine Planner Agent",
        instructions=[
            "You are a recovery routine planner...",
        ],
        markdown=True
    )

    brutal_honesty_agent = Agent(
        model=model,
        name="Brutal Honesty Agent",
        tools=[DuckDuckGoTools()],
        instructions=[
            "You are a direct feedback specialist that gives blunt truth...",
        ],
        markdown=True
    )

    return therapist_agent, closure_agent, routine_planner_agent, brutal_honesty_agent

def process_images(uploaded_files: List[UploadFile]):
    processed = []
    for file in uploaded_files:
        try:
            suffix = file.filename.split('.')[-1]
            temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=f".{suffix}")
            temp_file.write(file.file.read())
            temp_file.close()
            processed.append(AgnoImage(filepath=Path(temp_file.name)))
        except Exception as e:
            continue
    return processed

@app.post("/analyze/")
async def analyze(
    api_key: str = Form(...),
    user_input: str = Form(...),
    files: Optional[List[UploadFile]] = File(default=None)
):
    try:
        therapist, closure, routine, honesty = initialize_agents(api_key)
        images = process_images(files) if files else []

        results = {}

        # Therapist Agent response
        therapist_response = therapist.run(
            message=f"Analyze and support user feeling: {user_input}", images=images
        )
        results["therapist"] = {
            "status": "success" if therapist_response else "failure",
            "data": therapist_response.content if therapist_response else "No response"
        }

        # Closure Agent response
        closure_response = closure.run(
            message=f"Help user with closure: {user_input}", images=images
        )
        results["closure"] = {
            "status": "success" if closure_response else "failure",
            "data": closure_response.content if closure_response else "No response"
        }

        # Routine Planner Agent response
        routine_response = routine.run(
            message=f"Create 7-day recovery plan: {user_input}", images=images
        )
        results["routine"] = {
            "status": "success" if routine_response else "failure",
            "data": routine_response.content if routine_response else "No response"
        }

        # Brutal Honesty Agent response
        honesty_response = honesty.run(
            message=f"Give honest feedback about: {user_input}", images=images
        )
        results["honesty"] = {
            "status": "success" if honesty_response else "failure",
            "data": honesty_response.content if honesty_response else "No response"
        }

        return {"success": True, "data": results}

    except Exception as e:
        return {"success": False, "error": str(e)}
