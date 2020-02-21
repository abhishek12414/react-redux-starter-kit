import React from 'react';
import Routes from '../route';
import { Switch, Route, withRouter } from 'react-router-dom';
import Home from '../Home';
import Welcome from '../Welcome';

const App = (props) => {
	return (
		<Switch>
			<Route
				path={Routes.Welcome}
				exact={true}
				component={Welcome}
			/>
			<Route
				path={Routes.Home}
				exact={true}
				component={Home}
			/>
		</Switch>
	)
}


export default withRouter(App);
