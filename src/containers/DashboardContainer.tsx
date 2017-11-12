import * as React from 'react';
import { Action, bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { RootState } from '../store/index';
import { actionCreators } from '../store/dashboard/actions';
import Dashboard from '../components/Dashboard';
import Task from '../service/models/Task';

interface StateProps {
	tasks: Task[];
	isLoading: boolean;
}

interface DispatchProps {
	dispatch?: Dispatch<Action>;
	loadTasks: Function;
}

class DashboardContainer extends React.Component<StateProps & DispatchProps, React.ComponentState> {
	componentDidMount() {
		this.props.loadTasks();
	}

	render() {
		return <Dashboard tasks={this.props.tasks} isLoading={this.props.isLoading}/>;
	}
}

const mapStateToProps = (state: RootState): StateProps => ({
	tasks: state.dashboard.tasks,
	isLoading: state.dashboard.isLoading
});

const mapActionsToProps = (dispatch: Dispatch<Action>): DispatchProps => bindActionCreators({
	loadTasks: actionCreators.loadTasks
}, dispatch);

export default connect(mapStateToProps, mapActionsToProps)(DashboardContainer);
