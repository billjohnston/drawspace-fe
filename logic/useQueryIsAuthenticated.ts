import { Auth } from 'logic/configAmplify'
import { useQuery, QueryResult } from 'react-query'
import { userAuthenticated } from 'logic/utilQueryKeys'

const testSession = async (): Promise<boolean> => {
    try {
        await Auth.currentSession()
        return true
    } catch (e) {
        return false
    }
}

export default function useQueryIsAuthenticated(): QueryResult<boolean, never> {
    return useQuery<boolean, never>({
        queryKey: userAuthenticated,
        queryFn: testSession,
        config: {
            cache: Infinity,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        },
    })
}
