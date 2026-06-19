import { type ContentBlock } from "langchain";
type ChatType = "human" | "ai" | "tool";
interface ChatBubbleProps {
  type?: ChatType;
  key: string | number | undefined;
  children: ContentBlock[] | string;
}

function isContentBlock(x: unknown): x is ContentBlock {
  return typeof x === "object" && x !== null && "type" in x && "text" in x;
}

function isContentBlockArray(x: unknown): x is ContentBlock[] {
  return Array.isArray(x) && x.every(isContentBlock);
}
const cleanChildren = (cd: ContentBlock[] | string) => {


    // Check to see if it is an array first

  if (isContentBlockArray(cd)) {
    console.log("Found content block", cd)
    if (!cd.length) return ""; // handle empty array
    const last = cd.at(-1);

    if (last?.type == "image_generation_call") {
      console.log("Image Generated", last);
      return "image generated";
    }

    if (!last || typeof last.text !== "string") {
      return ""; //  fallback
    }

    console.log("Current last", last);

    return last.text;
  } else {
    console.log("Raw cd", cd)
    return cd ?? "";
  }
};

const ChatBubbleBase =
  "max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap";

const ChatBubbleStyles: Record<ChatType, string> = {
  ai: `${ChatBubbleBase} self-start border border-slate-700 bg-slate-900 text-slate-100`,
  human: `${ChatBubbleBase} self-end bg-slate-100 text-slate-900`,
  tool: `${ChatBubbleBase} self-start border border-slate-700/70 bg-slate-800/60 text-slate-300`,
};
export function HumanBubble({
  key,
  children,
  type = "human",
}: ChatBubbleProps) {
  return (
    <div key={key} className={ChatBubbleStyles[type]}>
      {cleanChildren(children)}
    </div>
  );
}

export function AIBubble({ key, children, type = "ai" }: ChatBubbleProps) {
  return (
    <div key={key} className={ChatBubbleStyles[type]}>
      {cleanChildren(children)}
    </div>
  );
}
