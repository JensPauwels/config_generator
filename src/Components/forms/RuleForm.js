import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import { Input } from '../elements/';

@observer
class RuleForm extends Component {

  render() {
    const { name, labelName, type, defaultValue, validationOption, validationMessage, listOptions } = this.props.entity;
    return (
      <Fragment>
        <div>
          <label>Name</label>
          <Input context={this} type="text" name="name" placeholder="name" value={name}/>
        </div>
        <div>
          <label>labelName</label>
          <Input context={this} type="text" name="labelName" placeholder="labelName" value={labelName}/>
        </div>
        <div>
          <label>type</label>
          <Input context={this} type="text" name="type" placeholder="type" value={type}/>
        </div>
        <div>
          <label>default value</label>
          <Input context={this} type="text" name="defaultValue" placeholder="defaultValue" value={defaultValue}/>
        </div>
        <div>
          <label>validation option</label>
          <Input context={this} type="text" name="validationOption" placeholder="validationOption" value={validationOption}/>
        </div>
        <div>
          <label>validation message</label>
          <Input context={this} type="text" name="validationMessage" placeholder="validationMessage" value={validationMessage}/>
        </div>
        <div>
          <label>list options</label>
          <Input context={this} type="text" name="listOptions" placeholder="listOptions" value={listOptions}/>
        </div>
      </Fragment>
    )
  }
}
export default RuleForm;

