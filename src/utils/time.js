import format from "dayjs";

export function convertTime(time) {
  return format(new Date(time)).format("hh:mm DD/MM/YYYY");
}

export function convertTimeShort(time) {
  return format(new Date(time)).format("hh:mm");
}
