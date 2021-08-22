export const prettify = (
  value: string | object,
  format: 'json' | 'text',
): string => {
  if (format === 'json') {
    if (typeof value === 'string') {
      value = JSON.parse(value);
    }

    return JSON.stringify(value, undefined, 2);
  } else if (format === 'text') {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }

    return value;
  } else {
    throw Error(`Invalid format: ${format}, value: ${value}`);
  }
};
