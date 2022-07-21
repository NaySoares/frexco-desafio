import { useEffect, useRef, useState } from 'react';
import { Box, LinearProgress, Table, TableBody, TableHead, TableContainer, TableCell, TableRow, Paper, TableFooter, IconButton, Icon, Modal, Button, Typography, Grid } from '@mui/material';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';

import { VTextField, VForm, IVFormError } from '../../shared/components/unform';
import { IDataStock, StocksService } from '../../shared/services/api/stocks/stocksService';
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
  quantity: number;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  name: yup.string().typeError('Campo inválido').required('Campo obrigatório'),
  quantity: yup.number().typeError('Campo inválido').integer('Precisa ser um número interio').positive('Precisa ser um número positivo').required('Campo obrigatório'),
});

export const DashboardStock = () => {

  const [currentProduct, setCurrentProduct] = useState<IDataStock>();
  const [products, setProducts] = useState<IDataStock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [newUpdate, setNewUpdate] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();

  const { debounce } = useDebounce();
  const [searchTable, setSearchTable] = useState('');

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {      
      StocksService.getAll(searchTable)
        .then((result => {
          setIsLoading(false);
        
          if (result instanceof Error) {
            alert(result.message);
          } else {
            setProducts(result);
          }
        }));
    });

  }, [searchTable, newUpdate]);

  const handleDelete = ( id: string) => {
    if(confirm('Tem certeza que deseja apagar?')) {
      StocksService.deleteById(id)
        .then(result => {
          if(result instanceof Error) {
            alert(result.message);
          } else {
            setNewUpdate(!newUpdate);
            alert('Registro apagado!');
          }
        });
    }
  };
  
  const handleSubmit = (data: IFormData)  => {
    formValidationSchema.validate(data, {abortEarly: false})
      .then((dataValidated) => {
        setIsLoading(true);
        const { quantity } = dataValidated;

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        StocksService.updateById(quantity, currentProduct!.id)
          .then(result => {
            setIsLoading(false);
            if(result instanceof Error) {
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

  const handleToggleModal = (product: IDataStock) => {
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
          <VForm ref={formRef} onSubmit={(data) => handleSubmit(data)}>
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
                    disabled={true}
                    defaultValue={currentProduct?.name}
                  />
                </Grid>
              </Grid>

              <Grid container item direction='row' justifyContent='center'>
                <Grid item xs={12}>
                  <VTextField
                    fullWidth
                    label='Estoque'
                    name='quantity'
                    disabled={isLoading}
                    defaultValue={currentProduct?.quantity}
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
            onClickButtonList={() => navigate('/dashboard/products')}
            isVisibleButtonNew={false}
            isVisibleButtonList={true}
            nameList='Produtos'
          />
        </Box>
      
        {isLoading && (
          <LinearProgress variant='indeterminate'/>
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
                <TableCell align='center'>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {products.map(product => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell align='center'>{product.quantity}</TableCell>
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