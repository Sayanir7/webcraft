import { useState } from "react";
import { Link } from "react-router-dom";
import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from "@headlessui/react";
import {
  ArrowRightEndOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import useSignOut from "../hooks/useSignOut";
import ProfileCard from "./ProfileCard";
import WebCraftLogo from "./WebCraftLogo";

const navigation = [
  { name: "Chat", href: "/new" },
  { name: "Templates", href: "/#templates" },
  { name: "Pricing", href: "/#pricing" },
];

function Header({ chatTitle }) {
  const [isProfileCardVisible, setIsProfileCardVisible] = useState(false);
  const { handleSignout } = useSignOut();
  const { currentUser } = useSelector((state) => state.user);

  const toggleProfileCard = () => {
    setIsProfileCardVisible(!isProfileCardVisible);
  };

  return (
    <Disclosure as="nav" className="bg-primary border-b border-border/40">
      {({ open }) => (
        <>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo and Navigation */}
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <WebCraftLogo />
                </div>
                <div className="hidden lg:ml-8 lg:flex lg:items-center lg:space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="px-3 py-2 text-sm font-medium text-secondary_text hover:text-primary_text hover:bg-tertiary/50 rounded-md transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Chat Title (if exists) */}
              {chatTitle && (
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <h3 className="text-primary_text font-semibold text-lg truncate max-w-[250px]">
                    {chatTitle}
                  </h3>
                </div>
              )}

              {/* Profile or Sign-In */}
              <div className="flex items-center gap-4">
                {currentUser ? (
                  <div className="relative flex items-center gap-2">
                    <button
                      onClick={handleSignout}
                      className="p-2 text-secondary_text hover:text-accent transition-colors duration-200"
                      aria-label="Sign Out"
                    >
                      <ArrowRightEndOnRectangleIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={toggleProfileCard}
                      className="flex items-center gap-2 p-1 rounded-full ring-2 ring-border hover:ring-accent transition-all duration-200"
                    >
                      <img
                        src={currentUser.profilePicture || "/userphoto.jpg"}
                        alt="Profile"
                        referrerPolicy="no-referrer"
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    </button>
                    <Transition
                      show={isProfileCardVisible}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-150"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <div className="absolute top-12 right-0 mt-2 origin-top-right z-10">
                        <ProfileCard />
                      </div>
                    </Transition>
                  </div>
                ) : (
                  <Link to="/sign-in">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-accent hover:bg-hover_accent rounded-md transition-colors duration-200">
                      Sign In
                    </button>
                  </Link>
                )}

                {/* Mobile menu button */}
                <div className="lg:hidden">
                  <DisclosureButton className="p-2 text-secondary_text hover:text-primary_text hover:bg-tertiary/50 rounded-md">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="h-6 w-6" />
                    ) : (
                      <Bars3Icon className="h-6 w-6" />
                    )}
                  </DisclosureButton>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <DisclosurePanel className="lg:hidden border-t border-border/40">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-secondary_text hover:text-primary_text hover:bg-tertiary/50 rounded-md"
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}

export default Header;