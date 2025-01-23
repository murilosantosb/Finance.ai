"use client";
import React from 'react';

// Hooks
import { usePathname } from 'next/navigation';

//Components
import { Nav, Navbar } from 'react-bootstrap';
import OffcanvasPanel from './Modal/OffcanvasPanel';

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
    <Navbar bg="transparent" data-bs-theme="dark">
        <nav className='navbar-container'>
          <Navbar.Brand className='d-flex align-items-center gap-3'>
            <Image src="/images/favicon.png" width={32} height={30} alt='logo'/>
            <Link href="/dashboard" className='h2 text-decoration-none'>finance.ai</Link>
          </Navbar.Brand>
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
        </nav>
      </Navbar>
  )
}

export default NavBar