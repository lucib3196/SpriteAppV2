from langchain.agents import create_agent
from langgraph.checkpoint.memory import MemorySaver
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

load_dotenv()

llm = ChatOpenAI(model="gpt-4.1-mini")

agent = create_agent(
    model="openai:gpt-4.1-mini",
    system_prompt="You are tasked at generating images based on user query",
    tools=[{"type": "image_generation"}],
)
