import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const serverPort = process.env.PORT || 3000;

export { serverPort };