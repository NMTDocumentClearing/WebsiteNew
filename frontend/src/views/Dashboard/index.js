import React, { useEffect, useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

//project import
import ReportCard from './ReportCard';
import { gridSpacing } from '../../config';



// assets
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
//import MonetizationOnTwoTone from '@mui/icons-material/MonetizationOnTwoTone';
import DescriptionTwoTone from '@mui/icons-material/DescriptionTwoTone';
import ThumbUpAltTwoTone from '@mui/icons-material/ThumbUpAltTwoTone';
import CalendarTodayTwoTone from '@mui/icons-material/CalendarTodayTwoTone';
import MoneyIcon from '@mui/icons-material/Money';
import { useSelector } from 'react-redux';
import { getTodayApplications, getTodayEarnings } from '../../api/adminAPI';

// custom style
const FlatCardBlock = styled((props) => <Grid item sm={6} xs={12} {...props} />)(({ theme }) => ({
  padding: '25px 25px',
  borderLeft: '1px solid' + theme.palette.background.default,
  [theme.breakpoints.down('sm')]: {
    borderLeft: 'none',
    borderBottom: '1px solid' + theme.palette.background.default
  },
  [theme.breakpoints.down('md')]: {
    borderBottom: '1px solid' + theme.palette.background.default
  }
}));


// ==============================|| DASHBOARD DEFAULT ||============================== //

const   Default = () => {
  const theme = useTheme();

  const [todaySale, setTodaySale] = useState(0)
  const [todayProfit, setTodayProfit] = useState(0)
  const [todayExpense, setTodayExpense] = useState(0)
  const [todayPurchase,setTodayPurchase] = useState(0)
  const [todayApplications, setTodayApplications] = useState(0)
  const [companiesTotal, setCompaniesTotal] = useState(0)
  const [adminsTotal, setAdminsTotal] = useState(0)
  const [laboursTotal, setLaboursTotal] = useState(0)

  const adminLogin = useSelector((state)=> state.adminLogin)
  const {loading, error, adminInfo} = adminLogin
  console.log(adminInfo);

  useEffect(()=>{
    async function getUsersData(){
      try {
        const {data: applicationsData, data:companiesCount, data:laboursCount, data:adminsCount } = await getTodayApplications()
        if(applicationsData.applicationcount){
          setCompaniesTotal(companiesCount.companiesCount);
          setLaboursTotal(laboursCount.laboursCount)
          setAdminsTotal(adminsCount.adminsCount)
          setTodayApplications(applicationsData.applicationcount.length)
        }
        const {data} = await getTodayEarnings()
        if(data){
            var total = 0
            var profit = 0
            var purchase = 0
            var expense = 0
            if(data.data.length > 0){
              data.data.map((item)=>{
                    total += item.sale
                    profit += item.profit
                    purchase += item.purchase
              })
            }
            setTodaySale(total)
            setTodayProfit(profit)
            setTodayPurchase(purchase)
            // console.log(data.expense);

            if(data.expense.length > 0){
              data.expense.map((item)=>{
                return expense+= item.amount
              })
            }

            setTodayExpense(expense)
            
        }
      } catch (error) {
        if(error.response.data.message === "Invalid token"){
          // console.log("sdgvjajavjahc");
          // setTokenModalOpen(true)
        }
      }
    }
    getUsersData()

 },[])

  return (
    <Grid container spacing={gridSpacing} >
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={6} sm={6} xs={12}>
            <ReportCard
              primary= {'AED.'+todaySale}
              secondary="Today Earnings"
              color={theme.palette.warning.main}
              iconPrimary={MoneyIcon}
              iconFooter={TrendingUpIcon}
            />
          </Grid>

          <Grid item lg={6} sm={6} xs={12}>
            <ReportCard
              primary={'AED.'+todayPurchase}
              secondary="Today Purchase"
              color={theme.palette.primary.main}
              // footerData="1k download in App store"
              iconPrimary={DescriptionTwoTone}
              iconFooter={TrendingUpIcon}
            />
          </Grid>

          <Grid item lg={6} sm={6} xs={12}>
            <ReportCard
              primary={'AED.'+todayProfit}
              secondary="Today Profit"
              color={theme.palette.success.main}
              // footerData="10k daily views"
              iconPrimary={ThumbUpAltTwoTone}
              iconFooter={TrendingUpIcon}
            />
          </Grid>

          <Grid item lg={6} sm={6} xs={12}>
            <ReportCard
              primary={'AED.'+todayExpense}
              secondary="Today Expense"
              color={theme.palette.error.main}
              // footerData="28% task performance"
              iconPrimary={CalendarTodayTwoTone}
              iconFooter={TrendingDownIcon}
            />
          </Grid>
          
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          
        <Grid item lg={6} sm={6} xs={12}>
            <ReportCard
              primary= {adminsTotal}
              secondary="Number Of Admins"
              color={theme.palette.success.main}
              // footerData="10% changes on profit"
              iconPrimary={MoneyIcon}
              iconFooter={TrendingUpIcon}
            />
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <ReportCard
              primary= {todayApplications}
              secondary="Today Applications"
              color={theme.palette.secondary.main}
              // footerData="10% changes on profit"
              iconPrimary={MoneyIcon}
              iconFooter={TrendingUpIcon}
            />
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <ReportCard
              primary={companiesTotal}
              secondary="Number of Companies"
              color={theme.palette.warning.main}
              // footerData="1k download in App store"
              iconPrimary={DescriptionTwoTone}
              iconFooter={TrendingUpIcon}
            />
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <ReportCard
              primary={laboursTotal}
              secondary="Number of Labours"
              color={theme.palette.primary.main}
              // footerData="1k download in App store"
              iconPrimary={DescriptionTwoTone}
              iconFooter={TrendingUpIcon}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Default;