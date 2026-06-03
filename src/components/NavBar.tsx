import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import yncnLogo from '@/assets/images/yncn-logo.png';

const navItems = [
  { label: 'Our Partners', href: '/partners' },
  {
    label: 'Events',
    children: [
      { label: 'Event Calendar', href: '/events' },
      { label: 'Event Signup', href: 'https://forms.yourenext.ca', external: true },
    ],
  },
  {
    label: 'Career Fair',
    children: [
      { label: 'About the Fair', href: '/cf/about' },
      { label: 'Company List', href: '/cf/companies' },
      { label: 'Venue Map', href: 'https://maps.yourenext.ca', external: true },
    ],
  },
  { label: 'Resources', href: '/resources' },
  {
    label: 'About Us',
    children: [
      { label: 'Who We Are', href: '/about' },
      { label: 'Our Team', href: '/team' },
    ],
  },
  { label: 'Contact Us', href: '/contact' },
  { label: "I'm an Employer", href: '/employers', highlight: true },
];

function Dropdown({ label, children }: { label: string; children: { label: string; href: string; external?: boolean }[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

    useEffect(() => {
    if (!menuRef.current) return;
    if (open) {
      gsap.fromTo(menuRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }
      );
    } else {
      gsap.to(menuRef.current,
        { opacity: 0, y: -8, duration: 0.15, ease: 'power2.in' }
      );
    }
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={cn(
          'flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-lg',
          open ? 'text-brand-teal bg-brand-yellow' : 'text-neutral-700 hover:text-brand-teal hover:bg-brand-yellow'
        )}
      >
        {label}
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', open && 'rotate-180')} />
      </button>

      <div
        ref={menuRef}
        style={{ opacity: 0, pointerEvents: open ? 'auto' : 'none' }}
        className="absolute top-full left-0 mt-1 min-w-44 rounded-xl border border-neutral-200 bg-white shadow-lg py-1 z-50"
      >
        {children.map(item => (
          
            <a key={item.href}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
            className="block px-4 py-2 text-sm text-neutral-600 hover:bg-brand-yellow hover:text-brand-teal transition-colors"
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -64,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    });
  }, { scope: navRef });

  return (
    <nav ref={navRef} className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md">
      <div className="flex h-16 w-full items-center justify-between px-6">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 flex-shrink-0">
          <img src={yncnLogo} alt="YNCN" className="h-8 w-auto" />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-base font-bold tracking-wide text-neutral-800">YOU'RE NEXT</span>
            <span className="text-md text-neutral-500">career network</span>
          </div>
        </NavLink>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map(item =>
            item.children ? (
              <Dropdown key={item.label} label={item.label} children={item.children} />
            ) : (
              <NavLink
                key={item.href}
                to={item.href!}
                className={({ isActive }) =>
                  cn(
                    'px-3 py-2 text-sm font-medium transition-colors rounded-lg',
                    item.highlight
                      ? 'bg-brand-teal text-white hover:bg-brand-teal/80 ml-2'
                      : isActive
                        ? 'text-brand-teal bg-brand-yellow font-semibold'
                        : 'text-neutral-700 hover:text-brand-teal hover:bg-brand-yellow'
                  )
                }
              >
                {item.label}
              </NavLink>
            )
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
          onClick={() => setMobileOpen(o => !o)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white px-6 py-4 flex flex-col gap-1">
          {navItems.map(item =>
            item.children ? (
              <div key={item.label}>
                <p className="px-3 py-1.5 text-sm text-brand-teal font-semibold uppercase tracking-wider">{item.label}</p>
                {item.children.map(child => (
                  <a
                    key={child.href}
                    href={child.href}
                    target={child.external ? '_blank' : undefined}
                    rel={child.external ? 'noopener noreferrer' : undefined}
                    className="block px-10 py-2 text-sm text-neutral-600 hover:bg-brand-yellow hover:text-brand-teal transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.label}
                  </a>
                ))}
              </div>
            ) : (
              <NavLink
                key={item.href}
                to={item.href!}
                className={({ isActive }) =>
                  cn(
                    'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    item.highlight ? 'bg-brand-teal text-white mt-2 hover:bg-brand-teal/80' : isActive ? 'bg-brand-yellow text-brand-teal font-semibold' : 'text-neutral-700 hover:text-brand-teal hover:bg-brand-yellow'
                  )
                }
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </NavLink>
            )
          )}
        </div>
      )}
    </nav>
  );
}