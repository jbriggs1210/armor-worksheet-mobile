// import {updateMeasureSheet} from "~/lib/db/queries/insert-measure-sheet";
// import {InsertMeasureSheet} from "~/lib/db/schema";
// import {MeasureSheet} from "~/types/measure-sheet";
// import {transformToDbSingle} from "~/server/utils/measure-sheet-transformer";
//
// export default defineEventHandler(async (event) => {
//         const id = getRouterParam(event, "id");
//         if (!id) {
//             throw new Error("This should be impossible but here we are.");
//         }
//
//         const data: MeasureSheet = await readBody(event);
//         const dbMeasureSheet: InsertMeasureSheet = transformToDbSingle(data);
//         await updateMeasureSheet(dbMeasureSheet);
//         // todo update customer information or do we have a separate api route to handle this?
//         // todo how do we update the store or is that done elsewhere
// })