import CornerstoneViewport from 'react-cornerstone-viewport';
import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';

const Synchronizer = cornerstoneTools.Synchronizer;
const EVENTS = cornerstoneTools.EVENTS;
const stackImagePositionSynchronizer = cornerstoneTools.stackImagePositionSynchronizer;
let synchronizer;

class SyncCornerstoneViewport extends CornerstoneViewport {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    // wait until cornerstone is enabled.
    await super.componentDidMount();
    if (!synchronizer) {
      synchronizer = new Synchronizer(
        EVENTS.STACK_SCROLL,
        stackImagePositionSynchronizer,
      );
    }
    synchronizer.add(this.element);
    const colormapsList = cornerstone.colors.getColormapsList().map(value => value.id);
    const colormapId = this.props.colormap.toLowerCase();
    if (colormapsList.includes(colormapId)) {
      const colormap = cornerstone.colors.getColormap(colormapId);
      const viewport = cornerstone.getViewport(this.element);
      viewport.colormap = colormap;
      cornerstone.setViewport(this.element, viewport);
      cornerstone.updateImage(this.element, true);
      // console.log(colormapsList)
      // console.log(colormap)
    }
  }

  componentWillUnmount() {
    synchronizer.remove(this.element);
    super.componentWillUnmount();
  }
};

export default SyncCornerstoneViewport;
