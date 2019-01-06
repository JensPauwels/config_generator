import { observable, action } from 'mobx';
import { Entity, Rule } from '../Components/models';

class Global {
  @observable lang = 'en';
  @observable projectName = '';
  @observable selectedEntity = '';
  @observable rules = [];
  @observable selectedEntities = new Entity();
  @observable newEntity = new Entity();
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

