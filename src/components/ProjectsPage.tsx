import * as React from 'react';
import * as moment from 'moment';
import Table, { TableBody, TableRow } from 'material-ui/Table';
import TableCell from 'material-ui/Table/TableCell';
import TableHead from 'material-ui/Table/TableHead';
import { Link } from 'react-router-dom';
import Project from '../service/models/Project';
import { CircularProgress } from 'material-ui/Progress';
import * as classnames from 'classnames';

interface Props {
	projects: Project[];
	isLoading: boolean;
}

export default class ProjectsPage extends React.Component<Props> {
	render() {
		return <section className="projects">
			<div className={classnames('progress', { 'progress-hidden': !this.props.isLoading })}>
				<CircularProgress color="accent"/>
			</div>

			<Table>
				<TableHead>
					<TableRow>
						<TableCell>ID</TableCell>
						<TableCell>Title</TableCell>
						<TableCell>Created</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{this.props.projects.map((project: Project, i: number) => <TableRow key={i}>
						<TableCell><Link className="dashboard-link" to={`/project/${project.id}`}>{project.id}</Link></TableCell>
						<TableCell><Link className="dashboard-link" to={`/project/${project.id}`}>{project.name}</Link></TableCell>
						<TableCell>{moment(project.created_at).format('DD MMM YYYY')}</TableCell>
					</TableRow>)}
				</TableBody>
			</Table>
		</section>;
	}
}
