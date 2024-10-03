import { config } from "./config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { Top } from "./components/top";

const app = new Hono();

app.get("/", (c) => c.text("Hello from hono!"));
app.get("/react", (c) => c.html(<Top messages={["Hello", "World"]} />));

const start = () => {
  serve(
    {
      fetch: app.fetch,
      port: config.server.port,
    },
    (info) => {
      console.log(`Server listening on ${info.port}`);
    }
  );
};

start();
