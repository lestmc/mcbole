import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  Link,
  useColorModeValue,
  ScaleFade,
  InputGroup,
  InputRightElement,
  IconButton,
  useDisclosure,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

function Login() {
  const { isOpen, onToggle } = useDisclosure();
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 处理登录逻辑
  };

  return (
    <ScaleFade initialScale={0.9} in={true}>
      <Container maxW="container.sm" py={12}>
        <MotionBox
          bg={useColorModeValue('white', 'gray.800')}
          p={8}
          rounded="xl"
          shadow="lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Stack spacing={6}>
            <Heading
              textAlign="center"
              fontSize="4xl"
              color={useColorModeValue('gray.900', 'white')}
            >
              欢迎回来
            </Heading>
            <Text fontSize="lg" color="gray.600" textAlign="center">
              登录您的MCBole账号 ✨
            </Text>

            {error && (
              <Alert status="error" rounded="md">
                <AlertIcon />
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Stack spacing={5}>
                <FormControl id="username">
                  <FormLabel>用户名</FormLabel>
                  <Input
                    type="text"
                    required
                    size="lg"
                    variant="filled"
                    _hover={{
                      borderColor: 'brand.500',
                    }}
                    _focus={{
                      borderColor: 'brand.500',
                      boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
                    }}
                  />
                </FormControl>

                <FormControl id="password">
                  <FormLabel>密码</FormLabel>
                  <InputGroup size="lg">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      required
                      variant="filled"
                      _hover={{
                        borderColor: 'brand.500',
                      }}
                      _focus={{
                        borderColor: 'brand.500',
                        boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
                      }}
                    />
                    <InputRightElement>
                      <IconButton
                        variant="ghost"
                        onClick={() => setShowPassword(!showPassword)}
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        aria-label={showPassword ? '隐藏密码' : '显示密码'}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="brand"
                  size="lg"
                  fontSize="md"
                  as={motion.button}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  登录
                </Button>
              </Stack>
            </form>

            <Stack pt={2}>
              <Text align="center">
                还没有账号？{' '}
                <Link
                  as={RouterLink}
                  to="/register"
                  color="brand.500"
                  _hover={{
                    textDecoration: 'none',
                    color: 'brand.600',
                  }}
                >
                  立即注册
                </Link>
              </Text>
              <Link
                color="brand.500"
                href="#"
                textAlign="center"
                _hover={{
                  textDecoration: 'none',
                  color: 'brand.600',
                }}
              >
                忘记密码？
              </Link>
            </Stack>
          </Stack>
        </MotionBox>
      </Container>
    </ScaleFade>
  );
}

export default Login; 