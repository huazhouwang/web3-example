import {
  AppBar,
  CssBaseline,
  IconButton,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import MessageEditor from "./pages/Message";
import MenuIcon from "@material-ui/icons/Menu";
import PageDrawer from "./components/PageDrawer";
import Transaction from "./pages/Transaction";

const useStyles = makeStyles((theme) => ({
  appBar: {
    color: "default",
    position: "relative",
  },
  main: {
    width: "auto",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(5),
    },
  },
}));

const DRAWER_MENU = ["Message", "Transaction"];
const DEFAULT_PAGE = "Message";

const Pagers = {
  Message: () => MessageEditor,
  Transaction: () => Transaction,
};

const App = () => {
  const classes = useStyles();
  const [isDrawerOpening, setIsDrawerOpening] = useState<boolean>(false);
  const [Page, setPage] = useState<React.FC>(Pagers[DEFAULT_PAGE]);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            color={"inherit"}
            aria-label={"open drawer"}
            onClick={() => setIsDrawerOpening((prevState) => !prevState)}
            edge={"start"}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant={"h6"} color={"inherit"} noWrap>
            Ethereum Utils
          </Typography>
        </Toolbar>
      </AppBar>

      <PageDrawer
        menus={DRAWER_MENU}
        open={isDrawerOpening}
        onClose={() => setIsDrawerOpening(() => false)}
        onDrawerItemClick={(text) => {
          setPage((Pagers as any)[text]);
          setIsDrawerOpening(false);
        }}
      />

      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Page />
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default App;
