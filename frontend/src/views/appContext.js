import React, { createContext, useEffect, useState } from 'react';
import { getAllLaboursList, getUsersDatas } from '../api/adminAPI';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [employeesWithExpiry, setEmployeesWithExpiry] = useState([]);
  const [labourDatas, setLabourDatas] = useState([]);
  const [usersData, setUsersData] = useState([]);


  const [expiringLabours, setExpiringLabours] = useState([])

  useEffect(()=>{
    async function getLabourData(){
      try {
          const {data} = await getAllLaboursList()
          if(data){
            setLabourDatas(data.data)
          }
          const userData = await getUsersDatas()
          if(userData){
            setUsersData(userData.data.data)
          }
      } catch (error) {
         console.log(error);
      }  
    }
    getLabourData()
  },[])



  useEffect(()=>{
    // console.log(labourData)
      const companyData = labourDatas.reduce((accumulator, currentValue) => {
              const labourString = currentValue.labourCardExpiry;
              const labourNew = new Date(labourString);
              const currentDate = new Date();
              const differenceInMs = labourNew - currentDate;
              const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
          
              const idString = currentValue.idCardExpiry;
              const idNew = new Date(idString);
              const IddifferenceInMs = idNew - currentDate;
              const IddifferenceInIdDays = IddifferenceInMs / (1000 * 60 * 60 * 24);
          
              if (!accumulator[currentValue.company]) {
                accumulator[currentValue.company] = {
                    data: [currentValue],
                    labourExpiry: differenceInDays < 15 ? [currentValue] : [],
                    idExpiry: IddifferenceInIdDays < 15 ? [currentValue] : []
                };
              } else {
                  // If exists, push the current value to the existing array
                  accumulator[currentValue.company].data.push(currentValue);
                  if (differenceInDays >= 0 && differenceInDays < 15) {
                      accumulator[currentValue.company].labourExpiry.push(currentValue);
                  }
                  if (differenceInDays >= 0 && IddifferenceInIdDays < 15) {
                      accumulator[currentValue.company].idExpiry.push(currentValue);
                  }
              }
        return accumulator;
    }, {});
  
    const companyDataArray = Object.entries(companyData).map(([company, data]) => ({
      company,
      data: data.data,
      labourExpiry: data.labourExpiry,
      idExpiry: data.idExpiry
    }));
    
    if(companyDataArray.length >0){
      setEmployeesWithExpiry(companyDataArray)
    } 
  },[labourDatas])

  useEffect(() => {
    const expiringLabours = labourDatas.reduce((acc, curr) => {
      const idString = curr.idCardExpiry;
      const idNew = new Date(idString);
      const currentDate = new Date();
      const differenceInMs = idNew - currentDate;
      const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
  
      if (differenceInDays >= 0 && differenceInDays < 15) {
        acc.push(curr);
      }
  
      return acc;
    }, []);
  

    const expiringDocuments = usersData.reduce((acc, user) => {
      user.documents.forEach((document) => {
        const docExpiry = new Date(document.expiry);
        const currentDate = new Date();
        const differenceInMs = docExpiry - currentDate;
        const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
  
        if (differenceInDays >= 0 && differenceInDays < 15) {
          acc.push({
            companyName: user.fullname,
            email: user.email,
            type: 'Document Expiry',
            docType: document.type,
            docNumber: document.documentNumber,
            companyId:{
              fullname: user.fullname,
              email:user.email
            },
            expiry: document.expiry,
          });
        }
      });
  
      return acc;
    }, []);
  
    // Combine expiring labors and documents
    const combinedExpiringLabours = [...expiringLabours, ...expiringDocuments];

    // console.log(combinedExpiringLabours);
  
    setExpiringLabours(combinedExpiringLabours);
  }, [labourDatas, usersData]);


  useEffect(()=>{
    console.log(labourDatas);
  },[labourDatas])


  return (
    <AppContext.Provider value={ {labourDatas, employeesWithExpiry, setEmployeesWithExpiry, expiringLabours} }>
      {children}
    </AppContext.Provider>
  );
};