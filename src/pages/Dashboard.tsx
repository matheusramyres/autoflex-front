import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadDashboard } from '../app/dashboardSlice';
import { loadProduction } from '../app/productionSlice';
import type { AppDispatch, RootState } from '../app/store';
import { CardData } from '../components/CardData';
import { ProductionSuggestionTable } from '../components/SuggestionTable';
import { CardDataSkeleton } from '../skeleton/CardSkeleton/CardSkeleton';

export const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadDashboard());
    dispatch(loadProduction());
  }, [dispatch]);

  const { summary, loading: loadingSummary } = useSelector(
    (state: RootState) => state.dashboard,
  );
  const { result, loading: loadingResult } = useSelector(
    (state: RootState) => state.production,
  );

  const suggestions = result?.length ? result : [];

  return (
    <>
      <header className="w-full flex flex-col mb-6">
        <h1 className="text-white text-[28px] font-bold">Dashboard</h1>
        <p className="text-erp-muted text-sm font-normal">
          Visão geral das suas operações industriais
        </p>
      </header>
      <section className="flex justify-between gap-6 flex-col md:flex-row">
        {loadingSummary ? (
          <>
            <CardDataSkeleton />
            <CardDataSkeleton />
            <CardDataSkeleton />
          </>
        ) : (
          <>
            <CardData
              variant="money"
              value={summary?.totalProductionValue}
              variation={summary?.variation.productionValue}
            />
            <CardData
              variant="product"
              value={summary?.activeProducts}
              variation={summary?.variation.activeProducts}
            />
            <CardData
              variant="material"
              value={summary?.materialUtilization}
              variation={summary?.variation.materialUtilization}
            />
          </>
        )}
      </section>
      <section>
        <ProductionSuggestionTable data={suggestions} loading={loadingResult} />
      </section>
    </>
  );
};
