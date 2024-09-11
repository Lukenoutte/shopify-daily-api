import PostgreHelper from "../infra/helpers/postgre-helper";
import app from "./configs/app";
import { serverPort, postgreUrl } from "./configs/env";
import { CronJobHelper } from "../infra/helpers/cron-job-helper";
import UpdateProductsComposer from "./composers/update-products-composer";

async function execute() {
  try {
    await PostgreHelper.connect(postgreUrl);
    app.listen(serverPort, () => {
      console.log(`[#] Server running at http://localhost:${serverPort}`);
    });

    const cronJobHelper = new CronJobHelper();
    //const everyDayCronExpression = "* * * * *";
    const everyDayCronExpression = "0 0 * * *";
    cronJobHelper.startCronJob(
      everyDayCronExpression,
      UpdateProductsComposer.compose,
      "Update Product",
    );
  } catch (error) {
    console.error(error);
  }
}

execute();
