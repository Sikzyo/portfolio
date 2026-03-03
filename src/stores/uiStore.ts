import { atom } from "nanostores";

export const isMenuOpen = atom(false);

export function toggleMenu() {
  isMenuOpen.set(!isMenuOpen.get());
}

export function closeMenu() {
  isMenuOpen.set(false);
}

export function openMenu() {
  isMenuOpen.set(true);
}
