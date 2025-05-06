import { selectMeasureSheets } from "~/lib/db/queries/select-measure-sheet";
import { transformToApiMany } from "~/server/utils/measure-sheet-transformer";

export default defineEventHandler(async (event) => {
    if (event.method === "GET") {
        console.log(`Received request at: ${event.path}`);
        const sheets = await selectMeasureSheets();
        return transformToApiMany(sheets);
    }
});
