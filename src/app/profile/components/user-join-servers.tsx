'use client'

import { useToast } from '@/shad-components/use-toast'
import axios from 'axios'
import { RotateCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function UserJoinServers({
    access_token,
    id
}: {
    access_token: string
    id: string
}) {
    const [clicked, setClicked] = useState<boolean>(false)
    const router = useRouter()
    const { toast } = useToast()
    const handleClick = async () => {
        setClicked(true)
        const response = await axios
            .post('/api/join-servers', {
                access_token,
                id
            })
            .then((res) => res.data)
        console.log(response)
        setClicked(false)
        toast({ title: 'Se han actualizado tus servidores.' })
        setTimeout(() => {
            router.refresh()
        }, 500)
    }
    return (
        <button
            onClick={handleClick}
            className={`cursor-pointer ${clicked && 'animate-spin'}`}
        >
            <RotateCw className="w-5" />
        </button>
    )
}
