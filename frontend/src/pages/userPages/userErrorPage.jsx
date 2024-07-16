import React, { useEffect, useState } from 'react'
import JsonData from "../../data/data.json";
import {ErrorComp} from "../../components/errorComp"


function UserErrorPage() {

  return (
    <div >
        <ErrorComp />
    </div>
  )
}

export default UserErrorPage