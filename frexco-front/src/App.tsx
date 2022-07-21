
import { BrowserRouter } from 'react-router-dom';
import { AppThemeProvider } from './shared/contexts/ThemeContext';
import { AppRoutes } from './routes';
import { AuthProvider } from './shared/contexts/AuthContext';

import './shared/components/unform/TranslationYup';

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppThemeProvider>
    </AuthProvider>
  );
};