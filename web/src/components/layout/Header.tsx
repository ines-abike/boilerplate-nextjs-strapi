"use client";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { FiChevronDown, FiLogOut, FiKey, FiTrash2 } from "react-icons/fi";
import Image from "next/image";

export default function Header() {
  return (
    <div className="w-full bg-white px-12 py-6 border-b border-gray-100 flex items-center justify-between">
      <Image src="/logo.svg" alt="Logo" width={100} height={100} />

      <Menu as="div" className="relative">
        <MenuButton className="flex items-center gap-2 cursor-pointer">
         <Image src="/images/avatar.png" alt="User" width={32} height={32} />
          <span className="text-xs text-black-300">
            reservation@lheritage105.com
          </span>
          <FiChevronDown size={14} className="text-black-200" />
        </MenuButton>

        <MenuItems className="absolute right-0 mt-2 w-52 bg-white border border-gray-100 rounded-xl shadow-lg z-50 py-1 focus:outline-none">
          <MenuItem
            as="button"
            className={({ active }) =>
              `flex items-center gap-2 w-full px-4 py-2 text-sm text-black-400 ${active ? "bg-gray-50" : ""}`
            }
          >
            <FiLogOut size={14} />
            Se déconnecter
          </MenuItem>

          <MenuItem
            as="button"
            className={({ active }) =>
              `flex items-center text-nowrap gap-2 w-full px-4 py-2 text-sm text-black-400 ${active ? "bg-gray-50" : ""}`
            }
          >
            <FiKey size={14} />
            Modifier le mot de passe
          </MenuItem>

          <MenuItem
            as="button"
            className={({ active }) =>
              `flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 ${active ? "bg-gray-50" : ""}`
            }
          >
            <FiTrash2 size={14} />
            Supprimer le compte
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}
