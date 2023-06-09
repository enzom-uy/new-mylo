'use client'

import Loader from '@/app/components/loader'
import NadeCard from '@/app/components/nade-card'
import NadeDialog from '@/app/components/nade-dialog'
import UserServerDataBadges from '@/app/components/user-server-data-badges'
import { useNadesData } from '@/hooks/useReduxNadeData'
import { loadNades, loadingNades } from '@/redux/features/nadesSlice'
import { useAppDispatch } from '@/redux/hooks'
import { NadeAuthorNadeType } from '@/services/getServer'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import ServerNadesInput from './server-nades-input'

interface Props {
    nades: NadeAuthorNadeType[]
    serverId: string
    userId: string
    isAdmin?: boolean
    showNadeStatus?: boolean
}

export default function ServerNades({
    serverId,
    userId,
    nades,
    isAdmin,
    showNadeStatus
}: Props) {
    const { reduxIsLoading, reduxNades } = useNadesData({ isAdmin, nades })
    const dispatch = useAppDispatch()

    const getNades = async (fetchedNades: NadeAuthorNadeType[]) => {
        dispatch(loadNades(fetchedNades))
    }
    console.log(!!reduxNades.length)

    return (
        <section className="flex w-full flex-col gap-2">
            <div className="mb-2 flex flex-wrap items-center gap-2">
                <h2 className="m-0 w-fit text-lg font-semibold uppercase">
                    granadas
                </h2>
                <UserServerDataBadges
                    nades={
                        !!reduxNades.length ? reduxNades.length : nades.length
                    }
                />
            </div>
            {nades.length !== 0 && (
                <ServerNadesInput
                    userId={userId}
                    serverId={serverId}
                    getNades={getNades}
                    isAdmin={isAdmin}
                    nades={isAdmin ? nades : undefined}
                />
            )}
            {reduxIsLoading && <Loader />}
            {!reduxIsLoading && !!reduxNades.length && (
                <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                    {reduxNades?.map((nade) => (
                        <div key={nade.id} className="flex w-full max-w-xs">
                            <NadeCard
                                nade={nade}
                                key={nade.id}
                                isAdmin={isAdmin}
                                showStatus={showNadeStatus}
                                userId={userId}
                            />
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}
