import { styled } from '@material-ui/core';

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
  justifyItems: 'center',
  alignItems: 'center',
});

const SizedBox = ({ width, height }: { width?: any; height?: any }) => (
  <div style={{ width, height }} />
);

export { Flex, Column, Row, Center, SizedBox };
