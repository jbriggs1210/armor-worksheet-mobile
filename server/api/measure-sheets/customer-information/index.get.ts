import { getCustomerNameForJobDataId } from "~/lib/db/queries/selectCustomerInformation";

export default defineEventHandler(async (event) => {
    if (event.method === "GET") {
        console.log(`Received request at: ${event.path}`);
        const jobDataId: number = Number(getRouterParam(event, "jobDataId"));
        console.log(jobDataId);
        const customerNames = await getCustomerNameForJobDataId(jobDataId);
        console.log(customerNames);
        return customerNames;
    }
});
