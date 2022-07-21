import { Routes, Route, Navigate } from 'react-router-dom';
import { Detail, Home, SignIn, SignUp, DashboardProduct, DashboardStock } from '../pages';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/detail/:id' element={<Detail />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/dashboard/products' element={<DashboardProduct />} />
      <Route path='/dashboard/stocks' element={<DashboardStock />} />
      
      <Route path='*' element={<Navigate to="/home" />} />
    </Routes>
  );
};