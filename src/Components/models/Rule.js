import { observable } from 'mobx';
import { Validator, Param as param } from './';

export default class Rule {
  @observable name;
  @observable labelName;
  @observable type;
  @observable defaultValue;
  @observable validationOption;
  @observable validationMessage;
  @observable listOptions;
  
  constructor(context, data) {
    this.context = context;

    this.validate = new Validator();
    this.name = param(data, 'name');
    this.labelName = param(data, 'labelName');
    this.type = param(data, 'type', 'text');
    this.defaultValue = param(data, 'defaultValue', '');
    this.validationOption = param(data, 'validationOption', 'input');
    this.validationMessage = param(data, 'validationMessage');
    this.listOptions = param(data, 'listOptions');

    this.validation = {
      name: this.validate.input,
      labelName: this.validate.input,
      type: this.validate.input,
      defaultValue: this.validate.input,
      validationOption: this.validate.input,
      validationMessage: this.validate.input,
      listOptions: this.validate.input,
    };

    this.validate.initializeErrors(this, this.validation);

  };

  toJSON = () => {
    return {
      name: this.name,
      labelName: this.labelName,
      type: this.type,
      defaultValue: this.defaultValue,
      validationOption: this.validationOption,
      validationMessage: this.validationMessage,
      listOptions: this.listOptions,
    }
  };
}

