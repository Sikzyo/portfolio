import { useStore } from "@nanostores/react";
import { isMenuOpen, toggleMenu } from "@stores/uiStore";
import { HamburgerMenuIcon, Cross2Icon } from "@radix-ui/react-icons";

export default function HamburgerButton() {
  const $isMenuOpen = useStore(isMenuOpen);

  return (
    <button
      onClick={toggleMenu}
      className="bg-orange-2/75 text-orange-9 relative z-10 flex min-h-11 min-w-11 items-center justify-center rounded-lg backdrop-blur-sm md:hidden"
      aria-label={$isMenuOpen ? "Cerrar menú" : "Abrir menú"}
      aria-expanded={$isMenuOpen}
      aria-controls="mobile-nav"
      type="button"
    >
      <span className="sr-only">Menú</span>
      <div className="text-orange-9 relative h-4 w-4">
        <HamburgerMenuIcon
          className={`absolute inset-0 transition-all duration-300 ${
            $isMenuOpen ? "scale-50 opacity-0" : "scale-100 opacity-100"
          }`}
        />
        <Cross2Icon
          className={`absolute inset-0 transition-all duration-300 ${
            $isMenuOpen ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        />
      </div>
    </button>
  );
}
