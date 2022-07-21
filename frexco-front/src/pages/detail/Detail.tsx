import { Box, Button, LinearProgress, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';

import { IDataProduct, ProductsService } from '../../shared/services/api/products/productsService';
import { SellService } from '../../shared/services/api/sell/sellService';
import { LayoutBase } from '../../shared/layouts';
import { useParams } from 'react-router-dom';


export const Detail = () => {
  const { id = '' } = useParams<'id'>();

  const [product, setProduct] = useState<IDataProduct>();
  const [isLoading, setIsLoading] = useState(false);
  const [tryBuy, setTryBuy] = useState(false);

  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const coverDefault = 'https://darkside.vteximg.com.br/arquivos/ids/168433-209-313/139-fragmentos-do-horror.jpg?v=636851507661830000';

  useEffect(() => {
    setIsLoading(true);

    ProductsService.getById(id)
      .then((result => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setProduct(result);
        }
      }));

  }, []);


  function handleClickBuyProduct() {
    setTryBuy(true);

    setIsLoading(true);

    SellService.getById(1, id)
      .then((result => {
        setIsLoading(false);
        setTryBuy(false);

        if (result instanceof Error) {
          alert('Efetue o login para prosseguir com a compra.');
        } else {
          setProduct(result);
        }
      }));
  }

  return (
    <LayoutBase>
      <Box
        display="flex"
        flex={1}
        flexDirection={mdDown ? 'column' : 'row'}
        alignItems="center"
        justifyContent='center'
        margin={8}
      >
        <Box
          component="img"
          height="600px"
          src={product?.cover ? product.cover : coverDefault}
          alt="capa do livro"
          margin={3}
        >
        </Box>

        <Box
          display='flex'
          flex={1}
          maxWidth="500px"
          alignContent='center'
          paddingX={4}
          height='600px'
        >
          <Stack direction='column' gap={2} width="100%">
            <Typography variant='h4' component='h2'>
              <strong>
                {product?.name}
              </strong>
            </Typography>
            <Typography variant='h4' component='h2' >
              <strong>
                { product?.price &&
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(product.price)
                }
              </strong>
            </Typography>

            <Button
              variant='contained'
              sx={{ mx: 'auto', my: 5 }}
              size='large'
              color='secondary'
              disabled={!product?.available || tryBuy}
              onClick={() => handleClickBuyProduct()}
            >
              {!product?.available ? 'Sem estoque' : 'Comprar Agora'}
            </Button>

            <Typography variant='body1' component='p' overflow='auto' textAlign='justify' >
              {product?.description}
            </Typography>
          </Stack>
        </Box>
      </Box>


      {isLoading && (
        <LinearProgress variant='indeterminate' />
      )}
    </LayoutBase>
  );
};