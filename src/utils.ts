function assertNonNullable<T>(
  name: string,
  value: T | null | undefined
): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error(`Required variable "${name}" was null.`);
  }
}

export { assertNonNullable };
