import { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import * as ethUtil from "ethereumjs-util";

const EcRecoverViewer = ({
  messageHash,
  signature,
}: {
  messageHash: string;
  signature: string;
}) => {
  const [recoveredAddress, setRecoveredAddress] = useState<string>("");

  useEffect(() => {
    if (messageHash && signature) {
      try {
        const hashBuffer = ethUtil.toBuffer(messageHash);
        const sigBuffer = ethUtil.toBuffer(signature);

        console.assert(
          hashBuffer.length === 32,
          `Invalid message hash: ${messageHash}`
        );
        console.assert(
          sigBuffer.length === 65,
          `Invalid signature: ${signature}`
        );

        const [r, s, v] = [
          sigBuffer.slice(0, 32),
          sigBuffer.slice(32, 64),
          sigBuffer[64],
        ];
        const public_key = ethUtil.ecrecover(hashBuffer, v, r, s);
        const address = ethUtil.addHexPrefix(
          ethUtil.pubToAddress(public_key).toString("hex")
        );
        setRecoveredAddress(() => address);
        return;
      } catch (e) {
        console.error(e);
      }
    }
    setRecoveredAddress("");
  }, [messageHash, signature]);

  return (
    <TextField
      id={"recovered_address"}
      variant="outlined"
      value={recoveredAddress}
      label={"Recovered Address"}
      placeholder={"Please fill in the message and signature first"}
    />
  );
};

export default EcRecoverViewer;
