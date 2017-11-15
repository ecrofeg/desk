import * as React from 'react';
import Task from '../service/models/Task';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';
import * as classnames from 'classnames';

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
			<h1 className="task-name">{task.name}</h1>
			<Typography type="body1" component="p">{task.description}</Typography>
		</div>;
	};

	render() {
		return <section className="task">
			<div className={classnames('progress', { 'progress-hidden': !this.props.isLoading })}>
				<CircularProgress color="accent"/>
			</div>

			{this.props.task ? this.renderTask(this.props.task) : this.renderNoTask()}
		</section>;
	}
}
