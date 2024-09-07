// import PostgreHelper from "../infra/helpers/postgre-helper";
import app from "./configs/app";
import { serverPort } from "./configs/env";

async function execute() {
  try {
    // await PostgreHelper.connect(postgreUrl);
    app.listen(serverPort, () => {
      console.log(`Server running at http://localhost:${serverPort}`);
    });
  } catch (error) {
    console.error(error);
  }
}

execute();
