from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain.chains import LLMChain
from langchain.agents import initialize_agent, Tool
from langchain.agents.agent_types import AgentType
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = ChatOpenAI(
    model="gpt-4o-mini",
    openai_api_key=OPENAI_API_KEY
)

prompt = PromptTemplate(
    input_variables=["chat_history", "user_input"],
    template= """
    You are an AI tutor that ONLY answers questions strictly related to IT (Information Technology).'
    If the user asks a question that is not related to IT - such as topics on relationships, cooking, history, medicine, etc. - you must politely refuse to answer.
    "I'm sorry, but I only help with questions related to Information Technology (IT). Please ask an IT related question."
    Respond clearly in Markdown and never answer unrelated questions.
    {chat_history}
    user: {user_input}
    AI:
    """ 
)

memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
ai_tutor_chain = LLMChain(llm=client, prompt=prompt, memory=memory)

tools = [
    Tool(
        name="AI Tutor",
        func=lambda input: ai_tutor_chain.invoke({"user_input": input})["text"],
        description=" Answer IT-related educational questions."
    )
]

agent_executor = initialize_agent(
    tools=tools,
    llm=client,
    agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=False,
    memory=memory
)

prompts = {
    "explanation": lambda topic: f"Explain the concept of {topic} in simple terms suitable for IT beginners.",
    "study_notes": lambda topic: f"Provide a structured study guide on  {topic} with bullet points.",
    "quiz": lambda topic: f"Generate a 5-question multiple choice quiz on {topic}, including correct answers.",
    "hands_on": lambda topic: f"Suggest a hands-on coding exercise for {topic}, with a solution hint.",
    "learning_path": lambda topic: f"Recommend a step-by-step learning path for mastering'{topic}'.",
    "custom_question": lambda q: f"Answer this IT related question: '{q}'",
}

class RequestData(BaseModel):
    topic: str = "(Optional)"
    query_type: str = "(Optional)"
    custom_question: str = ""


def ai_tutor(topic: str, query_type: str, custom_question: str) -> str:
    topic_val = topic if topic != "(Optional)" else None
    query_val = query_type if query_type != "(Optional)" else None
    user_input = custom_question.strip()

    if not user_input and not (topic_val and query_val):
        return "Please provide either a custom question or select both a topic and a query type."

    if user_input and query_val and topic_val:
        system_prompt = prompts[query_val](topic_val)
        full_prompt = f"{system_prompt}\n\nAlso consider this specific question: '{user_input}'"
    elif query_val and topic_val:
        full_prompt = prompts[query_val](topic_val)
    else:
        full_prompt = prompts["custom_question"](user_input)

    try:
        response = agent_executor.invoke({"input": full_prompt})["output"]
        return response
    except Exception as e:
        return f"**Error:** {str(e)}"

@app.get("/")
def read_root():
    return {
        "message": client.invoke("what is capital of paris").content
    }

@app.post("/ai_tutor")
async def get_answer(request_data: RequestData):
    result = ai_tutor(
        topic=request_data.topic,
        query_type=request_data.query_type,
        custom_question=request_data.custom_question
    )
    return {
        "result": result
    }
