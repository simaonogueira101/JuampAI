import { config } from "./config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { Top } from "./components/top";
import sequelize from "./database";
import weaviate from "weaviate-client";

const app = new Hono();

app.get("/", (c) => c.text("Hello from hono!"));
app.get("/react", (c) => c.html(<Top messages={["Hello", "World"]} />));

const connectDB = async () => {
  let retries = 5;
  await new Promise((res) => setTimeout(res, 3000)); // wait 3 seconds before trying to connect
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
      await sequelize.sync();
      console.log("Models have been synchronized.");
      break;
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      await new Promise((res) => setTimeout(res, 5000)); // wait 5 seconds
    }
  }
};

const connectWeaviate = async () => {
  let retries = 5;
  await new Promise((res) => setTimeout(res, 5000)); // wait 5 seconds before trying to connect
  while (retries) {
    try {
      const client = await weaviate.connectToLocal({
        host: "weaviate",
        port: 8080,
      });
      console.log("Connected to the weaviate.");
      break;
    } catch (error) {
      console.error("Unable to connect to the weaviate:", error);
      console.log(error);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      await new Promise((res) => setTimeout(res, 5000)); // wait 5 seconds
    }
  }
};

const start = async () => {
  await connectDB();
  await connectWeaviate();
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
