import OHIFCornerstoneExtension from '@ohif/extension-cornerstone';

const commandsModule = ({ serviceManager, commandsManager }) => {
  const commandsModule = OHIFCornerstoneExtension.getCommandsModule({ serviceManager });
  commandsModule.defaultContext = 'ACTIVE_VIEWPORT::BRAINNOW-CORNERSTONE';
  return commandsModule;
};

export default commandsModule;
