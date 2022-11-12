import format from "dayjs";

export function convertTimeFirebase(time) {
  return format(new Date(Number(time))).format("MM/DD/YYYY");
}
