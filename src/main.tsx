import './css/main.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Link, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardContainer from './containers/DashboardContainer';
import TaskPageContainer from './containers/TaskPageContainer';
import { getStore } from './store/index';
import { Route } from 'react-router';
import NotFound from './components/NotFound';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import PlusIcon from 'material-ui-icons/AddCircle';
import ViewListIcon from 'material-ui-icons/ViewList';
import Typography from 'material-ui/Typography';

ReactDOM.render(
	<BrowserRouter>
		<Provider store={getStore()}>
			<div className="desk-wrapper">
				<Drawer
					className="sidebar"
					type="permanent"
					anchor="left"
					open={true}
				>
					<div className="sidebar-header">
						<Typography type="display1">
							<Link to="/" className="sidebar-header-link">Desk</Link>
						</Typography>
					</div>
					<Divider/>
					<List disablePadding={true}>
						<ListItem button className="sidebar-link__wrapper">
							<Link className="sidebar-link" to="/">
								<ListItemIcon>
									<PlusIcon/>
								</ListItemIcon>
								<ListItemText primary="New Task"/>
							</Link>
						</ListItem>
						<ListItem button className="sidebar-link__wrapper">
							<Link className="sidebar-link" to="/">
								<ListItemIcon>
									<ViewListIcon/>
								</ListItemIcon>
								<ListItemText primary="My Tasks"/>
							</Link>
						</ListItem>
					</List>
				</Drawer>
				<Layout>
					<Switch>
						<Route exact path="/" component={DashboardContainer}/>
						<Route path="/task/:id" component={TaskPageContainer}/>
						<Route component={NotFound}/>
					</Switch>
				</Layout>
			</div>
		</Provider>
	</BrowserRouter>,
	window.document.getElementById('root')
);
