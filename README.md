# react-native-carousel-pager
[![Version](https://img.shields.io/npm/v/react-native-carousel-pager.svg)](https://www.npmjs.com/package/react-native-carousel-pager)
[![npm](https://img.shields.io/npm/dm/react-native-carousel-pager.svg)](https://www.npmjs.com/package/react-native-carousel-pager)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

<p>
    <img src="./react-native-carousel-pager.gif" width="300">
</p>

## Installation
```bash
npm install react-native-carousel-pager --save
```
or
```bash
yarn add react-native-carousel-pager
```

## Usage
```js
import {View} from 'react-native';
import React, {Component} from 'react';
import CarouselPager from 'react-native-carousel-pager';

export default class Pager extends Component {
  onClickSomething() {
    this.carousel.goToPage(2);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <CarouselPager ref={ref => this.carousel = ref} initialPage={2} pageStyle={{backgroundColor: '#fff'}}>
          <View key={'page0'}></View>
          <View key={'page1'}></View>
          <View key={'page2'}></View>
          <View key={'page3'}></View>
        </CarouselPager>
      </View>
    );
  }
}
```

## Properties

Name | propType | default value | description
--- | --- | --- | ---
initialPage | number | 0 | Initial page to display on render
vertical | boolean | false | Set to `true` if carousel should be vertical
blurredZoom | number | 0.8 | Zoom (number between 0 and 1) to apply to blurred pages
blurredOpacity | number | 0.8 | Opacity (number between 0 and 1) to apply to blurred pages
animationDuration | number | 150 | Animation duration between page changes
containerPadding | number | 30 | Container padding (used to display part of preceding and following pages)
pageSpacing | number | 10 | Space between pages
pageStyle | object | null | Style to apply to each page
onPageChange | function | (page) => {} | When current page changes, call onPageChange with parameter
scrollThreshold | number | 0 | Minimum differential (dx/dy) needed to do scrolling.
## Methods

Name | propType | description
--- | --- | ---
goToPage | number | Scrolls to the given page