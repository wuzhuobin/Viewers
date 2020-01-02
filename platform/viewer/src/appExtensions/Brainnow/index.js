export default {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: 'example-extension',

  // Lifecyle
  preRegistration() {
    console.log('brainnow preRegistration');
  },
  // Modules
  getCommandsModule() {
    console.log('brainnow getCommandsModule');
  },
  getToolbarModule() {
    console.log('brainnow getToolbarModule')
  },
  getPanelModule() {
    console.log('brainnow getPanelModule')
  },
  getSopClassHandler() {
    console.log('brainnow getSopClassHandler');
  },
  getViewportModule() {
    console.log('brainnow getViewportModule')
  },
}
