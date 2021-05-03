/* eslint-disable eqeqeq */
import React, { Component } from "react";
import RTable from "./RTable";
import FInput from "./FormInput";
import "rsuite/dist/styles/rsuite-default.css";
import example from "../Component/productarr"
export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ArrayProduct: example,
      Element: {
        id: "",
        name: "",
        note: "",
        price: "",
      },
      ArrayTemporary: [],
      keyWord: "",
      disableInputID: false,
      textBtn: "Add",
    };
  }

  onChangeStatusInputId = (disableInputID = false) => {
    this.setState({ disableInputID });
  };

  Input = () => {
    this.setState({ Element: {} });
  };

  Validate = (ProductAttribute) => {
    let { ArrayProduct } = this.state;
    let validate = true;
    let count = 0;
    let idInput = ProductAttribute.id.toLowerCase();
    for (let x = 0; x < ArrayProduct.length; x++) {
      let idformData = ArrayProduct[x].id.toLowerCase();
      if (idformData === idInput) {
        count = count + 1;
      }
    }
    return validate;
  };

  Submit = (obj) => {
    let { index } = this;
    let { ArrayProduct, ArrayTemporary, disableInputID } = this.state;
    if (!disableInputID) {
      if (!this.Validate(obj)) {
        return;
      } else {
        this.setState({
          ArrayProduct: [...this.state.ArrayProduct, obj],
        });
      }
    } else {
      if (ArrayTemporary.length === 0) {
        let index1 = ArrayProduct.findIndex((s) => s.id === obj.id);
        ArrayProduct[index1] = obj;
      } else {
        let index2 = ArrayTemporary.findIndex(
          (s) => s.id === ArrayProduct[index].id
        );
        ArrayProduct[index] = obj;
        ArrayTemporary[index2] = obj;
      }
      this.setState({ ArrayProduct, ArrayTemporary });
    }
    this.onChangeStatusInputId(false);
    this.Input();
  };

  showFormEdit = (id) => {
    let { ArrayProduct } = this.state;
    this.onChangeStatusInputId(true);
    let index = ArrayProduct.findIndex((s) => s.id === id);
    this.setState({
      Properties: ArrayProduct[index],
    });
  };

  deleteData = (id) => {
    let { ArrayProduct, ArrayTemporary } = this.state;
    let index = ArrayProduct.findIndex((s) => s.id === id);
    if (ArrayTemporary.length === 0) {
      ArrayProduct.splice(index, 1);
      this.setState({ ArrayProduct });
    } else {
      let index2 = ArrayTemporary.findIndex((s) => s.id === id);
      ArrayProduct.splice(index, 1);
      ArrayTemporary.splice(index2, 1);
      this.setState({ ArrayProduct, ArrayTemporary });
    }
  };
  Search = (e) => {
    let search = this.state.ArrayProduct.filter((newArray) => {
      return (
        newArray.name.toUpperCase().includes(e.target.value.toUpperCase()) ||
        newArray.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    this.setState({
      keyWord: e.target.value.toUpperCase(),
      ArrayTemporary: search,
    });
    this.Input();
  };




  deleteDataTable =(checkedKeys)=> {
           let array = this.state.ArrayProduct
          console.log(array);
          let select = checkedKeys;
          console.log(select)
    let result = array.splice(select,4)    
    console.log(result); 


  }



  render() {
    let {
      ArrayProduct,
      ArrayTemporary,
      disableInputID,
      Properties,
      keyWord,
    } = this.state;
    return (
      
      <div className="main">
        <FInput
          onSubmitData={this.Submit}
          initialValues={Properties}
          disableInputID={disableInputID}
          
        />
        <div className="search">
            <input
              onChange={this.Search}
              value={keyWord}
              placeholder="Search..."
            />
            </div>
          <RTable
            ArrayProduct={ArrayProduct}
            ArrayTemporary={ArrayTemporary}
            showFormEdit={this.showFormEdit}
            deleteData={this.deleteData}
            deleteDataTable={this.deleteDataTable}
            keyWord={keyWord}
          />
        </div>
    );
  }
}

  //  try {
            
            // let table = document.getElementById("dataTable");
            //  let rowCount = table.rows.length;

            // for (var i = 0; i < rowCount; i++) {
            //     var row = table.rows[i];
            //     var checkbox = row.cells[0].childNodes[0];
            //     if (null != checkbox && true == checkbox.checked) {
            //        if (rowCount <= 1) {
            //            alert("không thể xóa!");
            //            break;
            //         }
            //          table.deleteRow(i);
            //          rowCount--;
            //          i--;
            //      }
            //  }
        //  } catch (e) {
        //     alert(e);
        // }
