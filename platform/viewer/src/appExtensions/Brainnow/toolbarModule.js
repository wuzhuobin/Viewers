import OHIFCornerstoneExtesion from '@ohif/extension-cornerstone'

function updateId(definitions) {
  const newDefinitions = [];
  for (let definition of definitions) {
    if (Array.isArray(definition.buttons)) {
      definition.buttons = updateId(definition.buttons);
    }
    definition.id = 'Brainnow' + definition.id;
    newDefinitions.push(definition);
  }
  return newDefinitions;
}

export default {
  definitions: updateId(OHIFCornerstoneExtesion.getToolbarModule().definitions),
  defaultContext: 'ACTIVE_VIEWPORT::BRAINNOW-CORNERSTONE',
};
