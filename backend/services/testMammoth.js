const fs = require("fs");
const mammoth = require("mammoth");

const filePath = "./uploads/1787326666704-666778163.docx";

const test = async () => {
  try {
    const buffer = fs.readFileSync(filePath);

    console.log("File size:", buffer.length, "bytes");
    console.log("Starting Mammoth extraction...");

    const result = await mammoth.extractRawText({
      buffer
    });

    console.log("\n========== MAMMOTH TEXT ==========\n");
    console.log(result.value);
    console.log("\n==================================\n");

    console.log(
      "Characters extracted:",
      result.value.trim().length
    );

    if (result.messages.length > 0) {
      console.log("\nMammoth messages:");
      console.log(result.messages);
    }
  } catch (error) {
    console.error("Extraction failed:");
    console.error(error);
  }
};

test();