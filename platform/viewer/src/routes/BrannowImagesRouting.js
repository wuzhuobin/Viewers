import React from 'react';
import PropTypes from 'prop-types';
import BrainnowViewerJsonFile from '../connectedComponents/BrainnowViewerJsonFile';

function BrainnowImagesRouting(route) {
  const imagesUrl = route.match.params[0];
  // console.log(imagesURL)
  return (<BrainnowViewerJsonFile imagesUrl={imagesUrl}></BrainnowViewerJsonFile>);
};

BrainnowImagesRouting.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      location: PropTypes.string,
    }),
  }),
};

export default BrainnowImagesRouting;
