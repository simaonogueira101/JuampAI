import { FC } from 'hono/jsx';

export const DataSourceInfo: FC = () => {
  return (
    <div className="bg-gray-800 p-4 w-full mx-auto">
      <div className="text-white font-bold mb-4">Connection</div>
      <div className="bg-gray-600 p-3 flex items-center space-x-4">
        {/* Placeholder for logo */}
        <div className="w-12 h-12 bg-gray-400 flex-shrink-0"></div>
        <div>
          <p className="text-white font-semibold">Talent Protocol Docs</p>
          <a
            href="https://docs.talentprotocol.com"
            className="text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Docs
          </a>
        </div>
      </div>
    </div>
  );
};

export default DataSourceInfo;
