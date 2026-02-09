# AI Resume Screening System

This project is a high-performance resume screening tool built during my internship. It leverages the Endee Labs Vector Engine as a local database service to store and search candidate resumes using semantic AI embeddings..

---

## 🏗️ Project Architecture

The system follows a modular architecture that prioritizes data privacy and local high-speed vector search.

- **`endee`**: The core Vector Database (C++ engine) used for local storage of semantic embeddings.
  **resume-screening-app/:**: The custom application layer. It handles PDF text extraction, AI embedding generation (NLP), and provides a REST API for the frontend.

---

## 🚀 Setup & Installation

### 1. Workspace Initialization

Clone your forked repository which contains both the Endee core and the internship project..

Using HTTP:

```
git clone https://github.com/prathvihan108/endee-09.git
```

Using SSH:

```
git clone git@github.com:prathvihan108/endee-09.git
```

### 2. Set up Endee Vector DB

Change dir

```
cd endee

```

**Start Endee**

```
docker compose up -d
```

**Verify the Server is Running**

```
docker ps

```

You should see a container named endee-server

### 3. Setting Up the Application

We use a Python Virtual Environment (endee_venv) to manage dependencies for the FastAPI backend located in the internship folder.

Step 1: Create the Virtual Environment This isolates your project libraries from the system-wide Python installation.

```
python3 -m venv endee_venv
```

Step 2: Activate the Environment

```
source venv/bin/activate
```

Step 3: Install Project Requirements

```
pip install -r app-resume-screening/requirements.txt
```

**Configure Environment Variables**
Create the .env file:

```
cd app-resume-screening
touch .env
```

Add your Hugging Face token to the file. Open it with your preferred editor and insert the following line:

```
HF_TOKEN="your_hugging_face_token_here"
```

How to Obtain Your Hugging Face Token
Follow these brief steps to generate your access key:

1.  Login: Sign in to your account at huggingface.co.

2.  Settings: Click your profile icon in the top-right corner and select Settings.

3.  Access Tokens: Select Access Tokens from the left-side navigation menu.

4.  Generate: Click New token, provide a name, and select the Read role

5.  Copy: Copy the token and paste it into the .env file you created.

### 4. Running the Application

Step 1: Activate the Environment from the root(i.e endee)

```
source endee_venv/bin/activate
```

Step 2: Ensure your Hugging Face Token is set in .env file we created in /internship-project-harshitha

Step 3: Start the server on port 8000

Note:virtual Environment(HG_venv) should be active while u run the "uvicorn" command or app

```
cd iapp-resume-screening
uvicorn backend.main:app --reload --port 8000
```

Verification: Open http://localhost:8000/docs. If you see the Swagger UI, your backend is alive and ready.

Step 4: Start the Vite Frontend(Terminal 2)

```
#Open new terminal
# Navitage to the frontend directory(/endee-09/app-resume-screening/frontend)

# Install dependencies
npm install

# Start the Vite development server
npm run dev

```
