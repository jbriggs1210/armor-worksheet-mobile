import { usePDFMake } from "#pdfmake/composables/usePDFMake";
import type { InsertMeasureSheet, SelectMeasureSheet } from "~/types/measure-sheet";
import type { TCreatedPdf } from "pdfmake/build/pdfmake";
import { withDocumentDefinitions } from "~/utils/pdf-utils";

export default function (measureSheet: InsertMeasureSheet | SelectMeasureSheet): Ref<TCreatedPdf> {
    return useState("usePdfFactory", () => usePDFMake().createPdf(withDocumentDefinitions(measureSheet)));
}