import React from 'react';
import {
  Container,
  Box,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  ScaleFade,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

function AuthLayout({ children, title, subtitle }) {
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
              {title}
            </Heading>
            <Text fontSize="lg" color="gray.600" textAlign="center">
              {subtitle}
            </Text>
            {children}
          </Stack>
        </MotionBox>
      </Container>
    </ScaleFade>
  );
}

export default AuthLayout; 