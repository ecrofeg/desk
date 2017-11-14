import { Action, Dispatch } from 'redux';
import Task from '../../service/models/Task';

export const START_TASK_LOADING = 'START_TASK_LOADING';
export const STOP_TASK_LOADING = 'STOP_TASK_LOADING';
export const SET_TASK = 'SET_TASK';

export interface ActionWithTask extends Action {
	task: Task;
}

export const actionCreators = {
	startLoading: (): Action => ({ type: START_TASK_LOADING }),
	stopLoading: (): Action => ({ type: STOP_TASK_LOADING }),
	setTask: (task: Task): ActionWithTask => ({ type: SET_TASK, task }),
	loadTask: (taskId: number) => (dispatch: Dispatch<Action>): void => {
		dispatch(actionCreators.startLoading());

		fetch(`http://localhost:5555/api/task/${taskId}`)
			.then(response => response.json())
			.then(response => {
				dispatch(actionCreators.stopLoading());

				if (response) {
					dispatch(actionCreators.setTask(response));
				}
			})
			.catch(reason => dispatch(actionCreators.stopLoading()));
	}
};
