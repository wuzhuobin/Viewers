import cornerstoneTools from 'cornerstone-tools';
import SyncStackScrollTool from './SyncStackScrollTool';
import SyncStackScrollMouseWheelTool from './SyncStackScrollMouseWheelTool';

export default function init() {
  // cornerstoneTools.init();
  cornerstoneTools.addTool(SyncStackScrollTool);
  cornerstoneTools.addTool(SyncStackScrollMouseWheelTool);
}
