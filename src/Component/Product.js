import React, { Component } from "react";
import RTable from "./RTable";
import FInput from "./FormInput";
import "rsuite/dist/styles/rsuite-default.css";
export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ArrayProduct: '',
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

  clearInput = () => {
    this.setState({ Element: {} });
  };

  checkValidateId = (ProductAttribute) => {
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

  handleDataSubmit = (obj) => {
    let { index } = this;
    let { ArrayProduct, ArrayTemporary, disableInputID } = this.state;
    if (!disableInputID) {
      if (!this.checkValidateId(obj)) {
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
    this.clearInput();
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
          onSubmitData={this.handleDataSubmit}
          initialValues={Properties}
          disableInputID={disableInputID}
        />
          <RTable
            ArrayProduct={ArrayProduct}
            ArrayTemporary={ArrayTemporary}
            showFormEdit={this.showFormEdit}
            deleteData={this.deleteData}
            keyWord={keyWord}
          />
        </div>
    );
  }
}
