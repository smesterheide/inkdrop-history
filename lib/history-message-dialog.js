'use babel';

import { React } from 'inkdrop';
import { CompositeDisposable } from 'inkdrop';

const { app } = require('electron').remote;

const textareaStyle = {
  width: '100%',
  minHeight: '200px'
};

export default class HistoryMessageDialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      noteId: null,
      document: {},
      revsInfo: []
    };

    this.changeRevision = this.changeRevision.bind(this);
  }

  componentWillMount () {
    // Events subscribed to in Inkdrop's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this dialog
    this.subscriptions.add(inkdrop.commands.add(document.body, {
      'history:toggle': () => this.toggle()
    }));
  }

  componentWillUnmount () {
    this.subscriptions.dispose();
  }

  render() {
    const { MessageDialog } = inkdrop.components.classes;
    return (
      <MessageDialog ref='dialog' title={this.state.document.title || 'History'}>
        {this.state.noteId != null &&
          <form>
            <p><label>
              Revision:&nbsp;
              <select value={document._rev} onChange={this.changeRevision}>
                {this.state.revsInfo.map(r => 
                  <option key={r.rev} value={r.rev} disabled={r.status != 'available'}>
                    {r.updatedAt ? new Date(r.updatedAt).toLocaleString() : r.rev}
                  </option>
                )}
              </select>
            </label></p>
            <textarea style={textareaStyle} value={this.state.document.body} disabled />
          </form>
        }
      </MessageDialog>
    );
  }

  async changeRevision(event) {
    const revision = await app.db.local.get(this.state.noteId, { rev: event.target.value });
    this.setState({ document: revision });
  }

  toggle() {
    const { dialog } = this.refs;
    if (!dialog.isShown) {
      this.loadRevisions();
      dialog.showDialog();
    } else {
      dialog.dismissDialog();
    }
  }

  async loadRevisions() {
    const editorState = inkdrop.flux.getStore('editor').getState();
    const document = await app.db.local.get(editorState.noteId, { revs_info: true });
    this.setState({
      noteId: editorState.noteId, 
      document: document,
      revsInfo: []
    });

    const revsInfo = await Promise.all(document._revs_info.map(async r => { 
      try {
        const revision = await app.db.local.get(editorState.noteId, { rev: r.rev });
        return { ...r, updatedAt: revision.updatedAt };
      } catch(err) {
        return r
      }
    }));
    this.setState({ revsInfo });
  }

}
