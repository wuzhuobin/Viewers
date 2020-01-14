import toolbarModule from './toolbarModule';
import commandsModule from './commandsModule';
import init from './init';
import BrainnowCornerstoneViewport from './BrainnowCornerstoneViewport';
import sopClassHandlerModule from './sopClassHandlerModule';
// import asyncComponent from './asyncComponent';
// const BrainnowCornerstoneViewport = asyncComponent(() => import('./BrainnowCornerstoneViewport'));
export default {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: 'brainnow-cornerstone',

  // Lifecyle
  preRegistration({ servicesManager = {},
    commandsManager = {},
    appConfig = {},
    // configuration = {},
  }) {
    init({ servicesManager, commandsManager, appConfig });
  },
  // Modules
  getCommandsModule({ servicesManager, commandsManager }) {
    // console.log('brainnow getCommandsModule');
    return commandsModule({ servicesManager, commandsManager });
  },
  getToolbarModule() {
    // console.log('brainnow getToolbarModule')
    return toolbarModule;
  },
  // getPanelModule() {
  //   console.log('brainnow getPanelModule')
  //   // return panelModule;
  // },
  getSopClassHandler() {
    return sopClassHandlerModule;
  },
  getViewportModule() {
    return BrainnowCornerstoneViewport;
  },
}
