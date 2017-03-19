import React from 'react';
import { Table, Column, Cell} from 'fixed-data-table';


const CustomersTable = ({customers}) => (
  <Table
    rowHeight={50}
    rowsCount={22}
    width={500}
    height={500}
    headerHeight={50}
  >
    <Column
      header={<Cell>Col 1</Cell>}
      cell={<Cell>Column 1 static content</Cell>}
    />

    <Column
      header={<Cell>Col 2</Cell>}
      width={100}
    />
  </Table>
);

export default CustomersTable;
