import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { IDataProduct, ProductsService } from '../../shared/services/api/products/productsService';
import { CardProduct, DemoCarousel } from '../../shared/components';
import { useDebounce, useSearch } from '../../shared/hooks';
import { Environment } from '../../shared/environment';
import { LayoutBase } from '../../shared/layouts';


export const Home = () => {

  const [products, setProducts] = useState<IDataProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { debounce } = useDebounce();
  const { search } = useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {      
      ProductsService.getAll(search)
        .then((result => {
          setIsLoading(false);
        
          if (result instanceof Error) {
            alert(result.message);
          } else {
            setProducts(result.data);
          }
        }));
    });
  }, [search]);

  function handleClickProduct(id: string){
    navigate(`/detail/${id}`);
  }

  return (
    <LayoutBase>

      <Box display='flex'>
        <DemoCarousel />
      </Box>
      
      {isLoading && (
        <LinearProgress variant='indeterminate'/>
      )}

      <Grid
        container
        display='flex'
        justifyContent='center'
        flex={1}
        padding={3}
        gap={4}
      >
        {products.map((product) => (
          <CardProduct
            key={product.id}
            name={product.name}
            price={product.price}
            cover={product.cover}
            onClickCard={() => handleClickProduct(product.id)}
          />
        ))}
      </Grid>

      {(!isLoading && products.length === 0) && (
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          height={5}>
          <Typography variant="h6" component='h6'>
            {Environment.EMPTY_LIST}
          </Typography>
        </Box>
      )}

    </LayoutBase>
  );
};