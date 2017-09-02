import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import firebase from './firebase'
import { Router, Stack, Scene } from 'react-native-router-flux'

import PageOne from './components/PageOne';
import PageTwo from './components/PageTwo';
import Lasttimelist from './components/Lasttimelist';
import Home from './components/Home';

const App = () => (
  <Router>
    <Stack key="root">
      <Scene key="home" component={Home} title="Last time" initial={true} />
    </Stack>
  </Router>
);

export default (App);