"use client"
import { SearchResultsLoadMore } from '@sitecore-search/ui';
import { useSearchResultsActions, useSearchResults } from '@sitecore-search/react';
import type { ArticleModel } from '@/app/_widgets/SearchResults';

type SearchResultsLoadMoreProps = {
  className?: string;
};

const SearchResultsLoadMoreComponent = ({ className = '' }: SearchResultsLoadMoreProps) => {
  const { onLoadMore } = useSearchResultsActions();
  const {
    queryResult: {
      data: { total_item: totalItems = 0, content: articles = [] } = {},
      isFetching,
    },
    state: { itemsPerPage },
  } = useSearchResults<ArticleModel>();

  const hasMore = articles.length < totalItems;
  const isLoading = isFetching;

  if (!hasMore) return null;

  return (
    <div className={`flex justify-center mt-8 ${className}`}>
      <SearchResultsLoadMore.Root>
        <SearchResultsLoadMore.Trigger
          onClick={() => onLoadMore()}
          disabled={isLoading}
          className="px-6 py-3 bg-[#005EB8] hover:bg-[#C8102E] text-white font-semibold rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-[#005EB8] focus:outline-2 focus:outline-offset-2"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⏳</span>
              Loading...
            </span>
          ) : (
            `Load More (${totalItems - articles.length} remaining)`
          )}
        </SearchResultsLoadMore.Trigger>
      </SearchResultsLoadMore.Root>
    </div>
  );
};

export default SearchResultsLoadMoreComponent;

