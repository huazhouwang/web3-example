import {
  Button,
  ButtonGroup,
  ButtonGroupProps,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import React from 'react';

export interface MultiActionType {
  label: string;
  action: JSX.Element;
}

const MultiActionsSelector = ({
  selectedIndex,
  actions,
  onActionSelect,
  groupProps,
}: {
  selectedIndex: number;
  actions: Array<MultiActionType>;
  onActionSelect: (action: MultiActionType, index: number) => void;
  groupProps?: ButtonGroupProps;
}) => {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <ButtonGroup {...groupProps}>
      {actions[selectedIndex].action}
      <Button
        onClick={(e) => {
          const target = e.currentTarget;
          setAnchorEl(target);
          setOpenMenu(Boolean(target));
        }}
      >
        <ArrowDropDown />
      </Button>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={openMenu}
        onClose={() => setOpenMenu(false)}
      >
        {actions.map((action, index) => (
          <MenuItem
            key={action.label}
            selected={index === selectedIndex}
            onClick={() => {
              onActionSelect(action, index);
              setOpenMenu(false);
            }}
          >
            {action.label}
          </MenuItem>
        ))}
      </Menu>
    </ButtonGroup>
  );
};

export default MultiActionsSelector;
