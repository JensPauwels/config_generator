import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { translate } from '../I18n';

@observer
class Input extends Component {
  onChange = (ev) => {
    const { context, name } = this.props;
    context.props.entity[name] = ev.target.value;
    context.forceUpdate();
  };

  onValidate = async (ev) => {
    const { context, name } = this.props;
    const { entity } = context.props;
    const errorResult = await entity.validation[name](ev.target.value);
    entity[`error${name}`] = errorResult;
  };

  render() {
    const { context, placeholder = '', disableplaceholder, update, name, value, validate = true, ...rest } = this.props;
    const { message, error } = context.props.entity[`error${name}`] || {};
    let status;

    if (error !== undefined && error) {
      status = 'invalid';
    } else if (validate && error !== undefined && !error) {
      status = 'valid';
    }

    return (
      <div>
        {
          false
            && (
              <div className="inputError">
                <i className="material-icons">error_outline</i>
                { message }
              </div>
            )
        }

        <input
          name={name}
          className={status}
          value={value}
          onChange={this.onChange}
          onBlur={this.onValidate}
          placeholder={placeholder !== '' ? translate(placeholder) : placeholder}
          {...rest}
        />
      </div>
    );
  }
}

export default Input;
