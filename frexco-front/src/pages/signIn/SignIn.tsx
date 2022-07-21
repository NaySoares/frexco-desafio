import { useContext, useRef, useState } from 'react';
import { Box, useTheme, Stack, Button, Typography, LinearProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';

import { AuthContext } from '../../shared/contexts/AuthContext';
import { IVFormError, VForm, VTextField } from '../../shared/components/unform';

interface ISignInFormData {
  email: string;
  password: string;
}

const signInValidationSchema: yup.SchemaOf<ISignInFormData> = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
});

export const SignIn = () => {

  const [isLoading, setIsLoading] = useState(false); 

  const { signIn } = useContext(AuthContext);
  const theme = useTheme();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = async (data: ISignInFormData)  => {
    await signInValidationSchema.validate(data, {abortEarly: false})
      .then((dataValidated) => {
        setIsLoading(true);
    
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        signIn(dataValidated)
          .then(() => {
            setIsLoading(false);
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

          <Typography
            variant='h6'
            component='h2'
            marginBottom={2}
            textAlign='center'
          >
            Login
          </Typography>
          <Stack spacing={2}>
            <VTextField
              label='E-mail'
              name='email'
            />
            <VTextField
              label='Senha'
              name='password'
              type='password'
            />

            <Button
              type="submit"
              variant="contained"
            >
              Login
            </Button>
          </Stack>
        </VForm>

        <Link
          to={'/signup'}
          style={{textDecoration:'none'}}
        >
          <Typography
            variant='body1'
            component='p'
            textAlign='center'
            marginTop={2}
          >
            Criar conta.
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};
