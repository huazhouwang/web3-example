import AceEditor from "react-ace";
import { IAceEditorProps } from "react-ace/lib/ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-tomorrow_night_eighties";

const Editor = (props: IAceEditorProps) => {
  return (
    <AceEditor
      width={"100%"}
      fontSize={14}
      showGutter={false}
      wrapEnabled
      showPrintMargin
      highlightActiveLine
      enableBasicAutocompletion
      enableLiveAutocompletion
      tabSize={2}
      {...props}
    />
  );
};

export default Editor;
