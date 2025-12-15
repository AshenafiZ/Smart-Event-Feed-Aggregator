/**
 * cn() - ClassName utility for Tailwind CSS + React (JavaScript)
 * Combines clsx + twMerge for conditional Tailwind classes
 */
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
