const message = "ReLoop - Turn Waste Into Opportunity";

// Convert text into a Buffer
const buffer = Buffer.from(message);

console.log("Original message:");
console.log(message);

console.log("\nBuffer:");
console.log(buffer);

console.log("\nBuffer converted back to text:");
console.log(buffer.toString());