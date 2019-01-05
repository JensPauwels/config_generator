import React from 'react';
import { FormattedMessage } from 'react-intl';

export default ({ htmlFor, ...rest }) => (
  <label htmlFor={htmlFor} {...rest}>
    <FormattedMessage id={htmlFor} />
  </label>
);
