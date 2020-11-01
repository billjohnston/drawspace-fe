declare let process: {
    env: {
        NEXT_PUBLIC_APP_NAME: string
        NEXT_PUBLIC_STAGE: string
        NEXT_PUBLIC_AWS_REGION: string
        NEXT_PUBLIC_IDENTITY_POOL_ID: string
        NEXT_PUBLIC_USER_POOL_ID: string
        NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID: string
        NEXT_PUBLIC_API_HOST: string
        NEXT_PUBLIC_UPLOAD_BUCKET: string
    }
}

export const appName = process.env.NEXT_PUBLIC_APP_NAME

export const stage = process.env.NEXT_PUBLIC_STAGE

export const awsRegion = process.env.NEXT_PUBLIC_AWS_REGION

export const identityPoolId = process.env.NEXT_PUBLIC_IDENTITY_POOL_ID
export const userPoolId = process.env.NEXT_PUBLIC_USER_POOL_ID
export const userPoolWebClientId =
    process.env.NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID

export const uploadBucket = process.env.NEXT_PUBLIC_UPLOAD_BUCKET

export const apiHost = process.env.NEXT_PUBLIC_API_HOST
