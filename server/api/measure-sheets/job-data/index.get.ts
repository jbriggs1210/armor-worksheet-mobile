import { selectJobData } from "~/lib/db/queries/selectJobData";

export default defineEventHandler(async (event) => {
    if (event.method === "GET") {
        console.log(`Received request at: ${event.path}`);
        const sheets = await selectJobData();
        console.log(sheets);
        return sheets;
    }
});
