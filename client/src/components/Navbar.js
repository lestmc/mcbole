import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useColorMode,
  Container,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  MenuDivider,
} from '@chakra-ui/react';
import { BsSun, BsMoon } from 'react-icons/bs';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { getUser, logout, isAdmin } from '../utils/auth';

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = getUser();

  return (
    <Box bg={colorMode === 'light' ? 'brand.500' : 'gray.900'} px={4} position="sticky" top={0} zIndex={1000}>
      <Container maxW="container.xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <HStack spacing={8} alignItems="center">
            <Box>
              <Link
                as={RouterLink}
                to="/"
                fontSize="xl"
                fontWeight="bold"
                color="white"
                _hover={{ textDecoration: 'none' }}
              >
                MCBole
              </Link>
            </Box>
            <HStack spacing={4}>
              <Link as={RouterLink} to="/" color="white" px={2}>
                主页
              </Link>
              <Link as={RouterLink} to="/resources" color="white" px={2}>
                资源
              </Link>
            </HStack>
          </HStack>

          <HStack spacing={4}>
            <IconButton
              icon={colorMode === 'light' ? <BsMoon /> : <BsSun />}
              onClick={toggleColorMode}
              variant="ghost"
              color="white"
              _hover={{ bg: 'whiteAlpha.200' }}
              aria-label="切换主题"
            />
            
            {user ? (
              <Menu>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  color="white"
                  rightIcon={<ChevronDownIcon />}
                  _hover={{ bg: 'whiteAlpha.200' }}
                  _active={{ bg: 'whiteAlpha.300' }}
                >
                  <HStack>
                    <Avatar
                      size="sm"
                      name={user.username}
                      src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
                    />
                    <Text display={{ base: 'none', md: 'block' }}>
                      {user.username}
                    </Text>
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem as={RouterLink} to="/profile">
                    个人资料
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/settings">
                    设置
                  </MenuItem>
                  {isAdmin() && (
                    <>
                      <MenuDivider />
                      <MenuItem as={RouterLink} to="/admin">
                        管理面板
                      </MenuItem>
                    </>
                  )}
                  <MenuDivider />
                  <MenuItem onClick={logout} color="red.500">
                    退出登录
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <>
                <Button
                  as={RouterLink}
                  to="/login"
                  variant="ghost"
                  color="white"
                  _hover={{ bg: 'whiteAlpha.200' }}
                >
                  登录
                </Button>
                <Button
                  as={RouterLink}
                  to="/register"
                  variant="outline"
                  color="white"
                  borderColor="white"
                  _hover={{ bg: 'whiteAlpha.200' }}
                >
                  注册
                </Button>
              </>
            )}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}

export default Navbar; 