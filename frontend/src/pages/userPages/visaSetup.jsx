import React, { useEffect, useState } from 'react'
import { Visa } from '../../components/visa'
import JsonData from "../../data/data.json";
import { Navigation } from '../../components/navigation';

function VisaSetup() {
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
        <Visa data={landingPageData.VIsaServices}/>
    </div>
  )
}

export default VisaSetup