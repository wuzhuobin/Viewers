import React from 'react';
import PropTypes from 'prop-types';
import ViewerLocalFileDataNoDrop from './ViewerLocalFileDataNoDrop';

function BrainnowImagesRouting(route) {
  const imagesUrl = route.match.params[0];
  // console.log(imagesURL)
  return (<ViewerLocalFileDataNoDrop imagesUrl={imagesUrl}></ViewerLocalFileDataNoDrop>);
};

BrainnowImagesRouting.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      location: PropTypes.string,
    }),
  }),
};

export default BrainnowImagesRouting;
