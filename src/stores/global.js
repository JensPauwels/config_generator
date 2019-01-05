import { observable, action } from 'mobx';
import { Rule } from '../Components/models';

class Global {
  @observable lang = 'en';
  @observable projectName = '';
  @observable rules = [];
  @observable newRule = new Rule();

  @action
  addNewRule = () => {
    return new Promise((resolve, reject) => {
      this.rules.push(this.newRule);
      this.newRule = new Rule();

      resolve(true);
    });
  };
};


export default new Global();

