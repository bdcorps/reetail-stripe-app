import { Box, Inline, Icon, LineChart } from "@stripe/ui-extension-sdk/ui";

type sale = {
  date: string;
  sold: number;
};

type salesProps = {
  sales: Array<sale>;
};

export const SalesChart = ({ sales }: salesProps) => {
  return (
    <Box>
      <Box
        css={{
          layout: "row",
          alignY: "center",
          marginTop: "medium",
          gap: "xsmall",
        }}
      >
        <Inline css={{ font: "body", fontWeight: "bold" }}>{"Sales"}</Inline>
        <Icon name="info" size="xsmall" />
      </Box>
      <LineChart data={sales} x="date" y="sold" />
    </Box>
  );
};
