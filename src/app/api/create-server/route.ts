import { db } from '@/config/db'
import { NextRequest, NextResponse } from 'next/server'
import {
    errorMessage,
    serverIdMinLength,
    serverNameMinLength,
    successMessage
} from './utils'

export interface NewServerData {
    serverName: string
    serverId: string
    serverDescription: string | null
    ownerId: string
}

export interface ServerApiResponse {
    status: 201 | 200 | 403
    message: string
    result: 'error' | 'success'
    serverId?: string
}

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as NewServerData
        const { serverName, serverId, serverDescription, ownerId } = body

        if (serverName.length < serverNameMinLength) throw new Error()
        if (serverId.length < serverIdMinLength) throw new Error()

        const newServer = await db.server.create({
            data: {
                id: serverId,
                name: serverName,
                description: serverDescription ? serverDescription : null,
                admins: {
                    connect: {
                        id: ownerId
                    }
                },
                members: {
                    connect: {
                        id: ownerId
                    }
                },
                UserServerRole: {
                    create: {
                        user: {
                            connect: {
                                id: ownerId
                            }
                        },
                        role: 'OWNER'
                    }
                }
            }
        })
        console.log(newServer)

        return NextResponse.json<ServerApiResponse>({
            status: 201,
            message: successMessage,
            result: 'success',
            serverId: newServer.id
        })
    } catch (error) {
        console.log('ERROR: ', error)
        return NextResponse.json<ServerApiResponse>({
            status: 403,
            message: errorMessage,
            result: 'error'
        })
    }
}
