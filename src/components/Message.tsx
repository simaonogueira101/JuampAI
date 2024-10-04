import { FC } from 'hono/jsx';

interface MessageProps {
  sender: 'ai' | 'human';
  content: string;
}

const Message: FC<MessageProps> = ({ sender, content }) => {
  const isAI = sender === 'ai';

  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`p-2 mb-2 ${
          isAI ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'
        }`}
        style={{ maxWidth: '500px' }} // Define the max width directly here
      >
        {content}
      </div>
    </div>
  );
};

export default Message;
