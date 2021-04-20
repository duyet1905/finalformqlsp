/* eslint-disable no-useless-constructor */
/* eslint-disable react/jsx-pascal-case */
import React, { Component } from "react";
import { Form as Final_Form } from "react-final-form";
import "rsuite/dist/styles/rsuite-default.css";
import { ControlLabel, Button, Form } from "rsuite";
import InputElement from "./InputElement";
import "../Component/style.css";

export default class FInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onSubmitData, disableInputID } = this.props;
    const onSubmit = (obj, form) => {
      onSubmitData(obj);
    };

    return (
      
        <div id = "FormIn">
          <Final_Form
            onSubmit={onSubmit}
            initialValues={this.props.initialValues}
            render={({ handleSubmit, form, submitting, pristine }) => (
              <Form onSubmit={handleSubmit}>
                <ControlLabel>ID</ControlLabel>
                <InputElement
                  type="text"
                  name="id"
                  disabled={disableInputID}
                />
                <ControlLabel>Tên Sản Phẩm</ControlLabel>
                <InputElement type="text" name="name" />
                <ControlLabel>Ghi chú</ControlLabel>
                <InputElement type="text" name="note" />
                <ControlLabel>Giá</ControlLabel>
                <InputElement type="number" name="price" step="100" />
                <div className="buttons">
                  <Button type="submit" disabled={submitting} >
                    {disableInputID ? "Update" : "Add"}
                  </Button>
                  <Button
                    type="button"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                </div>
              </Form>
            )}
          />
        </div>
    );
  }
}
