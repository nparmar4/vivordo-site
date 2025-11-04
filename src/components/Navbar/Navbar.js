import React, { useContext, useState } from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import Fade from 'react-reveal/Fade';
import { IoMenuSharp, IoHomeSharp } from 'react-icons/io5';
import { HiDocumentText } from 'react-icons/hi';
import { BsFillGearFill } from 'react-icons/bs';
import { MdPhone } from 'react-icons/md';
import { FaUser, FaFolderOpen } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';

import './Navbar.css';
import { headerData } from '../../data/headerData';
import { ThemeContext } from '../../contexts/ThemeContext';

function Navbar() {
  const { theme, setHandleDrawer } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    setHandleDrawer();
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setHandleDrawer();
  };

  const useStyles = makeStyles((t) => ({
    navMenu: {
      fontSize: '2.5rem',
      color: '#7d6be3',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: '#7d6be3',
      },
      [t.breakpoints.up('md')]: {
        display: 'none',
      },
    },

    navLinksContainer: {
      display: 'none',
      [t.breakpoints.up('md')]: {
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
      },
    },

    navLinkItem: {
      fontFamily: 'Lato, sans-serif',
      color: '#7d6be3',
      fontSize: '1.1rem',
      fontWeight: 400,
      textDecoration: 'none',
      transition: 'transform 0.2s ease',
      '&:hover': {
        color: '#7d6be3',
        transform: 'scale(1.05)',
      },
    },

    MuiDrawer: {
      padding: '0em 1.8em',
      width: '16em',
      fontFamily: 'var(--primaryFont)',
      background: theme.secondary,
      overflow: 'hidden',
      borderTopRightRadius: '40px',
      borderBottomRightRadius: '40px',
      display: 'flex',
      justifyContent: 'center',
      [t.breakpoints.down('sm')]: {
        width: '16em',
      },
    },

    closebtnIcon: {
      fontSize: '2rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      color: '#7d6be3',
      position: 'absolute',
      right: 30,
      top: 30,
      '&:hover': {
        color: '#7d6be3',
      },
    },

    drawerItem: {
      margin: '1.5rem auto',
      borderRadius: '78.8418px',
      background: theme.secondary,
      color: '#7d6be3',
      width: '100%',
      minWidth: '210px',
      minHeight: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.75rem 1.5rem',
      border: '2px solid #7d6be3',
      boxSizing: 'border-box',
      transition: 'background-color 0.2s, color 0.2s, transform 0.2s',
      '&:hover': {
        background: 'rgba(125, 107, 227, 0.15)',
        color: '#7d6be3',
        transform: 'scale(1.03)',
      },
      [t.breakpoints.down('sm')]: {
        width: '95%',
        minHeight: '58px',
        padding: '0.75rem 1rem',
      },
    },

    drawerLinks: {
      fontFamily: 'var(--primaryFont)',
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#7d6be3',
      marginLeft: '0.5rem',
      textAlign: 'center',
      whiteSpace: 'nowrap',
    },

    drawerIcon: {
      fontSize: '1.5rem',
      color: '#7d6be3',
    },
  }));

  const classes = useStyles();
  const shortname = (name) => (name.length > 12 ? name.split(' ')[0] : name);

  return (
    <div className='navbar'>
      <div className='navbar--container'>
        <h1 style={{ color: '#7d6be3' }}>{}</h1>

        {/* Desktop Links */}
        <div className={classes.navLinksContainer}>
          <NavLink to='/' smooth spy duration={2000} className={classes.navLinkItem}>
            Home
          </NavLink>
          <NavLink to='/#about' smooth spy duration={2000} className={classes.navLinkItem}>
            Mission
          </NavLink>
          <NavLink to='/#resume' smooth spy duration={2000} className={classes.navLinkItem}>
            Pipeline
          </NavLink>
          <NavLink to='/#services' smooth spy duration={2000} className={classes.navLinkItem}>
            Team
          </NavLink>
          <NavLink to='/#blog' smooth spy duration={2000} className={classes.navLinkItem}>
            Sponsors
          </NavLink>
          <NavLink to='/#contacts' smooth spy duration={2000} className={classes.navLinkItem}>
            Contact
          </NavLink>
        </div>

        {/* Hamburger (mobile) */}
        <IoMenuSharp
          className={classes.navMenu}
          onClick={handleDrawerOpen}
          aria-label='Menu'
        />
      </div>

      {/* Drawer Menu */}
      <Drawer
        variant='temporary'
        onClose={handleDrawerClose}
        anchor='left'
        open={open}
        classes={{ paper: classes.MuiDrawer }}
        disableScrollLock={true}
      >
        <div className='div-closebtn'>
          <CloseIcon
            onClick={handleDrawerClose}
            className={classes.closebtnIcon}
            role='button'
            tabIndex='0'
            aria-label='Close'
          />
        </div>

        <div onClick={handleDrawerClose} style={{ marginTop: '6rem' }}>
          <div className='navLink--container'>
            {[
              { to: '/', icon: <IoHomeSharp />, label: 'Home' },
              { to: '/#about', icon: <FaUser />, label: 'Mission' },
              { to: '/#resume', icon: <HiDocumentText />, label: 'Pipeline' },
              { to: '/#services', icon: <BsFillGearFill />, label: 'Team ' },
              { to: '/#blog', icon: <FaFolderOpen />, label: 'Sponsors' },
              { to: '/#contacts', icon: <MdPhone />, label: 'Contact' },
            ].map(({ to, icon, label }, i) => (
              <Fade left key={i}>
                <NavLink to={to} smooth spy duration={2000}>
                  <div className={classes.drawerItem}>
                    {React.cloneElement(icon, { className: classes.drawerIcon })}
                    <span className={classes.drawerLinks}>{label}</span>
                  </div>
                </NavLink>
              </Fade>
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default Navbar;
