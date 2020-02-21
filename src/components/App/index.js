import React from 'react';
import PropTypes from 'prop-types'
import cx from 'classnames';
import styles from './app.scss';
import img from "src/assets/main.png";
import redux from "src/assets/redux.png";
import { connect } from 'react-redux';
import * as actions from 'src/actions';
import Button from 'src/widgets/Button';

const App = ({ totalClick, buttonClicked }) => {

	return (
		<>
			<div className={styles.app}>
				<h1 className={styles.header}>React Redux App</h1>
				<div>
					<img className={styles.logo} src={img} alt="logo" />
					<img className={cx(styles.logo, styles.redux)} src={redux} alt="redux image" />
				</div>
				<div>
					<Button onClick={buttonClicked} label="Click Me" />
				</div>
				<div className={styles.label}>You Clicked {totalClick} times</div>
			</div>
		</>
	)
}

App.propTypes = {
	totalClick: PropTypes.number.isRequired,
	buttonClicked: PropTypes.func.isRequired
}

const mapStateToProps = state => {
	return {
		totalClick: state.button.totalClick
	}
}

const mapDispatchToProps = dispatch => {
	return {
		buttonClicked: () => dispatch(actions.buttonClicked())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
