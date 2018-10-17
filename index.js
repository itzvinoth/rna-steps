import React, {Component} from 'react';
import {StyleSheet, Animated, Text, View, SectionList, Alert, ScrollView, TouchableOpacity} from 'react-native';
import FontAwesome, { Icons } from "react-native-fontawesome";

export function Step(props) {
  return (
    <View>{props.children}</View>
  )
}

export default class ReactSteps extends React.Component {
  
  onPressChange = (index) => {
    let newPositions = this.props.currentPositions;
    let indexPosition = newPositions.indexOf(index);
    if (indexPosition === -1) {
        newPositions.push(index)
    } else {
        newPositions.splice(indexPosition, 1)
    }
    this.props.onHandleChange(newPositions);
  }

  render() {
    contents = this.props.children.map((item, index) => {
      const textStyle = {}, contentStyle = {}, containerStyle={};
      textStyle.fontSize = 18;
      textStyle.marginLeft = 20;
      textStyle.fontStyle = 'italic';
      textStyle.paddingRight = 30;
    //   contentStyle.margin = 40;
      contentStyle.marginLeft = 40;
      contentStyle.marginRight = 40;
      contentStyle.marginBottom = 40;
      if (this.props.currentPositions.indexOf(index) === -1) {
        contentStyle.display = 'none';
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
            <View style={styles.innerCircle}></View>
            <TouchableOpacity onPress={this.onPressChange.bind(this, index)} style={styles.touchableContainer}>
              <View>
                <Text style={textStyle}>
                  {item.props.title}
                </Text>
              </View>
              <View style={styles.iconContainer}>
                <Text>
                  <FontAwesome>{(this.props.currentPositions.indexOf(index) !== -1) ? Icons.chevronUp : Icons.chevronDown}</FontAwesome>
                </Text>
              </View>
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#F5FCFF',
    marginLeft: 40,
    marginTop: 40,
    marginBottom: 40,
  },
  content: {
    position: 'relative', 
    borderRadius: 1, 
    borderLeftColor: '#CCC',
    borderStyle: 'dashed', 
    borderLeftWidth: 1,
  },
  touchableContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  headerText: {
    alignItems: 'flex-start',
    borderRadius: 1,
    borderLeftWidth: 1,
    marginTop: 10,
  },
  iconContainer: {
    marginTop: 5,
    marginLeft: 15
  },
  innerCircle: {
    borderRadius: 5,
    width: 10,
    height: 10,
    backgroundColor: '#47b5dc',
    position: 'absolute',
    top: 6,
    marginLeft: -6,
  },
  title: {
    fontSize: 18,
  },
});
