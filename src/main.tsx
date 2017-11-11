import './css/main.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dashboard from './components/Dashboard';

ReactDOM.render(
	<MuiThemeProvider>
		<Dashboard/>
	</MuiThemeProvider>,
	window.document.getElementById('root')
);
