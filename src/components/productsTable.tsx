import {
  Box,
  Inline,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@stripe/ui-extension-sdk/ui";

export const ProductsTable = ({ products }: any) => {
  if (!products) {
    return (
      <Box css={{ marginTop: "medium" }}>
        <Inline css={{ font: "subheading", fontWeight: "bold" }}>
          No active products
        </Inline>
      </Box>
    );
  }

  return (
    <Box>
      <Inline css={{ font: "subheading", fontWeight: "bold" }}>
        ACTIVE INVENTORY
      </Inline>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Product</TableHeaderCell>
            {/* <TableHeaderCell>Total Sales</TableHeaderCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product: any, i: number) => (
            <TableRow key={`product_${i}`}>
              <TableCell>{product.name}</TableCell>
              {/* <TableCell>${product.price} x 2</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell>
              <Inline css={{ font: "bodyEmphasized" }}>Total</Inline>
            </TableCell>
            <TableCell>
              <Inline css={{ font: "bodyEmphasized" }}>$260.40</Inline>
            </TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </Box>
  );
};
