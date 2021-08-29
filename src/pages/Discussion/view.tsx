import PagePaper from '../../components/PagePaper';
import {
  Badge,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { Center, Column, Row, SizedBox } from '../../components/basic';
import { Record } from './helper';
import JazziconAvatar from '../../components/JazziconAvatar';
import { Forum, Send } from '@material-ui/icons';

const useStyle = makeStyles((theme) => ({
  container: {
    alignItems: 'center',
    maxHeight: '80vh',
    '& > *': {
      width: '100%',
    },
  },
  emptyContainer: {
    height: '30vh',
    textAlign: 'center',
    '& > #logo': {
      fontSize: 80,
      color: theme.palette.divider,
    },
  },
  records: {
    display: 'flex',
    flexDirection: 'column-reverse',
    minHeight: 300,
    overflow: 'auto',
    boxShadow: 'inset 0 -1px 1px -1px gray',
  },
  recordItemPrimary: {
    alignItems: 'center',
    fontSize: 13,
    marginBottom: 8,
    '& > #link': {
      marginLeft: 2,
      fontSize: 14,
      fontWeight: 600,
    },
    '& > #dot': {
      fontWeight: 400,
      marginLeft: 4,
      marginRight: 4,
    },
    '& > #date': {
      fontWeight: 500,
    },
  },
  recordItemSecondary: {
    maxHeight: 80,
    overflow: 'auto',
  },
  flexBox: {
    flex: 1,
  },
  floorLabel: {
    borderRadius: '10px',
    backgroundColor: 'rgb(240, 240, 240)',
    color: 'rgb(204, 204, 204)',
    padding: '2px 5px 2px 5px',
    fontSize: '9px',
    lineHeight: '9px',
    fontWeight: 600,
  },
  inputContainer: {
    alignItems: 'center',
    paddingLeft: 16,
    '& > #send': {
      transition: 'transform 300ms ease-in-out',
      '&:hover': {
        transform: 'rotate(-45deg)',
      },
    },
  },
}));

export interface DiscussionViewProps {
  records: Array<Record>;
  account: string;
  messageValue: string;
  onMessageValueChange: (value: string) => void;
  submitMessage: () => void;
  connectWallet: () => void;
}

const DiscussionView = ({
  records,
  account,
  messageValue,
  onMessageValueChange,
  submitMessage,
  connectWallet,
}: DiscussionViewProps) => {
  const classes = useStyle();

  return (
    <PagePaper>
      <Column className={classes.container}>
        <Typography component={'h1'} variant={'h4'} align={'center'}>
          Discussion
        </Typography>
        <SizedBox height={32} />

        {records.length > 0 ? (
          <List className={classes.records}>
            {records.map((i, index, me) => (
              <RecordItemView
                key={i.id}
                record={i}
                isLastOne={index + 1 === me.length}
                account={account}
              />
            ))}
          </List>
        ) : (
          <Center className={classes.emptyContainer}>
            <Forum id={'logo'} />
          </Center>
        )}
        <SizedBox height={8} />
        <Row className={classes.inputContainer}>
          <TextField
            id={'input'}
            fullWidth
            multiline
            maxRows={3}
            placeholder={'Join the discussion...'}
            value={messageValue}
            onChange={(e) => onMessageValueChange(e.target.value)}
          />
          <IconButton id={'send'} color={'primary'} disabled={!account}>
            <Send onClick={!!account ? submitMessage : connectWallet} />
          </IconButton>
        </Row>
      </Column>
    </PagePaper>
  );
};

const RecordItemView = ({
  record: { id, sender, message, date },
  isLastOne,
  account,
}: {
  record: Record;
  isLastOne: boolean;
  account: string;
}) => {
  const classes = useStyle();
  const floor = `${id}`;
  const shortSender = `${sender.slice(0, 6)}`;

  return (
    <>
      <ListItem alignItems={'flex-start'}>
        <ListItemAvatar>
          <Badge
            invisible={account.toLowerCase() !== sender.toLowerCase()}
            badgeContent={'me'}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            color={'secondary'}
          >
            <JazziconAvatar address={sender} />
          </Badge>
        </ListItemAvatar>

        <ListItemText
          disableTypography
          primary={
            <Row className={classes.recordItemPrimary}>
              <Link
                id={'link'}
                href={`https://blockscan.com/address/${sender}`}
                target={'_blank'}
              >
                {shortSender}
              </Link>
              <Typography id={'dot'} variant={'caption'}>
                •
              </Typography>
              <Typography
                id={'date'}
                variant={'inherit'}
                color={'textSecondary'}
              >
                {date}
              </Typography>
              <div className={classes.flexBox} />
              <span className={classes.floorLabel}>{floor}</span>
            </Row>
          }
          secondary={
            <Typography
              className={classes.recordItemSecondary}
              variant={'body2'}
            >
              {message}
            </Typography>
          }
        />
      </ListItem>
      {!isLastOne && <Divider variant={'inset'} component={'li'} />}
    </>
  );
};

export default DiscussionView;
