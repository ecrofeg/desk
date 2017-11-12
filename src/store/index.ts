import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { reducer as dashboardReducer, State as DashboardState } from './dashboard/reducer';

export interface RootState {
	dashboard: DashboardState
}

export const getStore = () => createStore(
	combineReducers<RootState>({
		dashboard: dashboardReducer
	}),
	applyMiddleware(thunkMiddleware, loggerMiddleware)
);
