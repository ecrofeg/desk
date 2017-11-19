import * as React from 'react';
import * as moment from 'moment';
import Table, { TableBody, TableRow } from 'material-ui/Table';
import TableCell from 'material-ui/Table/TableCell';
import TableHead from 'material-ui/Table/TableHead';
import { Link } from 'react-router-dom';
import Task from '../service/models/Task';
import { CircularProgress } from 'material-ui/Progress';
import * as classnames from 'classnames';

interface Props {
	tasks: Task[];
	isLoading: boolean;
}

export default class Dashboard extends React.Component<Props> {
	render() {
		return <section className="dashboard">
			<div className={classnames('progress', { 'progress-hidden': !this.props.isLoading })}>
				<CircularProgress color="accent"/>
			</div>

			<Table>
				<TableHead>
					<TableRow>
						<TableCell>ID</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Date</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{this.props.tasks.map((task: Task, i: number) => <TableRow key={i}>
						<TableCell><Link to={`/task/${task.id}`}>{task.id}</Link></TableCell>
						<TableCell><Link to={`/task/${task.id}`}>{task.name}</Link></TableCell>
						<TableCell>{moment(task.created_at).format('DD MMM YYYY')}</TableCell>
					</TableRow>)}
				</TableBody>
			</Table>
		</section>;
	}
}
