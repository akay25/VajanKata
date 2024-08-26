import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import {inject, observer, Provider} from 'mobx-react';

// import {Routes} from '~/routes/index.routes';
// import AuthNavigation from '~/routes/AuthNavigation';
import Toast from '~/components/Toast';
// import {userStore} from '~/store';

import MainComponent from '~/screens/MainComponent';

// @ts-ignore
// @inject('UserStore')
// @observer
class App extends React.Component<any, any> {
  // @ts-ignore
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    // TODO: Add OTA update feature later
    // await this.props.UserStore.loadTokenFromDevice();
  }

  render() {
    // const {UserStore} = this.props;
    return (
      <SafeAreaView>
        <StatusBar hidden={true} />
        <NavigationContainer>
          <MainComponent />
          {/* {UserStore.isLoggedIn ? <Routes /> : <AuthNavigation />} */}
        </NavigationContainer>
        <Toast />
      </SafeAreaView>
    );
  }
}

// const MainApp = () => (
//   // Mobx Providers
//   // <Provider UserStore={userStore}>
//   <App />
//   // </Provider>
// );

export default App;
