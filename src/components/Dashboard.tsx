import * as React from 'react';
import Table, { TableBody, TableRow } from 'material-ui/Table';
import TableCell from 'material-ui/Table/TableCell';
import TableHead from 'material-ui/Table/TableHead';
import { LinearProgress } from 'material-ui/Progress';
import Task from '../service/models/Task';

interface Props {
	tasks: Task[];
	isLoading: boolean;
}

export default class Dashboard extends React.Component<Props> {
	render() {
		return <div>
			{this.props.isLoading ? <LinearProgress mode="query" /> : null}

			<Table>
				<TableHead>
					<TableRow>
						<TableCell>ID</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Description</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{this.props.tasks.map((task: Task, i: number) => <TableRow key={i}>
						<TableCell><a href={`/task/${task.id}`}>{task.id}</a></TableCell>
						<TableCell><a href={`/task/${task.id}`}>{task.name}</a></TableCell>
						<TableCell><a href={`/task/${task.id}`}>{task.description}</a></TableCell>
					</TableRow>)}
				</TableBody>
			</Table>
		</div>;
	}
}
