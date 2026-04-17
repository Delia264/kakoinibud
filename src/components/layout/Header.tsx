'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-background/80 backdrop-blur-lg shadow-lg'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#home"
              className="text-xl md:text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
            >
              portfolio
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-foreground/80 hover:text-primary transition-colors font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                >
                  {item.labelKey === 'nav.home' && 'Главная'}
                  {item.labelKey === 'nav.about' && 'Обо мне'}
                  {item.labelKey === 'nav.projects' && 'Проекты'}
                  {item.labelKey === 'nav.contacts' && 'Контакты'}
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 p-0"
                aria-label="Меню"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-3/4 max-w-sm bg-background shadow-xl"
            >
              <div className="flex flex-col h-full pt-20 px-6">
                <nav className="flex flex-col space-y-4">
                  {NAV_ITEMS.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                    >
                      {item.labelKey === 'nav.home' && 'Главная'}
                      {item.labelKey === 'nav.about' && 'Обо мне'}
                      {item.labelKey === 'nav.projects' && 'Проекты'}
                      {item.labelKey === 'nav.contacts' && 'Контакты'}
                    </a>
                  ))}
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
