import { useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Header } from '../../components/header/Header';

interface ILayoutBaseProps {
  children: React.ReactNode;
}

export const LayoutBase: React.FC<ILayoutBaseProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <Box height='100%' width="100vw" display='flex' flexDirection='column' justifyContent='center'>
      <Box display='flex' alignItems='center' height={theme.spacing(8)}>
        <Header/>
      </Box>

      <Box flex={1} overflow='auto'>
        {children}
      </Box>
    </Box>
  );
};