## 💔 Breakup Recovery Agent Team

This is an AI-powered application designed to help users emotionally recover from breakups by providing support, guidance, and emotional outlet messages from a team of specialized AI agents. The app is built using **FastApi** and **Agno**, leveraging **Gemini 2.0 Flash (Google Vision Model)**.

## Project Structure 
.
├── backend/        # FastAPI backend (Agno + Gemini agents)
├── client/         # Vite + React + TypeScript frontend (Shadcn UI)
├── .gitignore
├── README.md

## How to get Started?

1. Clone the Repository:

```bash
git clone https://github.com/Shubhamsaboo/break-up-recovery-squad-ai
```

2. Install the concurrently dependency:
```bash
npm install
```
In the root directory

3. Install the required backend dependencies:

```bash
cd backend
pip install -r requirements.txt
```

4. Install the required frontend dependencies:

```bash
cd frontend
npm install
```

5. Get your Gemini API Key

- Sign up for an [Google Ai Studio account](https://aistudio.google.com/) and obtain your API key.

6. Run the Agent Squad
In the project root directory
```bash
npm run dev
```

## Features
- **Multi-Agent Team:** 
    - **Therapist Agent:** Offers empathetic support and coping strategies.
    - **Closure Agent:** Writes emotional messages users shouldn't send for catharsis.
    - **Routine Planner Agent:** Suggests daily routines for emotional recovery.
    - **Brutal Honesty Agent:** Provides direct, no-nonsense feedback on the breakup.
- **Chat Screenshot Analysis:**
    - Upload screenshots for chat analysis.
- **Parallel Execution:** 
    - Agents process inputs in coordination mode for comprehensive results.

## Tech Stack

- **Backend:** Python using FastApi
- **Frontend:** Vite + React + TypeScript frontend (Shadcn UI)
- **AI Models:** Gemini 2.0 Flash (Google Vision Model)
- **Image Processing:** PIL (for displaying screenshots)
- **Text Extraction:** Google's Gemini Vision model to analyze chat screenshots

## Usage

1. **Enter Your Feelings:** 
    - Describe how you're feeling in the text area.
2. **Upload Screenshot (Optional):**
    - Upload a chat screenshot (PNG, JPG, JPEG) for analysis.
3. **Execute Agents:**
    - Click **"Get Recovery Plan"** to run the multi-agent team.
4. **View Results:**
    - Individual agent responses are displayed.
    - A final summary is provided by the Team Leader.

## API Reference
# Endpoint: POST /analyze/
- Accepts user input and optional images
- Sends it to a team of agents
- Returns structured emotional analysis

## Agents Overview

- **Therapist Agent**
    - Provides empathetic support and coping strategies.
    - Uses **Gemini 2.0 Flash (Google Vision Model)** and DuckDuckGo tools for insights.
  
- **Closure Agent**
    - Generates unsent emotional messages for emotional release.
    - Ensures heartfelt and authentic messages.

- **Routine Planner Agent**
    - Creates a daily recovery routine with balanced activities.
    - Includes self-reflection, social interaction, and healthy distractions.

- **Brutal Honesty Agent**
    - Offers direct, objective feedback on the breakup.
    - Uses factual language with no sugar-coating.
