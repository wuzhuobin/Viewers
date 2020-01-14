import CornerstoneViewport from 'react-cornerstone-viewport';
import cornerstoneTools from 'cornerstone-tools';

const Synchronizer = cornerstoneTools.Synchronizer;
const EVENTS = cornerstoneTools.EVENTS;
const stackImagePositionSynchronizer = cornerstoneTools.stackImagePositionSynchronizer;
let synchronizer;
// const scrollToIndex = cornerstoneTools.importInternal('util/scrollToIndex');

class SyncCornerstoneViewport extends CornerstoneViewport {
  constructor(props) {
    super(props);
    if (this.props.imageIds && this.props.imageIds.length) {
      this.state.imageIdIndex = this.props.imageIds.length * 0.5;
    }
  }

  async componentDidMount() {
    super.componentDidMount();
    if (!synchronizer) {
      synchronizer = new Synchronizer(
        EVENTS.STACK_SCROLL,
        stackImagePositionSynchronizer,
      );
    }
    synchronizer.add(this.element);
  }
};

export default SyncCornerstoneViewport;
