import { TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField/TextField';

const LabelText = ({
  id,
  value,
  label,
  placeholder,
  ...props
}: TextFieldProps) => (
  <TextField
    id={id}
    variant="outlined"
    value={value}
    label={label}
    placeholder={placeholder}
    {...props}
  />
);

export default LabelText;
