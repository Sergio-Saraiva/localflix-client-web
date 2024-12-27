import { Button } from "@/components/ui/button";
import { Maximize, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const PlayerPage: FC = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [videoUrl, setVideoUrl] = useState<string | null>(null)
    const [subtitlesUrl, setSubtitlesUrl] = useState<string | null>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [searchParams] = useSearchParams()
    const fileName = searchParams.get('file_name')
    const folderId = searchParams.get('folder_id')
    const subtitles = searchParams.get('subtitles_url')
    const thumbnailUrl = searchParams.get('thumbnail_url')

    const togglePlay = () => {
        if (videoRef.current) {
        if (isPlaying) {
            videoRef.current.pause()
        } else {
            videoRef.current.play()
        }
        setIsPlaying(!isPlaying)
        }
    }

    const toggleMute = () => {
        if (videoRef.current) {
        videoRef.current.muted = !isMuted
        setIsMuted(!isMuted)
        }
    }

    const toggleFullscreen = () => {
        if (videoRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen()
            } else {
                videoRef.current.requestFullscreen()
            }
        }
    }

    useEffect(() => {
        if (subtitles) {
            const url = new URL(subtitles);
            const path = url.pathname.split('/').slice(2).join('/');
            console.log(path)
            setSubtitlesUrl(`/subtitles/${path}`);
        }
    }, [subtitles])

    useEffect(() => {
        const video = videoRef.current
        if (video) {
        const updatePlayState = () => setIsPlaying(!video.paused)
        video.addEventListener('play', updatePlayState)
        video.addEventListener('pause', updatePlayState)
        return () => {
            video.removeEventListener('play', updatePlayState)
            video.removeEventListener('pause', updatePlayState)
        }
        }
    }, [])

    useEffect(() => {
        setVideoUrl(`http://192.168.1.195:3000/stream/${folderId}/${fileName}`)
    }, [fileName, folderId])

    if (!videoUrl) {
        return <div className="container mx-auto px-4 py-8">No video URL provided</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">LocalFlix Player</h1>
        <div className="relative aspect-video bg-black">
            {!isPlaying && thumbnailUrl && (
            <img
                src={thumbnailUrl}
                alt="Video thumbnail"
                className="absolute inset-0 w-full h-full object-cover"
            />
            )}
            <video
                ref={videoRef}
                className="w-full h-full"
                src={videoUrl}
            >
                <track kind="subtitles" src={subtitlesUrl!} label="English" default />
                Your browser does not support the video tag.
            </video>
            <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 text-white p-2 flex justify-between items-center">
            <Button variant="ghost" size="icon" onClick={togglePlay}>
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMute}>
                {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                <Maximize className="h-6 w-6" />
            </Button>
            </div>
        </div>
        </div>
    )
}