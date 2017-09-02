import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import firebase from './firebase'
import { Router, Stack, Scene } from 'react-native-router-flux'

import PageOne from './components/PageOne';
import PageTwo from './components/PageTwo';

const App = () => (
  <Router>
    <Stack key="root">
      <Scene key="pageOne" component={PageOne} title="PageOne" initial={true} />
      <Scene key="pageTwo" component={PageTwo} title="PageTwo" />
    </Stack>
  </Router>
);

export default (App);