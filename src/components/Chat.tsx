import { FC } from 'hono/jsx';

export const Chat: FC = () => {
  return (
    <div className="bg-gray-800 p-4 w-full h-full mx-auto">
      <div className="text-white font-bold mb-2">Chat</div>
      <div className="h-64 bg-gray-600 p-3 overflow-y-auto">
        {/* This container will hold the conversation history */}
      </div>
      <div className="flex mt-2">
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
