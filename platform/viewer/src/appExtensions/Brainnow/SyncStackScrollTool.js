import cornerstoneTools from 'cornerstone-tools';
import cornerstone from 'cornerstone-core';
import { setToolOptions, getToolOptions } from './toolOptions';

const { stackScrollCursor } = cornerstoneTools.importInternal('tools/cursors');
const BaseTool = cornerstoneTools.importInternal('base/BaseTool');
const scroll = cornerstoneTools.importInternal('util/scroll');
const getToolState = cornerstoneTools.getToolState;
const Synchronizer = cornerstoneTools.Synchronizer;
const EVENTS = cornerstoneTools.EVENTS;
const stackImagePositionSynchronizer = cornerstoneTools.stackImagePositionSynchronizer;
/**
 * @public
 * @class SyncStackScrollTool
 * @memberof Tools
 *
 * @classdesc Tool for scrolling through a series.
 * @extends Tools.Base.BaseTool
 */
export default class SyncStackScrollTool extends BaseTool {
  constructor(props = {}) {
    const defaultProps = {
      name: 'SyncStackScroll',
      supportedInteractionTypes: ['Mouse', 'Touch'],
      configuration: {
        loop: false,
        allowSkipping: true,
      },
      svgCursor: stackScrollCursor,
    };

    super(props, defaultProps);

    this.mouseDragCallback = this._dragCallback.bind(this);
    this.touchDragCallback = this._dragCallback.bind(this);

    this.synchronizer = new Synchronizer(
      EVENTS.STACK_SCROLL,
      stackImagePositionSynchronizer
    );

  }

  _dragCallback(evt) {
    const eventData = evt.detail;
    const { element, deltaPoints } = eventData;
    const { loop, allowSkipping } = this.configuration;
    const options = getToolOptions(this.name, element);

    const pixelsPerImage = this._getPixelPerImage(element);
    const deltaY = this._getDeltaY(element, deltaPoints.page.y);

    if (!pixelsPerImage) {
      return;
    }
    cornerstone.getEnabledElements().forEach(elem => this.synchronizer.add(elem.element));

    if (Math.abs(deltaY) >= pixelsPerImage) {
      const imageIdIndexOffset = Math.round(deltaY / pixelsPerImage);

      scroll(element, imageIdIndexOffset, loop, allowSkipping);

      options.deltaY = deltaY % pixelsPerImage;
    } else {
      options.deltaY = deltaY;
    }

    setToolOptions(this.name, element, options);

    cornerstone.getEnabledElements().forEach(elem => this.synchronizer.remove(elem.element));
  }

  _getDeltaY(element, deltaPointsY) {
    const options = getToolOptions(this.name, element);
    const deltaY = options.deltaY || 0;

    return deltaY + deltaPointsY;
  }

  _getPixelPerImage(element) {
    const toolData = getToolState(element, 'stack');

    if (!toolData || !toolData.data || !toolData.data.length) {
      return;
    }

    const stackData = toolData.data[0];
    const { stackScrollSpeed } = this.configuration;

    // The Math.max here makes it easier to mouseDrag-scroll small or really large image stacks
    return (
      stackScrollSpeed ||
      Math.max(2, element.offsetHeight / Math.max(stackData.imageIds.length, 8))
    );
  }
}
