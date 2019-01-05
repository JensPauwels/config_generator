import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import { Input, Label } from '../elements';

@observer
class NewRuleForm extends Component {
  render() {
    const { name } = this.props.entity;
    return (
      <Input type="text" context={this} placeholder="name" name="name" value={name} />
    )
  }
};

export default NewRuleForm;
