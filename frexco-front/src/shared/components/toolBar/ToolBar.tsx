import { Button, Icon, TextField, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { Environment } from '../../environment';

interface ISearchBarProps {
  textSearch?: string;
  onChangeText?: (newText: string) => void;
  onClickButtonNew?: () => void;
  onClickButtonList?: () => void;
  nameList?: string;
  isVisibleButtonNew?: boolean;
  isVisibleButtonList?: boolean;
}

export const ToolBar: React.FC<ISearchBarProps> = ({
  textSearch = '',
  nameList = 'Estoque', 
  onChangeText,
  onClickButtonNew,
  onClickButtonList,
  isVisibleButtonList = true,
  isVisibleButtonNew = true
}: ISearchBarProps) => {
  const theme = useTheme();

  return (
    <Box
      marginY={2}
      padding={1}
      paddingX={4}
      width='100%'
      display='flex'
      alignItems='center'
      height={theme.spacing(6)}
      bgcolor={theme.palette.background.paper}
    >
      <TextField
        sx={{ m: 1, width: '40%' }}
        size="small"
        placeholder={Environment.INPUT_SEARCH}
        value={textSearch}
        onChange={(e) => onChangeText?.(e.target.value)}
      />

      {isVisibleButtonNew && (
        <Box
          marginLeft='auto'
          display='flex'
        >
          <Button
            variant='outlined'
            endIcon={<Icon>add</Icon>}
            onClick={onClickButtonNew}
          >
          Novo
          </Button>
        </Box>
      )}
      {isVisibleButtonList && (
        <Box
          marginLeft={isVisibleButtonNew ? '0' : 'auto'}
          display='flex'
        >
          <Button
            sx={{mx: '8px'}}
            variant='outlined'
            onClick={onClickButtonList}
          >
            {nameList}
          </Button>
        </Box>
      )}
    </Box>
  );
};