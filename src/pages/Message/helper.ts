import * as signUtil from 'eth-sig-util';

export const easyCheckMessageHash = (
  messageHash: string | undefined,
): boolean => {
  if (
    typeof messageHash === 'string' &&
    messageHash.startsWith('0x') &&
    messageHash.length === 66
  ) {
    try {
      return Buffer.from(messageHash.slice(2), 'hex').length === 32;
    } catch (e) {
      console.error(e);
    }
  }

  return false;
};

export const easyCheckSignature = (signature: string | undefined): boolean => {
  if (
    typeof signature == 'string' &&
    signature.startsWith('0x') &&
    signature.length === 132
  ) {
    try {
      return Buffer.from(signature.slice(2), 'hex').length === 65;
    } catch (e) {
      console.error(e);
    }
  }

  return false;
};

export const easyCheckLegacyEIP712Struct = (value: string | undefined) => {
  if (
    typeof value === 'string' &&
    value.startsWith('[') &&
    value.endsWith(']')
  ) {
    try {
      const struct = JSON.parse(value);
      if (Array.isArray(struct)) {
        return struct.every(
          (i: any) =>
            typeof i === 'object' &&
            typeof i.type === 'string' &&
            typeof i.name == 'string' &&
            i.value !== undefined,
        );
      }
    } catch (e) {
      console.error(e);
    }
  }
  return false;
};

export const easyCheckStandardEIP712Struct = (value: string | undefined) => {
  if (
    typeof value === 'string' &&
    value.startsWith('{') &&
    value.endsWith('}')
  ) {
    try {
      const struct = JSON.parse(value);
      if (typeof struct === 'object') {
        return signUtil.TYPED_MESSAGE_SCHEMA.required.every((i) => !!struct[i]);
      }
    } catch (e) {
      console.error(e);
    }
  }
  return false;
};

export const stringifyProviderError = (error: any): string => {
  const errorType = typeof error;
  if (errorType === 'undefined') {
    return 'Something wrong';
  } else if (errorType === 'string') {
    return error;
  } else if (errorType === 'object' && typeof error.message === 'string') {
    return error.message;
  } else if (errorType === 'object' && error.data) {
    return JSON.stringify(error.data);
  } else {
    return JSON.stringify(error);
  }
};
