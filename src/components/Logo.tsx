import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("inline-block w-[10em]", className)}>
      <Image
        src="/images/logo.png" // Updated path to local image
        alt="Luna Shortlets Logo"
        width={99} 
        height={35}
        layout="responsive"
        priority 
      />
    </Link>
  );
}
