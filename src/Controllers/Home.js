/* @flow */

import React from 'react'
import { View, StyleSheet } from 'react-native'
import {
  Button,
  Chip,
  TextInput,
  Caption,
  Headline,
  Paragraph,
  withTheme,
  type Theme,
} from 'react-native-paper'
import uuid from 'uuid/v4'

import db from '@src/Firebase'
import store from '@src/store'

type Props = {
  theme: Theme,
};

class TextExample extends React.Component<Props> {
  state = { 
    appid: uuid() ,
    appidInput: '',
    appName: '' ,
    appNameInput: '',
    uid: uuid() ,
    uidInput: '',
    metric: ''
  }

  render() {
    const {
      theme: {
        colors: { background },
      },
    } = this.props

    const uid = this.state.uid 
    ? <Chip icon="account-circle" onClose={e => this.setState({ uid: '' })}>{this.state.uid}</Chip>
    : this.factoryInput('uid', 'UID')

    const appid = this.state.appid 
      ? <Chip icon="apps" onClose={e => this.setState({ appid: '' })}>{this.state.appid}</Chip>
      : this.factoryInput('appid', 'app ID') 

    
    const appname = this.state.appName 
      ? <Chip icon="apps" onClose={e => this.setState({ appName: '' })}>{this.state.appName}</Chip>
      : this.factoryInput('appName', 'app name') 

    return (
      <View style={[styles.container, { backgroundColor: background }]}>
        <Headline style={styles.text}>Third Party Demo</Headline>

        <Caption style={styles.text}>description</Caption>
        <Paragraph style={styles.text}>Give yourself a metric. Optionally, also provide a uid to do it with. It should show up in the firestore.</Paragraph>

        <Caption style={styles.text}>uid</Caption>
        {uid}

        <Caption style={styles.text}>app id</Caption>
        {appid}

        <Caption style={styles.text}>app name</Caption>
        {appname}

        <Caption style={styles.text}>metric</Caption>
        <TextInput label='number' value={this.state.metric} onChangeText={this.onChangeMetric} />
        
        <Button icon="gavel" mode="contained" dark={true} compact={true} disabled={!(this.state.uid && this.state.appid && this.state.appName && this.isValidMetric())} onPress={this.onCommitMetric}>
        send metric
        </Button>
      </View>
    )
  }

  onCommitField = (where, e) => {
    const input = where + 'Input'

    this.setState({ [where]: this.state[input], [input]: '' })
  }

  onChangeMetric = metric => {
    if(this.isValidMetric(metric) ||  metric === '') {
      this.setState({ metric })
    } else if(this.state.metric === '' && this.isValidMetric('0.' + metric)) {
        this.setState({ metric: '0.' + metric })
    }
  }

  onCommitMetric = () => {
    let path = store.getState().Firebase.appData.path
    let payload = this.getAppTx({
      uid: this.state.uid,
      app_id: this.state.appid,
      app_name: this.state.appName,
      metric: +this.state.metric
    })

    db.collection(path + this.state.appName).add(payload)
  }

  /** helper method - generate a valid firebase payload for app metric data
   * TODO - refactor. This is a store executable
   */
  getAppTx = object => {
    object.date = this.getFirebaseDate()
    return object
  }

  /** helper method - generate a valud Date for firebse database
   * TODO - refactor. This is a store executable
   */
  getFirebaseDate = (date = new Date()) => date.toISOString().slice(0, 19).replace("T", " ")

  /** helper method that validates state.metric
   * TODO - refactor. This is arguably a store executable
   */
  isValidMetric = (metric = this.state.metric) => {
    const isString = typeof metric === 'string'
    const nonEmpty = isString && metric.length

    const n = +metric

    return isString && nonEmpty && !isNaN(n) && n >= 0 && n <= 1
  }

  /** helper method to toggle button for field submission */
  isFieldValid = field => {
    const input = field + 'Input'
    return typeof this.state[input] === 'string' && this.state[input].length > 0
  }

  /** render helper method - generate field inputs */
  factoryInput = (field, label) => {
    const input = field + 'Input'

    return (<View>
      <TextInput label={label} value={this.state[input]} onChangeText={item => this.setState({ [input]: item })} />
      
      <Button icon="account-box" mode="contained" dark={true} compact={true} disabled={!this.isFieldValid(field)} onPress={e => this.onCommitField(field, e)}>
      use {label}
      </Button>
    </View>)
  }
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
