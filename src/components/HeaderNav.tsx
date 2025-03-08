"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

const HeaderNav = () => {
  const [open, setOpen] = useState(false);
  const user = useAppSelector((state) => state.value);
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // useEffect(() => {
  //   if (user.role === "student" && !pathname.includes('applicant')) {
  //     router.push('/applicant')
  //   } else if (user.role === "admin" && !pathname.includes('admin')) {
  //     router.push("/admin")
  //   } else if (user.role === "tutor" && !pathname.includes('tutor')) {
  //     router.push('/tutor')
  //   }
  // }, [])
  return (
    <nav className="bg-background shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex ">
          {/* Logo */}
          <Image
            src="/images/icons/logo.png"
            width={100}
            height={100}
            alt="logo"
          />
          <Link
            href="/"
            className="flex items-center text-primary font-bold font-sans text-lg"
          >
            <span className="mr-2 text-2xl">EXPERTHUB</span>
          </Link>
        </div>

        {/* Centered Links */}
        <div className="hidden md:flex space-x-6 items-center mx-auto">
          <Link href="/" className="hover:text-yellow-500">
            Home
          </Link>
          <Link href="/my-business" className="hover:text-yellow-500">
            My Business
          </Link>
          <Link href="/workspaces" className="hover:text-yellow-500">
            Workspaces
          </Link>
          <Link href="/add-workspace" className="hover:text-yellow-500">
            Add Workspace
          </Link>
        </div>

        {/* Right Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link
            href="/auth/signup"
            className="px-4 py-2 border border-black rounded hover:bg-gray-100"
          >
            Register
          </Link>
          <Link
            href="/auth/login"
            className="px-4 py-2 bg-primary text-white rounded hover:bg-yellow-600"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col justify-start space-y-4 py-4 px-4">
            <li>
              <Link href="/" onClick={toggleMobileMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/my-business" onClick={toggleMobileMenu}>
                My Business
              </Link>
            </li>
            <li>
              <Link href="/workspaces" onClick={toggleMobileMenu}>
                Workspaces
              </Link>
            </li>
            <li>
              <Link href="/add-workspace" onClick={toggleMobileMenu}>
                Add Workspace
              </Link>
            </li>
            {/* Buttons in a flex row */}
            <li className="flex justify-start space-x-4">
              <Link
                href="/auth/signup"
                className="px-4 py-2 border border-black rounded hover:bg-gray-100"
                onClick={toggleMobileMenu}
              >
                Register
              </Link>
              <Link
                href="/auth/login"
                className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary"
                onClick={toggleMobileMenu}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default HeaderNav;
