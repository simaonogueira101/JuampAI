import "dotenv/config";
const PORT = process.env.PORT || "3000";
const CONCURRENCY = process.env.WEB_CONCURRENCY || "1";

export const config = {
  server: {
    port: parseInt(PORT),
  },
  concurrency: parseInt(CONCURRENCY),
};
