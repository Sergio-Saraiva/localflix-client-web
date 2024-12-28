import { FC, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";



export const PlayerPage: FC = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [videoUrl, setVideoUrl] = useState<string | null>(null)
    const [videoSize, setVideoSize] = useState<number | null>(null)
    const [subtitlesUrl, setSubtitlesUrl] = useState<string | null>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const chunkSize = 300 * 1024 * 1024; // 300 MB

    const [searchParams] = useSearchParams()

    const fileName = searchParams.get('file_name')
    const folderId = searchParams.get('folder_id')
    const subtitles = searchParams.get('subtitles_url')
    const thumbnailUrl = searchParams.get('thumbnail_url')

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.onplay = () => setIsPlaying(true)
            videoRef.current.onpause = () => setIsPlaying(false)
        }
    }, [videoRef])

    const fetchVideo = async (url: string) => {
        const response = await fetch(url);

    }

    useEffect(() => {
        if(videoUrl) {
            const result =
        }
    }, [videoUrl])
    
    

    useEffect(() => {
        if (subtitles) {
            const url = new URL(subtitles);
            const path = url.pathname.split('/').slice(2).join('/');
            console.log(path)
            setSubtitlesUrl(`/subtitles/${path}`);
        }
    }, [subtitles])

    useEffect(() => {
        setVideoUrl(`http://192.168.1.195:3001/stream/${folderId}/${fileName}`)
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
             <video ref={videoRef} className="w-full h-full" controls autoPlay>
                Your browser does not support the video tag.
            </video>
            {/* <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 text-white p-2 flex justify-between items-center">
            <Button variant="ghost" size="icon" onClick={togglePlay}>
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMute}>
                {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                <Maximize className="h-6 w-6" />
            </Button>
            </div> */}
        </div>
        </div>
    )
}