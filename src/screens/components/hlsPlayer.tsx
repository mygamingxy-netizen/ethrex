import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

type Props = {
    src: string;
    poster?: string;
    className?: string;
};

// Plays a live HLS stream: native HLS where the platform provides it (Android WebView,
// Safari), hls.js everywhere else, and a readable failure when neither is possible.
export default function HlsPlayer({ src, poster, className }: Props) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [failed, setFailed] = useState<string>('');

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        let hls: Hls | null = null;
        let cancelled = false;

        const fail = (message: string) => {
            if (cancelled) return;
            setFailed(message);
        };

        const tryPlay = () => {
            const attempt = video.play();
            if (attempt && typeof attempt.catch === 'function') {
                attempt.catch(() => { /* autoplay blocked: the controls remain available */ });
            }
        };

        if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = src;
            video.addEventListener('loadedmetadata', tryPlay, { once: true });
            video.addEventListener('error', () => fail('This channel is not responding right now.'), { once: true });
        } else if (Hls.isSupported()) {
            hls = new Hls({ enableWorker: true, lowLatencyMode: true, manifestLoadingTimeOut: 15000 });
            hls.loadSource(src);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, tryPlay);
            hls.on(Hls.Events.ERROR, (_event, data) => {
                if (!data.fatal) return;
                if (data.type === Hls.ErrorTypes.NETWORK_ERROR) hls && hls.startLoad();
                else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) hls && hls.recoverMediaError();
                else fail('This channel is not responding right now.');
            });
        } else {
            fail('Live streaming is not supported on this device.');
        }

        return () => {
            cancelled = true;
            if (hls) hls.destroy();
            video.removeEventListener('loadedmetadata', tryPlay);
            video.removeAttribute('src');
            video.load();
        };
    }, [src]);

    return (
        <div className={`base-flex hls-holder ${className || ''}`}>
            <video
                ref={videoRef}
                className="hls-video"
                poster={poster}
                controls
                playsInline
                autoPlay
                muted={false}
            />
            {failed &&
                <div className="base-flex hls-error">
                    <h4>{failed}</h4>
                    <p>The broadcaster may be offline or unreachable from this network.</p>
                </div>
            }
        </div>
    );
}
