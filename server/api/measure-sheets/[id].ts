import { selectMeasureSheetById } from "~/lib/db/queries/select-measure-sheet";
import { transformToApiSingle } from "~/server/utils/measure-sheet-transformer";

export default defineEventHandler(async (event) => {
    if (event.method === "GET") {
        console.log(`Received request at: ${event.path} supposed to be /measure-sheets/[id]`);
        const id = getRouterParam(event, "id");
        if (!id) throw new Error();
        const sheet = await selectMeasureSheetById(Number(id));
        return transformToApiSingle(sheet);
    }
});