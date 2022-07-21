import { useNavigate, useMatch, Link } from 'react-router-dom';
import { Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';

import { IconLogin } from '../iconLogin/IconLogin';
import { SearchBar } from '../searchBar/SearchBar';
import { useSearch } from '../../hooks';

export const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { search, setSearchParams } = useSearch();

  function handleNavigate(){
    navigate(`/home?search=${search}`);
  } 

  const isHomepage = Boolean(useMatch('/home'));

  return (
    <>
      <Box
        width='100%'
        height='100%'
        display='flex'
        alignItems='center'
        justifyContent='space-around'
        bgcolor={theme.palette.background.paper}
      >
        <Link
          to="/"
          style={{textDecoration:'none'}}
        >
          <Typography
            variant='h5'
            component='h1'
            overflow='hidden'
            whiteSpace='nowrap'
            color={theme.palette.primary.main}
          >
          FrexcoShop
          </Typography>
        </Link>

        <SearchBar
          isVisibleButton={!isHomepage}
          textSearch={search}
          onChangeText={newText => setSearchParams({ search: newText }, { replace:true })}
          onClickButton={handleNavigate}
        />
        
        <IconLogin/>
      </Box>
    </>
  );
};