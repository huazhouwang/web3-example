import { Row, SizedBox } from './basic';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
  Link,
} from '@material-ui/core';
import { useState } from 'react';

const ExpandableHelperText = ({
  value,
  stripThreshold = 50,
}: {
  value: string | undefined;
  stripThreshold?: number;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const isLongText = value && value.length >= stripThreshold;
  const stripText = isLongText
    ? value?.slice(0, stripThreshold) + '...'
    : value;

  return (
    <>
      {value && (
        <FormHelperText error>
          <Row>
            {stripText}
            {isLongText && (
              <>
                <SizedBox width={3} />
                <Link
                  component="button"
                  onClick={() => setIsDialogOpen(true)}
                  color={'inherit'}
                  underline={'always'}
                  aria-label={value}
                >
                  more
                </Link>
                <Dialog
                  scroll={'paper'}
                  open={isDialogOpen}
                  onClose={() => setIsDialogOpen(false)}
                >
                  <DialogTitle>Error</DialogTitle>
                  <DialogContent>
                    <DialogContentText>{value}</DialogContentText>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </Row>
        </FormHelperText>
      )}
    </>
  );
};

export default ExpandableHelperText;
