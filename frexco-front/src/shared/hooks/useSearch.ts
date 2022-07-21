import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';


export const useSearch = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  return { search, setSearchParams };
};