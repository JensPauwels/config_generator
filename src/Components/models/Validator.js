import { extendObservable } from 'mobx';
import { translate } from '../I18n';

export default class Validator {
  initializeErrors = (context, validation) => {
    const keys = Object.keys(validation);
    const obj = {};

    keys.forEach((key) => {
      obj[`error${key}`] = false;
    });
    extendObservable(context, obj);
  };

  email = (email, message = 'should_be_a_valid_email') => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return {
      message: translate(message),
      error: !re.test(String(email).toLowerCase()),
    };
  };


  password = (input, message = 'enter_a_stronger_password') => {
    return {
      message: translate(message),
      error: input.length < 8,
    };
  };

  input = (input, message = 'cannot_be_empty') => ({
    message: translate(message),
    error: input === '',
  });

  doubleParameter = (first, second, message = 'should_be_identical') => ({
    message: translate(message),
    error: ((first === '' || second === '') || (first !== second)),
  });

  undefined = (input, message = 'cannot_be_undefined') => ({
    message: translate(message),
    error: input === undefined,
  });

  deviceCode = (input, message = 'should_have_a_length_of_26_characters') => ({
    message: translate(message),
    error: input.length !== 26,
  });

  unique = (input, list = [], param, message = 'should_be_unique') => {
    const occurrences = list.map((obj) => {
      if (obj[param] !== undefined) {
        return obj[param].value;
      }
      return undefined;
    });

    return {
      message: translate(message),
      error: !occurrences.includes(input),
    };
  };
}
