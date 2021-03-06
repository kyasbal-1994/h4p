import React, { PureComponent, PropTypes } from 'react';


import DirCard from './DirCard';
import getHierarchy from './getHierarchy';

const getStyles = (props, context) => {
  const { fontFamily } = context.muiTheme;

  return {
    root: {
      boxSizing: 'border-box',
      width: '100%',
      fontFamily,
    },
  };
};

export default class Root extends PureComponent {

  static propTypes = {
    files: PropTypes.array.isRequired,
    selectedFile: PropTypes.object,
    tabbedFiles: PropTypes.array.isRequired,
    isDirOpened: PropTypes.func.isRequired,
    handleFileSelect: PropTypes.func.isRequired,
    handleDirToggle: PropTypes.func.isRequired,
    handleFileMove: PropTypes.func.isRequired,
    handleNativeDrop: PropTypes.func.isRequired,
    openFileDialog: PropTypes.func.isRequired,
    putFile: PropTypes.func.isRequired,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const { files } = this.props;

    const transfer = {
      selectedFile: this.props.selectedFile,
      tabbedFiles: this.props.tabbedFiles,
      isDirOpened: this.props.isDirOpened,
      handleFileSelect: this.props.handleFileSelect,
      handleDirToggle: this.props.handleDirToggle,
      handleFileMove: this.props.handleFileMove,
      handleNativeDrop: this.props.handleNativeDrop,
      handleNameChange: this.props.handleNameChange,
      openFileDialog: this.props.openFileDialog,
      putFile: this.props.putFile,
    };

    const { root } = getStyles(this.props, this.context);
    const { prepareStyles } = this.context.muiTheme;

    return (
      <div style={prepareStyles(root)}>
        <DirCard dir={getHierarchy(files)} {...transfer} isRoot />
      </div>
    );
  }
}
