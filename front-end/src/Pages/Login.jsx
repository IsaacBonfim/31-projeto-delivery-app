import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';

import { MIN_PASSWORD_LENGTH } from '../Constants';
import PasswordInput from '../Components/PasswordInput';
import auth from '../Services/Api/auth';
import useUser from '../Context/user';

const schema = yup.object({
  email: yup
    .string()
    .required('Forneça seu e-mail')
    .email('E-mail inválido'),

  password: yup
    .string()
    .required('Forneça sua senha')
    .min(MIN_PASSWORD_LENGTH, 'Senha inválida'),
});

function Login() {
  const { setUser } = useUser();

  const {
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });

  const onSubmit = useCallback(async (form) => {
    const { message, result } = await auth.login(form);

    if (result) {
      const { id, ...user } = result;
      setUser(user);
    } else {
      toast(
        <span data-testid="common_login__element-invalid-email">
          {message}
        </span>,
        { type: 'error' },
      );
    }
  }, []);

  return (
    <Center minH="100vh">
      <Box
        as="form"
        bgColor="gray.300"
        borderRadius="xl"
        boxShadow="xl"
        maxW="calc(100vw - 24px)"
        p={ 5 }
        w={ 400 }
        onSubmit={ handleSubmit(onSubmit) }
      >
        <Text
          fontSize="2xl"
          fontWeight="semibold"
          mb={ 8 }
          textAlign="center"
        >
          Delivery App
        </Text>

        <FormControl isDisabled={ isSubmitting } isInvalid={ errors.email }>
          <FormLabel mb={ 0 }>E-mail:</FormLabel>

          <Input
            type="email"
            variant="filled"
            { ...register('email') }
            data-testid="common_login__input-email"
          />
        </FormControl>

        <FormControl isDisabled={ isSubmitting } isInvalid={ errors.password } mt={ 2 }>
          <FormLabel mb={ 0 }>Senha</FormLabel>

          <PasswordInput
            variant="filled"
            register={ register }
            isDisabled={ isSubmitting }
            data-testid="common_login__input-password"
          />
        </FormControl>

        <Stack direction="row-reverse" mt={ 10 }>
          <Button
            type="submit"
            colorScheme="green"
            isDisabled={ !isValid }
            isLoading={ isSubmitting }
            data-testid="common_login__button-login"
          >
            Entrar
          </Button>

          <Button
            as={ Link }
            to="/register"
            colorScheme="green"
            variant="outline"
            isDisabled={ isSubmitting }
            data-testid="common_login__button-register"
          >
            Cadastre-se
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}

export default Login;
