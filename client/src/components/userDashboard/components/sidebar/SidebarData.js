import {MdManageAccounts, MdLeaderboard} from 'react-icons/md';
import {AiFillAccountBook, AiFillHome, AiFillShop, AiFillFileAdd} from 'react-icons/ai';
import {IoIosPaper, IoIosTrophy, IoIosLogOut, IoMdBook} from 'react-icons/io';
import {FaChalkboardTeacher} from 'react-icons/fa';
import {BsFillBookFill, BsFillPenFill} from 'react-icons/bs'

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
