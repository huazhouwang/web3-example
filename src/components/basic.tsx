import { styled } from "@material-ui/core";

const Column = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const Row = styled("div")({
  display: "flex",
  flexDirection: "row",
});

const SizedBox = ({ width, height }: { width?: any; height?: any }) => (
  <div style={{ width, height }} />
);

export { Column, Row, SizedBox };
