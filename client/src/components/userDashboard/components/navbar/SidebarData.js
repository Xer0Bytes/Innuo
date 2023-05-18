import {MdManageAccounts, MdLeaderboard} from 'react-icons/md';
import {AiFillHome, AiFillShop} from 'react-icons/ai';
import {IoIosPaper, IoIosTrophy, IoIosLogOut} from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/userDashboard',
    icon: AiFillHome,
    cName: 'nav-text'
  },
  {
    title: 'Ranking',
    path: '/ranking',
    icon: MdLeaderboard,
    cName: 'nav-text'
  },
  // {
  //   title: 'Lessons',
  //   path: '',
  //   icon: IoIosPaper,
  //   cName: 'nav-text'
  // },
  // {
  //   title: 'Resources',
  //   path: '',
  //   icon: AiFillShop,
  //   cName: 'nav-text'
  // },
  {
    title: 'Achievements',
    path: '/achievements',
    icon: IoIosTrophy,
    cName: 'nav-text'
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: MdManageAccounts,
    cName: 'nav-text'
  },
  {
    title: 'Log out',
    path: '/',
    icon: IoIosLogOut,
    cName: 'nav-text'
  }
];
