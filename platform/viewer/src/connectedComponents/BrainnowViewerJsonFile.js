import React, { Component } from 'react';
import { metadata, utils, redux } from '@ohif/core';
import { connect } from 'react-redux';

import ConnectedBrainnowViewer from './ConnectedBrainnowViewer';
import ConnectedViewer from './ConnectedViewer';
import PropTypes from 'prop-types';
import { extensionManager, commandsManager } from '../App.js';
import filesToStudies from '../lib/filesToStudies';
import './ViewerLocalFileData.css';
import { withTranslation } from 'react-i18next';


const { OHIFStudyMetadata } = metadata;
const { studyMetadataManager, updateMetaDataManager } = utils;
const { setLayout } = redux.actions;
const mapDispatchToProps = dispatch => {
  return {
    setLayout: (layout) => {
      dispatch(setLayout(layout));
    },
  }
};

class BrainnowViewerJsonFile extends Component {
  static propTypes = {
    studies: PropTypes.array,
    imagesUrl: PropTypes.string,
  };

  state = {
    studies: null,
    loading: false,
    error: null,
  };

  updateStudies = studies => {
    // Render the viewer when the data is ready
    studyMetadataManager.purge();

    // Map studies to new format, update metadata manager?
    const updatedStudies = studies.map(study => {
      const studyMetadata = new OHIFStudyMetadata(
        study,
        study.studyInstanceUid
      );
      const sopClassHandlerModules =
        extensionManager.modules['sopClassHandlerModule'];
      // console.log(studyMetadata.createDisplaySets(sopClassHandlerModules));

      study.displaySets =
        study.displaySets ||
        studyMetadata.createDisplaySets(sopClassHandlerModules);
      studyMetadata.setDisplaySets(study.displaySets);

      studyMetadata.forEachDisplaySet(displayset => {
        displayset.localFile = true;
      });
      // Updates WADO-RS metaDataManager
      updateMetaDataManager(study);

      studyMetadataManager.add(studyMetadata);
      // console.log('studyMetadata');
      // console.log(studyMetadata);
      return study;
    });
    // console.log('updatedStudies');
    // console.log(updatedStudies);

    this.setState({
      studies: updatedStudies,
    });
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const response = await fetch(this.props.imagesUrl, {
      method: 'GET'
    });
    const json = await response.json();
    const pathsToFiles = async (paths) => Promise.all(paths.map(async (element) => {
      const response = await fetch(element);
      const blob = await response.blob();
      const file = new File([blob], "", {
        type: "application/dicom",
      });
      return file;
    }));
    let studies = [];
    const jetPaths = json.jet;
    if (jetPaths) {
      const acceptedFiles = await pathsToFiles(jetPaths);
      studies = await filesToStudies(acceptedFiles);
      this.updateStudies(studies);
      this.props.setLayout({
        numRows: 1,
        numColumns: 1,
        viewports: [
          // { plugin: 'cornerstone' },
          { plugin: 'brainnow-cornerstone' },
        ],
      });
    }
    const t2Paths = json.t2;
    if (t2Paths) {
      const acceptedFiles = await pathsToFiles(t2Paths);
      studies = (await filesToStudies(acceptedFiles)).concat(studies);
      this.updateStudies(studies);
      this.props.setLayout({
        numRows: 1,
        numColumns: 2,
        viewports: [
          // { plugin: 'cornerstone' },
          // { plugin: 'cornerstone' },
          { plugin: 'brainnow-cornerstone' },
          { plugin: 'brainnow-cornerstone' },
        ],
      });
    }
  }

  render() {

    if (this.state.error) {
      return <div>Error: {JSON.stringify(this.state.error)}</div>;
    }

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <ConnectedBrainnowViewer
          studies={this.state.studies}
          studyInstanceUids={
            this.state.studies &&
            this.state.studies.map(a => a.studyInstanceUid)
          }
        />
      </div>
      // <div style={{ width: '100%', height: '100%' }}>
      //   <ConnectedViewer
      //     studies={this.state.studies}
      //     studyInstanceUids={
      //       this.state.studies &&
      //       this.state.studies.map(a => a.studyInstanceUid)
      //     }
      //   />
      // </div>
    );
  }
}

export default withTranslation('Common')(connect(null, mapDispatchToProps)(BrainnowViewerJsonFile));
