"use client"
import { JSX } from 'react';
import { WidgetDataType, widget } from '@sitecore-search/react';
import { HTMBlockWidget } from '@sitecore-search/react';

type BannerProps = {
  rfkId: string;
  className?: string;
};

export const BannerComponent = ({ rfkId, className = '' }: BannerProps): JSX.Element => {
  return (
    <div className={`w-full ${className}`}>
      <HTMBlockWidget rfkId={rfkId} />
    </div>
  );
};

const BannerWidget = widget(BannerComponent, WidgetDataType.BANNER, 'content');
export default BannerWidget;

