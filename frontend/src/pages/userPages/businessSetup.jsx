import React, { useEffect, useState } from 'react'
import { DocumentsList } from '../../components/documentsList';
import { Navigation } from '../../components/navigation';
import JsonData from "../../data/data.json";
import { Business } from '../../components/business'




function BusinessSetup() {

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
        <Navigation data={userInfo.fullname} status={'No Home'} />
        <Business data={landingPageData.Business}/>
    </div>
  )
}

export default BusinessSetup