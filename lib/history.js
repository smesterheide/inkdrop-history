'use babel';

import HistoryMessageDialog from './history-message-dialog';

module.exports = {

  activate() {
    inkdrop.components.registerClass(HistoryMessageDialog);
    inkdrop.layouts.addComponentToLayout('modals', 'HistoryMessageDialog');
  },

  deactivate() {
    inkdrop.layouts.removeComponentFromLayout('modals', 'HistoryMessageDialog');
    inkdrop.components.deleteClass(HistoryMessageDialog);
  }

};
