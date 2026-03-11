'use client';

import { useTheme } from './ThemeProvider';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { theme } = useTheme();

    const socialLinks = [
        { href: 'https://www.linkedin.com/in/comnsense', icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
        { href: 'https://github.com/comnsense', icon: 'fab fa-github', label: 'GitHub' },
        { href: 'https://t.me/comnsense88', icon: 'fab fa-telegram-plane', label: 'Telegram' },
        { href: 'https://comnsense.github.io/', icon: 'fas fa-globe', label: 'Website' },
    ];

    return (
        <footer className="mt-20 py-12 px-8 bg-black/30 backdrop-blur-sm border-t-2 border-[#8bc34a] text-center">
            <div className="mb-8">
                <ul className="flex gap-6 justify-center flex-wrap list-none p-0 m-0">
                    {socialLinks.map((link) => (
                        <li key={link.label} className="list-none">
                            <a
                                href={link.href}
                                target="_blank"
                                rel="noopener"
                                className={`
                  flex items-center justify-center w-12 h-12 
                  border-2 border-[#8bc34a] rounded-full 
                  transition-all duration-300 
                  hover:scale-110 no-underline
                  ${theme === 'dark'
                                        ? 'text-white hover:bg-[#8bc34a] hover:text-[#1a1a2e]'
                                        : 'text-[#1a1a2e] hover:bg-[#8bc34a] hover:text-white'
                                    }
                `}
                                style={{ textDecoration: 'none' }}
                            >
                                <i className={`${link.icon} text-xl`}></i>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Copyright */}
            <div className={`text-sm opacity-80 ${theme === 'dark' ? 'text-white' : 'text-[#1a1a2e]'}`}>
                <i className="fas fa-copyright mr-1 text-[#8bc34a]"></i>
                comnsense 2022-{currentYear}
            </div>

            {/* Footer Note */}
            <div
                className={`
          text-center opacity-40 text-sm mt-8 
          transition-opacity hover:opacity-90 cursor-default
          ${theme === 'dark' ? 'text-white' : 'text-[#1a1a2e]'}
        `}
            >
                <span>EComm-CS - eCommerce проект за портфолио</span>
            </div>
        </footer>
    );
}