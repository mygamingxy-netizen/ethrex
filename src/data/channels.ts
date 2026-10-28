// Live channels.
//
// Every URL below was checked to answer with a valid HLS playlist (#EXTM3U). They are the
// official free-to-watch streams of the broadcasters listed, and the list is plain data:
// add an entry with any working .m3u8 and it appears in the app automatically.

export type ChannelGroup = 'News' | 'Science & Space' | 'Sport';

export type Channel = {
    id: string;
    name: string;
    group: ChannelGroup;
    url: string;
    color: string;
    country: string;
    blurb: string;
};

export const channelGroups: ChannelGroup[] = ['News', 'Science & Space', 'Sport'];

export const channels: Channel[] = [
    {
        id: 'f24-en',
        name: 'France 24 English',
        group: 'News',
        url: 'https://static.france24.com/live/F24_EN_LO_HLS/live_web.m3u8',
        color: '#0066cc',
        country: 'FR',
        blurb: 'International news, live from Paris.',
    },
    {
        id: 'f24-fr',
        name: 'France 24 Français',
        group: 'News',
        url: 'https://static.france24.com/live/F24_FR_LO_HLS/live_web.m3u8',
        color: '#1b4f9c',
        country: 'FR',
        blurb: 'Le direct de France 24, en français.',
    },
    {
        id: 'f24-es',
        name: 'France 24 Español',
        group: 'News',
        url: 'https://static.france24.com/live/F24_ES_LO_HLS/live_web.m3u8',
        color: '#c8102e',
        country: 'ES',
        blurb: 'Actualidad internacional en español.',
    },
    {
        id: 'dw-en',
        name: 'DW News',
        group: 'News',
        url: 'https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/index.m3u8',
        color: '#0066b3',
        country: 'DE',
        blurb: 'German broadcaster, world news around the clock.',
    },
    {
        id: 'bloomberg',
        name: 'Bloomberg TV',
        group: 'News',
        url: 'https://bloomberg.com/media-manifest/streams/us.m3u8',
        color: '#000000',
        country: 'US',
        blurb: 'Markets, business and the economy live.',
    },
    {
        id: 'arirang',
        name: 'Arirang TV',
        group: 'News',
        url: 'https://amdlive-ch01-ctnd-com.akamaized.net/arirang_1ch/smil:arirang_1ch.smil/playlist.m3u8',
        color: '#d4001a',
        country: 'KR',
        blurb: "South Korea's English-language international channel.",
    },
    {
        id: 'nasa-public',
        name: 'NASA TV Public',
        group: 'Science & Space',
        url: 'https://ntv1.akamaized.net/hls/live/2014075/NASA-NTV1-HLS/master.m3u8',
        color: '#0b3d91',
        country: 'US',
        blurb: "NASA's public channel: launches, briefings and mission coverage.",
    },
    {
        id: 'nasa-media',
        name: 'NASA TV Media',
        group: 'Science & Space',
        url: 'https://ntv2.akamaized.net/hls/live/2013923/NASA-NTV2-HLS/master.m3u8',
        color: '#fc3d21',
        country: 'US',
        blurb: 'Raw feeds and media feeds from the agency.',
    },
    {
        id: 'redbull',
        name: 'Red Bull TV',
        group: 'Sport',
        url: 'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8',
        color: '#0b1e5b',
        country: 'AT',
        blurb: 'Adventure sport, live events and documentaries.',
    },
];

export function channelById(id: string): Channel | undefined {
    return channels.find((channel) => channel.id === id);
}
