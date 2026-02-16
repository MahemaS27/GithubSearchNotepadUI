


export function convertToReadableString(dateString:string):string {
const date = new Date(dateString);
const formatted = date.toLocaleDateString('en-US');
return formatted
}