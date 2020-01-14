// import cornerstoneTools from 'cornerstone-tools';
// import cornerstone from 'cornerstone-core';
import OHIFCornerstoneExtension from '@ohif/extension-cornerstone';

// const commandsModule = ({ commandsManager }) => {
//   const actions = {
//     syncStackScroll: () => {
//       cornerstoneTools.setToolActive('SyncStackScrollMouseWheel', {});
//       commandsManager.runCommand('setToolActive', { toolName: 'SyncStackScroll' });
//     },
//     setToolActive: ({ toolName }) => {
//       if (toolName === 'StackScroll') {
//         cornerstoneTools.setToolActive('StackScrollMouseWheel', {});
//       }
//       if (!toolName) {
//         console.warn('No toolname provided to setToolActive command');
//       }
//       cornerstoneTools.setToolActive(toolName, { mouseButtonMask: 1 })
//     },
//     setJetColormap: () => {
//       const colormap = cornerstone.colors.getColormap('jet');
//       const element = commandsManager.runCommand('getActiveViewportEnabledElement');
//       const viewport = cornerstone.getViewport(element);
//       viewport.colormap = colormap;
//       cornerstone.setViewport(element, viewport);
//       cornerstone.updateImage(element, true);
//     },
//   };

//   const definitions = {
//     syncStackScroll: {
//       commandFn: actions.syncStackScroll,
//       storeContexts: [],
//       options: {}
//     },
//     setToolActive: {
//       commandFn: actions.setToolActive,
//       storeContexts: [],
//       options: {}
//     },
//     setJetColormap: {
//       commandFn: actions.setJetColormap,
//       storeContexts: [],
//       options: {}
//     },
//   };

//   return {
//     actions,
//     definitions,
//     defaultContext: 'ACTIVE_VIEWPORT::CORNERSTONE',
//   };
// };
const commandsModule = ({ serviceManager, commandsManager }) => {
  const commandsModule = OHIFCornerstoneExtension.getCommandsModule({ serviceManager });
  // commandsModule.defaultContext = 'ACTIVE_VIEWPORT::BRAINNOW-CORNERSTONE';
  // commandsModule.actions.setJetColormap = () => {
  //   const colormap = cornerstone.colors.getColormap('jet');
  //   const element = commandsManager.runCommand('getActiveViewportEnabledElement');
  //   console.log(element)
  //   const viewport = cornerstone.getViewport(element);
  //   viewport.colormap = colormap;
  //   cornerstone.setViewport(element, viewport);
  //   cornerstone.updateImage(element, true);
  // };
  commandsModule.definitions.setJetColormap = {
    commandFn: commandsModule.actions.setJetColormap,
    storeContexts: [],
    options: {}
  };
  return commandsModule;
};

export default commandsModule;
