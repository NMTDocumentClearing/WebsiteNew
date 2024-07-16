import React, { useEffect, useState } from 'react'
import { Navigation } from '../../components/navigation'
import { Header } from '../../components/header'
import { Features } from '../../components/features';
import { About } from '../../components/about';
import { Services } from '../../components/services';
import { Testimonials } from '../../components/testimonials';
import { Contact } from '../../components/contact';
import { Team } from '../../components/team';
import JsonData from "../../data/data.json";
import { getIdExpiringLabours } from '../../api/userAPI';
import { Alerts } from '../../components/alerts';
import { Clients } from '../../components/clients';



function HomePage() {
  // const dispatch = useDispatch()
  const [userInfo, setUserInfo] = useState('')
  const [idExpiringLabours, setIdExpiringLabours] = useState([])
  const [labourExpiringLabours, setLabourExpiringLabours] = useState([])
  const [documentsExpiring, setDocumentsExpiring] = useState([])
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);


  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if(userInfo !== undefined) {
      setUserInfo(JSON.parse(userInfo));
    }
    
  }, []);

  useEffect(() => {
    async function getExpiringLabours(id) {
      try {
        const { data } = await getIdExpiringLabours(id);
        if (data) {
          setIdExpiringLabours(data.data);
          setLabourExpiringLabours(data.labourData);
          setDocumentsExpiring(data.ducumentsData);
        }
      } catch (error) {
        if (error?.response?.data?.message === 'Invalid token') {
          localStorage.removeItem('userInfo')
          console.log(error.response.data.message);
        } else {
          console.log(error);
        }
      }
    }

    try {
      console.log(userInfo);
      if (userInfo !== '') {
        getExpiringLabours(userInfo._id);
      }
    } catch (error) {
      console.log('Outer try-catch error:', error);
    }
  }, [userInfo]);

  const [landingPageData, setLandingPageData] = useState({});


  return (
    <div className='user-home'>
        { userInfo && userInfo.fullname ?
          <Navigation data={userInfo.fullname}/> :
          <Navigation data={null}/>
        }
        <Header data={landingPageData.Header} />
        { userInfo && userInfo.fullname ?
          <Alerts data={landingPageData.Features} idExpiringData={idExpiringLabours} labourExpiringData={labourExpiringLabours} documentExpiring={documentsExpiring} />:
          null
        }
        <Features data={landingPageData.Features} />
        <About data={landingPageData.About} />
        <Services data={landingPageData.Services} />
        <Team data={landingPageData.Team} />
        <Clients data={landingPageData.Clients} />
        <Testimonials data={landingPageData.Testimonials} />
        <Contact data={landingPageData.Contact} />
    </div>
  )
}

export default HomePage