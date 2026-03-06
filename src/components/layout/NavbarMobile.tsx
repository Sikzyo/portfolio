import { useStore } from "@nanostores/react";
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

  const handleLinkClick = () => {
    closeMenu();
  };

  return (
    <nav
      className={`from-orange-1/75 to-blue-3/75 fixed top-0 left-0 z-10 h-full w-full -translate-x-full bg-linear-to-b px-6 pt-25 pb-6 backdrop-blur-sm transition-transform duration-300 ease-out md:hidden ${$isMenuOpen ? "translate-x-0" : ""} `}
      role="dialog"
      aria-label="Menú de navegación"
      aria-modal="true"
      inert={!$isMenuOpen}
    >
      <ul className="flex flex-col gap-4" role="list">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={handleLinkClick}
              className="text-orange-9 font-manrope flex min-h-11 items-center text-2xl font-bold"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
