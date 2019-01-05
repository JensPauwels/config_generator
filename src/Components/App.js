import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import de from 'react-intl/locale-data/de';
import nl from 'react-intl/locale-data/nl';
import it from 'react-intl/locale-data/it';
import es from 'react-intl/locale-data/es';
import locales from '../assets/locales';
import { Generator } from './pages';

addLocaleData([...en, ...fr, ...nl, ...de, ...es, ...it]);


@inject('global')
@observer
class NewApp extends Component {
  render() {
    const { global } = this.props;
    const { lang } = global;

    return (
      <IntlProvider key={lang} locale={lang} messages={locales[lang.toLowerCase()]}>
        <Generator />
      </IntlProvider>
    );
  }
}

export default NewApp;
