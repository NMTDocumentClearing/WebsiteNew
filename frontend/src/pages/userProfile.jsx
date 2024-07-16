import React, { useEffect, useState } from 'react'
// import JsonData from "../../data/data.json";
// import { UsersLogin } from '../../components/usersLogin';
import { Profile } from '../components/profile';
import {Navigation} from '../components/navigation'
import JsonData from "../data/data.json";



function UserProfile() {

  
  
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
        <Profile/>
    </div>
  )
}

export default UserProfile