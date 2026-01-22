import { createTheme, type MantineColorsTuple } from '@mantine/core';

// Wine/Brown color palette - earthy, warm tones
const brown: MantineColorsTuple = [
  '#faf8f6',
  '#f5f1ec',
  '#ede5db',
  '#e0d4c4',
  '#c9b8a3',
  '#a68b6f',
  '#8b6f47',
  '#6d5638',
  '#4d3d28',
  '#2e2418',
];

// Gold/Amber accents
const gold: MantineColorsTuple = [
  '#fffbf0',
  '#fff8e1',
  '#ffecb3',
  '#ffe082',
  '#ffd54f',
  '#ffc107',
  '#ffb300',
  '#ffa000',
  '#ff8f00',
  '#ff6f00',
];

// Neutral grays for text and backgrounds
const gray: MantineColorsTuple = [
  '#fafafa',
  '#f5f5f5',
  '#eeeeee',
  '#e0e0e0',
  '#bdbdbd',
  '#9e9e9e',
  '#757575',
  '#616161',
  '#424242',
  '#212121',
];

export const professionalTheme = createTheme({
  primaryColor: 'brown',
  primaryShade: 6,
  
  colors: {
    brown,
    gold,
    gray,
  },

  fontFamily: '"Playfair Display", "Cormorant Garamond", "Georgia", serif',
  
  headings: {
    fontFamily: '"Playfair Display", "Cormorant Garamond", "Georgia", serif',
    fontWeight: '600',
    sizes: {
      h1: { fontSize: '3.5rem', lineHeight: '1.1', fontWeight: '600' },
      h2: { fontSize: '2.75rem', lineHeight: '1.2', fontWeight: '600' },
      h3: { fontSize: '2.25rem', lineHeight: '1.3', fontWeight: '600' },
      h4: { fontSize: '1.875rem', lineHeight: '1.4', fontWeight: '600' },
      h5: { fontSize: '1.5rem', lineHeight: '1.5', fontWeight: '600' },
      h6: { fontSize: '1.25rem', lineHeight: '1.5', fontWeight: '600' },
    },
  },

  defaultRadius: 'sm',
  
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },

  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },

  components: {
    Button: {
      defaultProps: {
        radius: 'sm',
        color: 'brown',
      },
      styles: {
        root: {
          fontWeight: 500,
          letterSpacing: '0.025em',
          textTransform: 'uppercase',
          fontSize: '0.875rem',
        },
      },
    },
    Card: {
      defaultProps: {
        radius: 'sm',
        shadow: 'sm',
        withBorder: true,
      },
      styles: {
        root: {
          borderColor: '#e0d4c4',
          backgroundColor: '#ffffff',
        },
      },
    },
    Input: {
      defaultProps: {
        radius: 'sm',
      },
      styles: {
        input: {
          borderColor: '#e0d4c4',
          backgroundColor: '#fafafa',
          '&:focus': {
            borderColor: '#8b6f47',
          },
        },
      },
    },
    Badge: {
      defaultProps: {
        radius: 'sm',
      },
    },
  },

  other: {
    bodyBackground: '#faf8f6',
    textColor: '#2e2418',
    borderColor: '#e0d4c4',
  },
});
