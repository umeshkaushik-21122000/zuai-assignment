import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

// Set the worker source for pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@4.5.136/legacy/build/pdf.worker.min.mjs";

// Define a type for the file input
type FileInput = File | Blob;

export async function countWordsInPDF(file: FileInput): Promise<number> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item: any) => item.str).join(" ");
  }

  return text.trim().split(/\s+/).length;
}

export async function extractFirstPageTextFromPDF(file: FileInput): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const page = await pdf.getPage(1);
  const content = await page.getTextContent();

  return content.items.map((item: any) => item.str).join(" ").trim();
}

export async function getAllPagesAsImages(file: FileInput): Promise<string[]> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const images: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1 });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (context) {
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      await page.render(renderContext).promise;

      images.push(canvas.toDataURL("image/png"));
    }
  }

  return images;
}

export function truncateString(str: string, length: number): string {
  return str.length > length ? str.slice(0, length) + "..." : str;
}

export function getFormattedDate(): string {
  const today = new Date();
  const day = today.getDate();
  const monthIndex = today.getMonth();
  const year = today.getFullYear();

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  return `${day.toString().padStart(2, '0')} ${months[monthIndex]} ${year}`;
}
