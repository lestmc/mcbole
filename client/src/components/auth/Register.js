import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
import axios from 'axios';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [countdown, setCountdown] = useState(0);
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
      await axios.post('/api/auth/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || '注册失败，请重试');
    }
  };

  const sendVerificationCode = async () => {
    try {
      setIsSending(true);
      await axios.post('/api/auth/send-code', { email: formData.email });
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError('发送验证码失败，请重试');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AuthLayout
      title="创建账号"
      subtitle="加入MCBole社区 🎮"
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

          <FormControl id="email">
            <FormLabel>邮箱</FormLabel>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
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

          <FormControl id="verificationCode">
            <FormLabel>验证码</FormLabel>
            <InputGroup size="lg">
              <Input
                name="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                type="text"
                required
                variant="filled"
                placeholder="请输入验证码"
              />
              <InputRightElement width="auto" pr={2}>
                <Button
                  size="sm"
                  onClick={sendVerificationCode}
                  isLoading={isSending}
                  disabled={countdown > 0}
                >
                  {countdown > 0 ? `${countdown}s` : '发送验证码'}
                </Button>
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
            注册
          </Button>
        </Stack>
      </form>

      <Stack pt={2}>
        <Text align="center">
          已有账号？{' '}
          <Link
            as={RouterLink}
            to="/login"
            color="brand.500"
            _hover={{
              textDecoration: 'none',
              color: 'brand.600',
            }}
          >
            立即登录
          </Link>
        </Text>
      </Stack>
    </AuthLayout>
  );
}

export default Register; 