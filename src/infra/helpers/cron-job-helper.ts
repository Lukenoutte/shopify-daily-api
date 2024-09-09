import cron from "node-cron";
import { ICronJobHelper } from "./@interfaces/helper.interfaces";

export class CronJobHelper implements ICronJobHelper {
  public startCronJob(
    schedule: string,
    task: () => void,
    taskName: string,
  ): void {
    cron.schedule(schedule, () => {
      console.log(`[#] Running ${taskName} task on schedule: ${schedule}`);
      try {
        task();
      } catch (error) {
        console.error("Error running task:", error);
      }
    });
    console.log("[#] Cron job started.");
  }
}
