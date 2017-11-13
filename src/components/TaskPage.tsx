import * as React from 'react';
import Task from '../service/models/Task';
import { LinearProgress } from 'material-ui/Progress';

interface Props {
	task?: Task;
	isLoading: boolean;
}

export default class TaskPage extends React.Component<Props> {
	renderNoTask = () => {
		return this.props.isLoading ? null : <div>No task found :(</div>;
	};

	renderTask = (task: Task) => {
		return <div>
			{task.name}
		</div>;
	};

	render() {
		return <div>
			{this.props.isLoading ? <LinearProgress mode="query" /> : null}
			{this.props.task ? this.renderTask(this.props.task) : this.renderNoTask()}
		</div>;
	}
}
