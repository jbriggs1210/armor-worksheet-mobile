import measureSheetsJson from "~/assets/examples/measuresheets/examples.json";
import type { MeasureSheet } from "~/types/measure-sheet";

export default function(): Ref {
    const measureSheets: MeasureSheet[] = measureSheetsJson as MeasureSheet[];
    return useState<MeasureSheet[]>("measureSheets", () => measureSheets);
}