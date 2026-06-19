from langchain.agents import create_agent
from dotenv import load_dotenv
from dataclasses import dataclass
from langchain.tools import tool, ToolRuntime
from sqlalchemy import create_engine, text
from shared import print_hello

load_dotenv()



print("Running inside ")
print_hello()
@dataclass
class UserContext:
    user_id: str


class UserRepository:
    def __init__(self, connection_string: str):
        self.engine = create_engine(connection_string)

    def get_user(self, user_id: str):
        with self.engine.connect() as conn:
            result = (
                conn.execute(
                    text("""
                    SELECT
                        user_id,
                        name,
                        account_type,
                        balance,
                        email
                    FROM users
                    WHERE user_id = :user_id
                    """),
                    {"user_id": user_id},
                )
                .mappings()
                .first()
            )

            return result


DATABASE_URL = "postgresql://postgres:password@db:5432/sprite_db"


repo = UserRepository(DATABASE_URL)


@tool
def get_account_info(runtime: ToolRuntime[UserContext]) -> str:
    """Get user account info"""
    user = repo.get_user(runtime.context.user_id)

    if not user:
        return "User not found"

    return (
        f"Account holder: {user['name']}\n"
        f"Type: {user['account_type']}\n"
        f"Balance: ${user['balance']}"
    )


agent = create_agent(
    model="gpt-5.4-mini",
    tools=[get_account_info],
    context_schema=UserContext,
)
