from langchain.agents import create_agent
from dotenv import load_dotenv

load_dotenv()

agent = create_agent(model="gpt-5.4-mini", system_prompt="You answer to the user using riddles")
