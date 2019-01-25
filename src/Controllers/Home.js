/* @flow */

import React from 'react'
import { View, StyleSheet } from 'react-native'
import {
  TouchableRipple,
  Button,
  Chip,
  Text,
  TextInput,
  Caption,
  Headline,
  Paragraph,
  withTheme,
  type Theme,
} from 'react-native-paper'

type Props = {
  theme: Theme,
};

class TextExample extends React.Component<Props> {
  state = { 
    uid: null ,
    uidInput: null,
    metric: null
  }

  render() {
    const {
      theme: {
        colors: { background },
      },
    } = this.props

    const uid = this.state.uid 
      ? <Chip icon="account-circle" onClose={e => this.setState({ uid: null })}>{this.state.uid}</Chip>
      : (<View>
        <TextInput label='uid' value={this.state.uid} onChangeText={uid => this.setState({ uidInput: uid })} />
        
        <TouchableRipple rippleColor="rgba(0, 0, 0, .32)">
        <View><Text>test</Text></View>
        </TouchableRipple>
      </View>)

    return (
      <View style={[styles.container, { backgroundColor: background }]}>
        <Headline style={styles.text}>Third Party Demo</Headline>

        <Caption style={styles.text}>description</Caption>
        <Paragraph style={styles.text}>Give yourself a metric. Optionally, also provide a uid to do it with. It should show up in the firestore.</Paragraph>

        <Caption style={styles.text}>uid</Caption>
        {uid}

        <Caption style={styles.text}>metric</Caption>
        <TextInput label='number' value={this.state.metric} onChangeText={this.onChangeMetric} />
        
        <TouchableRipple rippleColor="rgba(0, 0, 0, .32)">
          <Button icon="gavel" mode="contained" dark={true} compact={true} disabled={!(this.state.uid && this.isValidMetric())} onPress={this.onCommitMetric}>
          send metric
          </Button>
        </TouchableRipple>
      </View>
    )
  }

  onCommitUid = () => {
    this.setState({ uid: this.state.uidInput, uidInput: null })
  }

  isValidMetric = (metric = this.state.metric) => {
    const n = +metric
    return !isNaN(n) && n >= 0 && n <= 1
  }

  onChangeMetric = metric => {
    if(this.isValidMetric(metric)) {
      this.setState({ metric })
    } else if((this.state.metric === null || this.state.metric.length === 0) && this.isValidMetric('0.' + metric)) {
        this.setState({ metric: '0.' + metric })
    }
  }

  onCommitMetric = () => {}
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  text: {
    marginVertical: 4,
  },
})

export default withTheme(TextExample)

/*import React from 'react'
import { Platform } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'

export default class Home extends React.Component {
    render() {
        return (
            <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Running on { Platform.OS }</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})*/
  