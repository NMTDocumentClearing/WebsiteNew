import React, { useEffect, useState } from 'react'
import { DocumentsList } from '../../components/documentsList';
import { Navigation } from '../../components/navigation';
import JsonData from "../../data/data.json";


function DocumentsListPage() {

  

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
        <DocumentsList/>
    </div>
  )
}

export default DocumentsListPage