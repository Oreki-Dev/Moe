export function ReplaceHtml(str: string) {
  if (str === null || str === "") return str;
  return str.replace(/(<([^>]+)>)/gi, "");
}
