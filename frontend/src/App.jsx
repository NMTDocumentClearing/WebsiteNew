
import './App.css';

import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/adminRoutes';
import { Helmet } from 'react-helmet';

const admin = localStorage.getItem('adminInfo')
if(admin === undefined){
  Navigate('/admin')
}

function App() {
  
  
  
  return (
      <BrowserRouter>
          <Helmet>
            <link rel="icon" href="/img/NMT_page-0001-removebg-preview.png" type="image/x-icon" />
            <link rel="apple-touch-icon" href="/img/NMT_page-0001-removebg-preview.png" />
            <title>NMT Document Clearings</title>
          </Helmet>
          <Routes>
            <Route path='/*' element={<UserRoutes /> } />

             <Route path='/admin/*' element={<AdminRoutes />} />

             
           
          </Routes>
      </BrowserRouter>
  );
}

export default App;
