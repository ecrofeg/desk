import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { reducer as dashboardReducer, State as DashboardState } from './dashboard/reducer';
import { reducer as taskPageReducer, State as TaskPageState } from './taskPage/reducer';

export interface RootState {
	dashboard: DashboardState;
	taskPage: TaskPageState;
}

export const getStore = () => createStore(
	combineReducers<RootState>({
		dashboard: dashboardReducer,
		taskPage: taskPageReducer
	}),
	applyMiddleware(thunkMiddleware, loggerMiddleware)
);
