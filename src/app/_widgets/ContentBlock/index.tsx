"use client"
import { JSX } from 'react';
import { WidgetDataType, widget } from '@sitecore-search/react';
import { HTMBlockWidget } from '@sitecore-search/react';

type ContentBlockProps = {
  rfkId: string;
  className?: string;
};

export const ContentBlockComponent = ({ rfkId, className = '' }: ContentBlockProps): JSX.Element => {
  return (
    <div className={`w-full ${className}`}>
      <HTMBlockWidget rfkId={rfkId} />
    </div>
  );
};

const ContentBlockWidget = widget(ContentBlockComponent, WidgetDataType.CONTENT_BLOCK, 'content');
export default ContentBlockWidget;

