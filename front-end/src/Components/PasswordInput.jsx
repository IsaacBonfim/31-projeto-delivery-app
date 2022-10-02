import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Tooltip,
} from '@chakra-ui/react';

function PasswordInput({ register, ...rest }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputGroup>
      <Input
        type={ showPassword ? 'text' : 'password' }
        { ...(register ? register('password') : {}) }
        { ...rest }
      />

      <InputRightElement>
        <Tooltip
          borderRadius="md"
          closeOnClick={ false }
          label={ showPassword ? 'Esconder' : 'Mostrar' }
          placement="top"
        >
          <IconButton
            aria-label={ showPassword ? 'Esconder' : 'Mostrar' }
            size="sm"
            variant="ghost"
            icon={ showPassword ? <IoMdEyeOff size={ 20 } /> : <IoMdEye size={ 20 } /> }
            isDisabled={ rest.isDisabled }
            onClick={ () => setShowPassword(!showPassword) }
            onMouseDown={ (event) => event.preventDefault() }
          />
        </Tooltip>
      </InputRightElement>
    </InputGroup>
  );
}

PasswordInput.propTypes = {
  register: PropTypes.func,
};

PasswordInput.defaultProps = {
  register: null,
};

export default PasswordInput;
