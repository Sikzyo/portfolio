import { useStore } from "@nanostores/preact";
import { isMenuOpen, closeMenu } from "@stores/uiStore";

interface Link {
  href: string;
  label: string;
}

interface Props {
  links: Link[];
}

export default function NavbarMobile({ links }: Props) {
  const $isMenuOpen = useStore(isMenuOpen);

  const handleOverlayClick = () => {
    closeMenu();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  };

  const handleLinkClick = () => {
    closeMenu();
  };

  return (
    <>
      {/* Overlay */}
      <div
        class={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${$isMenuOpen ? "visible opacity-100" : "pointer-events-none invisible opacity-0"} `}
        onClick={handleOverlayClick}
        onKeyDown={handleKeyDown}
        role="presentation"
        aria-hidden="true"
      />

      {/* Menú slide-in */}
      <nav
        class={`bg-orange-2 fixed top-0 left-0 z-50 h-full w-72 max-w-[80vw] -translate-x-full overflow-y-auto px-6 py-20 shadow-xl transition-transform duration-300 ease-out md:hidden ${$isMenuOpen ? "translate-x-0" : ""} `}
        role="dialog"
        aria-label="Menú de navegación"
        aria-modal="true"
        aria-hidden={!$isMenuOpen}
      >
        <ul class="space-y-4" role="list">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={handleLinkClick}
                class="border-orange-3 text-orange-9 hover:text-orange-7 block border-b py-3 text-lg font-medium transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
