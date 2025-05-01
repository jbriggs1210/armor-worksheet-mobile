import measureSheetExamples from "~/assets/examples/measuresheets/examples.json";

export default function(): Ref {
    return useState<object[]>("measureSheets", () => measureSheetExamples);
}