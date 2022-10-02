import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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

import { MIN_NAME_LENGTH, MIN_PASSWORD_LENGTH, NAVIGATE_BACK } from '../Constants';
import PasswordInput from '../Components/PasswordInput';
import auth from '../Services/Api/auth';
import useUser from '../Context/user';

const schema = yup.object({
  name: yup
    .string()
    .required('Forneça seu nome completo')
    .min(MIN_NAME_LENGTH, 'Nome muito pequeno'),

  email: yup
    .string()
    .required('Forneça seu e-mail')
    .email('E-mail inválido'),

  password: yup
    .string()
    .required('Forneça sua senha')
    .min(MIN_PASSWORD_LENGTH, 'Senha inválida'),
});

function Register() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const {
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });

  console.log('render');

  const onSubmit = useCallback(async (form) => {
    const { message, result } = await auth.register(form);

    if (result) {
      const { id, ...user } = result;
      setUser(user);
    } else {
      toast(
        <span data-testid="common_register__element-invalid_register">
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

        <FormControl isDisabled={ isSubmitting } isInvalid={ errors.name }>
          <FormLabel mb={ 0 }>Nome completo:</FormLabel>

          <Input
            variant="filled"
            { ...register('name') }
            data-testid="common_register__input-name"
          />
        </FormControl>

        <FormControl isDisabled={ isSubmitting } isInvalid={ errors.email } mt={ 2 }>
          <FormLabel mb={ 0 }>E-mail</FormLabel>

          <Input
            type="email"
            variant="filled"
            { ...register('email') }
            data-testid="common_register__input-email"
          />
        </FormControl>

        <FormControl isDisabled={ isSubmitting } isInvalid={ errors.password } mt={ 2 }>
          <FormLabel mb={ 0 }>Senha</FormLabel>

          <PasswordInput
            variant="filled"
            register={ register }
            isDisabled={ isSubmitting }
            data-testid="common_register__input-password"
          />
        </FormControl>

        <Stack direction="row-reverse" mt={ 10 }>
          <Button
            type="submit"
            colorScheme="green"
            isDisabled={ !isValid }
            isLoading={ isSubmitting }
            data-testid="common_register__button-register"
          >
            Cadastrar-se
          </Button>

          <Button
            colorScheme="red"
            variant="outline"
            isDisabled={ isSubmitting }
            onClick={ () => navigate(NAVIGATE_BACK) }
            data-testid="common_login__button-register"
          >
            Voltar
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}

export default Register;
