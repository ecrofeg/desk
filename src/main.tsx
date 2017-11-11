import './css/main.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(
    <MuiThemeProvider>
        <div>Hello World!</div>
    </MuiThemeProvider>,
    document.getElementById('root')
);
