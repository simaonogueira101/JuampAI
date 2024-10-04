import { FC } from 'hono/jsx';

export const DataSourceInfo: FC = () => {
  return (
    <div className="bg-gray-800 p-4 w-full mx-auto flex flex-col flex-row">
      <div className="text-white font-bold mb-4">Connection</div>
      <div className="bg-gray-600 p-3 flex items-center space-x-4">
        <img class="object-cover w-12 h-12 bg-gray-400 flex-shrink-0" src="https://docs.talentprotocol.com/~gitbook/image?url=https%3A%2F%2F716591960-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FQBODgw4E0VYy54eAMLgS%252Ficon%252FzU6t1ObBzys2seWOz9Py%252Falx53n8W_400x400.jpg%3Falt%3Dmedia%26token%3Dee6603a6-366e-4ad1-9c1c-f2d6ec783e5d&width=32&dpr=2&quality=100&sign=36ffb549&sv=1" />
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
