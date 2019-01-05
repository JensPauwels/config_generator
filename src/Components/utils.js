import M from 'materialize-css';
import { Messages } from './components/I18n';
import jwtdecoder from 'jwt-decode';

export const completeMessage = (succes) => {
  M.toast({ html: `${succes}`, classes: 'succes' });
};

export const errorMessage = (err) => {
  M.toast({ html: `${err}`, classes: 'error' });
};

const asyncForEach = async function (array, callback) {
  for (let index = 0; index < array.length; index += 1) {
    await callback(array[index], index, array);
  }
};

export const controlOnErrors = async (entity, validation) => {
  const keys = Object.keys(validation !== undefined ? validation : entity.validation);
  const errors = [];
  let hasErrors = false;

  await asyncForEach(keys, async (key) => {
    const result = (validation !== undefined)
      ? await validation[key](entity[key])
      : await entity.validation[key](entity[key]);

    entity[`error${key}`] = result;

    if (result.error) {
      errors.push({ key, error: result.message });
      hasErrors = true;
    }
  });

  return new Promise((resolve, reject) => {
    if (hasErrors) {
      Messages.handleErrors(errors);
      reject(errors);
    } else {
      resolve(errors);
    }
  });
};


export const openModal = (modal) => {
  const elem = document.getElementById(modal);
  if (elem !== undefined && elem !== null) {
    const instance = M.Modal.getInstance(elem);
    if (instance !== undefined && instance !== null) {
      instance.open();
      M.FormSelect.init(document.querySelectorAll('select'), {});
    }
  } else {
    throw new Error(`could not find dom node with id ${modal}`);
  }
};

export const closeModal = (modal) => {
  const elem = document.getElementById(modal);
  if (elem !== undefined && elem !== null) {
    const instance = M.Modal.getInstance(elem);
    if (instance !== undefined && instance !== null) {
      instance.close();
    }
  } else {
    throw new Error(`could not find dom node with id ${modal}`);
  }
};

export const singleSort = ( array, param ) => {
  return array.sort((a, b) => a[param] === b[param] ? 0 : (a[param] < b[param] ? -1 : 1));
};

export const multiSort = (array, params) => {
  return params.reduce((array, param) => singleSort(array, param), array);
};

export const wait = seconds => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, seconds);
  });
};

export const redirectTo = async (time, path) => {
  await wait(time);
  window.location.href = path;
};

export const doFetch = async (url, method, body) => {
  const options = {
    method,
    credentials: 'include',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  let statusCode;
  return fetch(url, options)
    .then((res) => {
      statusCode = res.status;
      return res.json();
    })
    .then((res) => {
      if (statusCode !== 200) throw res.message;
      else return res;
    });
};

export const getAccountInfo = () => {
  const value = "; " + document.cookie;
  const parts = value.split('; bc-token=');
  try {
    if (parts.length === 2) { 
      return jwtdecoder(parts.pop().split(";").shift())
    } else {
      window.location.href = "https://sso.bluecherry.io";
    };
  } catch (e) {
    window.location.href = "https://sso.bluecherry.io";
  };
};


const setError = (context, name, bool) => {
  const { entity, update } = context.props;
  entity[name].error = bool;
  update(entity);
};

export const onChange = (context, event) => {
  const { name, value } = event.target;
  const { entity, update } = context.props;
  entity[name].value = value;
  update(entity);
};

export const onValidate = async (context, event) => {
  const { name, value } = event.target;
  const error = ! await context.props.validation[name](value);
  setError(context, name, error);
};

export const getFilters = ( filters = [] ) => {
  const activeFilters = filters.filter(filter => filter.status);
  const availableFilters = [];
  activeFilters.forEach(filter => {
    filter.values.forEach(filterData => {
     availableFilters.push({
       column: filter.column,
       filter: filterData.value,
       compare: filterData.compare
     })
    });
  });
  return availableFilters;
};
