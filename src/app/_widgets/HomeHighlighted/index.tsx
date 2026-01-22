"use client"
import { JSX } from 'react';
import { HIGHLIGHTED_ARTICLES_CONTENT_TYPE } from '@/app/_data/customizations';
import ArticleCard from '@/app/_widgets/components/ArticleCard';
import type { ArticleModel } from '@/app/_widgets/SearchResults';
import type { SearchResultsInitialState } from '@sitecore-search/react';
import { FilterEqual, WidgetDataType, useSearchResults, widget } from '@sitecore-search/react';

const SEARCH_CONFIG = {
  source: process.env.NEXT_PUBLIC_SEARCH_SOURCE as string,
};

type InitialState = SearchResultsInitialState<'itemsPerPage'>;

export const HomeHighlightedComponent = (): JSX.Element => {
  const {
    actions: { onItemClick },
    queryResult: { data: { content: articles = [] } = {} },
  } = useSearchResults<ArticleModel, InitialState>({
    query: (query) => {
      query.getRequest().setSearchFilter(new FilterEqual('type', HIGHLIGHTED_ARTICLES_CONTENT_TYPE));

      if (SEARCH_CONFIG.source !== '') {
        const sources = SEARCH_CONFIG.source.split('|');
        sources.forEach(source => {
            query.getRequest().addSource(source.trim());
        });
      }
    },
    state: {
      itemsPerPage: 3,
    },
  });
  const articlesToShow = articles.slice(0, 3);
  return (
    <>
    <p className="w-full flex justify-around text-gray-900 dark:text-gray-200 my-10 text-2xl">Highlighted Articles</p>
    <div className="w-full flex justify-around text-gray-900 dark:text-gray-200 my-10">
      
      <div className="grid grid-cols-3 gap-x-5 gap-y-3 w-[80%]">
        {articlesToShow.map((a, index) => (
          <ArticleCard article={a} key={index} index={index} onItemClick={onItemClick} />
        ))}
      </div>
    </div>
    </>
  );
};

export default widget(HomeHighlightedComponent, WidgetDataType.SEARCH_RESULTS, 'content');
