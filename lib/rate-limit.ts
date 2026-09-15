const submissions = new Map<string, number[]>();

export function checkRateLimit(
  ip: string,
  limit = 5,
  windowMs = 60_000
): boolean {
  const now = Date.now();
  const timestamps = (submissions.get(ip) ?? []).filter(
    (t) => now - t < windowMs
  );
  if (timestamps.length >= limit) return false;
  timestamps.push(now);
  submissions.set(ip, timestamps);
  return true;
}
