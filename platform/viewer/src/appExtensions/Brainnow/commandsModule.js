import cornerstoneTools from 'cornerstone-tools';

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
  };

  return {
    actions,
    definitions,
    defaultContext: 'ACTIVE_VIEWPORT::CORNERSTONE',
  };
};

export default commandsModule;
