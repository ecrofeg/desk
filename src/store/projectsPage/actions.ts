import { Action, Dispatch } from 'redux';
import Project from '../../service/models/Project';

export const START_PROJECTS_LOADING = 'START_PROJECTS_LOADING';
export const STOP_PROJECTS_LOADING = 'STOP_PROJECTS_LOADING';
export const SET_PROJECTS = 'SET_PROJECTS';

export interface ActionWithProjects extends Action {
	projects: Project[];
}

export const actionCreators = {
	startLoading: (): Action => ({ type: START_PROJECTS_LOADING }),
	stopLoading: (): Action => ({ type: STOP_PROJECTS_LOADING }),
	setProjects: (projects: Project[]): ActionWithProjects => ({ type: SET_PROJECTS, projects }),
	loadProjects: (taskId: number) => (dispatch: Dispatch<Action>): void => {
		dispatch(actionCreators.startLoading());

		fetch(`http://localhost:5555/api/project`)
			.then(response => response.json())
			.then(response => {
				dispatch(actionCreators.stopLoading());

				if (response) {
					dispatch(actionCreators.setProjects(response));
				}
			})
			.catch(reason => dispatch(actionCreators.stopLoading()));
	}
};
