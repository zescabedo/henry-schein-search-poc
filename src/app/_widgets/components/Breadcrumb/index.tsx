"use client"
import { Breadcrumb } from '@sitecore-search/ui';
import Link from 'next/link';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

const BreadcrumbComponent = ({ items, className = '' }: BreadcrumbProps) => {
  if (!items || items.length === 0) return null;

  return (
    <Breadcrumb.Root className={className}>
      <Breadcrumb.Navigation>
        <Breadcrumb.List className="flex items-center space-x-2 text-sm">
          {items.map((item, index) => (
            <Breadcrumb.Item key={index} className="flex items-center">
              {index > 0 && (
                <Breadcrumb.Separator value="/" className="mx-2 text-gray-400 dark:text-gray-500" />
              )}
              {item.href && index < items.length - 1 ? (
                <Breadcrumb.Link asChild>
                  <Link
                    href={item.href}
                    className="text-[#005EB8] dark:text-blue-400 hover:text-[#C8102E] dark:hover:text-red-400 hover:underline transition-colors"
                  >
                    {item.label}
                  </Link>
                </Breadcrumb.Link>
              ) : (
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {item.label}
                </span>
              )}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb.List>
      </Breadcrumb.Navigation>
    </Breadcrumb.Root>
  );
};

export default BreadcrumbComponent;

