import { styled, Theme } from '@material-ui/core';

const Flex = styled('div')({
  display: 'flex',
});

const Column = styled(Flex)({
  flexDirection: 'column',
});

const Row = styled(Flex)({
  flexDirection: 'row',
});

const Center = styled(Flex)({
  justifyContent: 'center',
  alignItems: 'center',
});

const SizedBox = styled('div')<Theme, { width?: any; height?: any }>(
  ({ width, height }) => ({
    width: width,
    height: height,
  }),
);

export { Flex, Column, Row, Center, SizedBox };
