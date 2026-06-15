export function formatRupiah(number) {
  if (!number && number !== 0) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style:    "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
}

export function formatDate(datetime) {
  if (!datetime) return "-";
  const date = new Date(datetime);
  return new Intl.DateTimeFormat("id-ID", {
    day:   "numeric",
    month: "long",
    year:  "numeric",
  }).format(date);
}

export function formatTime(datetime) {
  if (!datetime) return "-";
  const date = new Date(datetime);
  return new Intl.DateTimeFormat("id-ID", {
    hour:   "2-digit",
    minute: "2-digit",
  }).format(date) + " WIB";
}

export function formatDateTime(datetime) {
  if (!datetime) return "-";
  return `${formatDate(datetime)}, ${formatTime(datetime)}`;
}