import { AnyAction, Reducer } from 'redux';
import Task from '../../service/models/Task';
import { ActionWithTask, SET_TASK, START_TASK_LOADING, STOP_TASK_LOADING } from './actions';

export interface State {
	readonly task: Task;
	readonly isLoading: boolean;
}

const defaultState: State = {
	task: null,
	isLoading: false
};

const setTask = (state: State, action: ActionWithTask) => {
	return { ...state, task: action.task };
};

export const reducer: Reducer<State> = (state: State = defaultState, action: AnyAction) => {
	switch (action.type) {
		case START_TASK_LOADING:
			return { ...state, isLoading: true };

		case STOP_TASK_LOADING:
			return { ...state, isLoading: false };

		case SET_TASK:
			return setTask(state, <ActionWithTask>action);
	}

	return state;
};
