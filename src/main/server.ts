import PostgreHelper from "../infra/helpers/postgre-helper";
import app from "./configs/app";
import { serverPort, postgreUrl } from "./configs/env";
import { CronJobHelper } from "../infra/helpers/cron-job-helper";
import UpdateProductComposer from "./composers/update-product-composer";

async function execute() {
  try {
    await PostgreHelper.connect(postgreUrl);
    app.listen(serverPort, () => {
      console.log(`[#] Server running at http://localhost:${serverPort}`);
    });

    const cronJobHelper = new CronJobHelper();
    const updateProductComposer = new UpdateProductComposer();
    const everyDayCronExpression = "* * * * *";
    cronJobHelper.startCronJob(
      everyDayCronExpression,
      updateProductComposer.compose,
      "Update Product",
    );
  } catch (error) {
    console.error(error);
  }
}

execute();
