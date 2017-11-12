import './css/main.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DashboardContainer from './containers/DashboardContainer';
import { getStore } from './store/index';

ReactDOM.render(
	<MuiThemeProvider>
		<Provider store={getStore()}>
			<DashboardContainer/>
		</Provider>
	</MuiThemeProvider>,
	window.document.getElementById('root')
);
