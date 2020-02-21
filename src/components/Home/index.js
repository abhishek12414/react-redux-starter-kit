import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './index.scss';
import Routes from '../route';
import * as actions from 'src/actions';
import Button from 'src/widgets/Button';

import img from "src/assets/main.png";
import redux from "src/assets/redux.png";

const Home = ({ totalClick, buttonClicked }) => {

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
				<div className={styles.link}>
					<Link to={Routes.Welcome}>Welcome Page</Link>
				</div>
			</div>
		</>
	)
}

Home.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
