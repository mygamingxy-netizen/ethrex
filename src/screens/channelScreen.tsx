import { useHistory } from 'react-router';
import { AiFillHome } from 'react-icons/ai';
import { FiChevronLeft, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import NavBar from './components/navbar';
import HlsPlayer from './components/hlsPlayer';
import { channelById, channels, Channel } from '../data/channels';

export default function ChannelScreen() {
    const history = useHistory();
    const routeData: any = history.location.state || {};
    const channel: Channel | undefined = channelById(routeData.channelId);
    const [current, setCurrent] = useState<Channel | undefined>(channel);
    const [muted, setMuted] = useState<boolean>(false);
    const videoHolder = useRef<HTMLDivElement>(null);

    useEffect(() => { if (!channel) history.replace({ pathname: '/live' }); }, [channel, history]);

    useEffect(() => { setMuted(false); }, [current]);

    if (!current) return null;

    const others = channels.filter((item) => item.id !== current.id);
    const toggleMute = () => {
        const video: any = videoHolder.current && videoHolder.current.querySelector('video');
        if (video) { video.muted = !video.muted; setMuted(video.muted); }
    };

    return (
        <div className="base-flex channel-screen">
            <NavBar mode="Live" />

            <div className="base-flex channel-head">
                <button type="button" className="back-btn" onClick={() => history.goBack()}>
                    <FiChevronLeft size={22} /> Channels
                </button>
                <span className="now-playing">
                    <i className="live-dot">LIVE</i> {current.name}
                </span>
                <div className="base-flex head-actions">
                    <button type="button" className="icon-btn" onClick={toggleMute} aria-label="Mute">
                        {muted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
                    </button>
                    <button type="button" className="icon-btn" aria-label="Home"
                        onClick={() => history.push({ pathname: '/' })}>
                        <AiFillHome size={20} />
                    </button>
                </div>
            </div>

            <div className="base-flex player-holder" ref={videoHolder}>
                <HlsPlayer key={current.id} src={current.url} className="channel-player" />
            </div>

            <div className="base-flex channel-about">
                <h2>{current.name}</h2>
                <span className="channel-group">{current.group} · {current.country}</span>
                <p>{current.blurb}</p>
            </div>

            <div className="base-flex more-channels">
                <h3>More channels</h3>
                <div className="channel-strip">
                    {others.map((item) => (
                        <a
                            key={item.id}
                            className="channel-chip"
                            tabIndex={0}
                            onClick={() => setCurrent(item)}
                            onKeyPress={(e: any) => { if (e.key === 'Enter') setCurrent(item); }}
                        >
                            <span className="channel-logo sm" style={{ backgroundColor: item.color }}>
                                {item.name.split(' ').slice(0, 2).map((w) => w.charAt(0)).join('').toUpperCase()}
                            </span>
                            <span className="channel-chip-name">{item.name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
