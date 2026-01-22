"use client"
import { JSX } from 'react';
import type { RecommendationInitialState } from '@sitecore-search/react';
import { WidgetDataType, useRecommendation, widget } from '@sitecore-search/react';
import ArticleItemCard from '@/app/_widgets/components/ArticleCard';
import ProductItemCard from '@/app/_widgets/components/ProductCard';
import type { ArticleModel } from '@/app/_widgets/SearchResults';

const SEARCH_CONFIG = {
  source: process.env.NEXT_PUBLIC_SEARCH_SOURCE as string,
};

type RecommendationProps = {
  rfkId: string;
  title?: string;
  defaultItemsPerPage?: number;
  entity?: 'content' | 'product';
};

type InitialState = RecommendationInitialState<'itemsPerPage'>;

export const RecommendationComponent = ({
  rfkId,
  title = 'Recommended for You',
  defaultItemsPerPage = 4,
  entity = 'content',
}: RecommendationProps): JSX.Element => {
  const {
    actions: { onItemClick },
    queryResult: {
      isLoading,
      data: { content: items = [] } = {},
    },
  } = useRecommendation<ArticleModel, InitialState>({
    state: {
      itemsPerPage: defaultItemsPerPage,
    },
    query: (query): any => {
      if (SEARCH_CONFIG.source !== '') {
        const sources = SEARCH_CONFIG.source.split('|');
        sources.forEach(source => {
          query.getRequest().addSource(source.trim());
        });
      }
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#005EB8]"></div>
      </div>
    );
  }

  if (items.length === 0) return <></>;

  // Ensure we show exactly 4 items for 4-column layout
  const itemsToShow = items.slice(0, 4);

  return (
    <div className="w-full py-8">
      {title && (
        <div className="max-w-[1400px] mx-auto px-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
        </div>
      )}
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {itemsToShow.map((item, index) =>
            entity === 'product' ? (
              <ProductItemCard
                key={item.id}
                product={item as any}
                index={index}
                onItemClick={onItemClick}
              />
            ) : (
              <ArticleItemCard key={item.id} article={item as ArticleModel} index={index} onItemClick={onItemClick} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

const RecommendationWidget = widget(RecommendationComponent, WidgetDataType.RECOMMENDATION, 'content');
export default RecommendationWidget;

