import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNameFirstLetters(...names: string[]) {
  let result = '';
  for (let name of names) {
    if (name.length > 0) {
      result += name.at(0)!;
    }
  }
  return result.toUpperCase();
}
