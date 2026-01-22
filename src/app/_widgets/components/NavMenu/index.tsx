"use client"
import { NavMenu } from '@sitecore-search/ui';
import Link from 'next/link';

type NavMenuItem = {
  label: string;
  href: string;
  children?: NavMenuItem[];
};

type NavMenuProps = {
  items: NavMenuItem[];
  className?: string;
};

const NavMenuComponent = ({ items, className = '' }: NavMenuProps) => {
  return (
    <NavMenu.Root className={`${className}`}>
      <NavMenu.List className="flex items-center gap-6">
        {items.map((item, index) => (
          <NavMenu.Item key={index} className="relative">
            {item.children && item.children.length > 0 ? (
              <>
                <NavMenu.Trigger className="text-gray-900 dark:text-white hover:text-[#005EB8] dark:hover:text-blue-400 font-medium transition-colors focus:outline-[#005EB8] focus:outline-2 focus:outline-offset-2 rounded">
                  {item.label}
                </NavMenu.Trigger>
                <NavMenu.Content className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-600 min-w-[200px] z-50">
                  <NavMenu.SubContent className="py-2">
                    {item.children.map((child, childIndex) => (
                      <NavMenu.Item key={childIndex}>
                        <NavMenu.Link asChild>
                          <Link
                            href={child.href}
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-[#005EB8] hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-colors"
                          >
                            {child.label}
                          </Link>
                        </NavMenu.Link>
                      </NavMenu.Item>
                    ))}
                  </NavMenu.SubContent>
                </NavMenu.Content>
              </>
            ) : (
              <NavMenu.Link asChild>
                <Link
                  href={item.href}
                  className="text-gray-900 dark:text-white hover:text-[#005EB8] dark:hover:text-blue-400 font-medium transition-colors focus:outline-[#005EB8] focus:outline-2 focus:outline-offset-2 rounded"
                >
                  {item.label}
                </Link>
              </NavMenu.Link>
            )}
          </NavMenu.Item>
        ))}
      </NavMenu.List>
    </NavMenu.Root>
  );
};

export default NavMenuComponent;

