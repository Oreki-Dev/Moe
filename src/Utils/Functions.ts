export const function ReplaceHtml(str) {
  if ((str === null) || (str === '')) return str;
  return str.replace( /(<([^>]+)>)/ig, '');
};