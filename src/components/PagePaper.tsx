import { makeStyles, Paper } from "@material-ui/core";
import { PaperProps } from "@material-ui/core/Paper/Paper";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
}));

const PagePaper = ({ children, ...props }: PaperProps) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper} {...props}>
      {children}
    </Paper>
  );
};

export default PagePaper;
