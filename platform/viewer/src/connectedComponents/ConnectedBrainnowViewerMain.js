import OHIF from "@ohif/core";
import ViewerMain from "./ViewerMain";
import { connect } from "react-redux";

class BrainnowViewerMain extends ViewerMain {

  getDisplaySets(studies) {
    const displaySets = [];
    studies.forEach(study => {
      study.displaySets.forEach(dSet => {
        if (!dSet.plugin) {
          dSet.plugin = 'brainnow-cornerstone';
        }
        displaySets.push(dSet);
      });
    });

    return displaySets;
  }
};

const {
  setViewportSpecificData,
  clearViewportSpecificData
} = OHIF.redux.actions;

const mapStateToProps = state => {
  const { activeViewportIndex, layout, viewportSpecificData } = state.viewports;

  return {
    activeViewportIndex,
    layout,
    viewportSpecificData,
    viewports: state.viewports
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setViewportSpecificData: (viewportIndex, data) => {
      dispatch(setViewportSpecificData(viewportIndex, data));
    },
    clearViewportSpecificData: () => {
      dispatch(clearViewportSpecificData());
    }
  };
};

const ConnectedBrainnowViewerMain = connect(
  mapStateToProps,
  mapDispatchToProps
)(BrainnowViewerMain);

export default ConnectedBrainnowViewerMain;
