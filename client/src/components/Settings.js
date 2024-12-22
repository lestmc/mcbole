import React from 'react';
import {
  Container,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Card,
  CardBody,
  useColorModeValue,
  Switch,
  Text,
} from '@chakra-ui/react';
import { getUser } from '../utils/auth';

function Settings() {
  const user = getUser();
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Container maxW="container.md" py={8}>
      <Card bg={bgColor} shadow="lg">
        <CardBody>
          <VStack spacing={6} align="stretch">
            <Heading size="lg" mb={4}>账号设置</Heading>

            <FormControl>
              <FormLabel>用户名</FormLabel>
              <Input defaultValue={user.username} />
            </FormControl>

            <FormControl>
              <FormLabel>邮箱</FormLabel>
              <Input type="email" defaultValue={user.email} />
            </FormControl>

            <FormControl>
              <FormLabel>头像URL</FormLabel>
              <Input defaultValue={user.avatar} placeholder="输入头像图片链接" />
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel mb={0}>
                接收邮件通知
              </FormLabel>
              <Switch colorScheme="brand" defaultChecked />
            </FormControl>

            <Box pt={4}>
              <Button colorScheme="brand" size="lg">
                保存更改
              </Button>
            </Box>

            <Box borderTop="1px" borderColor="gray.200" pt={6}>
              <Heading size="md" color="red.500" mb={4}>
                危险区域
              </Heading>
              <Text mb={4} color="gray.600">
                以下操作不可撤销，请谨慎操作
              </Text>
              <Button colorScheme="red" variant="outline">
                删除账号
              </Button>
            </Box>
          </VStack>
        </CardBody>
      </Card>
    </Container>
  );
}

export default Settings; 