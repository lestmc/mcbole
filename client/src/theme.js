import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#1864ab', // 主色调
      600: '#1e88e5',
      700: '#1976d2',
      800: '#1565c0',
      900: '#0d47a1',
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: '12px',
        fontWeight: '500',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
          },
        },
      },
    },
    Input: {
      defaultProps: {
        focusBorderColor: 'brand.500',
      },
      variants: {
        filled: {
          field: {
            borderRadius: '12px',
            _focus: {
              borderColor: 'brand.500',
              boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
            },
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: '16px',
          overflow: 'hidden',
        },
      },
    },
    Alert: {
      baseStyle: {
        container: {
          borderRadius: '12px',
        },
      },
    },
  },
  styles: {
    global: {
      'html, body': {
        borderRadius: '16px',
      },
    },
  },
});

export default theme; 