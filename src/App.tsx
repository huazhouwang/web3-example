import {
  AppBar,
  CssBaseline,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import MessageEditor from "./pages/Message";

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

const App = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant={"h6"} color={"inherit"} noWrap>
            Ethereum Utils
          </Typography>
        </Toolbar>
      </AppBar>

      <main className={classes.main}>
        <Paper className={classes.paper}>
          <MessageEditor />
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default App;
