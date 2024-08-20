"use client";
import { signOutAction } from "@/utils/actions";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TNavprops = {
  session: Session | null;
};
type TLinks = { name: string; href: string; current: boolean }[];

const navigation = [
  { name: "Dashboard", href: "/home/dashboard", current: true },
  { name: "Team", href: "/home/users", current: false },
  { name: "Calendar", href: "/home/calender", current: false },
];

const navigationLogOut = [
  { name: "Home", href: "/", current: true },
  { name: "Signup", href: "/auth/singup", current: false },
  { name: "Login", href: "/auth/singin", current: false },
];

export default function NavBar({ session }: TNavprops) {
  const pathname = usePathname();

  const linkRender = (nav: TLinks) =>
    nav.map((item) => (
      <Link
        key={item.name}
        href={item.href}
        aria-current={item.current ? "page" : undefined}
        className={`rounded-md px-3 py-2 text-sm font-medium
          ${
            pathname === item.href
              ? "bg-gray-800 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }
        `}
      >
        {item.name}
      </Link>
    ));

  const LinkRenderSm = (nav: TLinks) =>
    nav.map((item) => (
      <DisclosureButton
        key={item.name}
        as="a"
        href={item.href}
        aria-current={item.current ? "page" : undefined}
        className={`block rounded-md px-3 py-2 text-base font-medium"
         ${
           pathname === item.href
             ? "bg-gray-900 text-white"
             : "text-gray-300 hover:bg-gray-700 hover:text-white"
         }`}
      >
        {item.name}
      </DisclosureButton>
    ));

  return (
    <Disclosure
      as="nav"
      className="bg-transparent shadow-sm border-b-2 border-indigo-500"
    >
      <div className="max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden "
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-1 items-center">
              <Image
                alt="Your Company"
                src="/logo.webp"
                className="h-8 w-auto rounded-lg"
                width={400}
                height={200}
              />
              <span className="text-sm ml-1 italic font-semibold logoColor">
                TaskFlow
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {session?.user
                  ? linkRender(navigation)
                  : linkRender(navigationLogOut)}
              </div>
            </div>
          </div>
          {session?.user && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Link
                href="/home/notifcations"
                className="relative rounded-full bg-transparent p-1 text-gray-400 hover:text-white "
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="h-6 w-6 " />
              </Link>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-transparent text-sm ">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <Image
                      src="/avi.svg"
                      alt=""
                      className="h-8 w-8 rounded-full"
                      width={20}
                      height={20}
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <Link
                      href="/home/profile"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 border-b-2"
                    >
                      Your Profile
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={async () => await signOutAction()}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          )}
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {session?.user
            ? LinkRenderSm(navigation)
            : LinkRenderSm(navigationLogOut)}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
