import { FC } from 'hono/jsx';

interface MessageProps {
  sender: 'ai' | 'human';
  content: string;
}

const Message: FC<MessageProps> = ({ sender, content }) => {
  const isAI = sender === 'ai';

  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}>
      {isAI && (
        <div
          className="flex items-center justify-center align-center w-8 h-8 mt-1 bg-blue-600 text-white text-center rounded-full mr-2"
          style={{ fontSize: '12px' }}
        >
          TP
        </div>
      )}
      <div
        className={`p-2 px-3 mb-2 ${
          isAI ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'
        }`}
        style={{ maxWidth: '500px' }}
      >
        {content}
      </div>
      {!isAI && (
        <div
          className="flex items-center justify-center align-center w-8 h-8 mt-1 bg-gray-800 text-white text-center rounded-full ml-2"
          style={{ minWidth: '24px', fontSize: '12px' }}
        >
          H
        </div>
      )}
    </div>
  );
};

export default Message;
