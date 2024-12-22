import React from 'react';
import { Box, Container, Heading } from '@chakra-ui/react';
import { isAdmin } from '../../utils/auth';
import { Navigate } from 'react-router-dom';

function AdminLayout() {
  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Box>
        <Heading>管理员面板</Heading>
        {/* 添加管理员功能 */}
      </Box>
    </Container>
  );
}

export default AdminLayout; 