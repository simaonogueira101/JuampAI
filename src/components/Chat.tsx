import { FC } from 'hono/jsx';
import Message from './Message';

export const Chat: FC = () => {
  const messages: { sender: 'ai' | 'human'; content: string }[] = [
    { sender: 'ai', content: 'Hello! How can I assist you?' },
    { sender: 'human', content: 'What is the weather today? What is the weather today?What is the weather today?What is the weather today?What is the weather today?What is the weather today?' },
    // More messages can be added here
  ];

  return (
    <div className="bg-gray-800 p-4 w-full h-full flex flex-col">
      <div className="text-white font-bold mb-4">Chat</div>
      <div className="bg-gray-600 h-full p-3 overflow-y-auto">
        {messages.map((msg, index) => (
          <Message sender={msg.sender} content={msg.content} />
        ))}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-grow p-2 bg-gray-700 border border-gray-600 text-white focus:outline-none"
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;