"use client";
import React from 'react';

// Hooks
import { usePathname } from 'next/navigation';

//Components
import { Nav, Navbar } from 'react-bootstrap';
import OffcanvasPanel from './Modal/OffcanvasPanel';

// Icons
import { List } from "react-bootstrap-icons"

// Next
import Link from 'next/link';
import Image from 'next/image';

const NavBar = () => {
  const pathname = usePathname(); 

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/transaction", label: "Transações" },
    { href: "/signature", label: "Assinatura" },
  ]

  return (
    <Navbar expand="md" bg="transparent"  data-bs-theme="dark">
    <div className='navbar-container w-100 px-4'>
      {/* Brand Logo */}
      <Navbar.Brand className="d-flex align-items-center gap-3">
        <Image src="/images/favicon.png" width={32} height={30} alt="logo" />
        <Link href="/dashboard" className="h2 text-decoration-none">
          finance.ai
        </Link>
      </Navbar.Brand>

      {/* Navbar Toggle Button */}
      <Navbar.Toggle aria-controls="basic-navbar-nav">
        <List size={30} />
      </Navbar.Toggle>

      {/* Collapsible Menu */}
      <Navbar.Collapse id="basic-navbar-nav" >
        <Nav className="me-auto mx-5">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${
                pathname === href ? "nav-link-active" : ""
              } nav-link`}
            >
              {label}
            </Link>
          ))}
        </Nav>
        <OffcanvasPanel />
      </Navbar.Collapse>
    </div>
  </Navbar>
  )
}

export default NavBar
