// import {Navbar} from 'flowbite-react';
import {Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle} from "flowbite-react";

export default function NavbarComponent() {
    return (
      <div className="container mx-auto">
        <Navbar fluid className="px-4">
            <NavbarBrand as={'a'} href="/">

                <span
                    className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">RouteShaper</span>
            </NavbarBrand>
            <NavbarToggle/>
            <NavbarCollapse>
                <NavbarLink href="/" active>
                    Home
                </NavbarLink>
                <NavbarLink as={'a'} href="/#about">
                    About
                </NavbarLink>
                <NavbarLink as={'a'} href="/#contact">Contact</NavbarLink>
                <NavbarLink as={'a'} href="/dashboard/">Solver</NavbarLink>
            </NavbarCollapse>
        </Navbar>
      </div>
    );
}
