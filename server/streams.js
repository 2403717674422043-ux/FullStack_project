const fs = require("fs");

const fileName = "reloop-info.txt";

// Create a readable stream
const readStream = fs.createReadStream(fileName, "utf8");

console.log("Reading ReLoop information...\n");

// Read the file in chunks
readStream.on("data", (chunk) => {
  console.log("Received data:");
  console.log(chunk);
});

// When reading is complete
readStream.on("end", () => {
  console.log("\nFinished reading the file.");
});

// Handle errors
readStream.on("error", (error) => {
  console.log("Error:", error.message);
});