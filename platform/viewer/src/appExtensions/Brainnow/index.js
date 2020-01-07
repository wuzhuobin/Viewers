import toolbalModule from './toolbalModule';
import commandsModule from './commandsModule';
import init from './init';
import asyncComponent from './asyncComponent';
const OHIFCornerstoneViewport = asyncComponent(() => import('./OHIFCornerstoneViewport'));
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
    // console.log('brainnow preRegistration');
    // console.log(servicesManager);
    // console.log(commandsManager);
    // console.log(appConfig);
    // console.log(configuration);
    init({ servicesManager, commandsManager, appConfig });
  },
  // Modules
  getCommandsModule({ servicesManager, commandsManager }) {
    // console.log('brainnow getCommandsModule');
    return commandsModule({ servicesManager, commandsManager });
  },
  getToolbarModule() {
    // console.log('brainnow getToolbarModule')
    return toolbalModule;
  },
  // getPanelModule() {
  //   console.log('brainnow getPanelModule')
  //   // return panelModule;
  // },
  // getSopClassHandler() {
  //   console.log('brainnow getSopClassHandler');
  //   // return sopClassHandlerModule;
  // },
  getViewportModule() {
    return OHIFCornerstoneViewport;
  },
}
