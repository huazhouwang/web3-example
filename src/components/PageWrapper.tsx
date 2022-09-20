import React, { useState } from 'react';
import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PagesDrawer from './PagesDrawer';
import {
  useLocation,
  useNavigate,
  useNavigation,
  useRoutes,
} from 'react-router-dom';

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
          Web3 Example
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

const PageWrapper: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const classes = useStyles();
  const [isDrawerOpening, setIsDrawerOpening] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <>
      <MyAppBar
        onDrawerBtnClick={() => setIsDrawerOpening((prevState) => !prevState)}
      />
      <PagesDrawer
        menus={['Message', 'Transaction', 'Discussion']}
        open={isDrawerOpening}
        onClose={() => setIsDrawerOpening(() => false)}
        onDrawerItemClick={(text) => {
          navigate(`/${text.toLowerCase()}`);
          setIsDrawerOpening(false);
        }}
      />
      <main className={classes.main}>{children}</main>
    </>
  );
};

export default PageWrapper;
