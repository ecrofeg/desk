import './css/main.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardContainer from './containers/DashboardContainer';
import TaskPageContainer from './containers/TaskPageContainer';
import { getStore } from './store/index';
import { Route } from 'react-router';

ReactDOM.render(
	<BrowserRouter>
		<Provider store={getStore()}>
			<Layout>
				<Route exact path="/" component={DashboardContainer}/>
				<Route path="/task/:id" component={TaskPageContainer}/>
			</Layout>
		</Provider>
	</BrowserRouter>,
	window.document.getElementById('root')
);
