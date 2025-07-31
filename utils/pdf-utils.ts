import type { InsertMeasureSheet, SelectMeasureSheet } from "~/types/measure-sheet";
import type { Content, ContentCanvas, ContentTable, TDocumentDefinitions } from "pdfmake/interfaces";
import type { InsertJobData, SelectJobData } from "~/lib/db/schema";

export const withDocumentDefinitions = (measureSheet: InsertMeasureSheet | SelectMeasureSheet): TDocumentDefinitions => {
    const documentDefinition: TDocumentDefinitions = {content: []};
    const jobData = measureSheet.jobData;
    // Set up margins
    documentDefinition.pageMargins = [
        75, 100, 75, 150
    ];
    // Set fonts
    // Set colors
    documentDefinition.defaultStyle = {
        font: "Roboto", // fixme: probably need to adjust/change this
        fontSize: 12,
        color: "#404040",
        bold: false,
        italics: false,
    };

    // Set re-usable styles
    documentDefinition.styles = {
        tableHeaderCell: {
            bold: true
        }
    };
    // Create Header
    documentDefinition.header = [
        {
            text: `Armor Measure Sheet - ${jobData.jobNumber}`,
            alignment: "center",
            marginTop: 75,
            fontSize: 18,
        }
    ];
    // Create Content
    (documentDefinition.content as Content[]).push(headerLineBreak);
    // Create table/grid for data
    // Job Data
    (documentDefinition.content as Content[]).push(jobDataTable(jobData));
    // Customer Information

    return documentDefinition;
};

const headerLineBreak: ContentCanvas = {
    canvas: [
        {
            type: "line",
            x1: 0, x2: 450, y1: 0, y2: 0,
        }
    ]
};

const jobDataTable = (jobData: InsertJobData | SelectJobData): ContentTable => {
    return {
        table: {
            widths: ["*", "*", "*"],
            body: [
                [
                    {
                        text: "Job Number",
                        style: "tableHeaderCell"
                    },
                    {
                        text: "Date", style: "tableHeaderCell"
                    },
                    {
                        text: "Sales Rep", style: "tableHeaderCell"
                    }
                ],
                [jobData.jobNumber, new Date(jobData.date as number).toISOString(), jobData.salesRep as string]
            ],
        },
        alignment: "center",
        marginTop: 10,
    };
};