import { useState } from 'react';
import { useHistory } from 'react-router';
import NavBar from './components/navbar';
import { channels, channelGroups, Channel } from '../data/channels';

export default function LiveScreen() {
    const [group, setGroup] = useState<string>('All');
    const history = useHistory();

    const visible = group === 'All' ? channels : channels.filter((item) => item.group === group);

    const openChannel = (channel: Channel) => {
        history.push({ pathname: '/channel', state: { channelId: channel.id } });
    };

    const initials = (name: string) =>
        name.split(' ').slice(0, 2).map((word) => word.charAt(0)).join('').toUpperCase();

    const groups = ['All', ...channelGroups];

    return (
        <>
            <div className="base-flex main-body live-screen">
                <NavBar mode="Live" />

                <div className="base-flex live-head">
                    <h1>Live TV</h1>
                    <p>{channels.length} free-to-air channels streaming right now</p>
                </div>

                <div className="base-flex group-row" role="tablist" aria-label="Channel groups">
                    {groups.map((item) => (
                        <button
                            key={item}
                            type="button"
                            role="tab"
                            aria-selected={group === item}
                            className={`group-chip ${group === item ? 'group-active' : ''}`}
                            onClick={() => setGroup(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <div className="channel-grid">
                    {visible.map((channel) => (
                        <a
                            key={channel.id}
                            className="channel-card"
                            onClick={() => openChannel(channel)}
                            onKeyPress={(e: any) => { if (e.key === 'Enter') openChannel(channel); }}
                            tabIndex={0}
                        >
                            <span className="channel-logo" style={{ backgroundColor: channel.color }}>
                                {initials(channel.name)}
                            </span>
                            <div className="channel-meta">
                                <h3>{channel.name}</h3>
                                <span className="channel-group">{channel.group} · {channel.country}</span>
                                <p>{channel.blurb}</p>
                            </div>
                            <span className="live-dot">LIVE</span>
                        </a>
                    ))}
                </div>

                {visible.length === 0 &&
                    <div className="notification-plate"><h4>No channels in this group yet.</h4></div>
                }
            </div>
        </>
    );
}
