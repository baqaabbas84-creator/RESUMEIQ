const fs = require("fs");
const path = require("path");
const { PDFParse } = require("pdf-parse");
const mammoth = require("mammoth");

const extractTextFromFile = async (filePath, mimetype) => {
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error("Uploaded file not found.");
  }

  const fileBuffer = fs.readFileSync(absolutePath);

  // PDF
  if (mimetype === "application/pdf") {
    const parser = new PDFParse({
      data: fileBuffer
    });

    try {
      const result = await parser.getText();

      return result.text.trim();
    } finally {
      await parser.destroy();
    }
  }

  // DOCX
  if (
    mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({
      buffer: fileBuffer
    });

    return result.value.trim();
  }

  throw new Error("Unsupported file type.");
};

module.exports = {
  extractTextFromFile
};