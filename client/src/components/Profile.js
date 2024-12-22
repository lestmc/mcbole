import React from 'react';
import {
  Container,
  Box,
  Heading,
  VStack,
  Text,
  Avatar,
  Card,
  CardBody,
  Stack,
  StackDivider,
  useColorModeValue,
} from '@chakra-ui/react';
import { getUser } from '../utils/auth';

function Profile() {
  const user = getUser();
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Container maxW="container.md" py={8}>
      <Card bg={bgColor} shadow="lg">
        <CardBody>
          <VStack spacing={6} align="center" mb={6}>
            <Avatar
              size="2xl"
              name={user.username}
              src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
            />
            <Heading size="lg">{user.username}</Heading>
            <Text color="gray.500">{user.email}</Text>
          </VStack>

          <Stack divider={<StackDivider />} spacing={4}>
            <Box>
              <Heading size="xs" textTransform="uppercase" mb={2}>
                角色
              </Heading>
              <Text>{user.role === 'admin' ? '管理员' : '普通用户'}</Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase" mb={2}>
                账号状态
              </Heading>
              <Text>{user.status === 'active' ? '正常' : '已禁用'}</Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase" mb={2}>
                注册时间
              </Heading>
              <Text>{new Date(user.createdAt).toLocaleString()}</Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </Container>
  );
}

export default Profile; 