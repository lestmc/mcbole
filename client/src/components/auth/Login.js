import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Text,
  InputGroup,
  InputRightElement,
  IconButton,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import AuthLayout from './AuthLayout';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', formData);
      
      // 保存token到localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // 登录成功后跳转
      if (response.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || '登录失败，请重试');
    }
  };

  return (
    <AuthLayout
      title="欢迎回来"
      subtitle="登录您的MCBole账号 ✨"
    >
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
              name="username"
              value={formData.username}
              onChange={handleChange}
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
                name="password"
                value={formData.password}
                onChange={handleChange}
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
          还没���账号？{' '}
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
    </AuthLayout>
  );
}

export default Login; 