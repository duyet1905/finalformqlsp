import React, { Component } from "react";
import "rsuite/lib/styles/index.less";
import "rsuite/dist/styles/rsuite-default.css";
import { Button, Table } from "rsuite";

const { Column, HeaderCell, Cell } = Table;
const styles = {
  btn: {
    backgroundColor: "#169de0",
    color: "#fff",
  },
  table: {
    width: "710px",
     border: '3px solid #73AD21'
  },
};

class RTable extends Component {
  getData() {
    let { ArrayProduct = [], ArrayTemporary = [], keyWord } = this.props;
    const listData = keyWord === "" ? ArrayProduct : ArrayTemporary;
    return listData;
  }

  render() {
    let { showFormEdit, deleteData } = this.props;
    const data = this.getData();
    return (
      <div>
        <Table style={styles.table} data={data} height={400}>
          <Column width={70} align="center">
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>
          <Column width={220}>
            <HeaderCell>Tên Sản Phẩm</HeaderCell>
            <Cell dataKey="name" />
          </Column>
          <Column width={100}>
            <HeaderCell>Ghi chú</HeaderCell>
            <Cell dataKey="note" />
          </Column>
          <Column width={100} flexGrow={1}>
            <HeaderCell>Giá</HeaderCell>
            <Cell dataKey="price" />
          </Column>
          <Column width={120} fixed="right">
            <HeaderCell>Action</HeaderCell>
            <Cell>
              {(rowIndex) => {
                return (
                  <span>
                    <Button
                      style={styles.btn}
                      onClick={() => {
                        showFormEdit(rowIndex.id);
                      }}
                    >
                    Sửa
                    </Button>{" "}
                    <Button
                      style={styles.btn}
                      onClick={() => deleteData(rowIndex.id)}
                    >
                    Xóa
                    </Button>
                  </span>
                );
              }}
            </Cell>
          </Column>
        </Table>
      </div>
    );
  }
}

export default RTable;
