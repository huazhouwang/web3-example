export const prettify = (value: string, format: string): string => {
  format = format.toLowerCase();

  try {
    if (format === 'json') {
      return JSON.stringify(JSON.parse(value), undefined, 2);
    }
  } catch {
    // ignored
  }

  return value;
};
