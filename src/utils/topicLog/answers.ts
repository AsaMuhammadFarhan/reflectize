export function answersIntoString(array: (number | null)[]) {
  if (array.some((a) => a === null))
    throw new Error("Cannot convert null on answersIntoString().");
  const result = array.map((a) => a?.toString()).join(""); // [1,0,1] to "101"
  return result;
}
