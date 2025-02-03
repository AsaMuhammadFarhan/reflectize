export function getRouterQueryAsString(input: string | string[] | undefined) {
  if (typeof input === "string") return input;
  return "";
}