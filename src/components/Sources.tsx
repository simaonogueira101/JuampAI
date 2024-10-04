import { FC } from "hono/jsx";
import { Source } from "../views/Assistant";

const mockSources: Source[] = [
  {
    title: "Source Title 1",
    url: "https://example.com/1",
    excerpt:
      "This is an excerpt from the first source. It provides some important insight.",
  },
  {
    title: "Source Title 2",
    url: "https://example.com/2",
    excerpt:
      "Here is a short snippet from the second source. It highlights key points.",
  },
  {
    title: "Source Title 3",
    url: "https://example.com/3",
    excerpt:
      "An illuminating excerpt from the third source. It sheds light on the topic.",
  },
  {
    title: "Source Title 1",
    url: "https://example.com/1",
    excerpt:
      "This is an excerpt from the first source. It provides some important insight.",
  },
  {
    title: "Source Title 2",
    url: "https://example.com/2",
    excerpt:
      "Here is a short snippet from the second source. It highlights key points.",
  },
  {
    title: "Source Title 3",
    url: "https://example.com/3",
    excerpt:
      "An illuminating excerpt from the third source. It sheds light on the topic.",
  },
];

export const Sources: FC<{ sources: Source[] }> = ({ sources }) => {
  return (
    <div className="bg-gray-800 p-4 flex flex-row grow min-h-0">
      <div className="flex flex-grow flex-col">
        <div className="text-white font-bold mb-4">Sources</div>
        <div className="bg-gray-600 p-3 space-y-4 h-full overflow-y-auto">
          {sources.map((source, index) => (
            <div key={index} className="bg-gray-700 p-3">
              <h3 className="text-white font-semibold">{source.title}</h3>
              <a
                href={source.url}
                className="text-blue-400 hover:underline block mb-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                {source.url}
              </a>
              <p className="text-gray-300">{source.excerpt}</p>
            </div>
          ))}
          {sources.length === 0 && (
            <div className="bg-gray-700 p-3">
              <p className="text-gray-300">
                After you ask a question, relevant sources will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sources;
