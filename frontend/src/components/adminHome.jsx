import React, { useState, useEffect, useMemo } from 'react';

import { useNavigate } from 'react-router-dom';





// custom style

function AdminDashBoard() {
    const navigate = useNavigate()
    if(localStorage.ownerInfo !== undefined){
        var owner = JSON.parse(localStorage.ownerInfo);
      }

    
  return (
    <>
    </>
  )
}

export default AdminDashBoard