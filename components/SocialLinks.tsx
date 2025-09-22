import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function SocialLinks() {
  return (
    <div className='flex items-center justify-center space-x-5 mb-8'>
      <Link
        href='#'
        target='_blank'
        className='text-gray-600 hover:text-gray-900 transition-colors'
      >
        <Github size={24} />
      </Link>
      <Link
        href='#'
        target='_blank'
        className='text-gray-600 hover:text-gray-900 transition-colors'
      >
        <Twitter size={24} />
      </Link>
      <Link
        href='#'
        target='_blank'
        className='text-gray-600 hover:text-gray-900 transition-colors'
      >
        <Linkedin size={24} />
      </Link>
    </div>
  );
}
