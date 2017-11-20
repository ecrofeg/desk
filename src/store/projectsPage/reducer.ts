import { Action, Reducer } from 'redux';
import Project from '../../service/models/Project';
import { ActionWithProjects, SET_PROJECTS, START_PROJECTS_LOADING, STOP_PROJECTS_LOADING } from './actions';

export interface State {
	readonly projects: Project[];
	readonly isLoading: boolean;
}

const defaultState: State = {
	projects: [],
	isLoading: false
};

const setProjects: Reducer<State> = (state: State, action: ActionWithProjects) => {
	return { ...state, projects: action.projects };
};

export const reducer: Reducer<State> = (state: State = defaultState, action: Action): State => {
	switch (action.type) {
		case START_PROJECTS_LOADING:
			return { ...state, isLoading: true };

		case STOP_PROJECTS_LOADING:
			return { ...state, isLoading: false };

		case SET_PROJECTS:
			return setProjects(state, action);
	}

	return state;
};
