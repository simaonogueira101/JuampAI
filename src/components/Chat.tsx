import { FC, useState, useEffect, useRef } from "hono/jsx";
import Message from "./Message";
import { Source } from "../views/Assistant";

const fetchAIResponse = async (
  messages: { sender: "ai" | "human"; content: string }[]
): Promise<{ answer: string; context: any[] }> => {
  const { protocol, hostname, port } = window.location;
  const baseUrl = `${protocol}//${hostname}${port ? ":" + port : ""}`;

  const formData = new FormData();
  formData.append("history", JSON.stringify(messages));

  const response = await fetch(baseUrl + "/ai/magic", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data;
};

type Context = {
  pageContent: string;
};

const contextToSource = (context: Context[]): Source[] => {
  return context.map((doc) => {
    return {
      url: "https://docs.talentprotocol.com",
      title: "Talent Protocol Docs",
      excerpt: `${doc.pageContent.substring(0, 50).trim()}...`,
    };
  });
};

export const Chat: FC<{ setSources: (sources: Source[]) => void }> = ({
  setSources,
}) => {
  const [messages, setMessages] = useState<
    { sender: "ai" | "human"; content: string }[]
  >([{ sender: "ai", content: "Hello! How can I assist you?" }]);

  const [inputValue, setInputValue] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const addMessage = (content: string) => {
    setMessages([...messages, { sender: "human", content }]);
  };

  useEffect(() => {
    if (
      messages.length > 0 &&
      messages[messages.length - 1].sender === "human"
    ) {
      fetchAIResponse(messages).then((response) => {
        // call setSources
        setSources(contextToSource(response.context));
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "ai", content: response.answer },
        ]);
      });
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      addMessage(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div className="bg-gray-800 p-4 w-full h-full flex flex-col">
      <div className="text-white font-bold mb-4">Chat</div>
      <div className="bg-gray-600 h-full p-3 overflow-y-auto flex-grow">
        {messages.map((msg, index) => (
          <Message sender={msg.sender} content={msg.content} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          id="chat-input"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue((e.target as HTMLInputElement).value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          className="flex-grow p-2 bg-gray-700 border border-gray-600 text-white focus:outline-none"
        />
        <button
          className={`px-4 ${
            inputValue.trim()
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-gray-500 cursor-not-allowed text-gray-400"
          }`}
          onClick={handleSendMessage}
          disabled={!inputValue.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
