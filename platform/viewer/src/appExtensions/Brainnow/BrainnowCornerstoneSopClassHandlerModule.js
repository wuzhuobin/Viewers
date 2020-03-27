import { MODULE_TYPES, utils } from '@ohif/core';

const SOP_CLASS_UIDS = {
  // MR_IMAGE_STORAGE: '1.2.840.10008.5.1.4.1.1.4',
  // ENHANCDE_MR_IMAGE_STORAGE: '1.2.840.10008.5.1.4.1.1.4.1',
};

const BrainnowCornerstoneSopClassHandler = {
  id: 'BrainnowCornerstoneSopClassHandlerPlugin',
  type: MODULE_TYPES.SOP_CLASS_HANDLER,
  sopClassUIDs: Object.values(SOP_CLASS_UIDS),
  getDisplaySetFromSeries(series, study) {
    // const instance = series.getFirstInstance();

    // Note: We are passing the dicomweb client into each viewport!
    console.log('BrainnowCornerstoneSopClassHandlerPlugin');

    return {
      plugin: 'brainnow-cornerstone',
      modality: 'Brainnow-MR',
      displaySetInstanceUID: utils.guid(),
      // dicomWebClient,
      // sopInstanceUID: instance.getSOPInstanceUID(),
      // seriesInstanceUID: series.getSeriesInstanceUID(),
      // studyInstanceUID: study.getStudyInstanceUID(),
    };
  },
};

export default BrainnowCornerstoneSopClassHandler;
