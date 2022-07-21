import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

import { AuthContext } from '../../contexts/AuthContext';

export const IconLogin = () => {
  const navigate = useNavigate();

  const { user, signOut } = useContext(AuthContext);

  const handleLogin = () => {
    navigate('/signin');
  };
  const handleClickAdmin = () => {
    navigate('/dashboard/products');
  };
  const handleLogout = () => {
    signOut();
  };


  return (
    <>
      {user ? 
        <Button
          variant="text"
          size="large"
          onClick={() => handleLogout()}
          endIcon={<PersonIcon/>}
          aria-label="login"
        >
          <Typography variant='button' color="primary">
          Logout
          </Typography>
        </Button>
        :
        <Button
          variant="text"
          size="large"
          onClick={() => handleLogin()}
          endIcon={<PersonIcon/>}
          aria-label="login"
        >
          <Typography variant='button' color="primary">
              Login
          </Typography>
        </Button>
      }

      {user?.isAdmin && 
      <Button
        variant="text"
        size="large"
        onClick={() => handleClickAdmin()}
        aria-label="botao-admin"
      >
        <Typography variant='button' color="primary">
        Admin
        </Typography>
      </Button>
      }
    </>  
  );
};