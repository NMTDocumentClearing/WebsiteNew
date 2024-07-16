import React from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import HomePage from '../pages/userPages/userHome'
import UserLogin from '../pages/userPages/userLogin'
import UserSignup from '../pages/userPages/userSignup'
import ProtectedRoutes from './ProtectedRoutes'
import UserProfile from '../pages/userProfile'
import EmployeesListPage from '../pages/userPages/employeesListPage'
import BusinessSetup from '../pages/userPages/businessSetup'
import VisaSetup from '../pages/userPages/visaSetup'
import LabourServices from '../pages/userPages/labourServices'
import OnlineServices from '../pages/userPages/onlineServices'
import ApplicatiosListPage from '../pages/userPages/applicationListPage'
import DocumentsListPage from '../pages/userPages/documentsListPage'
import UserErrorPage from '../pages/userPages/userErrorPage'


function UserRoutes() {
    return (
    
        <Routes>
            
                <Route >
                    <Route path='/' element={<HomePage />}/>
                </Route >
                <Route  element={<ProtectedRoutes type="user" />}>
                    <Route path='/profile' element={<UserProfile />}/>
                </Route >
                <Route  element={<ProtectedRoutes type="user" />}>
                    <Route path='/employees' element={<EmployeesListPage />}/>
                </Route >
                <Route  element={<ProtectedRoutes type="user" />}>
                    <Route path='/documents' element={<DocumentsListPage />}/>
                </Route >
                <Route  element={<ProtectedRoutes type="user" />}>
                    <Route path='/applications' element={<ApplicatiosListPage />}/>
                </Route >
                <Route  element={<ProtectedRoutes type="user" />}>
                    <Route path='/businesssetup' element={<BusinessSetup />}/>
                </Route >

                <Route  element={<ProtectedRoutes type="user" />}>
                    <Route path='/visaservices' element={<VisaSetup />}/>
                </Route >

                <Route  element={<ProtectedRoutes type="user" />}>
                    <Route path='/labourservices' element={<LabourServices />}/>
                </Route >

                <Route  element={<ProtectedRoutes type="user" />}>
                    <Route path='/onlineservices' element={<OnlineServices />}/>
                </Route >
                
                <Route >
                    <Route path='/*' element={<UserErrorPage />} />
                    <Route path='/login' element={<UserLogin />}/>
                </Route>
                
                  <Route path='/signup' element={<UserSignup />}/>
                
                
        </Routes>
    
  )
}

export default UserRoutes