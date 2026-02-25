"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

// Allowed media types
export const ALLOWED_VIDS_TYPES = ['.mov', '.mp4', '.avi', '.wmv'];
export const ALLOWED_IMGS_TYPES = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];

interface MediaHeroProps {
    src: string;
    className?: string;
    height?: string;
    rounded?: string;
}

const MediaHero = ({
    src,
    className = "",
    height = "h-[500px]",
    rounded = "rounded-3xl",
}: MediaHeroProps) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);

    // Detect if the src is a video
    const isVideo = useMemo(() => {
        if (!src) return false;
        const cleanSrc = src.split("?")[0].toLowerCase();
        return ALLOWED_VIDS_TYPES.some(ext => cleanSrc.endsWith(ext));
    }, [src]);

    // Detect if the src is an image
    const isImage = useMemo(() => {
        if (!src) return false;
        const cleanSrc = src.split("?")[0].toLowerCase();
        return ALLOWED_IMGS_TYPES.some(ext => cleanSrc.endsWith(ext));
    }, [src]);

    useEffect(() => {
        if (videoRef.current && isVideo) {
            videoRef.current
                .play()
                .then(() => setVideoLoaded(true))
                .catch(() => setHasError(true));
        }
    }, [src, isVideo]);

    const togglePlay = () => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play().catch(() => setHasError(true));
        }

        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        if (!videoRef.current) return;

        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    return (
        <section className={`w-full ${className}`}>
            <div className={`relative overflow-hidden ${rounded}`}>
                {/* Media */}
                {isVideo ? (
                    <video
                        ref={videoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={`w-full ${height} object-cover`}
                        onError={() => setHasError(true)}
                        onLoadedData={() => setVideoLoaded(true)}
                    >
                        <source src={src} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : isImage ? (
                    <div className={`relative w-full ${height}`}>
                        <Image
                            src={src}
                            alt="hero-media"
                            fill
                            className="object-cover"
                            onError={() => setHasError(true)}
                            sizes="(max-width: 768px) 100vw, 100vw"
                        />
                    </div>
                ) : (
                    <div className={`w-full ${height} flex items-center justify-center bg-gray-200`}>
                        <span className="text-gray-500">Unsupported media type</span>
                    </div>
                )}

                {/* Controls */}
                {isVideo && !hasError && (
                    <>
                        <div className="absolute bottom-6 left-6">
                            <button
                                onClick={togglePlay}
                                className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-md hover:scale-105 transition"
                            >
                                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                            </button>
                        </div>

                        <div className="absolute bottom-6 right-6">
                            <button
                                onClick={toggleMute}
                                className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-md hover:scale-105 transition"
                            >
                                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default MediaHero;