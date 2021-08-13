import {
  Button,
  Chip,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { Column, Row, SizedBox } from "../../components/basic";
import { useCallback, useEffect, useState } from "react";
import { easyCheckMessageHash, toEditorJsonString } from "./helper";
import Editor from "../../components/Editor";
import LabelText from "../../components/LabelText";
import PagePaper from "../../components/PagePaper";

export interface MessageViewProps {
  methodOptions: Array<string>;
  selectedMethod: string;
  onMethodSelected: (method: string) => void;
  cases: Array<{ name: string; value: string }>;
  checkIsTargetMessage: (message: string) => boolean;
  hashMessage: (message: string) => Promise<string>;
  isWalletEnabled: boolean;
  connectedAccount?: string | null;
  connectWallet: () => void;
  onSign: (message: string) => Promise<[string, string]>;
  preferJsonStringMessage?: boolean;
}

const useStyle = makeStyles((theme) => ({
  container: {
    padding: 0,
  },
  options: {
    justifyContent: "flex-end",
    alignItems: "center",
    margin: theme.spacing(3, 0, 1),
  },
  caseGroup: {
    flexWrap: "wrap",
    padding: 0,
    marginBottom: theme.spacing(1),
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  bottomButtonGroup: {
    justifyContent: "flex-end",
    padding: 0,
  },
}));

export const MessageEditorView = ({
  methodOptions,
  selectedMethod,
  onMethodSelected,
  cases,
  checkIsTargetMessage,
  hashMessage,
  isWalletEnabled,
  connectedAccount,
  connectWallet,
  onSign,
  preferJsonStringMessage,
}: MessageViewProps) => {
  const classes = useStyle();

  const [messageValue, setMessageValue] = useState<string>("");
  const [messageHashValue, setMessageHashValue] = useState<string>("");
  const [signatureValue, setSignatureValue] = useState<string>("");
  const [disabledSignBtn, setDisabledSignBtn] = useState<boolean>(true);
  const [recoveredAddress, setRecoveredAddress] = useState<string>("");

  const onMessageChanged = useCallback(
    async (message: string) => {
      try {
        if (message && checkIsTargetMessage(message)) {
          const messageHash: string = await hashMessage(message);

          message = preferJsonStringMessage
            ? toEditorJsonString(message)
            : message;

          if (easyCheckMessageHash(messageHash)) {
            setMessageHashValue(messageHash);
            setDisabledSignBtn(false);
          } else {
            setDisabledSignBtn(true);
          }
        }
      } catch (e) {
        setDisabledSignBtn(true);
        console.error("Error in hashing message", e);
      }

      setMessageValue(message);
      setSignatureValue("");
      setRecoveredAddress("");
    },
    [preferJsonStringMessage, checkIsTargetMessage, hashMessage]
  );

  const onSignButtonClick = useCallback(async () => {
    const [signature, recoveredAddress] = await onSign(messageValue);
    setSignatureValue(signature);
    setRecoveredAddress(recoveredAddress);
  }, [messageValue, onSign]);

  const onTagClick = (index: number) => {
    const message = cases[index].value;
    setMessageValue(message);
    onMessageChanged(message).catch(console.error);
  };

  useEffect(() => {
    if (cases[0].value) {
      onMessageChanged(cases[0].value);
    }
  }, [cases, onMessageChanged]);

  return (
    <PagePaper>
      <Column className={classes.container}>
        <Typography component={"h1"} variant={"h4"} align={"center"}>
          Message
        </Typography>

        <Row className={classes.options}>
          <Select
            variant={"outlined"}
            value={selectedMethod}
            onChange={(event) => onMethodSelected(event.target.value as string)}
          >
            {methodOptions.map((method) => (
              <MenuItem key={method} value={method}>
                {method}
              </MenuItem>
            ))}
          </Select>
        </Row>

        <Row className={classes.caseGroup}>
          {cases.map((tag, index) => (
            <Chip
              size={"small"}
              key={tag.name}
              label={tag.name}
              onClick={() => onTagClick(index)}
            />
          ))}
        </Row>
        <Editor
          name={"message_editor"}
          placeholder={"Input Message Here"}
          mode={"json"}
          theme={"tomorrow_night_eighties"}
          value={messageValue}
          onChange={onMessageChanged}
        />
        <SizedBox height={10} />
        <LabelText
          id={"message_hash"}
          value={messageHashValue}
          label={"Message Hash"}
        />
        <SizedBox height={10} />
        <LabelText
          id={"signature"}
          value={signatureValue}
          label={"Signature"}
        />
        <SizedBox height={10} />
        <LabelText
          id={"recovered_address"}
          value={recoveredAddress}
          label={"Recovered Address"}
          placeholder={"Please make sure the message and signature are correct"}
        />
        <SizedBox height={10} />
        <Row className={classes.bottomButtonGroup}>
          <Button
            variant={"contained"}
            color={"primary"}
            disabled={isWalletEnabled}
            onClick={connectWallet}
          >
            {isWalletEnabled && connectedAccount
              ? `${connectedAccount.slice(0, 4)}...${connectedAccount.slice(
                  -4
                )}`
              : "Connect"}
          </Button>
          <SizedBox width={16} />
          <Button
            variant={"contained"}
            color={"secondary"}
            disabled={disabledSignBtn || !isWalletEnabled}
            onClick={onSignButtonClick}
          >
            SIGN
          </Button>
        </Row>
      </Column>
    </PagePaper>
  );
};
