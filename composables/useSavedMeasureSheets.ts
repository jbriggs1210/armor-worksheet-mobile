import measureSheetsJson from "~/assets/examples/measuresheets/examples.json";
import type { MeasureSheet } from "~/types/measure-sheet";

export default function(): Ref<MeasureSheet[]> {
    const measureSheets: MeasureSheet[] = measureSheetsJson as MeasureSheet[];
    // const prisma = new PrismaClient();
    // const savedMeasureSheets = await prisma.measureSheets.read();
    // console.log(savedMeasureSheets);
    return useState<MeasureSheet[]>("measureSheets", () => measureSheets);
}