import React, { Component } from 'react';
import { observer } from 'mobx-react';
import uuidv4 from 'uuid/v4';

@observer
class List extends Component {
  onChange = (ev) => {
    const { context, name } = this.props;
    context.props.entity[name] = ev.target.value;
  };

  componentDidUpdate = () => {
    const { context, name, list, value, selectedValue } = this.props;

    if (selectedValue === '' && list.length > 0) {
      context.props.entity[name] = list[0][value];
    }
  };

  render() {
    const { value, selectedValue, name, text, list } = this.props;

    return (
      <select className="browser-default select" name={name} onChange={this.onChange} value={selectedValue}>
        {list.map(item => <option key={uuidv4()} value={item[value]}>{item[text]}</option>)}
      </select>
    );
  }
}

export default List;
