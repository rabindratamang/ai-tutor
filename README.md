# AI Tutor

An AI-powered tutoring application that provides interactive learning experiences for IT-related topics.

## Features

- **Interactive AI Tutoring**: Get instant answers to IT-related questions
- **Structured Learning**: Access various learning formats including:
  - Explanations
  - Study Notes
  - Quizzes
  - Hands-on Exercises
  - Learning Paths
- **Topic-Specific Guidance**: Get focused help on specific IT topics
- **Custom Questions**: Ask any IT-related question and get detailed responses

## Tech Stack

### Backend
- FastAPI (Python web framework)
- LangChain (AI/LLM framework)
- OpenAI GPT-4 (Language model)
- Python 3.8+

## API Endpoints

### Backend API (FastAPI)

- `GET /`: Health check endpoint
- `POST /ai_tutor`: Main endpoint for AI tutoring
  - Request Body:
    ```json
    {
      "topic": "string (optional)",
      "query_type": "string (optional)",
      "custom_question": "string"
    }
    ```
  - Query Types:
    - explanation
    - study_notes
    - quiz
    - hands_on
    - learning_path
    - custom_question

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the backend directory with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

5. Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```


## Environment Variables

### Backend
- `OPENAI_API_KEY`: Your OpenAI API key

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
