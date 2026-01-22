"use client"
import { JSX } from 'react';
import { useSearchParams } from 'next/navigation';

import { PAGE_EVENTS_SEARCH } from '@/app/_data/constants';
import withPageTracking from '@/app/_hocs/withPageTracking';
import QuestionsAnswers from '@/app/_widgets/QuestionsAnswers';
import SearchResults from '@/app/_widgets/SearchResults';

const Search = (): JSX.Element => {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';
  const showAllResults = query === '';

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-800 min-h-screen">
      <div className="max-w-[1400px] m-auto pt-[110px] pb-12">
        <div className="px-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {showAllResults ? (
              'Search Results'
            ) : (
              <>
                Search Results for <span className="text-[#005EB8] dark:text-blue-400">&quot;{query}&quot;</span>
              </>
            )}
          </h1>
        </div>
        {!showAllResults && (
          <div className="px-6 mb-6">
            <QuestionsAnswers
              key={`${query}-questions`}
              rfkId="rfkid_qa"
              defaultKeyphrase={query}
              defaultRelatedQuestions={4}
            />
          </div>
        )}
        <div className="px-6">
          <SearchResults key={`${query}-search`} rfkId="rfkid_7" defaultKeyphrase={query} />
        </div>
      </div>
    </div>
  );
};

export default withPageTracking(Search, PAGE_EVENTS_SEARCH);
