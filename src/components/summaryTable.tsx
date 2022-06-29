import {
  Box,
  TableFooter,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Table,
  TableHeaderCell,
  Inline,
} from "@stripe/ui-extension-sdk/ui";

export default function summaryTable() {
  return (
    <Box>
      <Box css={{ marginTop: "medium" }}>
        <Inline css={{ font: "subheading", fontWeight: "bold" }}>
          {"SUMMARY (LAST 24 HRS.)"}
        </Inline>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Charge type</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Setup fee</TableCell>
            <TableCell>$95.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Maintenance fee</TableCell>
            <TableCell>$50.45</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Extra storage space (per GB)</TableCell>
            <TableCell>$5.95</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Premium features</TableCell>
            <TableCell>$109.00</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>
              <Inline css={{ font: "bodyEmphasized" }}>Total</Inline>
            </TableCell>
            <TableCell>
              <Inline css={{ font: "bodyEmphasized" }}>$260.40</Inline>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Box>
  );
}
