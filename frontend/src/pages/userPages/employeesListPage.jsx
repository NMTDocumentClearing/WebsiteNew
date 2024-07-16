import React, { useEffect, useState } from 'react'
import { EmployeesList } from '../../components/employeesList';
import JsonData from "../../data/data.json";
import { Navigation } from '../../components/navigation';



function EmployeesListPage() {
  const [landingPageData, setLandingPageData] = useState({});
  const [userInfo, setUserInfo] = useState('')
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if(userInfo !== undefined) {
      setUserInfo(JSON.parse(userInfo));
    }
  }, []);

  return (
    <div style={{overflow:'hidden'}}>
        <Navigation data={userInfo.fullname} status={'No Home'}/>
        <EmployeesList/>
    </div>
  )
}

export default EmployeesListPage