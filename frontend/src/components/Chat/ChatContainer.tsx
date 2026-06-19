import clsx from "clsx";
import ImageUploader from "../ImageUpload";
import { useState } from "react";

type ChatContainerVariant = "demo" | "main";
type Sizes = "sm" | "med" | "lg";

const Variants: Record<ChatContainerVariant, string> = {
    demo: "w-full max-w-xl rounded-xl border border-slate-200 bg-white shadow-sm",
    main: "mx-auto flex h-full w-full max-w-3xl flex-col rounded-2xl border border-slate-800 bg-slate-950 p-4 text-slate-100 shadow-lg",
};
const SizeClasses: Record<Sizes, string> = {
    sm: "min-h-[320px]",
    med: "min-h-[520px]",
    lg: "min-h-[720px]",
};
interface ChatContainerProps {
    children: React.ReactNode;
    variant?: ChatContainerVariant;
    size?: Sizes;
}
interface ChatInputProps {
    handleSubmit: (val: string) => void;
    disabled: boolean;
    onNewThread?: () => void;
    multiModal?: boolean;
}
export default function ChatContainer({
    children,
    variant = "main",
    size = "med",
}: ChatContainerProps) {
    return (
        <div className={clsx(Variants[variant], SizeClasses[size])}>{children}</div>
    );
}
export function ChatInput({
    handleSubmit,
    disabled,
    onNewThread,
    multiModal = true,

}: ChatInputProps) {
    const [message, setMessage] = useState("");
    const [_, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const submit = () => {
        const trimmed = message.trim();
        if (!trimmed || disabled) return;
        handleSubmit(trimmed);
        setMessage("");
    };

    function onFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setFile(file);
        const url = URL.createObjectURL(file);
        setPreview(url);
    }


    return (
        <div className="flex flex-col justify-center items-center">
            {preview && (
                <img
                    src={preview}
                    alt="Preview"
                    style={{ width: "400px", marginTop: "10px" }}
                />
            )}
            <div className="w-full mt-3 flex items-center gap-2 border-t border-slate-800 pt-3">

                {onNewThread && (
                    <button
                        type="button"
                        onClick={onNewThread}
                        className="rounded-md border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800"
                    >
                        New
                    </button>
                )}
                <input
                    className="flex-1 rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-slate-500"
                    placeholder="Type a message..."
                    disabled={disabled}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") submit();
                    }}
                />
                <button
                    type="button"
                    onClick={submit}
                    disabled={disabled || !message.trim()}
                    className="rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Send
                </button>
                {multiModal && <ImageUploader onFileSelect={onFileSelect} />}
            </div>
        </div>
    );
}
