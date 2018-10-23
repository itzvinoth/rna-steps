import React, {Component} from 'react';
import {StyleSheet, Animated, Text, View, SectionList, Alert, ScrollView, TouchableOpacity} from 'react-native';
import FontAwesome, { Icons } from "react-native-fontawesome";
import PropTypes from 'prop-types';

export function Step(props) {
  return (
    <View>{props.children}</View>
  )
}

export default class ReactSteps extends React.Component {
  
  onPressChange = (index) => {
    let currentPosition;
    if (this.props.multiple) {
      currentPosition = this.props.currentPosition;
      let indexPosition = currentPosition.indexOf(index);
      if (indexPosition === -1) {
          currentPosition.push(index)
      } else {
          currentPosition.splice(indexPosition, 1)
      }
    } else {
      currentPosition = index;
    }
    this.props.onHandleChange(currentPosition);
  }

  dashedBorder = () => {
    let borderDashColor = this.props.dashedBorderColor;
    var dashedBorderView = [];
    for (var i = 0; i < 80; i++) {
      if (i % 2 == 0) {
        dashedBorderView.push(<View key={i} style={{width: 2, height: 7, backgroundColor: borderDashColor}}></View>)
      } else {
        dashedBorderView.push(<View key={i} style={{width: 2, height: 7, backgroundColor: '#FFF'}}></View>)
      }
    }
    return dashedBorderView;
  }

  render () {
    let { circleBgColor, currentPosition, multiple } = this.props;
    let fontAwesome;
    contents = this.props.children.map((item, index) => {
      const textStyle = {}, contentStyle = {}, containerStyle = {};
      textStyle.fontSize = 18;
      textStyle.marginLeft = 20;
      textStyle.fontStyle = 'italic';
      contentStyle.marginLeft = 40;
      contentStyle.marginRight = 40;
      contentStyle.marginBottom = 40;
      if (multiple) {
        if (currentPosition.indexOf(index) === -1) {
          contentStyle.display = 'none';
        }
        fontAwesome = <FontAwesome>{(currentPosition.indexOf(index) !== -1) ? Icons.chevronUp : Icons.chevronDown}</FontAwesome>;
      } else {
        if (currentPosition !== index) {
          contentStyle.display = 'none';
        }
        fontAwesome = <FontAwesome>{(currentPosition == index) ? Icons.chevronUp : Icons.chevronDown}</FontAwesome>;
      }
      if (this.props.children.length -1 === index) {
        containerStyle.marginBottom = -3;
        contentStyle.marginTop = 40;
      } else {
        containerStyle.marginBottom = 30;
        contentStyle.marginTop = 10;
      }
      containerStyle.flexDirection = 'row';
      containerStyle.marginTop = -3;
      // We need to return the corresponding mapping for each item too.
      return (
        <View key={item.props.title} style={styles.content}>
          <View style={containerStyle}>
            <View style={[styles.innerCircle, {backgroundColor: circleBgColor}]}></View>
            <TouchableOpacity onPress={this.onPressChange.bind(this, index)} style={styles.touchableContainer}>
              <View>
                <Text style={textStyle}>
                  {item.props.title}
                </Text>
              </View>
              <View style={styles.iconContainer} >
                <Text>
                  { fontAwesome }
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.borderLeftStyle}>{this.dashedBorder()}</View>
          <View style={contentStyle}>{item}</View>
        </View>
      );
     });
    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          {contents}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 40,
    marginTop: 40,
    marginBottom: 40,
  },
  borderLeftStyle: {
    position: 'absolute',
    overflow: 'hidden',
    top: 16,
    bottom: 0,
    right: '99.99%',
  },
  content: {
    position: 'relative', 
    borderStyle: 'dashed',
  },
  touchableContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  headerText: {
    alignItems: 'flex-start',
    borderRadius: 1,
    marginTop: 10,
  },
  iconContainer: {
    marginTop: 5,
    marginLeft: 15,
  },
  innerCircle: {
    borderRadius: 4.5,
    width: 9,
    height: 9,
    position: 'absolute',
    top: 6,
    marginLeft: -6,
  },
  title: {
    fontSize: 18,
  },
});

ReactSteps.propTypes = {
  multiple: PropTypes.bool,
  currentPosition: PropTypes.oneOfType([
    PropTypes.Array,
    PropTypes.number
  ])
};