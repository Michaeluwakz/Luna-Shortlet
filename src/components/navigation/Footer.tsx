
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container py-12 max-w-screen-2xl bg-gradient-to-r from-black to-white text-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-gray-200">
              Discover your perfect getaway with Luna Shortlets. Luxury stays, unforgettable experiences in Nigeria.
            </p>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold text-primary">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/" className="text-sm text-gray-200 hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/properties" className="text-sm text-gray-200 hover:text-primary transition-colors">Properties</Link></li>
              <li><Link href="/admin/login" className="text-sm text-gray-200 hover:text-primary transition-colors">Admin Login</Link></li>
            </ul>
          </div>
          <div className="ml-[-3em]">
            <h3 className="font-headline text-lg font-semibold text-primary">Connect With Us</h3>
            <div className="mt-4 flex space-x-4">
              <Link href="#" aria-label="Facebook" className="text-gray-200/80 hover:text-primary transition-colors"><Facebook size={20} /></Link>
              <Link href="#" aria-label="Instagram" className="text-gray-200/80 hover:text-primary transition-colors"><Instagram size={20} /></Link>
              <Link href="#" aria-label="Twitter" className="text-gray-200/80 hover:text-primary transition-colors"><Twitter size={20} /></Link>
            </div>
            <p className="mt-4 text-sm text-gray-200">
              Email: info@lunashortlets.ng<br />
              Phone: +234 801 234 5678
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-foreground/60">
        © {new Date().getFullYear()} Luna Shortlets. All rights reserved.
      </div>
    </footer>
  );
}
