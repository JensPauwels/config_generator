import React, { Component } from 'react';
import M from 'materialize-css'
import { inject, observer } from 'mobx-react';
import { Header } from '../global';
import { RuleForm, NewRuleForm } from '../forms';

@inject('global')
@observer
class App extends Component {
  componentDidMount = () => {
    M.Collapsible.init(document.querySelectorAll('.collapsible'));
  };

  addRow = async () => {
    await this.props.global.addNewRule();
    M.Collapsible.init(document.querySelectorAll('.collapsible'));
  };

  onEnter = ev => {
    if (ev.key === 'Enter') {
      this.addRow();
    };
  };

  downloadConfig = () => {
    console.log('download config');
  };

  render() {
    const { rules = [], newRule } = this.props.global;
    return (
      <div className="App">
        <Header />
        <main>
          <div className="container">

            create entities

            {
              rules.length === 0  &&
                <div className="placeholder">
                  <h2>There are no rules at the moment</h2>
                </div>
            }

            { 
              rules.length > 0 &&   
                <ul className="collapsible">
                  {
                    rules.map((rule, index) => (
                      <li key={index}>
                        <div className="collapsible-header">
                          { rule.name }
                        </div>
                        <div className="collapsible-body">
                          <div className="grid">
                            <RuleForm context={this} entity={rule} />
                          </div>
                        </div>
                      </li>
                    ))
                  }
                </ul> 
            }

            <div className="addInput" onKeyPress={this.onEnter}>
              <NewRuleForm context={this} entity={newRule} />
              <i className="fa fa-plus" aria-hidden="true" onClick={this.addRow} />
            </div>

            <div className="btn" onClick={this.downloadConfig}>
              download
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;

