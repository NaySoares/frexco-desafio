import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, TextField, useTheme } from '@mui/material';

import { Environment } from '../../environment';

interface ISearchBarProps {
  textSearch?: string;
  onChangeText?: (newText: string) => void;
  onClickButton?: () => void;
  isVisibleButton?: boolean;
}

export const SearchBar: React.FC<ISearchBarProps> = ({
  textSearch = '',
  onChangeText,
  onClickButton,
  isVisibleButton = true
}: ISearchBarProps) => {
  const theme = useTheme();

  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      width='60%'
      display='flex'
      alignItems='center'
      height={theme.spacing(5)}
    >
      <TextField
        sx={{ m: 1, width: '100%' }}
        size="small"
        placeholder={Environment.INPUT_SEARCH}
        value={textSearch}
        onChange={(e) => onChangeText?.(e.target.value)}
      />

      {isVisibleButton && (
        <Box
          marginLeft='auto'
          display='flex'
          justifyContent='end'
        >
          <Button
            endIcon={<SearchIcon/>}
            onClick={onClickButton}
          >
          Buscar
          </Button>
        </Box>
      )}
    </Box>
  );
};