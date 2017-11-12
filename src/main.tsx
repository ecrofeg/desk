import './css/main.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import DashboardContainer from './containers/DashboardContainer';
import { getStore } from './store/index';

ReactDOM.render(
	<Provider store={getStore()}>
		<DashboardContainer/>
	</Provider>,
	window.document.getElementById('root')
);
