import { projectFirestore } from '../firebase/config';
import { localBanners, localMedia, findLocalMedia, MediaItem, BannerItem } from './catalog';

// The original catalogue lived in the `ethrex-watch` Firestore project, which no longer
// answers (403 CONSUMER_INVALID). Reads try the remote catalogue first and fall back to
// the bundled one, so restoring that project later needs no code change here.

export type MediaResult = { item: MediaItem; remote: boolean };

const REMOTE_TIMEOUT_MS = 5000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    return Promise.race([
        promise,
        new Promise<T>((_, reject) => setTimeout(() => reject(new Error('timed out')), ms)),
    ]);
}

function normalise(docId: string, data: any): MediaItem {
    return {
        mediaId: data.mediaId || docId,
        mediaName: data.mediaName || 'Untitled',
        mediaType: data.mediaType === 'Show' ? 'Show' : 'Movie',
        mediaGenre: data.mediaGenre || 'Drama',
        mediaStar: Number(data.mediaStar) || 0,
        mediaBio: data.mediaBio || '',
        mediaPic: data.mediaPic || '',
        mediaVideo: String(data.mediaVideo || '').replace(/"/g, ''),
        mediaSeaon: data.mediaSeaon || '1',
        trending: data.trending === true,
        mediaLikes: Array.isArray(data.mediaLikes) ? data.mediaLikes : [],
        mediaComments: Array.isArray(data.mediaComments) ? data.mediaComments : [],
    };
}

export async function getMediaList(): Promise<MediaItem[]> {
    try {
        const snapshot = await withTimeout(projectFirestore.collection('mediaList').get(), REMOTE_TIMEOUT_MS);
        const remote = snapshot.docs.map((doc) => normalise(doc.id, doc.data()));
        if (remote.length) return remote;
    } catch (err) {
        // Remote catalogue unavailable - the bundled one takes over.
    }
    return localMedia;
}

export async function getMedia(docId: string): Promise<MediaResult> {
    try {
        const doc = await withTimeout(projectFirestore.collection('mediaList').doc(docId).get(), REMOTE_TIMEOUT_MS);
        if (doc.exists) return { item: normalise(doc.id, doc.data()), remote: true };
    } catch (err) {
        // Remote document unavailable - fall through to the bundled catalogue.
    }
    const local = findLocalMedia(docId);
    if (local) return { item: local, remote: false };
    throw new Error(`Media "${docId}" was not found.`);
}

export async function getBanner(mode: string): Promise<BannerItem | undefined> {
    const docId = mode !== 'home' ? (mode === 'Show' ? 'showBanner' : 'movieBanner') : 'homeBanner';
    try {
        const doc = await withTimeout(projectFirestore.collection('mediaBanners').doc(docId).get(), REMOTE_TIMEOUT_MS);
        const data: any = doc.exists ? doc.data() : undefined;
        if (data && data.showPic && data.showName) {
            const season = String(data.showSeason || '').trim();
            return {
                showPic: data.showPic,
                showName: data.showName,
                showStars: Number(data.showStars) || 0,
                showYear: String(data.showYear || ''),
                showSeason: season ? (/^\d+$/.test(season) ? `Season ${season}` : season) : '',
                showBio: data.showBio || '',
                showRedirect: data.showRedirect || '',
                showId: data.showId || '',
            };
        }
    } catch (err) {
        // Remote banner unavailable - fall through to the bundled one.
    }
    return localBanners[docId];
}
