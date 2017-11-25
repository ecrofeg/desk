import { Action, Dispatch } from 'redux';
import Task from '../../service/models/Task';

export const START_LOADING = 'START_LOADING';
export const STOP_LOADING = 'STOP_LOADING';
export const SET_TASKS = 'SET_TASKS';

export interface ActionWithTasks extends Action {
	tasks: Task[];
}

export const actionCreators = {
	startLoading: (): Action => ({ type: START_LOADING }),
	stopLoading: (): Action => ({ type: STOP_LOADING }),
	setTasks: (tasks: Task[]): ActionWithTasks => ({ type: SET_TASKS, tasks }),
	loadTasks: () => (dispatch: Dispatch<Action>): void => {
		dispatch(actionCreators.startLoading());

		fetch('http://localhost:5555/api/task?assignee_id=1')
			.then(response => response.json())
			.then(response => {
				dispatch(actionCreators.stopLoading());

				if (response && response.tasks) {
					const tasks: Task[] = [];

					for (const taskId in response.tasks) {
						if (response.tasks.hasOwnProperty(taskId)) {
							tasks.push(response.tasks[taskId]);
						}
					}

					dispatch(actionCreators.setTasks(tasks));
				}
			})
			.catch(reason => dispatch(actionCreators.stopLoading()));
	}
};
