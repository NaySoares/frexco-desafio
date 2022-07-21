import { useEffect, useRef, useState } from 'react';
import { Box, LinearProgress, Table, TableBody, TableHead, TableContainer, TableCell, TableRow, Paper, TableFooter, IconButton, Icon, Modal, Button, Typography, Grid } from '@mui/material';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';

import { IDataProduct, ProductsService } from '../../shared/services/api/products/productsService';
import { VTextField, VForm, IVFormError } from '../../shared/components/unform';
import { Environment } from '../../shared/environment';
import { LayoutBase } from '../../shared/layouts';
import { ToolBar } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
  border: '2px solid #ffff',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

interface IFormData {
  name: string;
  description: string;
  price: number;
  cover?: string | undefined;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  name: yup.string().typeError('Campo inválido').required('Campo obrigatório'),
  cover: yup.string().typeError('Campo inválido'),
  description: yup.string().typeError('Campo inválido').required('Campo obrigatório'),
  price: yup.number().typeError('Campo inválido').integer('Precisa ser um número interio').positive('Precisa ser um número positivo').required('Campo obrigatório'),
});

export const DashboardProduct = () => {

  const [toggleModallNewProduct, setToggleModallNewProduct] = useState(false);
  const [products, setProducts] = useState<IDataProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [newUpdate, setNewUpdate] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<IDataProduct>();

  const formRef = useRef<FormHandles>(null);
  const formRefNewProduct = useRef<FormHandles>(null);
  const navigate = useNavigate();

  const { debounce } = useDebounce();
  const [searchTable, setSearchTable] = useState('');

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      ProductsService.getAll(searchTable)
        .then((result => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            setProducts(result.data);
          }
        }));
    });

  }, [searchTable, newUpdate]);

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja apagar?')) {
      ProductsService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            setProducts(oldProducts => {
              return [...oldProducts.filter(oldProduct => oldProduct.id !== id)];
            });
            alert('Registro apagado!');
          }
        });
    }
  };

  const handleSubmitEditProduct = (data: IFormData) => {
    formValidationSchema.validate(data, { abortEarly: false })
      .then((dataValidated) => {
        setIsLoading(true);

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ProductsService.updateById(dataValidated, currentProduct!.id)
          .then(result => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
              handleToggleModal;
            } else {
              alert('Produto editado com sucesso!');
              setNewUpdate(!newUpdate);
              setOpenModal(false);
            }
          });
      }).catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormError = {};

        errors.inner.forEach(error => {
          if (!error.path) return;
          validationErrors[error.path] = error.message;
        });
        formRef.current?.setErrors(validationErrors);
      });
  };

  const handleSubmitNewProduct = (data: IFormData) => {
    formValidationSchema.validate(data, { abortEarly: false })
      .then((dataValidated) => {
        setIsLoading(true);
        const { name, price, description, cover } = dataValidated;

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ProductsService.create(name, price, description, cover)
          .then(result => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
              setToggleModallNewProduct(false);
            } else {
              alert('Produto cadastrado com sucesso!');
              setNewUpdate(!newUpdate);
              setToggleModallNewProduct(false);
            }
          });
      }).catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormError = {};

        errors.inner.forEach(error => {
          if (!error.path) return;
          validationErrors[error.path] = error.message;
        });
        formRef.current?.setErrors(validationErrors);
      });
  };

  const handleToggleModal = (product: IDataProduct) => {
    if (product) {
      setCurrentProduct(product);
    }
    setOpenModal(!openModal);
  };

  return (
    <LayoutBase>
      <Modal
        open={openModal}
        onClose={handleToggleModal}
        aria-labelledby="modal-edit-register"
      >
        <Box sx={style}>
          <VForm ref={formRef} onSubmit={(data) => handleSubmitEditProduct(data)}>
            <Grid container spacing={2} justifyContent='center'>

              {isLoading &&
                <Grid item xs={12}>
                  <LinearProgress variant='indeterminate' />
                </Grid>
              }

              <Grid item md={6}>
                <Typography variant='h6' component='h2' marginBottom={2}>
                  Edição de registro
                </Typography>
              </Grid>

              <Grid container item direction='row' justifyContent='center'>
                <Grid item xs={12}>
                  <VTextField
                    fullWidth
                    label='Nome'
                    name='name'
                    disabled={isLoading}
                    defaultValue={currentProduct?.name}
                  />
                </Grid>
              </Grid>

              <Grid container item direction='row' justifyContent='center'>
                <Grid item xs={12}>
                  <VTextField
                    fullWidth
                    label='Preço'
                    name='price'
                    disabled={isLoading}
                    defaultValue={currentProduct?.price}
                  />
                </Grid>
              </Grid>
              <Grid container item direction='row' justifyContent='center'>
                <Grid item xs={12}>
                  <VTextField
                    fullWidth
                    label='Link da capa'
                    name='cover'
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>
              <Grid container item direction='row' justifyContent='center'>
                <Grid item xs={12}>
                  <VTextField
                    fullWidth
                    label='Descrição'
                    name='description'
                    disabled={isLoading}
                    defaultValue={currentProduct?.description}
                  />
                </Grid>
              </Grid>

              <Grid container item direction='row' justifyContent='center'>
                <Grid item xs={12}>

                  <Button
                    fullWidth
                    type="submit"
                    disabled={isLoading}
                    variant="contained"
                  >
                    Atualizar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </VForm>
        </Box>

      </Modal>

      <Modal
        open={toggleModallNewProduct}
        onClose={() => setToggleModallNewProduct(false)}
        aria-labelledby="modal-edit-register"
      >
        <Box sx={style}>
          <VForm ref={formRefNewProduct} onSubmit={(data) => handleSubmitNewProduct(data)}>
            <Grid container spacing={2} justifyContent='center'>

              {isLoading &&
                <Grid item xs={12}>
                  <LinearProgress variant='indeterminate' />
                </Grid>
              }

              <Grid item md={12}>
                <Typography
                  variant='h6'
                  component='h2'
                  marginBottom={2}
                  textAlign='center'
                >
                  Cadastro de produto
                </Typography>
              </Grid>

              <Grid container item direction='row' justifyContent='center'>
                <Grid item xs={12}>
                  <VTextField
                    fullWidth
                    label='Nome'
                    name='name'
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>

              <Grid container item direction='row' justifyContent='center'>
                <Grid item xs={12}>
                  <VTextField
                    fullWidth
                    label='Preço'
                    name='price'
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>

              <Grid container item direction='row' justifyContent='center'>
                <Grid item xs={12}>
                  <VTextField
                    fullWidth
                    label='Link da capa'
                    name='cover'
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>

              <Grid container item direction='row' justifyContent='center'>
                <Grid item xs={12}>
                  <VTextField
                    fullWidth
                    label='Descrição'
                    name='description'
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>

              <Grid container item direction='row' justifyContent='center'>
                <Grid item xs={12}>

                  <Button
                    fullWidth
                    type="submit"
                    disabled={isLoading}
                    variant="contained"
                  >
                    Atualizar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </VForm>
        </Box>

      </Modal>

      <Box
        width="80%"
        marginX='auto'
      >
        <Box display='flex'>
          <ToolBar
            textSearch={searchTable}
            onChangeText={newText => setSearchTable(newText)}
            onClickButtonList={() => navigate('/dashboard/stocks')}
            isVisibleButtonList={true}
            nameList='Estoque'
            onClickButtonNew={() => setToggleModallNewProduct(true)}
          />
        </Box>

        {isLoading && (
          <LinearProgress variant='indeterminate' />
        )}

        <TableContainer
          variant='outlined'
          component={Paper}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell align='center'>Quantidade</TableCell>
                <TableCell align='center'>Preço</TableCell>
                <TableCell align='center'>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {products.map(product => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell align='center'>{product.quantity}</TableCell>
                  <TableCell align='center'>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(product.price)}
                  </TableCell>
                  <TableCell align='center'>
                    <IconButton
                      size='small'
                      color='primary'
                      onClick={() => handleDelete(product.id)}
                    >
                      <Icon>delete</Icon>
                    </IconButton>
                    <IconButton
                      size='small'
                      color='primary'
                      onClick={() => handleToggleModal(product)}
                    >
                      <Icon>edit</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

            </TableBody>
            {(!isLoading && products.length === 0) && (
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4}>{Environment.EMPTY_LIST}</TableCell>
                </TableRow>
              </TableFooter>
            )}
          </Table>
        </TableContainer>
      </Box>
    </LayoutBase>
  );
};