import { FC, useState } from "hono/jsx";
import Chat from "../components/Chat";
import Sources from "../components/Sources";
import DataSourceInfo from "../components/DataSourceInfo";

export type Source = {
  title: string;
  url: string;
  excerpt: string;
};

export const Assistant: FC = () => {
  const [sources, setSources] = useState<Source[]>([]);
  return (
    <div className="flex flex-row grow min-h-0 p-4 flex">
      <div className="flex flex-grow space-x-4">
        <div className="w-2/3 h-full">
          <Chat setSources={setSources} />
        </div>
        <div className="w-1/3 space-y-4 h-full flex flex-col">
          <DataSourceInfo />
          <Sources sources={sources} />
        </div>
      </div>
    </div>
  );
};

export default Assistant;
