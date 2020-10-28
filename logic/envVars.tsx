declare let process: {
    env: {
        NEXT_PUBLIC_APP_NAME: string
        NEXT_PUBLIC_STAGE: string
        NEXT_PUBLIC_AWS_REGION: string
    }
}

export const appName = process.env.NEXT_PUBLIC_APP_NAME
export const stage = process.env.NEXT_PUBLIC_STAGE
export const awsRegion = process.env.NEXT_PUBLIC_AWS_REGION