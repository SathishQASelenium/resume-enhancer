// Import the lib entry directly, not the package root — pdf-parse@1.1.1's
// index.js has a debug guard (based on `module.parent`) that misfires under
// ESM/bundler interop and tries to read its own test fixture off disk.
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import mammoth from "mammoth";

export type ExtractResult = {
  text: string;
  fileName: string;
  fileType: "pdf" | "docx";
};

export class UnsupportedFileError extends Error {}

async function extractPdf(buffer: Buffer): Promise<string> {
  const result = await pdfParse(buffer);
  return result.text;
}

async function extractDocx(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

export async function extractDocument(file: File): Promise<ExtractResult> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const name = file.name.toLowerCase();

  if (name.endsWith(".pdf") || file.type === "application/pdf") {
    const text = await extractPdf(buffer);
    return { text: normalize(text), fileName: file.name, fileType: "pdf" };
  }

  if (
    name.endsWith(".docx") ||
    file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const text = await extractDocx(buffer);
    return { text: normalize(text), fileName: file.name, fileType: "docx" };
  }

  throw new UnsupportedFileError("Only PDF and DOCX resumes are supported.");
}

function normalize(text: string): string {
  return text.replace(/\r\n/g, "\n").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}
