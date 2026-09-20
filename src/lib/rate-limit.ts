import { NextResponse } from "next/server";

interface RateLimitStore {
  [ip: string]: {
    tokens: number;
    lastRefill: number;
  };
}

const store: RateLimitStore = {};

export interface RateLimitConfig {
  limit: number;      // Maximum requests allowed in interval
  windowMs: number;   // Window time in milliseconds
}

export function rateLimit(ip: string, config: RateLimitConfig = { limit: 10, windowMs: 60 * 1000 }) {
  const now = Date.now();
  const userStore = store[ip] || { tokens: config.limit, lastRefill: now };

  // Refill tokens based on elapsed time
  const timePassed = now - userStore.lastRefill;
  const tokensToAdd = Math.floor((timePassed / config.windowMs) * config.limit);

  if (tokensToAdd > 0) {
    userStore.tokens = Math.min(config.limit, userStore.tokens + tokensToAdd);
    userStore.lastRefill = now;
  }

  if (userStore.tokens > 0) {
    userStore.tokens -= 1;
    store[ip] = userStore;
    return { success: true, remaining: userStore.tokens };
  }

  store[ip] = userStore;
  return { success: false, remaining: 0 };
}

export function rateLimitResponse() {
  return NextResponse.json(
    {
      error: "Too Many Requests",
      message: "Bạn đã thao tác quá nhanh. Vui lòng thử lại sau ít phút!",
    },
    {
      status: 429,
      headers: {
        "Retry-After": "60",
        "X-RateLimit-Limit": "10",
      },
    }
  );
}
