import * as React from 'react';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';

interface Task {
	id: number;
	name: string;
	description: string;
}

interface State {
	tasks: Task[]
}

export default class Dashboard extends React.Component {
	public state: State = {
		tasks: []
	};

	public constructor(props: Object) {
		super(props);

		this.onRowClick = this.onRowClick.bind(this);
	}

	public componentDidMount(): void {
		fetch('http://localhost:5555/api/task')
			.then(response => response.json())
			.then(response => {
				if (response && response instanceof Array) {
					this.setState({
						tasks: response
					});
				}
			});
	}

	public onRowClick(row: number, column: number): void {
		if (this.state.tasks[row]) {
			window.location.href = `/task/${this.state.tasks[row].id}`;
		}
	}

	public render(): React.ReactNode {
		return <Table onCellClick={this.onRowClick}>
			<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
				<TableRow>
					<TableHeaderColumn>ID</TableHeaderColumn>
					<TableHeaderColumn>Name</TableHeaderColumn>
					<TableHeaderColumn>Description</TableHeaderColumn>
				</TableRow>
			</TableHeader>
			<TableBody displayRowCheckbox={false}>
				{this.state.tasks.map((task: Task, i: number) => <TableRow key={i}>
					<TableRowColumn>{task.id}</TableRowColumn>
					<TableRowColumn>{task.name}</TableRowColumn>
					<TableRowColumn>{task.description}</TableRowColumn>
				</TableRow>)}
			</TableBody>
		</Table>;
	}
}
