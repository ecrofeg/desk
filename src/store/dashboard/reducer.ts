import { AnyAction, Reducer } from 'redux';
import Task from '../../service/models/Task';
import { ActionWithTasks, SET_TASKS, START_LOADING, STOP_LOADING } from './actions';

export interface State {
	readonly tasks: Task[];
	readonly isLoading: boolean;
}

const defaultState: State = {
	tasks: [],
	isLoading: false
};

const setTasks = (state: State, action: ActionWithTasks) => {
	return { ...state, tasks: action.tasks };
};

export const reducer: Reducer<State> = (state: State = defaultState, action: AnyAction) => {
	switch (action.type) {
		case START_LOADING:
			return { ...state, isLoading: true };

		case STOP_LOADING:
			return { ...state, isLoading: false };

		case SET_TASKS:
			return setTasks(state, <ActionWithTasks>action);
	}

	return state;
};
