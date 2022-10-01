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
  FormErrorMessage,
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
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm({ resolver: yupResolver(schema) });

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

  // const [password, setPassword] = useState('');
  // const [registerError, setRegisterError] = useState('');
  // const [errorMessage, setErrorMessage] = useState(false);
  // const { email, btnLoginDisabled, name, setEmail,
  //   setBtnLogin, setName } = useContext(appContext);

  // useEffect(() => {
  //   const handleChage = () => {
  //     const nName = 11;
  //     const nPassword = 5;
  //     const validEmail = /\S+@\S+\.\S+/.test(email);

  //     if (name.length > nName && password.length > nPassword && validEmail) {
  //       setBtnLogin(false);
  //     } else {
  //       setBtnLogin(true);
  //     }
  //   };
  //   handleChage();
  // }, [name, email, password, setBtnLogin]);

  // const validateRegister = async () => {
  //   const result = await requestAccess('/register', { name, email, password });

  //   if (result.message) {
  //     setRegisterError(result.message);
  //     setErrorMessage(true);
  //   } else {
  //     setAccessInfo(result);
  //     history('/customer/products');
  //   }
  // };

  return (
    <Center minH="100vh">
      <Box
        as="form"
        bgColor="gray.300"
        borderRadius="xl"
        boxShadow="lg"
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

          <FormErrorMessage fontSize="xs" justifyContent="flex-end" mt={ 1 }>
            {errors.name?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isDisabled={ isSubmitting } isInvalid={ errors.email } mt={ 2 }>
          <FormLabel mb={ 0 }>E-mail</FormLabel>

          <Input
            type="email"
            variant="filled"
            { ...register('email') }
            data-testid="common_register__input-email"
          />

          <FormErrorMessage fontSize="xs" justifyContent="flex-end" mt={ 1 }>
            {errors.email?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isDisabled={ isSubmitting } isInvalid={ errors.password } mt={ 2 }>
          <FormLabel mb={ 0 }>Senha</FormLabel>

          <PasswordInput
            variant="filled"
            register={ register }
            isDisabled={ isSubmitting }
            data-testid="common_register__input-password"
          />

          <FormErrorMessage fontSize="xs" justifyContent="flex-end" mt={ 1 }>
            {errors.password?.message}
          </FormErrorMessage>
        </FormControl>

        <Stack direction="row-reverse" mt={ 10 }>
          <Button
            type="submit"
            colorScheme="green"
            isLoading={ isSubmitting }
            data-testid="common_login__button-login"
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
    // <div className="main-container">
    //   <h1 className="app-title">Delivery App</h1>

  //   <div className="register-input-container">
  //     <input
  //       type="name"
  //       name="name"
  //       placeholder="Informe seu Nome"
  //       className="access-input"
  //       data-testid="common_register__input-name"
  //       value={ name }
  //       onChange={ ({ target }) => setName(target.value) }
  //     />
  //     <input
  //       type="email"
  //       name="email"
  //       placeholder="Informe seu email"
  //       className="access-input"
  //       data-testid="common_register__input-email"
  //       value={ email }
  //       onChange={ ({ target }) => setEmail(target.value) }
  //     />
  //     <input
  //       type="password"
  //       name="password"
  //       placeholder="Informe sua senha"
  //       className="access-input"
  //       data-testid="common_register__input-password"
  //       value={ password }
  //       onChange={ ({ target }) => setPassword(target.value) }
  //     />
  //     <button
  //       type="button"
  //       className="access-button"
  //       data-testid="common_register__button-register"
  //       disabled={ btnLoginDisabled }
  //       onClick={ validateRegister }
  //     >
  //       CADASTRAR
  //     </button>
  //   </div>

  //   { errorMessage
  //     && (
  //       <p
  //         className="error-message"
  //         data-testid="common_register__element-invalid_register"
  //       >
  //         { registerError }
  //       </p>
  //     )}
  // </div>
  );
}

export default Register;
