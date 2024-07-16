import React, { useEffect, useState } from 'react'
import { ApplicationsList } from '../../components/applicationsList';
import JsonData from "../../data/data.json";
import { Navigation } from '../../components/navigation';


function ApplicatiosListPage() {

  
  
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
    <div >
        <Navigation data={userInfo.fullname} status={'No Home'}/>
        <ApplicationsList/>
    </div>
  )
}

export default ApplicatiosListPage