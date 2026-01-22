"use client"
import { JSX, Fragment } from 'react';
import Link from 'next/link';

import footerData from '@/app/_data/footer.json';
import { FOOTER_BACKGROUND_COLOR, FOOTER_TEXT_COLOR } from '@/app/_data/customizations';

const Footer = (): JSX.Element => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full border-t border-t-gray-300 dark:border-t-gray-600 pt-8 pb-8" style={{backgroundColor: FOOTER_BACKGROUND_COLOR}}>
      <div className="max-w-[1400px] m-auto px-6">
        {/* Footer Links */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {footerData.map((item, index) => (
            <Fragment key={`${item.label}-${index}`}>
              <Link
                href={item.url}
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-[#005EB8] dark:hover:text-blue-400 transition-colors"
                style={{color: FOOTER_TEXT_COLOR}}
              >
                {item.label}
              </Link>
              {index < footerData.length - 1 && (
                <span className="text-gray-400 dark:text-gray-600">|</span>
              )}
            </Fragment>
          ))}
        </div>

        {/* Contact Information */}
        <div className="mb-4">
          <p className="text-sm text-gray-700 dark:text-gray-300" style={{color: FOOTER_TEXT_COLOR}}>
            For assistance call <a href="tel:1-800-372-4346" className="text-[#005EB8] dark:text-blue-400 hover:underline">1-800-372-4346</a>, 8:00am-8:00pm ET
          </p>
        </div>

        {/* Copyright and Back to Top */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <p className="text-sm text-gray-600 dark:text-gray-400" style={{color: FOOTER_TEXT_COLOR}}>
            Copyright © {new Date().getFullYear()} Henry Schein, Inc. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="text-sm text-gray-700 dark:text-gray-300 hover:text-[#005EB8] dark:hover:text-blue-400 transition-colors"
            style={{color: FOOTER_TEXT_COLOR}}
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;