import React, { PropTypes, Component } from 'react';
import IconButton from 'material-ui/IconButton';
import AVPlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline';


import { SourceFile } from '../File/';
import EditorMenu from './EditorMenu';
import ChromeTab, { ChromeTabContent } from '../ChromeTab/';


const getStyles = (props, context) => {
  const {
    palette,
    spacing,
    fontFamily,
  } = context.muiTheme;

  return {
    root: {
      flex: '1 1 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      overflow: 'hidden',
      fontFamily,
    },
    tabContainer: {
      display: 'flex',
      alignItems: 'flex-end',
      height: 32,
      paddingTop: spacing.desktopGutterMini,
      paddingRight: spacing.desktopGutterLess,
      paddingBottom: 10,
      paddingLeft: 10,
      marginRight: spacing.desktopGutterMore,
      marginBottom: -10,
      overflow: 'hidden',
      zIndex: 10,
    },
    tabContentContainer: {
      flex: '1 1 auto',
      position: 'relative',
    },
  };
};

export default class EditorPane extends Component {

  static propTypes = {
    showMonitor: PropTypes.bool.isRequired,
    files: PropTypes.array.isRequired,
    tabs: PropTypes.array.isRequired,
    putFile: PropTypes.func.isRequired,
    selectTab: PropTypes.func.isRequired,
    closeTab: PropTypes.func.isRequired,
    handleRun: PropTypes.func.isRequired,
    openFileDialog: PropTypes.func.isRequired,
    localization: PropTypes.object.isRequired,
    findFile: PropTypes.func.isRequired,
    isResizing: PropTypes.bool.isRequired,
    getConfig: PropTypes.func.isRequired,
    setConfig: PropTypes.func.isRequired,
    port: PropTypes.object,
    reboot: PropTypes.bool.isRequired,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isResizing) {
      return false;
    }
    return true;
  }

  renderBackground() {
    const {
      localization,
    } = this.props;
    const {
      palette,
    } = this.context.muiTheme;

    const styles = {
      noFileBg: {
        flex: '1 1 auto',
        backgroundColor: palette.primary1Color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      logo: {
        color: palette.secondaryTextColor,
      },
      largeIcon: {
        width: 40,
        height: 40,
      },
      large: {
        width: 80,
        height: 80,
        padding: 20,
      },
    };

    return (
      <div style={styles.noFileBg}>
        <h1 style={styles.logo}>Feeles</h1>
        <IconButton
          iconStyle={styles.largeIcon}
          style={styles.large}
          onTouchTap={this.props.handleRun}
        >
          <AVPlayCircleOutline color={palette.alternateTextColor} />
        </IconButton>
      </div>
    );
  }

  render() {
    if (this.props.showMonitor) {
      return null;
    }
    if (!this.props.tabs.length) {
      return this.renderBackground();
    }

    const {
      files, tabs,
      putFile, selectTab, closeTab,
      handleRun,
      openFileDialog,
      localization,
      findFile,
      getConfig, setConfig,
      port,
      reboot,
    } = this.props;
    const {
      prepareStyles,
      palette,
    } = this.context.muiTheme;

    const {
      root,
      tabContainer,
      tabContentContainer,
      button,
    } = getStyles(this.props, this.context);

    const tabbedFiles = tabs.map((tab) => tab.file);

    return (
    <div style={prepareStyles(root)}>
      <EditorMenu
        localization={localization}
        getConfig={getConfig}
        setConfig={setConfig}
      />
      <div style={prepareStyles(tabContainer)}>
      {tabs.map((tab) => (
        <ChromeTab
          key={tab.key}
          tab={tab}
          isSelected={tab.isSelected}
          tabbedFiles={tabbedFiles}
          handleSelect={selectTab}
          handleClose={closeTab}
          handleRun={handleRun}
        />
      ))}
      </div>
      <div style={tabContentContainer}>
      {tabs.map((tab) => (
        <ChromeTabContent key={tab.key} show={tab.isSelected}>
        {tab.renderContent({
          getFiles: () => files,
          onChange: (text) => putFile(tab.file, tab.file.set({ text })),
          handleRun,
          closeSelectedTab: () => tab.isSelected && closeTab(tab),
          isSelected: tab.isSelected,
          getConfig,
          findFile,
          selectTab,
          localization,
          port,
          reboot,
          openFileDialog,
          putFile,
        })}
        </ChromeTabContent>
      ))}
      </div>
    </div>
    );
  }
}
