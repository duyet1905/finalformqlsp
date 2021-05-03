import React, { Component } from "react";
import "rsuite/lib/styles/index.less";
import "rsuite/dist/styles/rsuite-default.css";
import { Button, Table, Checkbox } from "rsuite";
import example from "../Component/productarr";

const { Column, HeaderCell, Cell } = Table;

const styles = {
  
  btn: {
    backgroundColor: "#000000",
    color: "#A9A9A9",
  },
  table: {
    width: "710px",
     border: '1px solid #000000'

  },
};
const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div style={{ lineHeight: '46px' }}>
      <Checkbox
        value={rowData[dataKey]}
        inline
        onChange={onChange}
        checked={checkedKeys.some(item => item === rowData[dataKey])}
      />
    </div>
  </Cell>
);

const dataT = example.filter((v, i) => i < 20);
class RTable extends Component {
  getData() {
    let { ArrayProduct = [], ArrayTemporary = [], keyWord } = this.props;
    const listData = keyWord === "" ? ArrayProduct : ArrayTemporary;
    return listData;
  }

   constructor(props) {
    super(props);
    this.state = {
      checkedKeys: [],
      dataT
    };
    this.handleCheckAll = this.handleCheckAll.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }
  handleCheckAll(value, checked) {
    const checkedKeys = checked ? dataT.map(item => item.id) : [];
    this.setState({
      checkedKeys
    });
  }
   handleCheck(value, checked) {
    const { checkedKeys } = this.state;
    const nextCheckedKeys = checked
      ? [...checkedKeys, value]
      : checkedKeys.filter(item => item !== value);

    this.setState({
      checkedKeys: nextCheckedKeys
    });
  }

  render() {
 const { dataT, checkedKeys } = this.state;

    let checked = false;
    let indeterminate = false;

    if (checkedKeys.length === dataT.length) {
      checked = true;
    } else if (checkedKeys.length === 0) {
      checked = false;
    } else if (checkedKeys.length > 0 && checkedKeys.length < dataT.length) {
      indeterminate = true;
    }


    let { showFormEdit, deleteData,  deleteDataTable } = this.props;
    const data = this.getData();
    return (
      <div>
      <Button
                      style={styles.btn}
                      onClick={() => deleteDataTable(checkedKeys)}
                    >
                    Xóa mục đã chọn
        </Button>
          <Table id = "dataTable" style={styles.table} data={data} height={400}>


          <Column width={70} align="center">
            <HeaderCell>
              <div>
                <Checkbox
                  inline
                  checked={checked}
                  indeterminate={indeterminate}
                  onChange={this.handleCheckAll}
                />
                </div>
              
            </HeaderCell>   
         
                     <CheckCell
              dataKey="id"
              checkedKeys={checkedKeys}
              onChange={this.handleCheck}
            />      
          </Column>





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
