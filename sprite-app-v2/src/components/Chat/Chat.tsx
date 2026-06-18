import { useStream } from "@langchain/react";
import ChatContainer, { ChatInput } from "./ChatContainer";
import { useRef } from "react";
import { HumanMessage, AIMessage } from "langchain";
import { type BaseMessage } from "langchain";
import { HumanBubble, AIBubble } from "./ChatBubble";

interface MyState {
  messages: BaseMessage[];
  runtime?: any;
}

export default function Chat() {
  const stream = useStream<MyState>({
    apiUrl: "http://127.0.0.1:2024",
    assistantId: "agent",
  });

  const handleSubmit = (text: string) => {
    stream.submit(
      {
        messages: [
          {
            content: text,
            type: "human",
          },
        ],
      },
      {
        context: {
          user_id: "user456",
        },
      },
    );
  };

  const bottomRef = useRef<HTMLDivElement>(null);

  return (
    <ChatContainer>
      {stream.messages.length === 0}
      {stream.messages.map((msg) => {
        if (HumanMessage.isInstance(msg)) {
          return <HumanBubble key={msg.id}>{msg.content}</HumanBubble>;
        }

        if (AIMessage.isInstance(msg)) {
          return <AIBubble key={msg.id}>{msg.content}</AIBubble>;
        }

        return null;
      })}

      {/* <div>



                {stream.messages.map((msg) => {
                    let image = "";
                    if (msg.type === "ai" && Array.isArray(msg.content)) {
                        const foundImage = msg.content.find(
                            (v) => v.type === "image_generation_call",
                        );
                        image = (foundImage?.result as string) ?? "";
                    }
                    return (
                        <div key={msg.id}>
                            {image && (
                                <img
                                    src={`data:image/png;base64,${image}`}
                                    alt="Rendered"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                            {"text" in msg ? msg.text : String(msg.content ?? "")}
                        </div>
                    );
                })}
            </div> */}

      {/* Input Section */}
      <div ref={bottomRef} />
      <ChatInput
        handleSubmit={handleSubmit}
        disabled={stream.isLoading}
        multiModal={true}
      />
    </ChatContainer>
  );
}
