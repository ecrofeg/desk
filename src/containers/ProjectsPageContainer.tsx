import * as React from 'react';
import Project from '../service/models/Project';
import { connect, Dispatch } from 'react-redux';
import { RootState } from '../store/index';
import { Action, bindActionCreators } from 'redux';
import { actionCreators } from '../store/projectsPage/actions';
import ProjectsPage from '../components/ProjectsPage';

interface StateProps {
	projects: Project[];
	isLoading: boolean;
}

interface DispatchProps {
	dispatch?: Dispatch<Action>;
	loadProjects: Function;
}

class ProjectsPageContainer extends React.Component<StateProps & DispatchProps, React.ComponentState> {
	componentDidMount() {
		this.props.loadProjects();
	}

	render() {
		return <ProjectsPage projects={this.props.projects} isLoading={this.props.isLoading}/>;
	}
}

const mapStateToProps = (state: RootState): StateProps => ({
	projects: state.projectsPage.projects,
	isLoading: state.projectsPage.isLoading
});

const mapActionsToProps = (dispatch: Dispatch<Action>): DispatchProps => bindActionCreators({
	loadProjects: actionCreators.loadProjects
}, dispatch);

export default connect(mapStateToProps, mapActionsToProps)(ProjectsPageContainer);
