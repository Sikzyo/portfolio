import { useStore } from "@nanostores/preact";
import { isMenuOpen, toggleMenu } from "@stores/uiStore";

export default function HamburgerButton() {
  const $isMenuOpen = useStore(isMenuOpen);

  return (
    <button
      onClick={toggleMenu}
      class="relative z-50 p-2 md:hidden"
      aria-label={$isMenuOpen ? "Cerrar menú" : "Abrir menú"}
      aria-expanded={$isMenuOpen}
      aria-controls="mobile-nav"
      type="button"
    >
      <span class="sr-only">Menú</span>
      <svg
        class="stroke-orange-9 h-6 w-6 transition-transform duration-300"
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
      >
        <path
          d="M4 6h16M4 12h16M4 18h16"
          class={`hamburger-icon transition-opacity duration-300 ${$isMenuOpen ? "opacity-0" : "opacity-100"}`}
        />
        <path
          d="M6 6l12 12M6 18L18 6"
          class={`close-icon transition-opacity duration-300 ${$isMenuOpen ? "opacity-100" : "opacity-0"}`}
        />
      </svg>
    </button>
  );
}
