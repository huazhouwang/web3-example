import { MessageEditorView } from "./view";
import { useCallback, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { MessageSignMethod, Methods } from "./methods";
import { injected } from "../../connector";

const MessageEditor = () => {
  const web3 = useWeb3React();
  const { active, activate, account } = web3;
  const [selectedMethod, setSelectedMethod] = useState<string>("eth_sign");

  const method: MessageSignMethod = Methods[selectedMethod || "eth_sign"];
  const onSign = useCallback(
    (message: string) => method.signMessage(web3, message),
    [web3, method]
  );

  return (
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
  );
};

export default MessageEditor;
