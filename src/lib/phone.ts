export function normalizeBurkinaPhone(phone: string): string {
  let normalized = phone.replace(/[\s\-().+]/g, "");

  if (normalized.startsWith("00226")) {
    normalized = `226${normalized.slice(5)}`;
  }

  if (/^\d{8}$/.test(normalized)) {
    normalized = `226${normalized}`;
  }

  return normalized;
}
