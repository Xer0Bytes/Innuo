import React from 'react';
import {FaCartPlus, FaEnvelopeOpenText, FaTrophy} from 'react-icons/fa';
import {AiFillHome, AiFillSetting, AiFillShop, AiFillShopping, AiOutlineClose} from 'react-icons/ai';
import {IoIosPaper, IoMdPeople, IoMdHelpCircle, IoIosTrophy, IoIosLogOut} from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/dashboard',
    icon: AiFillHome,
    cName: 'nav-text'
  },
  {
    title: 'Lessons',
    path: '',
    icon: IoIosPaper,
    cName: 'nav-text'
  },
  {
    title: 'Resources',
    path: '',
    icon: AiFillShop,
    cName: 'nav-text'
  },
  {
    title: 'Achievements',
    path: '',
    icon: IoIosTrophy,
    cName: 'nav-text'
  },
  {
    title: 'Settings',
    path: '',
    icon: AiFillSetting,
    cName: 'nav-text'
  },
  {
    title: 'Log out',
    path: '/',
    icon: IoIosLogOut,
    cName: 'nav-text'
  }
];
