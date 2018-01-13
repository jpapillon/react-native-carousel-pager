/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity
} from 'react-native';
import CarouselPager from 'react-native-carousel-pager';

export default class App extends Component {
  render() {

    var i = 0;
    let horizontalPages = [];
    let verticalPages = [];
    for (let i = 0; i < 5; i++) {
      horizontalPages.push(
        <View
          key={'page-' + i}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 30,
            backgroundColor: '#fff',
            borderRadius: 2
          }}>
          <TouchableOpacity onPress={() => this.horizontalCarousel.scrollTo((i + 1) % 5)}>
            <Text style={{color: '#666', fontSize: 60, fontWeight: 'bold'}}>{i+1}</Text>
          </TouchableOpacity>
        </View>
      );
      verticalPages.push(
        <View
          key={'page-' + i}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 30,
            backgroundColor: '#fff',
            borderRadius: 2
          }}>
          <TouchableOpacity onPress={() => this.verticalCarousel.scrollTo((i + 1) % 5)}>
            <Text style={{color: '#666', fontSize: 60, fontWeight: 'bold'}}>{i+1}{i+1}</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#000', paddingTop: 10, paddingBottom: 10}}>
          {<CarouselPager
            ref={ref => this.horizontalCarousel = ref}
            pageStyle={{
              backgroundColor: '#fff',
              padding: 30,
            }}
          >{horizontalPages}</CarouselPager>}
        </View>
        <View style={{flex: 1, flexDirection: 'row', paddingLeft: 10, paddingRight: 10, backgroundColor: '#369'}}>
          {<CarouselPager
            ref={ref => this.verticalCarousel = ref}
            vertical={true}
            pageStyle={{
              backgroundColor: '#fff',
              padding: 30,
            }}
          >{verticalPages}</CarouselPager>}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#ccc',
  }
});
