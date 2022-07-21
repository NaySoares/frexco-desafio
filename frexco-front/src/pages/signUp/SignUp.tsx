import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, useTheme, Stack, Button, Typography, LinearProgress } from '@mui/material';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';

import { IVFormError, VForm, VTextField } from '../../shared/components/unform';
import { ClientService } from '../../shared/services/api/client/Client';

interface ISignUpFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string | undefined;
}

const signUpValidationSchema: yup.SchemaOf<ISignUpFormData> = yup.object().shape({
  name: yup.string().typeError('Campo inválido').required('Campo obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().min(6, 'No mínimo 6 caracteres').required('Senha obrigatória'),
  passwordConfirmation: yup.string().oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais'),
});

export const SignUp = () => {

  const [isLoading, setIsLoading] = useState(false); 

  const navigate = useNavigate();
  const theme = useTheme();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = async (data: ISignUpFormData)  => {
    await signUpValidationSchema.validate(data, {abortEarly: false})
      .then((dataValidated) => {
        setIsLoading(true);
    
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ClientService.create(dataValidated)
          .then((result) => {
            setIsLoading(false);

            if(result instanceof Error) {
              alert(result.message);
            } else {
              alert('Conta criada com sucesso!');
              navigate('/signin');
            }
          });
      }).catch((errors: yup.ValidationError) => {
        setIsLoading(false);
        const validationErrors: IVFormError = {};

        errors.inner.forEach(error => {
          if (!error.path) return;
          validationErrors[error.path] = error.message;
        });
        formRef.current?.setErrors(validationErrors);
      });    
  };

  return (
    <Box height='100vh' width='100vw' display='flex' alignItems='center' justifyContent="center" >
      <Box
        width="100%"
        maxWidth={360}
        padding={4}
        borderRadius={2}
        flexDirection='column'
        bgcolor={theme.palette.background.paper}
      >
        <VForm ref={formRef} onSubmit={(data) => handleSubmit(data)}>
          
          {isLoading && 
            <LinearProgress variant='indeterminate'/>
          }

          <Typography variant='h6' component='h2' marginBottom={2} textAlign='center'>
            Nova Conta
          </Typography>

          <Stack spacing={2}>
            <VTextField
              label='Nome'
              name='name'
              disabled={isLoading}
            />
            <VTextField
              label='E-mail'
              name='email'
              disabled={isLoading}
            />
            <VTextField
              label='Senha'
              name='password'
              type='password'
              disabled={isLoading}
              
            />
            <VTextField
              label='Confirme a senha'
              name='passwordConfirmation'
              type='password'
              disabled={isLoading}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
            >
              Criar conta
            </Button>
          </Stack>
        </VForm>

        <Link
          to={'/home'}
          style={{textDecoration:'none'}}
        >
          <Typography variant='body1' component='p' textAlign='center' marginTop={2}>
            Voltar para o início
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};
