import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './footer.css';

class Footer extends Component {
  render() {
    const { history } = this.props;

    return (
      <div>
        <footer
          data-testid="footer"
        >
          <input
            type="image"
            src={ drinkIcon }
            name="drinkIcon"
            alt="drinkIcon"
            data-testid="drinks-bottom-btn"
            onClick={ () => history.push('/drinks') }
          />
          <input
            type="image"
            src={ mealIcon }
            name="mealIcon"
            alt="mealIcon"
            data-testid="meals-bottom-btn"
            onClick={ () => history.push('/meals') }
          />
        </footer>

      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  history: globalState.globalHistoryReducer.history,
});

Footer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Footer);
