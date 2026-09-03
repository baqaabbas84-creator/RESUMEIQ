const { extractTextFromFile } = require("./textExtractor");

const filePath =
  "./uploads/1787327716361-363768596.docx";

const mimetype =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const testExtraction = async () => {
  try {
    console.log("Starting resume text extraction...");

    const text = await extractTextFromFile(
      filePath,
      mimetype
    );

    console.log(
      "\n========== EXTRACTED RESUME TEXT ==========\n"
    );

    console.log(text);

    console.log(
      "\n===========================================\n"
    );

    console.log(
      "Characters extracted:",
      text.length
    );

  } catch (error) {
    console.error(
      "Extraction failed:",
      error.message
    );
  }
};

testExtraction();