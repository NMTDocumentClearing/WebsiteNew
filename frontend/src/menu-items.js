// assets
import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import ChromeReaderModeOutlinedIcon from '@mui/icons-material/ChromeReaderModeOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import CalculateIcon from '@mui/icons-material/Calculate';
import TableViewOutlinedIcon from '@mui/icons-material/TableViewOutlined';
import ReceiptIcon from '@mui/icons-material/Receipt';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';


const icons = {
  NavigationOutlinedIcon: NavigationOutlinedIcon,
  HomeOutlinedIcon: HomeOutlinedIcon,
  ChromeReaderModeOutlinedIcon: ChromeReaderModeOutlinedIcon,
  HelpOutlineOutlinedIcon: HelpOutlineOutlinedIcon,
  SecurityOutlinedIcon: SecurityOutlinedIcon,
  AccountTreeOutlinedIcon: AccountTreeOutlinedIcon,
  BlockOutlinedIcon: BlockOutlinedIcon,
  AppsOutlinedIcon: AppsOutlinedIcon,
  ContactSupportOutlinedIcon: ContactSupportOutlinedIcon,
  LogoutIcon:LogoutIcon,
  CalculateIcon:CalculateIcon,
  TableViewOutlinedIcon:TableViewOutlinedIcon,
  ReceiptIcon:ReceiptIcon,
  EngineeringIcon:EngineeringIcon,
  ApartmentIcon:ApartmentIcon,
  ReportProblemIcon:ReportProblemIcon
};

// eslint-disable-next-line
export default {
  items: [
    {
      id: 'navigation',
      title: 'NMT Document Clearings',
      type: 'group',
      icon: icons['NavigationOutlinedIcon'],
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          color:"Red",
          icon: icons['HomeOutlinedIcon'],
          url: '/admin'
        }
      ]
    },
    {
      id: 'pages',
      title: 'Pages',
      // caption: 'Prebuild Pages',
      type: 'group',
      icon: icons['NavigationOutlinedIcon'],
      children: [
        {
          id: 'sample-page',
          title: 'My Profile',
          type: 'item',
          url: '/admin/profile',
          icon: icons['ChromeReaderModeOutlinedIcon'],
          color: "green"
        },
        {
          id: 'invoices-page',
          title: 'Login Requests',
          type: 'item',
          url: '/admin/pendingusers', 
          icon: icons['ApartmentIcon'],
          color: "purple"
        },
        
        {
          id: 'profile-page',
          title: 'Companies List',
          type: 'item',
          url: '/admin/companies',
          icon: icons['ChromeReaderModeOutlinedIcon'],
          color: "maroon"
        },
        {
          id: 'addTally-page',
          title: 'Add to Account',
          type: 'item',
          url: '/admin/accounts',
          icon: icons['CalculateIcon'],
          color: "blue"
        },
        {
          id: 'daySheet-page',
          title: 'Day-Sheet',
          type: 'item',
          url: '/admin/daysheet',
          icon: icons['TableViewOutlinedIcon'],
          color: "green"
        },
        // {
        //   id: 'login-1',
        //   title: 'Logout',
        //   type: 'item',
        //   // url: '/admin/logout',
        //   icon: icons['LogoutIcon'],
        //   color: "red"
        // },
        {
          id: 'invoices-page',
          title: 'Invoices',
          type: 'item',
          url: '/admin/invoices',
          icon: icons['ReceiptIcon'],
          color: "orange"
        },
        {
          id: 'Application-page',
          title: 'Applications',
          type: 'item',
          url: '/admin/applications',
          icon: icons['ReceiptIcon'],
          color: "violet"
        },
        {
          id: 'Notification-page',
          title: 'Notifications',
          type: 'item',
          url: '/admin/notifications',
          icon: icons['ReportProblemIcon'],
          color: "red"
        }
        
      ]
    }
  ]
};
