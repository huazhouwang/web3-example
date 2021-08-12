import {
  Divider,
  Drawer,
  ListItem,
  ListItemText,
  useTheme,
} from "@material-ui/core";
import React from "react";
import { SizedBox } from "./basic";

const PageDrawer = ({
  menus,
  open,
  onDrawerItemClick,
  onClose,
}: {
  menus: Array<string>;
  open: boolean;
  onDrawerItemClick: (text: string, index: number) => void;
  onClose: VoidFunction;
}) => {
  const theme = useTheme();

  return (
    <Drawer anchor={"bottom"} open={open} onClose={onClose}>
      {menus.map((text, index) => (
        <ListItem
          button
          key={text}
          onClick={() => onDrawerItemClick(text, index)}
        >
          <ListItemText primary={text} />
        </ListItem>
      ))}

      <Divider />
      <SizedBox height={theme.spacing(6)} />
    </Drawer>
  );
};

export default PageDrawer;
