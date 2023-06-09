'use client'

import { NadeAuthorNadeType } from '@/services/getServer'
import { AspectRatio } from '@/shad-components/aspect-ratio'
import { Badge } from '@/shad-components/badge'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/shad-components/dialog'
import { Maximize2 } from 'lucide-react'
import React from 'react'
import VideoPlayer from './video-player'

interface Props {
    nade: NadeAuthorNadeType
}

export default function NadeDialog({ nade }: Props) {
    return (
        <Dialog>
            <DialogTrigger>
                <Maximize2 className="w-5 text-muted-foreground" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="flex flex-col items-center gap-2">
                    <DialogTitle className="m-0 flex flex-col items-center gap-2 break-all">
                        {nade.title}
                    </DialogTitle>

                    <div className="flex flex-wrap items-center gap-2">
                        <Badge className="bg-dark text-muted-foreground">
                            {nade.nade_type_name}
                        </Badge>
                        <Badge className="bg-dark text-muted-foreground">
                            {nade.map_name}
                        </Badge>
                        <Badge className="bg-dark text-muted-foreground">
                            <p className="max-w-[9ch] overflow-hidden text-ellipsis whitespace-nowrap ">
                                {nade.author.name}
                            </p>
                        </Badge>
                    </div>
                </DialogHeader>
                {nade.description && (
                    <DialogDescription>{nade.description}</DialogDescription>
                )}

                <AspectRatio
                    ratio={16 / 9}
                    className="relative overflow-hidden"
                >
                    <div className="absolute left-0 top-0 aspect-video w-full rounded-[0.25rem] bg-black">
                        <VideoPlayer url={nade.video_url} />
                    </div>
                </AspectRatio>
            </DialogContent>
        </Dialog>
    )
}
