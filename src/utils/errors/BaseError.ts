export interface BaseError extends Error {
  statusCode: number;
  errors?: string[];
}
