// enum-utils.ts
export function enumValues<T extends object>(enumObj: T): string[] {
  return Object.values(enumObj).filter(v => typeof v === 'string') as string[];
}
