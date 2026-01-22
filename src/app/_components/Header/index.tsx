"use client"

import { JSX } from 'react';
import { HEADER_BACKGROUND_COLOR, HENRY_SCHEIN_RED } from '@/app/_data/customizations';
import Logo from '@/app/_components/Logo';
import PreviewSearch from '@/app/_widgets/PreviewSearch';
import { DarkmodeSwitch } from '@/app/_components/DarkModeSwitcher';
import LocaleSelector from '@/app/_components/LocaleSelector';
import Link from 'next/link';

const Header = (): JSX.Element => {
  return (
      <div className="w-full h-[90px] top-0 z-[500] flex justify-items-start fixed dark:bg-gray-700 shadow-lg dark:shadow-gray-500 border-b-2" style={{backgroundColor: HEADER_BACKGROUND_COLOR, borderColor: HENRY_SCHEIN_RED}}>
        <div className="w-full max-w-[1400px] m-auto flex items-center px-6 text-gray-900 dark:text-white justify-between">
          <div className="flex items-center gap-8 flex-1">
            <Link href="/" tabIndex={1} className="flex-shrink-0">
              <Logo /> 
            </Link>
            <div className="flex-1 max-w-2xl">
              <PreviewSearch rfkId="rfkid_6" />
            </div>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <DarkmodeSwitch />
            <LocaleSelector />
          </div>
        </div>
      </div>
  );
};

export default Header;