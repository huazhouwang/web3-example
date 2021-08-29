import {
  AppBar,
  CssBaseline,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import PagesDrawer from './components/PagesDrawer';

const useStyles = makeStyles((theme) => ({
  appBar: {
    color: 'default',
    position: 'relative',
  },
  main: {
    width: 'auto',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const Pagers: { [key: string]: React.FC } = {
  Message: () => require('./pages/Message/index').default,
  Transaction: () => require('./pages/Transaction/index').default,
  Discussion: () => require('./pages/Discussion/index').default,
};
const DRAWER_MENU = Object.keys(Pagers);
const DEFAULT_PAGE = DRAWER_MENU[0];

const MyAppBar = ({ onDrawerBtnClick }: { onDrawerBtnClick: VoidFunction }) => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton
          color={'inherit'}
          aria-label={'open drawer'}
          onClick={onDrawerBtnClick}
          edge={'start'}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant={'h6'} color={'inherit'} noWrap>
          Ethereum Utils
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

const App = () => {
  const classes = useStyles();
  const [isDrawerOpening, setIsDrawerOpening] = useState<boolean>(false);
  const [Page, setPage] = useState<React.FC>(Pagers[DEFAULT_PAGE]);

  return (
    <>
      <CssBaseline />
      <MyAppBar
        onDrawerBtnClick={() => setIsDrawerOpening((prevState) => !prevState)}
      />
      <PagesDrawer
        menus={DRAWER_MENU}
        open={isDrawerOpening}
        onClose={() => setIsDrawerOpening(() => false)}
        onDrawerItemClick={(text) => {
          setPage((Pagers as any)[text]);
          setIsDrawerOpening(false);
        }}
      />
      <main className={classes.main}>
        <Page />
      </main>
    </>
  );
};

export default App;
