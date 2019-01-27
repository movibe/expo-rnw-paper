export default {
    states: {
        app: {
            uid: '',
            appid: '',
            appName: 'third-party-demo',    
            deviceToken: '',
            bundleid: 'edu.harvard.csci-s65.Behavior-based-Notifications'
        },
        firebase: {
            appData: {           
                path: 'sampleData/apps/'
            }
        }
    },
    constants: {
        state: {
            app: {
                SET_APPDATA: 'SET_APPDATA'
            },
            firebase: {
                EDIT_APPDATA_PATH: 'EDIT_APPDATA_PATH'
            }
        },
        messages: {
            IOS_TOKEN_UNAVAILABLE: 'Token unavailable (must log in once on iOS to get your settings)'
        },
        urls: {
            connectionDetails: 'connectionDetails'
        }
    }
}