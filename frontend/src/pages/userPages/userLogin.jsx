import React, { useEffect, useState } from 'react'
import JsonData from "../../data/data.json";
import { UsersLogin } from '../../components/usersLogin';



function UserLogin() {

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);
  
  const [landingPageData, setLandingPageData] = useState({});
  

  return (
    <div >
        <UsersLogin data={landingPageData.loginstatus}/>
    </div>
  )
}

export default UserLogin