import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const postgreUrl = process.env.DATABASE_URL as string;
const serverPort = process.env.PORT || 3003;

export { serverPort, postgreUrl };
