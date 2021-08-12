import { MessageEditorView } from "./view";
import { useCallback, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { MessageSignMethod, Methods } from "./methods";
import { injected } from "../../connector";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { easyCheckSignature, stringifyProviderError } from "./helper";
import * as ethUtil from "ethereumjs-util";

const recoverAddress = (messageHash: string, signature: string): string => {
  const hashBuffer = ethUtil.toBuffer(messageHash);
  const sigBuffer = ethUtil.toBuffer(signature);

  console.assert(
    hashBuffer.length === 32,
    `Invalid message hash: ${messageHash}`
  );
  console.assert(sigBuffer.length === 65, `Invalid signature: ${signature}`);

  const [r, s, v] = [
    sigBuffer.slice(0, 32),
    sigBuffer.slice(32, 64),
    sigBuffer[64],
  ];
  const public_key = ethUtil.ecrecover(hashBuffer, v, r, s);
  return ethUtil.addHexPrefix(ethUtil.pubToAddress(public_key).toString("hex"));
};

const MessageEditor = () => {
  const web3 = useWeb3React();
  const { active, activate, account } = web3;
  const [selectedMethod, setSelectedMethod] = useState<string>("eth_sign");
  const [snackBarState, setSnackBarState] =
    useState<{ isOpening: boolean; isPositive?: boolean; message?: string }>();

  const method: MessageSignMethod = Methods[selectedMethod || "eth_sign"];
  const onSign = useCallback(
    async (message: string): Promise<[string, string]> => {
      console.assert(!!account);
      let snackBarState: { isPositive: boolean; message: string } | undefined =
        undefined;
      let signature = "";
      let recoveredAddress = "";

      try {
        signature = await method.signMessage(web3, message);
        if (signature && easyCheckSignature(signature)) {
          recoveredAddress = recoverAddress(
            await method.hashMessage(message),
            signature
          );

          if (recoveredAddress.toLowerCase() === account?.toLowerCase()) {
            snackBarState = {
              isPositive: true,
              message: "Signature Verified",
            };
          } else {
            snackBarState = {
              isPositive: false,
              message: "Sorry! The Message Signature Verification Failed",
            };
          }
        } else {
          snackBarState = {
            isPositive: false,
            message: "Invalid signature",
          };
        }
      } catch (e) {
        console.error("Error in signing message", e);

        snackBarState = {
          isPositive: false,
          message: stringifyProviderError(e),
        };
      }

      if (snackBarState) {
        setSnackBarState(() => ({ isOpening: true, ...snackBarState }));
      }

      return [signature, recoveredAddress];
    },
    [web3, account, method]
  );

  return (
    <>
      <MessageEditorView
        isWalletEnabled={active}
        connectedAccount={account}
        connectWallet={() => activate(injected)}
        methodOptions={Object.keys(Methods)}
        selectedMethod={selectedMethod}
        onMethodSelected={setSelectedMethod}
        cases={method.cases}
        preferJsonStringMessage={method.preferJsonStringMessage}
        hashMessage={method.hashMessage}
        checkIsTargetMessage={method.checkIsTargetMessage}
        onSign={onSign}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackBarState?.isOpening || false}
        autoHideDuration={3000}
        onClose={() =>
          setSnackBarState((prevState) => ({ ...prevState, isOpening: false }))
        }
      >
        <MuiAlert severity={snackBarState?.isPositive ? "success" : "error"}>
          {snackBarState?.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default MessageEditor;
