import AceEditor from 'react-ace';
import { IAceEditorProps } from 'react-ace/lib/ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-tomorrow_night_eighties';
import { useMediaQuery, useTheme } from '@material-ui/core';

const Editor = (props: IAceEditorProps) => {
  const theme = useTheme();
  const isUp800 = useMediaQuery(theme.breakpoints.up(800));

  return (
    <AceEditor
      width={'100%'}
      fontSize={14}
      showGutter={isUp800}
      wrapEnabled
      showPrintMargin
      highlightActiveLine
      enableBasicAutocompletion
      enableLiveAutocompletion
      tabSize={2}
      debounceChangePeriod={600}
      {...props}
    />
  );
};

export default Editor;
