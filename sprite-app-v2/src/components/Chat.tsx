import { BaseMessage } from "langchain";
import { useStream } from "@langchain/react";
import { useEffect, useMemo, useState } from "react";
export interface GraphState {
    messages: BaseMessage[];
}

export default function Chat() {
    const [message, setMessage] = useState<string>("");

    const stream = useStream<GraphState>({
        apiUrl: "http://127.0.0.1:2024",
        assistantId: "agent",
    });

    const handleSubmit = async () => {
        if (!message.trim()) return;

        stream.submit({
            messages: [{ content: message, type: "human" }],
        });
        setMessage("");
    };

    return (
        <div>
            <div>
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
            </div>

            {/* Input Section */}
            <div>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                />
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}
