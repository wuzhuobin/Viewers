import React, { Component } from 'react';

import ConnectedSyncCornerstoneViewport from './ConnectedSyncCornerstoneViewport';
import OHIF from '@ohif/core';
import PropTypes from 'prop-types';
import cornerstone from 'cornerstone-core';
// import handleSegmentationStorage from './handleSegmentationStorage.js';

const { StackManager } = OHIF.utils;

// // Metadata configuration
// const metadataProvider = new OHIF.cornerstone.MetadataProvider();

// cornerstone.metaData.addProvider(
//   metadataProvider.provider.bind(metadataProvider)
// );

// StackManager.setMetadataProvider(metadataProvider);

// const SOP_CLASSES = {
//   SEGMENTATION_STORAGE: '1.2.840.10008.5.1.4.1.1.66.4',
// };

// const specialCaseHandlers = {};
// specialCaseHandlers[
//   SOP_CLASSES.SEGMENTATION_STORAGE
// ] = handleSegmentationStorage;

class BrainnowCornerstoneViewport extends Component {
  state = {
    viewportData: null,
  };

  static defaultProps = {
    customProps: {},
  };

  static propTypes = {
    studies: PropTypes.object,
    displaySet: PropTypes.object,
    viewportIndex: PropTypes.number,
    children: PropTypes.node,
    customProps: PropTypes.object,
  };

  static id = 'BrainnowCornerstoneViewport';

  static init() {
    console.log('BrainnowCornerstoneViewport init()');
  }

  static destroy() {
    console.log('BrainnowCornerstoneViewport destroy()');
    StackManager.clearStacks();
  }

  /**
   * Obtain the CornerstoneTools Stack for the specified display set.
   *
   * @param {Object[]} studies
   * @param {String} StudyInstanceUID
   * @param {String} displaySetInstanceUID
   * @param {String} [SOPInstanceUID]
   * @param {Number} [frameIndex=1]
   * @return {Object} CornerstoneTools Stack
   */
  static getCornerstoneStack(
    studies,
    StudyInstanceUID,
    displaySetInstanceUID,
    SOPInstanceUID,
    frameIndex = 0
  ) {
    if (!studies || !studies.length) {
      throw new Error('Studies not provided.');
    }

    if (!StudyInstanceUID) {
      throw new Error('StudyInstanceUID not provided.');
    }

    if (!displaySetInstanceUID) {
      throw new Error('StudyInstanceUID not provided.');
    }

    // Create shortcut to displaySet
    const study = studies.find(
      study => study.StudyInstanceUID === StudyInstanceUID
    );

    if (!study) {
      throw new Error('Study not found.');
    }

    const displaySet = study.displaySets.find(set => {
      return set.displaySetInstanceUID === displaySetInstanceUID;
    });

    if (!displaySet) {
      throw new Error('Display Set not found.');
    }

    // Get stack from Stack Manager
    const storedStack = StackManager.findOrCreateStack(study, displaySet);

    // Clone the stack here so we don't mutate it
    const stack = Object.assign({}, storedStack);
    stack.currentImageIdIndex = frameIndex;

    if (SOPInstanceUID) {
      const index = stack.imageIds.findIndex(imageId => {
        const imageIdSOPInstanceUID = cornerstone.metaData.get(
          'SOPInstanceUID',
          imageId
        );

        return imageIdSOPInstanceUID === SOPInstanceUID;
      });

      if (index > -1) {
        stack.currentImageIdIndex = index;
      } else {
        console.warn(
          'SOPInstanceUID provided was not found in specified DisplaySet'
        );
      }
    }

    return stack;
  }

  getViewportData = async (
    studies,
    StudyInstanceUID,
    displaySetInstanceUID,
    SOPInstanceUID,
    frameIndex
  ) => {
    let viewportData;

    const stack = BrainnowCornerstoneViewport.getCornerstoneStack(
      studies,
      StudyInstanceUID,
      displaySetInstanceUID,
      SOPInstanceUID,
      frameIndex
    );

    viewportData = {
      StudyInstanceUID,
      displaySetInstanceUID,
      stack,
    };

    return viewportData;
  };


  setStateFromProps() {
    const { studies, displaySet } = this.props.viewportData;
    const {
      StudyInstanceUID,
      displaySetInstanceUID,
      sopClassUIDs,
      SOPInstanceUID,
      frameIndex,
    } = displaySet;

    if (!StudyInstanceUID || !displaySetInstanceUID) {
      return;
    }

    if (sopClassUIDs && sopClassUIDs.length > 1) {
      console.warn(
        'More than one SOPClassUID in the same series is not yet supported.'
      );
    }

    this.getViewportData(
      studies,
      StudyInstanceUID,
      displaySetInstanceUID,
      SOPInstanceUID,
      frameIndex
    ).then(viewportData => {
      this.setState({
        viewportData,
      });
    });
  }

  componentDidMount() {
    this.setStateFromProps();
  }

  componentDidUpdate(prevProps) {
    const { displaySet } = this.props.viewportData;
    const prevDisplaySet = prevProps.viewportData.displaySet;

    if (
      displaySet.displaySetInstanceUID !==
      prevDisplaySet.displaySetInstanceUID ||
      displaySet.SOPInstanceUID !== prevDisplaySet.SOPInstanceUID ||
      displaySet.frameIndex !== prevDisplaySet.frameIndex
    ) {
      this.setStateFromProps();
    }
  }

  render() {
    let childrenWithProps = null;

    if (!this.state.viewportData) {
      return null;
    }
    const { viewportIndex } = this.props;
    const { SeriesDescription } = this.props.viewportData.displaySet;
    const {
      imageIds,
      // currentImageIdIndex,
      // If this comes from the instance, would be a better default
      // `FrameTime` in the instance
      // frameRate = 0,
    } = this.state.viewportData.stack;

    // TODO: Does it make more sense to use Context?
    if (this.props.children && this.props.children.length) {
      childrenWithProps = this.props.children.map((child, index) => {
        return (
          child &&
          React.cloneElement(child, {
            viewportIndex: this.props.viewportIndex,
            key: index,
          })
        );
      });
    }

    return (
      <>
        <ConnectedSyncCornerstoneViewport
          viewportIndex={viewportIndex}
          imageIds={imageIds}
          imageIdIndex={Math.floor(imageIds.length * 0.5)}
          colormap={SeriesDescription}
          // ~~ Connected (From REDUX)
          // frameRate={frameRate}
          // isPlaying={false}
          // isStackPrefetchEnabled={true}
          // onElementEnabled={() => {}}
          // setViewportActive{() => {}}
          {...this.props.customProps}
        />
        {childrenWithProps}
      </>
    );
  }
}

export default BrainnowCornerstoneViewport;
