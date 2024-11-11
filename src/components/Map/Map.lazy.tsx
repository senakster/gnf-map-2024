import React, { lazy, Suspense } from 'react';
import Loading from '@/components/Loading/Loading';

const LazyMap = lazy(() => import('./Map'));

const Map = async ({ groups }: { groups?: TGNFG[] }) => (
  <Suspense fallback={<Loading />}>
    <LazyMap groups={groups} />
  </Suspense>
);

export default Map;
