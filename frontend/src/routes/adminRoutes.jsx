import React, { lazy } from 'react';
import {Routes, Route,Switch, BrowserRouter, Redirect} from 'react-router-dom'
import HomePage from '../pages/userPages/userHome'
import OwnerDashBoard from '../components/adminHome'
import ProtectedRoutes from './ProtectedRoutes'
import AdminHomePage from '../pages/adminPages/adminHome'
import AdminLogin from '../pages/adminPages/adminLoginPage'
import AdminSignup from '../pages/adminPages/adminSignupPage'
import { Helmet } from 'react-helmet';

import Loadable from '../components/adminComponents/Loadable';
import MainLayout from '../layout/MainLayout';
import MinimalLayout from '../layout/MinimalLayout';

const DashboardDefault = Loadable(lazy(() => import('../views/Dashboard')));

const SamplePage = Loadable(lazy(() => import('../views/SamplePage')));
const AuthLogin = Loadable(lazy(() => import('../views/Login')));
const AuthRegister = Loadable(lazy(() => import('../views/Register')));
const TablePage = Loadable(lazy(() => import('../views/Table')));
const Accounts = Loadable(lazy(() => import('../views/accounts')));
const LabourList = Loadable(lazy(() => import('../views/labourList')));
const DaySheet = Loadable(lazy(() => import('../views/Daysheet')))
const Invoice = Loadable(lazy(() => import('../views/Invoice')))
const Application = Loadable(lazy(() => import('../views/Applications')))
const Documents = Loadable(lazy(() => import('../views/DocumentsList')))
const LoginRequests = Loadable(lazy(() => import('../views/LoginRequests')))
const Notification = Loadable(lazy(() => import('../views/Notifications')))
const Error = Loadable(lazy(() => import('../views/ErrorPage')))


function MainRoutes() {
    return (
    <>
        <Helmet>
                <link rel="icon" href="/img/NMT_page-0001-removebg-preview.png" type="image/x-icon" />
                <link rel="apple-touch-icon" href="/img/NMT_page-0001-removebg-preview.png" />
                <title>NMT Document Clearings</title>
        </Helmet>
        <Routes>
            <Route element={<MainLayout />}>
                <Route element={<ProtectedRoutes type="admin" />}>
                    <Route path='/' element={<DashboardDefault />} />
                    <Route path='/dashboard/default' element={<DashboardDefault />} />
                    <Route path='/profile' element={<SamplePage />} />
                    <Route path='/companies' element={<TablePage />} />
                    <Route path='/accounts' element={<Accounts />} />
                    <Route path='/daysheet' element={<DaySheet />} />
                    <Route path='/invoices' element={<Invoice />} />
                    <Route path='/applications' element={<Application />} />
                    <Route path='/notifications' element={<Notification />} />
                    <Route path='/showlabourlist' element={<LabourList />} />
                    <Route path='/showdocumentlist' element={<Documents />} />
                    <Route path='/pendingusers' element={<LoginRequests />} />
                </Route>
            </Route>

            <Route element={<MinimalLayout />}>
                    <Route path='/*' element={<Error />} />
                    <Route path='/login' element={<AuthLogin />} />
                    {/* <Route path='/signup' element={<AuthRegister />} /> */}
            </Route>
      
      
            {/* <Route>
                <Route path='/login' element={<AdminLogin />} />
            </Route> */}

            {/* <Route>
                <Route path='/signup' element={<AdminSignup />} />
            </Route> */}
  </Routes>
  </>
    
  )
}

export default MainRoutes