import { Subscription, UseDetails } from "@/type";
import { User } from "@supabase/auth-helpers-nextjs";
import { useSessionContext, 
    useUser as useSupaUser } from "@supabase/auth-helpers-react";
import { createContext, useContext, useEffect, useState } from "react";

type UseContextType = {
    accessToken: string | null;
    user: User | null;
    useDetails: UseDetails | null;
    isLoading: boolean;
    subscription: Subscription | null;
}

export const UseContext = createContext<UseContextType | undefined> (
    undefined
)

export interface Props {
    [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
    const {
        session,
        isLoading: isLoadingUser,
        supabaseClient: supabase
    } = useSessionContext()
    const user = useSupaUser()
    const accessToken = session?.access_token ?? null
    const [isLoadingData, setIsLoadingData] = useState(false)
    const [userDetails, setUserDetails] = useState<UseDetails | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);

    const getUserDetails = () => supabase.from('users').select('*').single()

    const getSubscription = () =>
        supabase.from('subscriptions').select('*, prices(*, products(*))')
        .in('status', ['trialing', 'active'])
        .single();
    
    useEffect(() => {
        if (user && !isLoadingData && !userDetails && !subscription) {
            setIsLoadingData(true)

            Promise.allSettled([getUserDetails(), getSubscription()]).then(
                (results) => {
                    const userDetailsPromise = results[0]
                    const subscriptionPromise = results[1]

                    if (userDetailsPromise.status === 'fulfilled') {
                        setUserDetails(userDetailsPromise.value.data as UseDetails)
                    }

                    if (subscriptionPromise.status === 'fulfilled') {
                        setSubscription(subscriptionPromise.value.data as Subscription)
                    }

                    setIsLoadingData(false)
                }
            )
        } else if (!user && !isLoadingUser && !isLoadingData) {
            setUserDetails(null)
            setSubscription(null)
        }
    },[user, isLoadingUser])

    const value = {
        accessToken,
        user,
        userDetails,
        subscription,
        isLoading: isLoadingUser || isLoadingData,
    }

    return <UseContext.Provider value={value} {...props} />
}

export const useUser = () => {
    const context = useContext(UseContext)

    if (context === undefined) {
        throw new Error(`useUser must be used within a UserProvider`)
    }
    return context
}