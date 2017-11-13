import './css/main.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardContainer from './containers/DashboardContainer';
import TaskPageContainer from './containers/TaskPageContainer';
import { getStore } from './store/index';
import { Route } from 'react-router';
import NotFound from './components/NotFound';

ReactDOM.render(
	<BrowserRouter>
		<Provider store={getStore()}>
			<Layout>
				<Switch>
					<Route exact path="/" component={DashboardContainer}/>
					<Route path="/task/:id" component={TaskPageContainer}/>
					<Route component={NotFound}/>
				</Switch>
			</Layout>
		</Provider>
	</BrowserRouter>,
	window.document.getElementById('root')
);
