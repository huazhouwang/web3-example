import AceEditor from "react-ace";
import { IAceEditorProps } from "react-ace/lib/ace";
import { useEffect } from "react";

const Editor = (props: IAceEditorProps) => {
  const { theme, mode } = props;

  useEffect(() => {
    try {
      if (theme) {
        require(`ace-builds/src-noconflict/theme-${theme}`);
      }
    } catch (e) {
      console.error(e);
    }

    try {
      if (mode) {
        require(`ace-builds/src-noconflict/mode-${mode}`);
      }
    } catch (e) {
      console.error(e);
    }
  }, [theme, mode]);

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
