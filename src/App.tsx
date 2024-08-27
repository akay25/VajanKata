import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import Toast from '~/components/Toast';
import MainComponent from '~/screens/MainComponent';

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
      <SafeAreaView>
        <StatusBar hidden={true} />
        <MainComponent />
        <Toast />
      </SafeAreaView>
    );
  }
}

export default App;
