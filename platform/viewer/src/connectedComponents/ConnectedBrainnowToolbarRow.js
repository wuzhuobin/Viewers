// TODO: REPLACE THIS WITH A CONTEXT PROVIDER
// EVERYTHING IN `VIEWER.JS` COULD USE THIS FOR APPROPRIATE CONTEXT
import BrainnowToolbarRow from './BrainnowToolbarRow';
import { connect } from 'react-redux';
import { getActiveContexts } from './../store/layout/selectors.js';

const mapStateToProps = state => {
  return {
    activeContexts: getActiveContexts(state),
  };
};

const ConnectedBrainnowToolbarRow = connect(mapStateToProps)(BrainnowToolbarRow);

export default ConnectedBrainnowToolbarRow;
