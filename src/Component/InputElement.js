import React, { Component } from "react";
import { Field } from "react-final-form";
import "rsuite/dist/styles/rsuite-default.css";
import { Input, InputGroup } from "rsuite";

export default class InputElement extends Component {
  render() {
    const required = (value) => (value ? undefined : "Không được bỏ trống");
    return (
      <div>
        <InputGroup>
          <InputGroup.Addon>
          </InputGroup.Addon>
          <Field name={this.props.name} validate={required}>
            {({ input, meta }) => (
              <div>
                <Input
                  {...input}
                  type={this.props.type}
                  disabled={this.props.disabled}
                />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
        </InputGroup>
      </div>
    );
  }
}
