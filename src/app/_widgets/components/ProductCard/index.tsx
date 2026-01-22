import { ProductCard } from '@sitecore-search/ui';
import Link from 'next/link';
import Image from 'next/image';
import { DEFAULT_IMG_URL } from '@/app/_data/customizations';

type ProductItemCardProps = {
  className?: string;
  product: {
    id: string;
    name: string;
    title?: string;
    sku?: string;
    image_url?: string;
    url: string;
    source_id: string;
    price?: number;
    type?: string;
  };
  index: number;
  onItemClick?: (data: { id: string; index: number; sourceId: string }) => void;
};

const ProductItemCard = ({ className = '', product, index, onItemClick }: ProductItemCardProps) => {
  const validImageUrl = product.image_url?.trim() ? product.image_url : DEFAULT_IMG_URL;

  return (
    <ProductCard.Root
      key={product.id}
      className={`group relative border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg hover:border-[#C8102E] hover:transition-all hover:ease-linear hover:duration-300 focus-within:border-[#005EB8] focus-within:transition-all focus-within:ease-linear focus-within:duration-300 focus-within:hover:shadow-lg bg-white dark:bg-gray-800 ${className}`}
    >
      <div className="aspect-h-1 aspect-w-1 h-28 w-full overflow-hidden rounded-t-lg bg-gray-100 dark:bg-gray-700 sm:aspect-none">
        <Image
          src={validImageUrl}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          alt={product.name || product.title || 'Product'}
          width={500}
          height={115}
          loading="lazy"
        />
      </div>
      <ProductCard.Content className="m-4 flex-col justify-between relative">
        <Link
          className="focus:outline-[#005EB8] focus:outline-2 focus:outline-offset-2 rounded"
          href={product.url || `/detail/${product.id}`}
          onClick={() => {
            if (onItemClick) {
              onItemClick({
                id: product.id,
                index,
                sourceId: product.source_id,
              });
            }
          }}
          aria-label={`View details for ${product.name || product.title}`}
        >
          <span aria-hidden="true" className="absolute inset-0"></span>
          <ProductCard.Name className="mt-4 text-base h-[60px] overflow-hidden text-gray-900 dark:text-white group-hover:text-[#C8102E] transition-colors" asTitle="h3">
            {product.name || product.title}
          </ProductCard.Name>
        </Link>
        {product.sku && (
          <ProductCard.Sku className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            SKU: {product.sku}
          </ProductCard.Sku>
        )}
        {product.price !== undefined && (
          <div className="mt-2 text-lg font-semibold text-[#005EB8] dark:text-blue-400">
            ${product.price.toFixed(2)}
          </div>
        )}
        {product.type && (
          <div className="mt-2 text-sm text-[#005EB8] dark:text-blue-400 font-medium">
            {product.type}
          </div>
        )}
      </ProductCard.Content>
    </ProductCard.Root>
  );
};

export default ProductItemCard;

