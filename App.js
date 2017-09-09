import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import firebase from './firebase'
import { Router, Stack, Scene } from 'react-native-router-flux'

import PageOne from './components/PageOne';
import PageTwo from './components/PageTwo';
import Lasttimelist from './components/Lasttimelist';
import LasttimeDetail from './components/LasttimeDetail';
import LasttimeForm from './components/LasttimeForm';
import Home from './components/Home';

const App = () => (
  <Router>
    <Stack key="root">
      <Scene key="home" component={Home} title="Last time" initial={true} />
      <Scene key="lasttime_detail" component={LasttimeDetail} title="Detail"  />
      <Scene key="lasttime_form" component={LasttimeForm} title="New Lasttime" />
    </Stack>
  </Router>
);

export default (App);