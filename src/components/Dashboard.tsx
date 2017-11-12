import * as React from 'react';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn
} from 'material-ui/Table';
import Task from '../service/models/Task';

interface Props {
	tasks: Task[]
}

export default class Dashboard extends React.Component<Props> {
	onRowClick = (row: number) => {
		if (this.props.tasks[ row ]) {
			window.location.href = `/task/${this.props.tasks[ row ].id}`;
		}
	};

	render() {
		return <Table onCellClick={this.onRowClick}>
			<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
				<TableRow>
					<TableHeaderColumn>ID</TableHeaderColumn>
					<TableHeaderColumn>Name</TableHeaderColumn>
					<TableHeaderColumn>Description</TableHeaderColumn>
				</TableRow>
			</TableHeader>
			<TableBody displayRowCheckbox={false}>
				{this.props.tasks.map((task: Task, i: number) => <TableRow key={i}>
					<TableRowColumn>{task.id}</TableRowColumn>
					<TableRowColumn>{task.name}</TableRowColumn>
					<TableRowColumn>{task.description}</TableRowColumn>
				</TableRow>)}
			</TableBody>
		</Table>;
	}
}
