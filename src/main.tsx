import './css/main.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Layout from './components/Layout';
import DashboardContainer from './containers/DashboardContainer';
import { getStore } from './store/index';

ReactDOM.render(
	<Provider store={getStore()}>
		<Layout>
			<DashboardContainer/>
		</Layout>
	</Provider>,
	window.document.getElementById('root')
);
