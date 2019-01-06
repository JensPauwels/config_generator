import { observable } from 'mobx';
import { Validator, Param as param } from './';

export default class Entity {
  @observable name;
  @observable rules;

  constructor(context, data) {
    this.validate = new Validator();
    this.name = param(data, 'name');
    this.rules = param(data, 'rules', []);

    this.validation = {
      name: this.validate.input,
      rules: this.validate.undefined,
    };

    this.validate.initializeErrors(this, this.validation);
  };

  toJSON = () => {
    return {
      name: this.name,
      rules: this.rules,
    }
  }
};

