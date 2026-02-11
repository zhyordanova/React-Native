import { parseError } from "./errorHandler";

export function throwParsedError(error) {
  const errorInfo = parseError(error);
  const err = new Error(errorInfo.message);
  err.type = errorInfo.type;
  err.retry = errorInfo.retry;
  throw err;
}
