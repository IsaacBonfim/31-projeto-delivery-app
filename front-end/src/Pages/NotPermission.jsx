import React from 'react';
import { Center } from '@chakra-ui/react';
import '../Styles/NotFound.css';

function NotPermission() {
  return (
    <Center flexDir="column" minH="100vh">
      <h1 className="top-text">You not</h1>
      <h1 className="middle-text">have</h1>
      <h1 className="not-found">
        Permission
      </h1>
    </Center>
  );
}

export default NotPermission;
