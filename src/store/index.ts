import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { reducer as dashboardReducer, State as DashboardState } from './dashboard/reducer';
import { reducer as taskPageReducer, State as TaskPageState } from './taskPage/reducer';
import { reducer as projectsPageReducer, State as ProjectsPageState } from './projectsPage/reducer';

export interface RootState {
	dashboard: DashboardState;
	taskPage: TaskPageState;
	projectsPage: ProjectsPageState;
}

export const getStore = () => createStore(
	combineReducers<RootState>({
		dashboard: dashboardReducer,
		projectsPage: projectsPageReducer,
		taskPage: taskPageReducer
	}),
	applyMiddleware(thunkMiddleware, loggerMiddleware)
);
