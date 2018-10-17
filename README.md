# rna-steps

React-Native steps component.

## Installation and Basic Usage

```bash
npm install --save rna-steps
```

```jsx
import ReactSteps, { Step } from 'rna-steps';

// Based upon values given in the array the corresponding index Step component will be expanded.  

state = {
    currentPositions: [0, 2]
}

componentWillMount() {
    Step(this.props)
}

// Handling currentPositions based on onPress event
handleChange = (value) => {
    this.setState({currentPositions: value})
}

<ReactSteps currentPositions={this.state.currentPositions} onHandleChange={this.handleChange}>
    <Step title="First">
        <Text>Hello</Text>
        <Text>World</Text>
    </Step>
    <Step title="Second">
        <TextInput style={{height: 40}} placeholder="Something Type here"/>
    </Step>
    <Step title="Third">
        <Text>Some text goes here</Text>
    </Step>
</ReactSteps>
```

## Development for environments 
### For Android
```bash
react-native run-android
```

### For Ios
```bash
react-native run-ios
```

> Inspired by [24ark/react-native-step-indicator](https://github.com/24ark/react-native-step-indicator) &