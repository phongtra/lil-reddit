import { Box } from '@chakra-ui/core';

interface WrapperProps {
  variant?: 'small' | 'regular';
}

export const Wrappper: React.FC<WrapperProps> = ({
  children,
  variant = 'regular'
}) => {
  return (
    <Box
      maxW={variant === 'regular' ? '800px' : '400px'}
      w='100%'
      mt={8}
      mx='auto'
    >
      {children}
    </Box>
  );
};