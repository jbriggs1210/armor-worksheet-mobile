import measureSheetExamples from '~/assets/examples/measuresheets/examples.json';

export default function() {
    return useState<object[]>('measureSheets', () => measureSheetExamples);
}