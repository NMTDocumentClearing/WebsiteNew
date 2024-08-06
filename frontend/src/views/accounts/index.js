import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";

// material-ui
import { Card, CardHeader, CardContent, Divider, Grid, Typography } from '@mui/material';


// project import
import Breadcrumb from '../../components/adminComponents/Breadcrumb';
import { gridSpacing } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, addIncome, addReciept, getAdminProfileDatas, getUserDataWithout, getUsersDatas } from '../../api/adminAPI';
import profile from '../../assets/sccs/images/Calculator_512.webp';
import { IoLockClosed } from "react-icons/io5";
import Modal from '../../components/modal';

// ==============================|| SAMPLE PAGE ||============================== //

const AccountsPage = () => {
  const adminLogin = useSelector((state)=> state.adminLogin)
  const {loading, error, adminInfo} = adminLogin

  const [fullname, setFullname] = useState('')
    const [edited, setEdited] = useState(false)
    
    const getCurrentDate = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
  };
    const [successOpen, setSuccessOpen]= useState(false)
    const [successMessage, setSuccessMessage]= useState(false)

    const [formError, setFormError] = useState('')

    const [type,setType] = useState('income')
    const [date,setDate] = useState(getCurrentDate())
    const [company,setCompany] = useState('')
    const [person,setPerson] = useState('')
    const [particular,setParticular] = useState('')
    const [expenceName,setExpenceName] = useState('')
    const [expenceAmount,setExpenceAmount] = useState(0)
    const [sale,setSale] = useState(0)
    const [purchase,setPurchase] = useState(0)
    const [profit,setProfit] = useState(0)
    const [paidBy,setPaidBy] = useState('')
    const [note,setNote] = useState('')

    const [recieptParticular, setRecieptParticular] = useState('')
    const [recieptAmount, setRecieptAmount] = useState(0)
    const [selectedOption, setSelectedOption] = useState('');
    const [tokenModalOpen, setTokenModalOpen] = useState(false)
    const navigate = useNavigate()

    const [userData, setUserData] = useState([])

    const formRef = useRef(null);

    const checkprofit = ()=>{
        if(sale !== 0 ){
            const profit = sale-purchase
            setProfit(profit)
        }
    }


    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        setType(event.target.value)
    };

    useEffect(()=>{
      async function getUserNames(){
        try {
          const {data} = await getUserDataWithout()
          if(data){
            // console.log(data.data);
            setUserData(data.data)
          }
        } catch (error) {
          if(error.response.data.message === "Invalid token"){
            // console.log("sdgvjajavjahc");
            setTokenModalOpen(true)
          }
        }
      }
      getUserNames()
    },[])

    

    const id = adminInfo._id

    useEffect(()=>{
      async function getProfileData(id){
        try {
          const {data} = await getAdminProfileDatas(id)
          if(data){
              setFullname(data.admin.fullname)
              
          }
        } catch (error) {
          if(error.response.data.message === "Invalid token"){
            setTokenModalOpen(true)
          }
        }
      }
      getProfileData(id)

   },[edited])

  const dispatch = useDispatch()
    

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const adminId = adminInfo._id
        try {
          if(type === 'income'){
            // console.log(adminId,date,type,company,person,particular,sale,purchase,profit);
            if(adminId !== undefined && date !== '' && type !== '' && company !== '' && person !== '' && particular !== '' && sale !== 0 && profit !== 0){
              if(purchase !== 0 && paidBy ===''){
                setFormError('You should fill paid by field')
              }else{
                const {data} =await addIncome(adminId,date,type,company,person,particular,sale,purchase,profit,paidBy)
                  if(data){
                    if(data === 'Income already exists'){
                      setFormError('Income already exists')
                    }else{
                      // console.log(data);
                      setFormError('')
                      setSuccessMessage('Record Added Successfully')
                      setSuccessOpen(true)
                      setDate('');
                      setCompany('');
                      setPerson('');
                      setParticular('');
                      setSale('');
                      setPurchase('');
                      setProfit('');
    
                      formRef.current.reset();
                    }
                  }
  
              }
            }else{
              setFormError('All fields are required')
            }
          }else if(type === 'expense'){
            console.log(adminId,date,type,expenceName,expenceAmount);
            if(adminId !== undefined && date !== '' && type !== '' && expenceName !== '' && expenceAmount !== 0 && paidBy !== '' ){
              const {data} =await addExpense(adminId,date,type,expenceName,expenceAmount,paidBy,note)
              if(data){
                if(data === 'Income already exists'){
                  setFormError('Expense already exists')
                }else{
                  // console.log(data);
                  setFormError('')
                  setSuccessMessage('Record Added Successfully')
                  setSuccessOpen(true)
                  setDate('');
                  setCompany('');
                  setPerson('');
                  setParticular('');
                  setExpenceName('')
                  setExpenceAmount(0)
                  setSale('');
                  setPurchase('');
                  setProfit('');
                  setNote('');
  
                  formRef.current.reset();
                }
              }
            }else{
              setFormError('All fields are required')
            }
          }else if(type === 'reciept'){
             console.log(adminId,date,type,recieptParticular,recieptAmount,note);
             if(adminId !== undefined && date !== '' && type !== '' && recieptParticular !== '' && recieptAmount !== 0 ){
              const {data} =await addReciept(adminId,date,type,recieptParticular,recieptAmount,note)
              if(data){
                if(data === 'Income already exists'){
                  setFormError('Expense already exists')
                }else{
                  // console.log(data);
                  setFormError('')
                  setSuccessMessage('Record Added Successfully')
                  setSuccessOpen(true)
                  setDate('');
                  setRecieptParticular('');
                  setRecieptAmount(0);
                  setNote('');
  
                  formRef.current.reset();
                }
              }
            }else{
              setFormError('All fields are required')
            }
          }
        } catch (error) {
          if(error.response.data.message === "Invalid token"){
            setTokenModalOpen(true)
          }
        }
        
        
    };

    
    
    // const checkLocalStorage = () => {
    //     const adminInfo = localStorage.getItem('adminInfo');
        
    // };

    const deliverTOLogin = ()=>{
      localStorage.removeItem('adminInfo');
      navigate('/admin/login')
    }

    


  return (
    <>
      <Breadcrumb >
        <Typography component={Link} to="/admin" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Home
        </Typography>
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb" style={{fontSize:"15px"}}>
          Accounts
        </Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid item style={{width:"100%"}}>
          <Card>
            <CardHeader
              title={
                <Typography component="div" className="card-header" style={{fontSize:"25px", textAlign:"center",fontWeight:"bold"}}>
                  Add Exp/Income
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              {/* <Typography variant="body2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiatnulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollitanim id est laborum.
              </Typography> */}
              
              <form ref={formRef} onSubmit={handleSubmit}>
                  <img src={profile} alt="Logo" style={{ display: "block", margin: "auto", width: "70px", height: "70px", marginBottom: "5px" }} />
                  
                  <div style={{display:'flex',flexDirection:'row',gap:'10px',width:'100%'}}>
                      <div className="mb-2" style={{ marginBottom: "10px", marginTop: "20px",width:'50%' }}>
                            <p htmlFor="name" style={{ color: "black", textAlign: "center" }}>Income Or Expense</p>
                            <select 
                                className="form-control styled-placeholder" 
                                style={{ textAlign: "center", fontWeight:"500", color: selectedOption === 'expense' ? "red" : "green" }} 
                                onChange={handleChange}
                                >
                                <option value="income" style={{marginTop:'20px'}}>Income</option>
                                <option value="expense">Expense</option>
                                <option value="reciept">Reciept</option>
                            </select>
                      </div>


                      <div className="mb-2"  style={{ marginBottom: "10px", marginTop: "20px",width:'50%' }}>
                        <p htmlFor="date" style={{ color: "black", textAlign: "center" }}>Select Date</p>
                        <input 
                            name='date'
                            type="date"
                            onChange={(e)=>setDate(e.target.value)} 
                            className="form-control" 
                            style={{ textAlign: "center", fontWeight:"500", color:"blue" }}
                            value={date}
                            // defaultValue={getCurrentDate()} // Set default value to today's date
                        />
                      </div>

                  </div>

                  { type === 'income' &&
                  <>
                  <div style={{display:'flex',flexDirection:'row',gap:'10px',width:'100%'}}>


                   <div className="mb-2" style={{ marginBottom: "10px",width:'50%' }}>
                      <p htmlFor="company" style={{ color: "black", textAlign: "center" }}>Company</p>
                      {/* <input name='company' type='text' onChange={(e)=>setCompany(e.target.value)}  className="form-control styled-placeholder" style={{ textAlign: "center", fontWeight:"500", color:"blue" }}/> */}
                      <select 
                            className="form-control styled-placeholder" 
                            style={{ textAlign: "center", fontWeight:"500", color:"black"}}
                            onChange={(e)=>setCompany(e.target.value)} 
                            >
                              <option value="">Select</option>
                              {userData.map((item, index)=>(
                                <option value={item.fullname}>{item.fullname}</option>

                              ))}
                            
                        </select>
                  </div>
                  <div className="mb-2" style={{ marginBottom: "10px",width:'50%' }}>
                      <p htmlFor="phone" style={{ color: "black", textAlign: "center" }}>Person Name</p>
                      <input name='person' type='text' onChange={(e)=>setPerson(e.target.value)}  className="form-control styled-placeholder" style={{ textAlign: "center", fontWeight:"500", color:"blue" }}/>
                  </div>

                  </div>

                  <div style={{display:'flex',flexDirection:'row',gap:'10px',width:'100%'}}>
                      <div className="mb-2" style={{ marginBottom: "10px",width:'50%' }}>
                        <p htmlFor="name" style={{ color: "black", textAlign: "center" }}>Income Or Expense Type</p>
                            <select 
                                className="form-control styled-placeholder" 
                                style={{ textAlign: "center", fontWeight:"500", color:"black"}}
                                onChange={(e)=>setParticular(e.target.value)} 
                                >
                                <option value="">Select</option>
                                <option value="Insurance">Insurance</option>
                                <option value="Contract Submission">Contract Submission</option>
                                <option value="Health Card">Health Card</option>
                                <option value="Health Insurance">Health Insurance</option>
                                <option value="Bataka Fee">Bataka Fee</option>
                                <option value="Offer Letter">Offer Letter</option>
                                <option value="Medical">Medical</option>
                                <option value="Labour Cancel Typing">Labour Cancel Typing</option>
                                <option value="Labour Cancel Submission">Labour Cancel Submission</option>
                            </select>
                      </div>


                      <div className="mb-2" style={{ marginBottom: "10px",width:'50%' }}>
                          <p htmlFor="phone" style={{ color: "black", textAlign: "center" }}>Sale Amount</p>
                          <input onChange={(e)=>setSale(e.target.value)} onBlur={checkprofit} type='number' className="form-control styled-placeholder" style={{ textAlign: "center", fontWeight:"500", color:"blue" }}/>
                      </div>
                  </div>

                <div style={{display:'flex',flexDirection:'row',gap:'10px',width:'100%'}}>
                    <div className="mb-2" style={{ marginBottom: "10px",width:'50%' }}>
                        <p htmlFor="phone" style={{ color: "black", textAlign: "center" }}>Purchase Amount</p>
                        <input onChange={(e)=>setPurchase(e.target.value)} onBlur={checkprofit}  type='number' className="form-control styled-placeholder" style={{ textAlign: "center", fontWeight:"500", color:"red" }}/>
                    </div>

                    <div className="mb-2" style={{ marginBottom: "10px",width:'50%' }}>
                        <p htmlFor="phone" style={{ color: "black", textAlign: "center" }}>Profit Amount</p>
                        <input name='profit' value={profit} type='number' readOnly className="form-control styled-placeholder" style={{ textAlign: "center", fontWeight:"500", color:"green" }}/>
                    </div>
                </div>
                {
                  purchase !== 0 &&
                  <div className="mb-2" style={{ marginBottom: "10px" }}>
                      <p htmlFor="phone" style={{ color: "black", textAlign: "center" }}>Payment By</p>
                      <select 
                                className="form-control styled-placeholder" 
                                style={{ textAlign: "center", fontWeight:"500", color:"black"}}
                                onChange={(e)=>setPaidBy(e.target.value)} 
                                >
                                <option value="">Select</option>
                                <option value="ADCB ARSHAD">ADCB ARSHAD</option>
                                <option value="SHIBU RAK">SHIBU RAK</option>
                                <option value="SHIBU MASHREQ">SHIBU MASHREQ</option>
                                <option value="NOORU RAK">NOORU RAK</option>
                                <option value="NOORU">NOORU</option>
                                <option value="BIMAL">BIMAL</option>
                                <option value="SHIBU NBD">SHIBU NBD</option>
                            </select>
                  </div>
                }

                  </> }
                  { type === 'expense' &&
                  <>
                     <div className="mb-2" style={{ marginBottom: "10px" }}>
                          <p htmlFor="phone" style={{ color: "black", textAlign: "center" }}>Particular</p>
                          <input name='partculars' type='text' onChange={(e)=>setExpenceName(e.target.value)}  className="form-control styled-placeholder" style={{ textAlign: "center", fontWeight:"500", color:"blue" }}/>
                     </div>

                      <div className="mb-2" style={{ marginBottom: "10px" }}>
                          <p htmlFor="phone" style={{ color: "black", textAlign: "center" }}>Amount</p>
                          <input onChange={(e)=>setExpenceAmount(e.target.value)} type='number' step='0.01' className="form-control styled-placeholder" style={{ textAlign: "center", fontWeight:"500", color:"red" }}/>
                      </div>
                      {
                        <div style={{display:'flex',flexDirection:'row',gap:'10px',width:'100%'}}>

                          <div className="mb-2" style={{ marginBottom: "10px",width:'50%' }}>
                              <p htmlFor="phone" style={{ color: "black", textAlign: "center" }}>Payment By</p>
                              <select 
                                        className="form-control styled-placeholder" 
                                        style={{ textAlign: "center", fontWeight:"500",fontSize:'13px', color:"black"}}
                                        onChange={(e)=>setPaidBy(e.target.value)} 
                                        >
                                        <option value="" style={{color:'red'}}>Select One</option>
                                        <option value="CASH">CASH</option>
                                        <option value="ADCB ARSHAD">ADCB ARSHAD</option>
                                        <option value="SHIBU RAK">SHIBU RAK</option>
                                        <option value="SHIBU MASHREQ">SHIBU MASHREQ</option>
                                        <option value="NOORU RAK">NOORU RAK</option>
                                        <option value="NOORU">NOORU</option>
                                        <option value="BIMAL">BIMAL</option>
                                        <option value="SHIBU NBD">SHIBU NBD</option>
                                    </select>
                          </div>

                          <div className="mb-2" style={{ marginBottom: "10px",width:'50%'  }}>
                            <p htmlFor="phone" style={{ color: "black", textAlign: "center" }}>Note</p>
                            <input placeholder='please add some notes here...' onChange={(e)=>setNote(e.target.value)} type='text' step='0.01' className="form-control styled-placeholder" style={{ textAlign: "center", fontWeight:"500", color:"red" }}/>
                          </div>
                        </div>
                        
                      }
                  </>
                  }
                  { type === 'reciept' &&
                  <>
                     <div className="mb-2" style={{ marginBottom: "10px" }}>
                          <p htmlFor="phone" style={{ color: "black", textAlign: "center" }}>Particular</p>
                          <input name='partculars' type='text' onChange={(e)=>setRecieptParticular(e.target.value)}  className="form-control styled-placeholder" style={{ textAlign: "center", fontWeight:"500", color:"blue" }}/>
                     </div>

                      <div className="mb-2" style={{ marginBottom: "10px" }}>
                          <p htmlFor="phone" style={{ color: "black", textAlign: "center" }}>Amount</p>
                          <input onChange={(e)=>setRecieptAmount(e.target.value)} type='number' step='0.01' className="form-control styled-placeholder" style={{ textAlign: "center", fontWeight:"500", color:"red" }}/>
                      </div>

                      <div className="mb-2" style={{ marginBottom: "10px" }}>
                          <p htmlFor="phone" style={{ color: "black", textAlign: "center" }}>Note</p>
                          <input onChange={(e)=>setNote(e.target.value)} type='text' step='0.01' className="form-control styled-placeholder" style={{ textAlign: "center", fontWeight:"500", color:"red" }}/>
                      </div>
                      
                  </>
                  }
                  <p style={{fontSize:'14px',color:"red",textAlign:'center'}}>{formError}</p>
                  <div className="d-grid" style={{ display: "grid", marginTop: "20px" }}>
                      
                          <button type="submit" className="btn" style={{backgroundColor:"#215AFF",color:"white",fontWeight:"500"}}>
                              Save
                          </button> 
                      
                  </div>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {successOpen && (
        <Modal open={successOpen} onClose={() => setSuccessOpen(false)}>
            <div className='text-center'>
                <FaCheck size={56} className='mx-auto text-red-600' style={{color:"green",fontSize:"50px"}}></FaCheck>
                <div className='mx-auto my-4 w-48'>
                    <h3 className='text-lg font-thin text-gray-800 '>{successMessage}</h3>
                </div>
                <div className="flex gap-4">
                <button
                    onClick={() => setSuccessOpen(false)}
                    style={{
                        backgroundColor: '#215AFF', // Red-500
                        color: '#FFFFFF', 
                        fontWeight: '500', // Thin
                         // Shadow-lg
                        padding: '0.25rem 1rem', // p-1
                        border:"none",
                        width: '100%', // w-full
                        borderRadius: '0.375rem', // Rounded-md (default value)
                        transition: 'background-color 0.2s ease-in-out', // Hover effect
                        cursor: 'pointer' // Hover effect
                    }}
                    >
                    Ok
                    </button>
                </div>
            </div>
        </Modal>
    )}
      {tokenModalOpen && (
        <Modal open={tokenModalOpen} onClose={() => setTokenModalOpen(false)}>
            <div className='text-center'>
                <IoLockClosed size={56} className='mx-auto text-red-600' style={{color:"red",fontSize:"40px", width:"30px",height:"30px"}}></IoLockClosed>
                <div className='mx-auto my-4 w-48'>
                    <h3 className='text-lg font-thin text-gray-800 '>You Token Expired</h3>
                    <p className='text-lg font-thin text-gray-800 '>Please Login Again</p>
                </div>
                <div className="flex gap-4">
                    
                        <button
                            onClick={deliverTOLogin}
                            style={{
                                backgroundColor: '#215AFF', // Red-500
                                color: '#FFFFFF', 
                                fontWeight: '500', // Thin
                                // Shadow-lg
                                padding: '0.25rem 1rem', // p-1
                                width: '100%', // w-full
                                borderRadius: '0.375rem', // Rounded-md (default value)
                                transition: 'background-color 0.2s ease-in-out', // Hover effect
                                cursor: 'pointer' // Hover effect
                            }}
                            >
                            Login
                            </button>
                    
                </div>
            </div>
        </Modal>
    )}
    
    </>
  );
};

export default AccountsPage;