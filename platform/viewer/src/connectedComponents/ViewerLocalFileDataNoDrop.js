import React, { Component } from 'react';
import { metadata, utils, redux } from '@ohif/core';
import { connect } from 'react-redux';

import ConnectedViewer from './ConnectedViewer.js';
import PropTypes from 'prop-types';
import { extensionManager } from '../App.js';
import filesToStudies from '../lib/filesToStudies';
import './ViewerLocalFileDataNoDrop.css';
import { withTranslation } from 'react-i18next';


const { OHIFStudyMetadata } = metadata;
const { studyMetadataManager, updateMetaDataManager } = utils;
const { setLayout } = redux.actions;
const mapDispatchToProps = dispatch => {
  return {
    oneXTwoLayout: () => {
      const layout = {
        numRows: 1,
        numColumns: 2,
        viewports: [
          { plugin: 'cornerstone' },
          { plugin: 'cornerstone' },
        ],
      };
      dispatch(setLayout(layout));
    }
  }
};
// const mapDispatchToProps = {
//   oneXTwoLayout: () => {
//     const layout = {
//       numRows: 1,
//       numColumns: 2,
//       viewports: [
//         { plugin: 'cornerstone' },
//         { plugin: 'cornerstone' },
//       ],
//     };
//     setLayout(layout);
//   },
// };

class ViewerLocalFileDataNoDrop extends Component {
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
      return study;
    });
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
    const t1Paths = json.t1;
    if (t1Paths) {
      const acceptedFiles = await pathsToFiles(t1Paths);
      studies = await filesToStudies(acceptedFiles);
      this.updateStudies(studies);
    }
    const t2Paths = json.t2;
    if (t2Paths) {
      const acceptedFiles = await pathsToFiles(t2Paths);
      studies = (await filesToStudies(acceptedFiles)).concat(studies);
      this.updateStudies(studies);
      this.props.oneXTwoLayout();
    }

    // const t1Paths = json.t1;
    // if (t1Paths) {
    //   const acceptedFiles = await Promise.all(t1Paths.map(async (element) => {
    //     const response = await fetch(element);
    //     const blob = await response.blob();
    //     const file = new File([blob], "", {
    //       type: "application/dicom",
    //     });
    //     return file;
    //   }));
    //   studies = await filesToStudies(acceptedFiles);
    //   this.updateStudies(studies);
    // }
    // const t2Paths = json.t2;
    // if (t2Paths) {
    //   const acceptedFiles = await Promise.all(t2Paths.map(async (element) => {
    //     const response = await fetch(element);
    //     const blob = await response.blob();
    //     const file = new File([blob], "", {
    //       type: "application/dicom",
    //     });
    //     return file;
    //   }));
    //   studies = [...await filesToStudies(acceptedFiles), ...studies];
    //   this.updateStudies(studies);
    //   this.props.oneXTwoLayout();
    // }

  }

  render() {

    if (this.state.error) {
      return <div>Error: {JSON.stringify(this.state.error)}</div>;
    }

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <ConnectedViewer
          studies={this.state.studies}
          studyInstanceUids={
            this.state.studies &&
            this.state.studies.map(a => a.studyInstanceUid)
          }
        />
      </div>
    );
  }
}

export default withTranslation('Common')(connect(null, mapDispatchToProps)(ViewerLocalFileDataNoDrop));
