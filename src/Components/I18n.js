import { IntlProvider } from 'react-intl';
import M from 'materialize-css';
import locales from '../assets/locales';

// TODO: translate
export const translate = (string, values) => {
  const locale = localStorage.getItem('_site_lang') || 'en';
  const messages = locales[locale];
  const intlProvider = new IntlProvider({ locale, messages });
  const { intl } = intlProvider.getChildContext();
  return intl.formatMessage({ id: string }, values);
};

export class Messages {
  static added = (entity) => {
    const message = translate('added', { entity: translate(entity) });
    M.toast({ html: `${message}`, classes: 'succes' });
  };

  static saved = (entity) => {
    const message = translate('saved', { entity: translate(entity) });
    M.toast({ html: `${message}`, classes: 'succes' });
  };

  static error = (message) => {
    M.toast({ html: `${message}`, classes: 'error' });
  };

  static succes = (message) => {
    M.toast({ html: `${message}`, classes: 'succes' });
  };

  static handleErrors = (errors) => {
    let html = `
    <div class="errorTitle">${translate('resolve_the_following_errors')}</div>
    <ul>`;

    errors.forEach((error) => {
      html += `<li>${error.error}</li>`;
    });

    html += '</ul>';

    M.toast({ html, classes: 'error' });
  };

  static deleted = (entity) => {
    const message = translate('deleted', { entity: translate(entity) });
    M.toast({ html: `${message}`, classes: 'succes' });
  };

  static failedToSave = (entity) => {
    const message = translate('failed_to_save', { entity: translate(entity) });
    M.toast({ html: `${message}`, classes: 'error' });
  };

  static failedToDelete = (entity) => {
    const message = translate('failed_to_delete', { entity: translate(entity) });
    M.toast({ html: `${message}`, classes: 'error' });
  };

  static failedToAdd = (entity) => {
    const message = translate('failed_to_add', { entity: translate(entity) });
    M.toast({ html: `${message}`, classes: 'error' });
  };

  static requiredParameters = () => {
    const message = translate('enter_the_required_fields');
    M.toast({ html: `${message}`, classes: 'error' });
  };
}
