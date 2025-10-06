export function add(numbers: string): number {
  if (numbers === "") return 0;

  // Convert literal "\n" to actual newline
  numbers = numbers.replace(/\\n/g, "\n");

  let delimiter: RegExp = /[\n,]/;
  let numString = numbers;

  if (numbers.startsWith("//")) {
    const parts = numbers.split("\n");
    if (parts.length < 2) {
      return 0; // No numbers after delimiter, sum = 0
    }
    let custom = parts[0].slice(2);

    // Escape special regex characters in custom delimiter
    custom = custom.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Allow custom delimiter AND newline as separators
    delimiter = new RegExp(`${custom}|\n`);
    numString = parts.slice(1).join("\n"); // in case multiple lines
  }

  const numArray = numString.split(delimiter).map(Number);

  const negatives = numArray.filter(n => n < 0);
  if (negatives.length > 0) {
    throw new Error(`negative numbers not allowed ${negatives.join(",")}`);
  }

  return numArray.reduce((a, b) => a + b, 0);
}
