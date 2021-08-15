enum errorType {
  ARRAY = 'array',
  DATE = 'date string',
  NUMBER = 'number',
  OBJECT = 'object',
  STRING = 'string',
}

const isString = (value: unknown): value is string => {
  return typeof value === 'string';
}

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
}

const isNumber = (value: unknown): value is number => {
  return typeof value === 'number';
}

const getStringError = (value: unknown, type: errorType) => {
  return `Parsing error - value should be of type: "${type}", got "${String(value)}".`;
}

export const parseObject = (value: unknown): Record<string, unknown> => {
  if (isObject(value)) {
    return value;
  }

  throw new Error(getStringError(value, errorType.OBJECT));
}

export const parseNumber = (value: unknown): number => {
  if (!isNumber(value)) {
    throw new Error(getStringError(value, errorType.NUMBER));
  }

  return value;
}

export const parseString = (value: unknown): string => {
  if (!isString(value)) {
    throw new Error(getStringError(value, errorType.STRING));
  }

  return value;
}