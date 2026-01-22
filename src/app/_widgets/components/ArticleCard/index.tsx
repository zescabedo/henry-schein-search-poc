import { ArticleCard } from '@sitecore-search/ui';
import Link from 'next/link';
import Image from 'next/image';
import { DEFAULT_IMG_URL } from '@/app/_data/customizations';
import type { ActionProp, ItemClickedAction } from '@sitecore-search/react';

type ArticleItemCardProps = {
  className?: string;
  article: {
    id: string;
    name: string;
    title: string;
    type: string;
    image_url?: string;
    url: string;
    source_id: string;
  };
  index: number;
  onItemClick?: ActionProp<ItemClickedAction>;
};

const ArticleItemCard = ({ className = '', article, index, onItemClick }: ArticleItemCardProps) => {
  const validImageUrl = article.image_url?.trim() ? article.image_url : DEFAULT_IMG_URL;

  const handleClick = () => {
    if (onItemClick) {
      onItemClick({
        id: article.id,
        index,
        sourceId: article.source_id,
      });
    }
  };

  return (
    <ArticleCard.Root
      key={article.id}
      className={`group relative border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg hover:border-[#C8102E] hover:transition-all hover:ease-linear hover:duration-300 focus-within:border-[#005EB8] focus-within:transition-all focus-within:ease-linear focus-within:duration-300 focus-within:hover:shadow-lg bg-white dark:bg-gray-800 ${className}`}
    >
      <div className="aspect-h-1 aspect-w-1 h-28 w-full overflow-hidden rounded-t-lg bg-gray-100 dark:bg-gray-700 sm:aspect-none">
        <Image
          src={validImageUrl}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          alt={article.name || article.title}
          width={500}
          height={115}
          loading="lazy"
        />
      </div>
      <div className="m-4 flex-col justify-between relative">
        <Link
          className="focus:outline-[#005EB8] focus:outline-2 focus:outline-offset-2 rounded"
          href={article.url || `/detail/${article.id}`}
          onClick={handleClick}
          aria-label={`View details for ${article.name || article.title}`}
        >
          <span aria-hidden="true" className="absolute inset-0"></span>
          <ArticleCard.Title className="mt-4 text-base h-[100px] overflow-hidden text-gray-900 dark:text-white group-hover:text-[#C8102E] transition-colors">
            {article.name || article.title}
          </ArticleCard.Title>
        </Link>
        <ArticleCard.Subtitle className="mt-3 text-sm text-[#005EB8] dark:text-blue-400 font-medium">
          {article.type}
        </ArticleCard.Subtitle>
      </div>
    </ArticleCard.Root>
  );
};

export default ArticleItemCard;
