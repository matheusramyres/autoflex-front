import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../app/productsSlice';
import type { AppDispatch, RootState } from '../app/store';
import { ProductTable } from '../components/ProductTable';

export const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <section>
        <ProductTable data={items} loading={loading} />
      </section>
    </>
  );
};
