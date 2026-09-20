type LogLevel = "INFO" | "WARN" | "ERROR";

interface LogPayload {
  message: string;
  context?: string;
  data?: Record<string, unknown>;
  error?: Error | unknown;
}

export class Logger {
  private static formatLog(level: LogLevel, payload: LogPayload) {
    const timestamp = new Date().toISOString();
    return {
      timestamp,
      level,
      context: payload.context || "Application",
      message: payload.message,
      ...(payload.data ? { data: payload.data } : {}),
      ...(payload.error
        ? {
            error:
              payload.error instanceof Error
                ? { message: payload.error.message, stack: payload.error.stack }
                : payload.error,
          }
        : {}),
    };
  }

  static info(message: string, context?: string, data?: Record<string, unknown>) {
    console.log(JSON.stringify(this.formatLog("INFO", { message, context, data })));
  }

  static warn(message: string, context?: string, data?: Record<string, unknown>) {
    console.warn(JSON.stringify(this.formatLog("WARN", { message, context, data })));
  }

  static error(message: string, error?: Error | unknown, context?: string, data?: Record<string, unknown>) {
    console.error(JSON.stringify(this.formatLog("ERROR", { message, context, data, error })));
  }
}
