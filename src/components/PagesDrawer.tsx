import {
  Divider,
  Drawer,
  ListItem,
  ListItemText,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React, { useMemo } from 'react';
import { SizedBox } from './basic';
import { DrawerProps } from '@material-ui/core/Drawer/Drawer';

const DRAWER_WIDTH = 240;
const useStyle = makeStyles((theme) => ({
  drawer: {},
  drawerPaper: {
    marginTop: theme.spacing(8),
    width: DRAWER_WIDTH,
    height: 300,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  menuItem: {
    height: theme.spacing(8),
  },
}));

const PagesDrawer = ({
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
  const classes = useStyle();
  const theme = useTheme();
  const isXsSize = useMediaQuery(theme.breakpoints.down('xs'));

  const drawerProps = useMemo<DrawerProps>(() => {
    if (isXsSize) {
      return {
        anchor: 'bottom',
      };
    } else {
      return {
        anchor: 'left',
        className: classes.drawer,
        classes: { paper: classes.drawerPaper },
      };
    }
  }, [classes, isXsSize]);

  return (
    <Drawer open={open} onClose={onClose} {...drawerProps}>
      {menus.map((text, index) => (
        <ListItem
          className={classes.menuItem}
          button
          key={text}
          onClick={() => onDrawerItemClick(text, index)}
          divider={!isXsSize}
        >
          <ListItemText primary={text} />
        </ListItem>
      ))}

      {isXsSize && <Divider />}
      <SizedBox height={theme.spacing(6)} />
    </Drawer>
  );
};

export default PagesDrawer;
