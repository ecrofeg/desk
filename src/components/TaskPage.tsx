import * as React from 'react';
import Task from '../service/models/Task';

interface Props {
	task?: Task;
}

export default class TaskPage extends React.Component<Props> {
	renderNoTask = () => {
		return <div>No task found :(</div>;
	};

	renderTask = (task: Task) => {
		return <div>
			{task.name}
		</div>;
	};

	render() {
		return <div>
			{this.props.task ? this.renderTask(this.props.task) : this.renderNoTask()}
		</div>;
	}
}
