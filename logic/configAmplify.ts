import Amplify from '@aws-amplify/core'
import AmplifyAuth from '@aws-amplify/auth'
import AmplifyStorage from '@aws-amplify/storage'

import {
    awsRegion,
    identityPoolId,
    userPoolId,
    userPoolWebClientId,
    uploadBucket,
} from 'logic/envVars'

Amplify.configure({
    Auth: {
        // cookieStorage: {
        //     domain: string;
        //     path?: string;
        //     expires?: number;
        //     secure?: boolean;
        // },
        region: awsRegion,
        identityPoolId,
        userPoolId,
        userPoolWebClientId,
        authenticationFlowType: 'CUSTOM_AUTH',
    },
    Storage: {
        AWSS3: {
            bucket: uploadBucket,
            region: awsRegion,
        },
    },
})

export const Storage = AmplifyStorage
export const Auth = AmplifyAuth
