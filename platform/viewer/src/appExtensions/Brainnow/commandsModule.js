import cornerstoneTools from 'cornerstone-tools';
import cornerstone from 'cornerstone-core';

const commandsModule = ({ commandsManager }) => {
  const actions = {
    syncStackScroll: () => {
      cornerstoneTools.setToolActive('SyncStackScrollMouseWheel', {});
      commandsManager.runCommand('setToolActive', { toolName: 'SyncStackScroll' });
    },
    setToolActive: ({ toolName }) => {
      if (toolName === 'StackScroll') {
        cornerstoneTools.setToolActive('StackScrollMouseWheel', {});
      }
      if (!toolName) {
        console.warn('No toolname provided to setToolActive command');
      }
      cornerstoneTools.setToolActive(toolName, { mouseButtonMask: 1 })
    },
    setJetColormap: () => {
      const colormap = cornerstone.colors.getColormap('jet');
      const element = commandsManager.runCommand('getActiveViewportEnabledElement');
      const viewport = cornerstone.getViewport(element);
      viewport.colormap = colormap;
      cornerstone.setViewport(element, viewport);
      cornerstone.updateImage(element, true);
      // cornerstone.getEnabledElements().forEach(elem => {
      //   console.log(elem)
      //   const viewport = cornerstone.getViewport(elem.element);
      //   console.log(viewport)
      //   //   viewport.colormap = colormap;
      //   //   console.log(viewport)
      //   //   cornerstone.setViewport(elem.element, viewport);
      //   //   cornerstone.updateImage(elem.element, true);
      // });
    },
  };

  const definitions = {
    syncStackScroll: {
      commandFn: actions.syncStackScroll,
      storeContexts: [],
      options: {}
    },
    setToolActive: {
      commandFn: actions.setToolActive,
      storeContexts: [],
      options: {}
    },
    setJetColormap: {
      commandFn: actions.setJetColormap,
      storeContexts: [],
      options: {}
    },
  };

  return {
    actions,
    definitions,
    defaultContext: 'ACTIVE_VIEWPORT::CORNERSTONE',
  };
};

export default commandsModule;
