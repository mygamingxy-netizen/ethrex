// Bundled catalogue of free, public-domain films and television episodes.
//
// The original catalogue lived in the `ethrex-watch` Firestore project, which is
// no longer available (the API answers 403 CONSUMER_INVALID). This file keeps the app
// fully working offline of that project: every entry below is a public-domain work
// streamed from the Internet Archive, and every URL was checked to answer successfully.

export type MediaComment = { comment: string; commentAuthor: string };
export type MediaLike = { user: string };

export type MediaItem = {
    mediaId: string;
    mediaName: string;
    mediaType: 'Movie' | 'Show';
    mediaGenre: string;
    mediaStar: number;
    mediaBio: string;
    mediaPic: string;
    mediaVideo: string;
    mediaSeaon: string;
    trending: boolean;
    mediaLikes: MediaLike[];
    mediaComments: MediaComment[];
};

const poster = (id: string) => `https://archive.org/services/img/${id}`;
const video = (id: string, file: string) => `https://archive.org/download/${id}/${file}`;

type Seed = [
    id: string,           // archive.org identifier
    name: string,
    type: 'Movie' | 'Show',
    genre: string,
    star: number,
    year: number,
    season: string,
    file: string,
    trending: boolean,
    bio: string
];

const seeds: Seed[] = [
    ['house_on_haunted_hill_ipod', 'House on Haunted Hill', 'Movie', 'Horror', 4.2, 1959, '1.5',
        'house_on_haunted_hill.mp4', true,
        'A millionaire offers a group of strangers a fortune to spend one night in a haunted house. William Castle\'s legendary chiller.'],
    ['CarnivalofSouls', 'Carnival of Souls', 'Movie', 'Horror', 4.1, 1962, '1.5',
        'CarnivalOfSouls_512kb.mp4', true,
        'A young organist survives a car plunge into a river, then finds herself drawn to an abandoned pavilion and a pale stranger who will not leave her be.'],
    ['teenagers_from_outerspace', 'Teenagers from Outer Space', 'Movie', 'Sci-fi|Horror', 3.4, 1959, '1.2',
        'Teenagers_from_Outer_Space.mp4', false,
        'Alien youths land on Earth to raise grazing monsters, but one defector tries to warn a local student before the herd finishes the planet.'],
    ['ThePhantomCreeps', 'The Phantom Creeps', 'Movie', 'Sci-fi|Horror', 3.5, 1939, '1.1',
        'ThePhantomCreeps_512kb.mp4', false,
        'A mad scientist, his robot and a ring of invisibility pit themselves against the agents chasing him. Serial in twelve chapters, here in its opening reel.'],
    ['Killers_from_space', 'Killers from Space', 'Movie', 'Sci-fi', 3.4, 1954, '1.2',
        'Killers_from_space_512kb.mp4', false,
        'An atomic scientist is abducted by bug-eyed aliens who intend to stop human weapons testing by any means necessary.'],
    ['Phantom_Planet', 'The Phantom Planet', 'Movie', 'Sci-fi|Action', 3.3, 1961, '1.3',
        'The_Phantom_Planet_512kb.mp4', false,
        'Astronauts land on a tiny asteroid whose inhabitants can shrink themselves to the size of an inch and fight off lunar invaders.'],
    ['TheMostDangerousGame', 'The Most Dangerous Game', 'Movie', 'Action|Drama', 4.0, 1932, '1.1',
        'TheMostDangerousGame_512kb.mp4', true,
        'Shipwrecked on a private island, a big-game hunter discovers his host has grown bored of hunting animals.'],
    ['iron_mask', 'The Iron Mask', 'Movie', 'Action|Drama', 4.0, 1929, '1.6',
        'iron_mask_256kb.mp4', false,
        'D\'Artagnan races across France to save the twin heirs of the throne from a mask-wearing usurper. Douglas Fairbanks\' final swashbuckler.'],
    ['CaptainKidd_', 'Captain Kidd', 'Movie', 'Action|Drama', 3.5, 1945, '1.4',
        'CaptainKidd_512kb.mp4', false,
        'The pirate sails for the Indian Ocean with a brutal crew, a titled passenger and a conscience he cannot quite bury.'],
    ['his_girl_friday', 'His Girl Friday', 'Movie', 'Comedy|Drama', 4.3, 1940, '1.4',
        'his_girl_friday_512kb.mp4', true,
        'A newspaper editor will do anything to stop his star reporter and ex-wife from leaving the paper, including marrying her off to a rival.'],
    ['my_favorite_brunette', 'My Favorite Brunette', 'Movie', 'Comedy|Crime', 4.0, 1947, '1.4',
        'my_favorite_brunette_512kb.mp4', false,
        'A baby photographer is mistaken for a private eye and takes a case he is much too polite to refuse.'],
    ['ScarletStreet', 'Scarlet Street', 'Movie', 'Crime|Drama', 4.2, 1945, '1.7',
        'Scarlet_Street_512kb.mp4', true,
        'A meek cashier paints a woman he believes is a model, and the lie unravels into blackmail, murder and a courtroom.'],
    ['Detour', 'Detour', 'Movie', 'Crime|Drama', 4.1, 1945, '1.2',
        'Detour_512kb.mp4', true,
        'A hitchhiker hitching east to his girl takes a lift that goes badly wrong, and every mile after is payback.'],
    ['suddenly', 'Suddenly', 'Movie', 'Crime|Drama', 4.0, 1954, '1.5',
        'suddenly_512kb.mp4', false,
        'Three men take a small-town house opposite the railway station and wait for the president\'s train.'],
    ['TheStranger_0', 'The Stranger', 'Movie', 'Crime|Drama', 4.0, 1946, '1.5',
        'The_Stranger_512kb.mp4', false,
        'A war crimes investigator follows a trail of art and ceramics to a quiet New England town and a married schoolteacher.'],
    ['Cyrano_DeBergerac', 'Cyrano de Bergerac', 'Movie', 'Drama', 4.3, 1950, '2.1',
        'Cyrano_De_Bergerac_512kb.mp4', false,
        'The swordsman and poet who cannot say what he feels helps a handsome young soldier say it for him. José Ferrer in the title role.'],

    ['theloneranger_201705', 'The Lone Ranger: Finders Keepers', 'Show', 'Action|Drama', 4.0, 1949, '1',
        's01e13_finderskeepers.mp4', true,
        'The Ranger and Tonto ride into a swindle run on newcomers to the territory, and turn the con back on its operators.'],
    ['enter_the_lone_ranger', 'Enter the Lone Ranger', 'Show', 'Action', 3.9, 1949, '1',
        'enter_the_lone_ranger_512kb.mp4', false,
        'How the mask was taken up: the ambush that leaves John Reid the sole survivor of his posse, and the vow that follows.'],
    ['SherlockHolmes-TheCaseoftheShyBallerina', 'Sherlock Holmes: The Case of the Shy Ballerina', 'Show', 'Crime|Drama', 4.1, 1954, '1',
        'TheCaseoftheShyBallerina_512kb.mp4', true,
        'Napoleon Holmes takes a case from a ballerina who is being blackmailed, and finds the blackmailer closer to her than she knows.'],
    ['SherlockHolmes-TheCaseofLadyBeryl', 'Sherlock Holmes: The Case of Lady Beryl', 'Show', 'Crime|Drama', 4.0, 1954, '1',
        'TheCaseofLadyBeryl_512kb.mp4', false,
        'A lord vanishes from a locked drawing room and a lady insists on paying for the answer before Holmes asks the question.'],
    ['TheChristmasCarolastoldbyVincentPrice', 'A Christmas Carol, told by Vincent Price', 'Show', 'Drama|Horror', 4.2, 1949, '1',
        'TheChristmasCarolastoldbyVincentPrice_512kb.mp4', false,
        'Vincent Price narrates Dickens\' ghost story of a miser, three spirits and one night that rewrites a life.'],
    ['Cavalcade_Of_Stars', 'Cavalcade of Stars: The Honeymooners', 'Show', 'Comedy', 4.1, 1951, '1',
        'Honeymooners_1951.mp4', false,
        'Jackie Gleason fronts the variety hour with the sketch that grew into The Honeymooners: two flatmates with a scheme and a landlord.'],
];

export const localMedia: MediaItem[] = seeds.map((s) => ({
    mediaId: `${s[2]}.${s[0]}`,
    mediaName: s[1],
    mediaType: s[2],
    mediaGenre: s[3],
    mediaStar: s[4],
    mediaBio: s[9],
    mediaPic: poster(s[0]),
    mediaVideo: video(s[0], s[7]),
    mediaSeaon: s[6],
    trending: s[8],
    mediaLikes: [],
    mediaComments: [],
}));

// `Grid`/`Banner` build a watch route from a docId of the form "<Type>.<id>".
export function findLocalMedia(docId: string): MediaItem | undefined {
    return localMedia.find((item) => item.mediaId === docId);
}

export type BannerItem = {
    showPic: string;
    showName: string;
    showStars: number;
    showYear: string;
    showSeason: string;
    showBio: string;
    showRedirect: string;
    showId: string;
};

const bannerFrom = (docId: string): BannerItem => {
    const item = findLocalMedia(docId) as MediaItem;
    const seed = seeds.find((entry) => `${entry[2]}.${entry[0]}` === docId);
    return {
        showPic: item.mediaPic,
        showName: item.mediaName,
        showStars: item.mediaStar,
        showYear: seed ? String(seed[5]) : '',
        showSeason: item.mediaType === 'Movie' ? `${item.mediaSeaon} hrs` : `Season ${item.mediaSeaon}`,
        showBio: item.mediaBio,
        showRedirect: item.mediaId,
        showId: item.mediaId,
    };
};

export const localBanners: { [key: string]: BannerItem } = {
    homeBanner: bannerFrom('Movie.house_on_haunted_hill_ipod'),
    movieBanner: bannerFrom('Movie.Detour'),
    showBanner: bannerFrom('Show.SherlockHolmes-TheCaseoftheShyBallerina'),
};
