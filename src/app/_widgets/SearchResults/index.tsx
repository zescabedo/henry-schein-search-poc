"use client"
import { useState } from 'react';

import ArticleItemCard from '@/app/_widgets/components/ArticleCard';
import ArticleHorizontalItemCard from '@/app/_widgets/components/ArticleHorizontalCard';
import CardViewSwitcher from '@/app/_widgets/components/CardViewSwitcher';
import Filter from '@/app/_widgets/components/Filter';
import QueryResultsSummary from '@/app/_widgets/components/QueryResultsSummary';
import ResultsPerPage from '@/app/_widgets/components/ResultsPerPage';
import SearchFacets from '@/app/_widgets/components/SearchFacets';
import SearchPagination from '@/app/_widgets/components/SearchPagination';
import SortOrder from '@/app/_widgets/components/SortOrder';
import Spinner from '@/app/_widgets/components/Spinner';
import { GridIcon, ListBulletIcon } from '@radix-ui/react-icons';
import type { SearchResultsInitialState, SearchResultsStoreState } from '@sitecore-search/react';
import { WidgetDataType, useSearchResults, widget } from '@sitecore-search/react';
import React from 'react';

const SEARCH_CONFIG = {
  source: process.env.NEXT_PUBLIC_SEARCH_SOURCE as string,
};

export type ArticleModel = {
  id: string;
  type?: string;
  title?: string;
  name?: string;
  subtitle?: string;
  url?: string;
  description?: string;
  content_text?: string;
  image_url?: string;
  source_id?: string;
};
type ArticleSearchResultsProps = {
  defaultSortType?: SearchResultsStoreState['sortType'];
  defaultPage?: SearchResultsStoreState['page'];
  defaultItemsPerPage?: SearchResultsStoreState['itemsPerPage'];
  defaultKeyphrase?: SearchResultsStoreState['keyphrase'];
};
type InitialState = SearchResultsInitialState<'itemsPerPage' | 'keyphrase' | 'page' | 'sortType'>;

export const SearchResultsComponent = ({
  defaultSortType = 'featured_desc',
  defaultPage = 1,
  defaultKeyphrase = '',
  defaultItemsPerPage = 10,
}: ArticleSearchResultsProps) => {
  const {
    actions: { onItemClick },
    state: { sortType, page, itemsPerPage },
    queryResult: {
      isLoading,
      isFetching,
      data: {
        total_item: totalItems = 0,
        sort: { choices: sortChoices = [] } = {},
        facet: facets = [],
        content: articles = [],
      } = {},
    },
  } = useSearchResults<ArticleModel, InitialState>({
    state: {
      sortType: defaultSortType,
      page: defaultPage,
      itemsPerPage: defaultItemsPerPage,
      // Use wildcard "*" for empty keyphrase to return all results
      keyphrase: defaultKeyphrase === '' ? '*' : defaultKeyphrase,
    },
    query: (query) => {
      if (SEARCH_CONFIG.source !== '') {
        const sources = SEARCH_CONFIG.source.split('|');
        sources.forEach(source => {
            query.getRequest().addSource(source.trim());
        });
      }
    },
  });
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const defaultCardView = 'list';
  const [dir, setDir] = useState(defaultCardView);
  const onToggle = (value = defaultCardView) => setDir(value);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Spinner loading />
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="flex relative max-w-full text-gray-900 dark:text-gray-100">
        {isFetching && (
          <div className="w-full h-full fixed top-0 left-0 bottom-0 right-0 z-30 bg-white dark:bg-gray-800 opacity-50">
            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col justify-center items-center z-40">
              <Spinner loading />
            </div>
          </div>
        )}
        {totalItems > 0 && (
          <React.Fragment key="1">
            {/* Left Sidebar - Filters */}
            <aside className="flex flex-col flex-none relative w-[280px] mr-8">
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-5">
                <Filter />
                <SearchFacets facets={facets} />
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex flex-col flex-1 min-w-0">
              {/* Top Bar - Results Summary and Controls */}
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-4 mb-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  {totalItems > 0 && (
                    <QueryResultsSummary
                      currentPage={page}
                      itemsPerPage={itemsPerPage}
                      totalItems={totalItems}
                      totalItemsReturned={articles.length}
                    />
                  )}
                  <div className="flex items-center gap-3">
                    <CardViewSwitcher
                      onToggle={onToggle}
                      defaultCardView={defaultCardView}
                      GridIcon={GridIcon}
                      ListIcon={ListBulletIcon}
                    />
                    <SortOrder options={sortChoices} selected={sortType} />
                  </div>
                </div>
              </div>

              {/* Results Grid/List */}
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-6">
                {dir === 'grid' ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {articles.map((a, index) => (
                      <ArticleItemCard key={a.id} article={a as ArticleModel} index={index} onItemClick={onItemClick} />
                    ))}
                  </div>
                ) : (
                  <div className="w-full space-y-4">
                    {articles.map((a, index) => (
                      <ArticleHorizontalItemCard
                        key={a.id}
                        article={a as ArticleModel}
                        index={index}
                        onItemClick={onItemClick}
                        displayText={true}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Bar - Pagination and Results Per Page */}
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-4 mt-4">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <ResultsPerPage defaultItemsPerPage={defaultItemsPerPage} />
                  <SearchPagination currentPage={page} totalPages={totalPages} />
                </div>
              </div>
            </main>
          </React.Fragment>
        )}
        {totalItems <= 0 && !isFetching && (
          <div className="w-full flex flex-col items-center justify-center py-16 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No results found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};
const SearchResultsWidget = widget(SearchResultsComponent, WidgetDataType.SEARCH_RESULTS, 'content');
export default SearchResultsWidget;
