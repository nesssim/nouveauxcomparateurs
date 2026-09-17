const submissions = new Map<string, { timestamps: number[]; blocked: boolean }>();

const CLEANUP_INTERVAL_MS = 5 * 60_000;
const BLOCK_DURATION_MS = 15 * 60_000;
const MAX_SUBMISSIONS = 3;
const WINDOW_MS = 60_000;
const BLOCK_THRESHOLD = 5;
const MAX_ENTRIES = 10_000;

let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [ip, data] of submissions) {
    const recentTimestamps = data.timestamps.filter(
      (t) => now - t < BLOCK_DURATION_MS
    );
    if (recentTimestamps.length === 0) {
      submissions.delete(ip);
    } else {
      data.timestamps = recentTimestamps;
    }
  }

  if (submissions.size > MAX_ENTRIES) {
    const entries = [...submissions.entries()]
      .sort((a, b) => Math.min(...a[1].timestamps) - Math.min(...b[1].timestamps));
    const toDelete = entries.slice(0, entries.length - MAX_ENTRIES);
    for (const [ip] of toDelete) {
      submissions.delete(ip);
    }
  }
}

export function checkRateLimit(ip: string): {
  allowed: boolean;
  retryAfter?: number;
} {
  cleanup();

  const now = Date.now();
  const entry = submissions.get(ip) ?? { timestamps: [], blocked: false };

  if (entry.blocked) {
    const oldestInBlock = Math.min(...entry.timestamps);
    const retryAfter = Math.ceil(
      (oldestInBlock + BLOCK_DURATION_MS - now) / 1000
    );
    if (retryAfter > 0) {
      submissions.set(ip, entry);
      return { allowed: false, retryAfter };
    }
    entry.blocked = false;
    entry.timestamps = [];
  }

  const recentTimestamps = entry.timestamps.filter(
    (t) => now - t < WINDOW_MS
  );

  if (recentTimestamps.length >= MAX_SUBMISSIONS) {
    entry.timestamps.push(now);
    entry.blocked = true;
    submissions.set(ip, entry);
    return { allowed: false, retryAfter: Math.ceil(BLOCK_DURATION_MS / 1000) };
  }

  if (recentTimestamps.length >= BLOCK_THRESHOLD) {
    entry.timestamps.push(now);
    entry.blocked = true;
    submissions.set(ip, entry);
    return { allowed: false, retryAfter: Math.ceil(BLOCK_DURATION_MS / 1000) };
  }

  entry.timestamps.push(now);
  submissions.set(ip, entry);
  return { allowed: true };
}

export function getRateLimitInfo(ip: string): {
  remaining: number;
  resetIn: number;
} {
  const now = Date.now();
  const entry = submissions.get(ip);
  if (!entry) return { remaining: MAX_SUBMISSIONS, resetIn: 0 };

  const recentTimestamps = entry.timestamps.filter(
    (t) => now - t < WINDOW_MS
  );
  const oldest = Math.min(...recentTimestamps, now);
  const resetIn = Math.max(0, Math.ceil((oldest + WINDOW_MS - now) / 1000));

  return {
    remaining: Math.max(0, MAX_SUBMISSIONS - recentTimestamps.length),
    resetIn,
  };
}
