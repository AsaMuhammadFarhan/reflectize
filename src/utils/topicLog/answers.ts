export function answersIntoString(array: (boolean | null)[]) {
  if (array.some((a) => a === null))
    throw new Error("Cannot convert null on answersIntoString().");
  const result = array.map((a) => (a ? "1" : "0")).join(""); // [true,false,true] to "101"
  return result;
}
