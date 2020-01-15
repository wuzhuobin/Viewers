import { MODULE_TYPES, utils } from '@ohif/core';

const SOP_CLASS_UIDS = {
  // MR_IMAGE_STORAGE: '1.2.840.10008.5.1.4.1.1.4',
  // ENHANCDE_MR_IMAGE_STORAGE: '1.2.840.10008.5.1.4.1.1.4.1',
};

const BrainnowCornerstoneSopClassHandler = {
  id: 'BrainnowCornerstoneSopClassHandlerPlugin',
  type: MODULE_TYPES.SOP_CLASS_HANDLER,
  sopClassUids: Object.values(SOP_CLASS_UIDS),
  getDisplaySetFromSeries(series, study) {
    // const instance = series.getFirstInstance();

    // Note: We are passing the dicomweb client into each viewport!
    console.log('BrainnowCornerstoneSopClassHandlerPlugin');

    return {
      plugin: 'brainnow-cornerstone',
      modality: 'Brainnow-MR',
      displaySetInstanceUid: utils.guid(),
      // dicomWebClient,
      // sopInstanceUid: instance.getSOPInstanceUID(),
      // seriesInstanceUid: series.getSeriesInstanceUID(),
      // studyInstanceUid: study.getStudyInstanceUID(),
    };
  },
};

export default BrainnowCornerstoneSopClassHandler;
