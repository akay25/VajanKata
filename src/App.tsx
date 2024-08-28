import {Provider} from 'mobx-react';
import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import Toast from '~/components/Toast';
import MainComponent from '~/screens/MainComponent';
import {settingsStore} from '~/store';

class App extends React.Component<any, any> {
  // @ts-ignore
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    // TODO: Add OTA update feature later
  }

  render() {
    return (
      <Provider SettingsStore={settingsStore}>
        <SafeAreaView>
          <StatusBar hidden={true} />
          <MainComponent />
          <Toast />
        </SafeAreaView>
      </Provider>
    );
  }
}

export default App;
