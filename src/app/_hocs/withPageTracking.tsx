"use client"

import React, { Suspense, useEffect } from 'react';
import { useParams } from 'next/navigation';

import { ENTITY_CONTENT, PAGE_EVENTS_DEFAULT, PAGE_EVENTS_PDP } from '@/app/_data/constants';
import { PageController, trackEntityPageViewEvent, trackPageViewEvent } from '@sitecore-search/react';
import useUri from '@/app/_hooks/useUri';

export const PageEventContext = React.createContext({});
/**
 * The page view event is handled in sitecore SDK, but for SPA it just happens on the first time.
 * So when user navigate is needed to track the page view event manually.
 * This is the purpose of this hoc, set page uri and track the page view event
 */
const withPageTracking =
  (Component: React.ElementType, pageType = PAGE_EVENTS_DEFAULT) => {
    const PageTrackingInner = ({ Child }: { Child: React.ElementType }) => {
      const uri = useUri();
      const params = useParams<{ slug: string }>();
      const id = params?.slug;
      useEffect(() => {
        PageController.getContext().setPageUri(uri);

        if (id && pageType === PAGE_EVENTS_PDP) {
          trackEntityPageViewEvent(ENTITY_CONTENT, { items: [{ id }] });
        } else {
          trackPageViewEvent(pageType);
        }
      }, [uri, id, pageType]);

      return (
        <PageEventContext.Provider value={pageType}>
          <Child />
        </PageEventContext.Provider>
      );
    };

    const WrappedComponent = () => (
      <Suspense fallback={<Component />}>
        <PageTrackingInner Child={Component} />
      </Suspense>
    );

    const componentName = typeof Component === 'function'
      ? (Component as React.ComponentType).displayName || (Component as React.ComponentType).name || 'Component'
      : 'Component';
    WrappedComponent.displayName = `withPageTracking(${componentName})`;
    return WrappedComponent;
  };

export default withPageTracking;
