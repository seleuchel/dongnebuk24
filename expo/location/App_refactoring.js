import React, { Component } from 'react';
import { Platform, Text, View, Button, StyleSheet,WebView, BackHandler, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, {Marker} from 'react-native-maps';
import SlidingUpPanel from 'rn-sliding-up-panel';

//https://github.com/octopitus/rn-sliding-up-panel

export default class App extends Component<Props>{

  constructor(props){
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      location: null,
      errorMessage: null,
      is_location_on : null,
      region: null,
      coordinate : null
    };
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
}

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    let is_location_on = await Location.hasServicesEnabledAsync({});
    let t_1 = await Location.getCurrentPositionAsync();
    let way = await Location.reverseGeocodeAsync(location.coords);

    this.setState({ location });
    this.setState({ is_location_on});
    this.setState({ way });
//    this.setState({region});
  };

  render() {
    let text = 'Waiting..';
    let lat = "";
    let lon = "";

    if (this.state.errorMessage) {
      text = this.state.errorMessage;
      console.log(text);
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);

      lat = parseFloat(this.state.location.coords.latitude);
      lon = parseFloat(this.state.location.coords.longitude);

    }
    return (
      <View style={styles.container}>
      <WebView style={styles.web}
          source = {{ uri : 'https://github.com'}}
        />
        <Button title='내 위치' color="black" onPress={() => this._panel.show()} />
                <SlidingUpPanel ref={c => this._panel = c} >
                  <View style={{flex:0.7, top:300}}>
                    <Button title='위치 갱신' color="black" onPress={() => {
                      this.setState({
                        region:{
                          latitude : lat,
                          longitude : lon,
                          latitudeDelta : 0.009,
                          longitudeDelta : 0.009,
                        }
                      });
                      this.setState({
                        coordinate:{
                          latitude : Number(lat),
                          longitude : Number(lon)
                        }
                      });
                    }}/>

                      <MapView
                        style={styles.map}
                        initialRegion ={this.state.region}>
                      <Marker title="box" pinColor = "pink"
                      coordinate = {{
                        latitude: Number(lat),
                        longitude: Number(lon)
                      }}/>
                      </MapView>
                  </View>
                </SlidingUpPanel>
      </View>
//예쁘게 안됨. coordinate
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  paragraph: {

    fontSize: 18,
    textAlign: 'center',
  },
  web:{
    height: "100%",
    top : 0,
    backgroundColor : "pink"
  },
  map:{
    height: "80%",
    left: 0,
    right: 0,
    bottom: 0,
  },
});
