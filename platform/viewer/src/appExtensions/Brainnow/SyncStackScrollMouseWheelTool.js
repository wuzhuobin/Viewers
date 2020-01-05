import cornerstoneTools from 'cornerstone-tools';
const BaseTool = cornerstoneTools.importInternal('base/BaseTool');
const scroll = cornerstoneTools.importInternal('util/scroll');
const Synchronizer = cornerstoneTools.Synchronizer;
const EVENTS = cornerstoneTools.EVENTS;
const stackImagePositionSynchronizer = cornerstoneTools.stackImagePositionSynchronizer;

/**
 * @public
 * @class StackScrollMouseWheelTool
 * @memberof Tools
 *
 * @classdesc Tool for scrolling through a series using the mouse wheel.
 * @extends Tools.Base.BaseTool
 */
export default class SyncStackScrollMouseWheelTool extends BaseTool {
  constructor(props = {}) {
    const defaultProps = {
      name: 'SyncStackScrollMouseWheel',
      supportedInteractionTypes: ['MouseWheel'],
      configuration: {
        loop: false,
        allowSkipping: true,
        invert: false,
      },
    };

    super(props, defaultProps);
    this.synchronizer = new Synchronizer(
      EVENTS.STACK_SCROLL,
      stackImagePositionSynchronizer
    );
  }

  mouseWheelCallback(evt) {
    const { direction: images, element } = evt.detail;
    const { loop, allowSkipping, invert } = this.configuration;
    const direction = invert ? -images : images;

    cornerstone.getEnabledElements().forEach(elem => this.synchronizer.add(elem.element));
    scroll(element, direction, loop, allowSkipping);
    cornerstone.getEnabledElements().forEach(elem => this.synchronizer.remove(elem.element));
  }
}
