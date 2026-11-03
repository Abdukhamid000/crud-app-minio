import { QueryFailedError } from 'typeorm';

export function isUniqueViolation(err: unknown) {
  return err instanceof QueryFailedError && err.driverError?.code === '23505';
}
