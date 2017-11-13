import * as React from 'react';
import { Action, bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { RootState } from '../store/index';
import { actionCreators } from '../store/taskPage/actions';
import Task from '../service/models/Task';
import TaskPage from '../components/TaskPage';
import { match } from 'react-router';

interface RouterParams {
	id: number;
}

interface Props {
	match: match<RouterParams>;
}

interface StateProps {
	task?: Task;
	isLoading: boolean;
}

interface DispatchProps {
	dispatch?: Dispatch<Action>;
	loadTask: Function;
}

class TaskPageContainer extends React.Component<StateProps & DispatchProps & Props, React.ComponentState> {
	componentDidMount() {
		this.props.loadTask(this.props.match.params.id);
	}

	render() {
		return <TaskPage task={this.props.task} isLoading={this.props.isLoading}/>;
	}
}

const mapStateToProps = (state: RootState): StateProps => ({
	task: state.taskPage.task,
	isLoading: state.taskPage.isLoading
});

const mapActionsToProps = (dispatch: Dispatch<Action>): DispatchProps => bindActionCreators({
	loadTask: actionCreators.loadTask
}, dispatch);

export default connect(mapStateToProps, mapActionsToProps)(TaskPageContainer);
