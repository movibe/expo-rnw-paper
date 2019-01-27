import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import {
  Headline,
  Caption,
  withTheme,
  type Theme, Paragraph,
} from 'react-native-paper'
import { connect } from 'react-redux'
import isEqual from 'lodash.isequal'

import config from '@src/config'
import store from '@src/store'

import Linking from '@src/Linking'

type Props = {
    theme: Theme,
}

class Splash extends React.Component<Props> {
    componentDidUpdate(prevProps) {
        console.log(this.props.App)
        if (!isEqual(this.props.App, prevProps.App)) {
            if(!this.isAppDataValid()) {
                this.getValidData()
            } else {
                this.props.onValidAppData()
            }
        }
    }

    isAppDataValid () {
        return (this.props.App.hasOwnProperty('deviceToken') && this.props.App.deviceToken && this.props.App.hasOwnProperty('bundleid') && this.props.App.bundleid)
    }

    async getValidData () {
        console.log('getting valid data from Splash')
        if(Platform.OS !== 'ios') {
            this.state.message = config.constants.messages.IOS_TOKEN_UNAVAILABLE
        } else {
            Linking.requestConnectionDetails()
        }
    }
    
    render() {
        const {
            theme: {
                colors: { background },
            },
        } = this.props

        return (<View>
            <Headline>Third-Party-Demo</Headline>
            <Caption>...splash screen...</Caption>
            <Paragraph>{ this.props.message || '' }</Paragraph>
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
  
export default connect(store => ({ App: store.App }))(withTheme(Splash))
  