import { FC } from 'hono/jsx';
import Chat from '../components/Chat';
import Sources from '../components/Sources';
import DataSourceInfo from '../components/DataSourceInfo';

export const Assistant: FC = () => {
  return (
    <div className="flex flex-row grow min-h-0 p-4 flex">
      <div className="flex flex-grow space-x-4">
        <div className="w-2/3 h-full">
          <Chat />
        </div>
        <div className="w-1/3 space-y-4 h-full flex flex-col">
          <DataSourceInfo />
          <Sources />
        </div>
      </div>
    </div>
  );
};

export default Assistant;
