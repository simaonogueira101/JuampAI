import { FC } from 'hono/jsx';
import markdownit from 'markdown-it'

interface MessageProps {
  sender: 'ai' | 'human';
  content: string;
}

const Message: FC<MessageProps> = ({ sender, content }) => {
  const isAI = sender === 'ai';

  const md = markdownit()
  const markdownContent = md.render(content);

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
        className={`p-2 px-3 mb-2 space-y-8 [&_ul]:list-disc [&_ol]:list-decimal [&_ol]:pl-4 [&_ul]:pl-4 [&_pre]:overflow-x-auto [&_pre]:p-2 [&_pre]:text-nowrap [&_pre]:bg-gray-800 [&_pre]:text-white [&_code]:p-1 [&_code]:bg-gray-800 [&_code]:text-wrap ${
          isAI ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'
        }`}
        style={{ maxWidth: '500px' }}
        dangerouslySetInnerHTML={{ __html: markdownContent }}
      />
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
