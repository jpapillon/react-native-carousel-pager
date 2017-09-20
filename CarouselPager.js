import React, { Component } from 'react';
import {
  View,
  PanResponder,
  Animated,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

export default class CarouselPager extends Component {
  static propTypes = {
    initialPage: PropTypes.number,
    vertical: PropTypes.bool,
    blurredZoom: PropTypes.number,
    blurredOpacity: PropTypes.number,
    containerPadding: PropTypes.number,
    pageSpacing: PropTypes.number,
    pageStyle: PropTypes.object,

    children: PropTypes.array.isRequired
  }

  static defaultProps = {
    initialPage: 0,
    blurredZoom: 0.8,
    blurredOpacity: 0.8,
    containerPadding: 30,
    pageSpacing: 10,
    vertical: false,
  }

  state = {
    width: 0,
    height: 0
  }

  _getPosForPage(pageNb){
    return -pageNb * this._boxSizeInterval;
  }

  _getPageForOffset(offset, diff) {
    let boxPos = Math.abs(offset / this._boxSizeInterval);
    let index;

    if (diff < 0) {
      // Scrolling forwards
      index = Math.ceil(boxPos);
    } else {
      // Scrolling backwards
      index = Math.floor(boxPos);
    }

    // Make sure index is within bounds
    if (index < 0) {
      index = 0;
    } else if (index > this.props.children.length - 1) {
      index = this.props.children.length - 1;
    }

    return index;
  }

  _runAfterMeasurements(width, height) {
    // Set box and box interval size
    let length = this.props.vertical ? height : width;
    this._boxSize = length - (2 * this.props.containerPadding);
    this._boxSizeInterval = this._boxSize + this.props.pageSpacing;

    // Get initial page
    let initialPage = this.props.initialPage || 0;
    if (initialPage < 0) {
      initialPage = 0;
    } else if (initialPage >= this.props.children.length) {
      initialPage = this.props.children.length - 1;
    }

    this._currentPage = initialPage;
    this._lastPos = this._getPosForPage(this._currentPage);

    let viewsScale = [];
    let viewsOpacity = [];
    for (let i = 0; i < this.props.children.length; ++i) {
      viewsScale.push(new Animated.Value(i === this._currentPage ? 1 : this.props.blurredZoom));
      viewsOpacity.push(new Animated.Value(i === this._currentPage ? 1 : this.props.blurredOpacity));
    }

    this.setState({
      width,
      height,
      pos: new Animated.Value(this._getPosForPage(this._currentPage)),
      viewsScale,
      viewsOpacity
    });
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
      },
      onPanResponderMove: (evt, gestureState) => {
        let suffix = this.props.vertical ? 'y' : 'x';
        this.state.pos.setValue(this._lastPos + gestureState['d' + suffix]);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        let suffix = this.props.vertical ? 'y' : 'x';
        this._lastPos += gestureState['d' + suffix];
        let page = this._getPageForOffset(this._lastPos, gestureState['d' + suffix]);

        if (this._currentPage !== page) {
          // New page needs to be shown (adjust opacity and scale)
          Animated.timing(this.state.viewsScale[page], {
            toValue: 1,
            duration: 150
          }).start();

          Animated.timing(this.state.viewsOpacity[page], {
            toValue: 1,
            duration: 150
          }).start();

          Animated.timing(this.state.viewsScale[this._currentPage], {
            toValue: this.props.blurredZoom,
            duration: 150
          }).start();

          Animated.timing(this.state.viewsOpacity[this._currentPage], {
            toValue: this.props.blurredOpacity,
            duration: 150
          }).start();
        }

        // Move to proper position for selected page
        let toValue = this._getPosForPage(page);
        Animated.timing(this.state.pos, {
          toValue: toValue,
          duration: 150
        }).start();

        this._lastPos = toValue;
        this._currentPage = page;
      },
      onPanResponderTerminate: (evt, gestureState) => {
      },
      onShouldBlockNativeResponder: (evt, gestureState) => false
    });
  }

  render() {
    if (!this.state.width && !this.state.height) {
      // Use a transparent screen to render so we can calculate width & height
      return (
        <View style={{flex: 1}}>
          <View
            style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'transparent'}}
            onLayout={evt => {
              let width = evt.nativeEvent.layout.width;
              let height = evt.nativeEvent.layout.height;
              this._runAfterMeasurements(width, height);
            }}
          />
        </View>
      );
    }

    let containerStyle = {};
    let boxStyle = {};
    if (this.props.vertical) {
      containerStyle = {
        top: this.state.pos,
        paddingTop: this.props.containerPadding,
        paddingBottom: this.props.containerPadding,
        flexDirection: 'column'
      }
      boxStyle = {
        height: this._boxSize,
        marginBottom: this.props.pageSpacing
      }
    } else {
      containerStyle = {
        left: this.state.pos,
        paddingLeft: this.props.containerPadding,
        paddingRight: this.props.containerPadding,
        flexDirection: 'row'
      }
      boxStyle = {
        width: this._boxSize,
        marginRight: this.props.pageSpacing
      };
    }

    return (
      <View style={{flex: 1, flexDirection: this.props.vertical ? 'column' : 'row', overflow: 'hidden'}}>
        <Animated.View
          style={[{flex: 1}, containerStyle]}
          {...this._panResponder.panHandlers}
        >
          {this.props.children.map((page, index) => {
            return (
              <Animated.View
                key={index}
                style={[{
                  opacity: this.state.viewsOpacity[index],
                  transform: [
                    this.props.vertical ? {
                      scaleX: this.state.viewsScale[index]
                    } : {
                      scaleY: this.state.viewsScale[index]
                    }
                  ]
                }, boxStyle]}>
                {page}
              </Animated.View>
            );
          })}
        </Animated.View>
      </View>
    );
  }
}
