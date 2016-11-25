import React from 'react';
import { Editor, EditorState } from 'draft-js';
import Paper from 'material-ui/Paper';

const style = {
    height: 400,
    width: 600,
    margin: 20,
    marginRight: 'auto',
    marginLeft: 'auto'
};

export default class MyEditor extends React.Component {
    constructor (props) {
        super(props);
        this.state = { editorState: EditorState.createEmpty() };

        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => this.setState({ editorState });
        this.logState = () => console.log(this.state.editorState.toJS(), this.state);
    }

    render () {
        return (
              <Paper
               style={style}
              >
               <div style={styles.root}>
              <div style={styles.editor} onClick={this.focus}>
                <Editor
                  editorState={this.state.editorState}
                  onChange={this.onChange}
                  placeholder="Enter some text..."
                  ref="editor"
                />
              </div>
              <input
                onClick={this.logState}
                style={styles.button}
                type="button"
                value="Log State"
              />
            </div>
              </Paper>

        );
    }
      }

const styles = {
    root: {
        fontFamily: '\'Helvetica\', sans-serif',
        padding: 20,
        width: 550
    },
    editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 300,
        padding: 10
    },
    button: {
        marginTop: 10,
        textAlign: 'center'
    }
};
