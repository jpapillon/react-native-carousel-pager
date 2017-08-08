# react-native-caroussel-pager
[![npm](https://img.shields.io/npm/v/react-native-caroussel-pager.svg?style=plastic)](https://npmjs.org/package/react-native-caroussel-pager)
<p>
    <img src="./react-native-caroussel-pager.gif" width="300">
</p>

## Installation
```bash
npm install react-native-caroussel-pager --save
```
or
```bash
yarn add react-native-caroussel-pager
```

## Usage
```js
import {View} from 'react-native';
import React, {Component} from 'react';
import CarousselPager from 'react-native-caroussel-pager';

export default class Pager extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <CarousselPager initialPage={2} pageStyle={{backgroundColor: '#fff'}}>
          <View key={'page0'}></View>
          <View key={'page1'}></View>
          <View key={'page2'}></View>
          <View key={'page3'}></View>
        </CarousselPager>
      </View>
    );
  }
}
```

## Properties

Name | propType | default value | description
--- | --- | --- | ---
initialPage | number | 0 | Initial page to display on render
vertical | boolean | false | Set to `true` if caroussel should be vertical
blurredZoom | number | 0.8 | Zoom (number between 0 and 1) to apply to blurred pages
blurredOpacity | number | 0.8 | Opacity (number between 0 and 1) to apply to blurred pages
containerPadding | number | 30 | Container padding (used to display part of preceding and following pages)
pageSpacing | number | 10 | Space between pages
pageStyle | object | null | Style to apply to each page
