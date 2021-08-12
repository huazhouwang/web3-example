import { Column, SizedBox } from "../../components/basic";
import { makeStyles, Typography } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  container: {
    height: 500,
  },
}));

const TransactionView = () => {
  const classes = useStyle();

  return (
    <Column className={classes.container}>
      <Typography component={"h1"} variant={"h4"} align={"center"}>
        Transaction
      </Typography>
      <SizedBox height={32} />

      <Typography component={"h5"} align={"center"} color={"textSecondary"}>
        Developing...
      </Typography>
    </Column>
  );
};

export default TransactionView;
