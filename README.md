# UragonTv
### Watch live TV channels, movies and TV shows online for free - on mobile and Android TV!

![UragonTv](src/screens/assets/logo.png)


UragonTv is an OTT platform to watch or stream live TV channels, the latest Movies and TV Shows
including animes. And it is absolutely free. (The project was previously called Ethrex.)


## Features

- Movies
- Shows
- Anime
- **Live TV channels** (news, science, sport) with an HLS player
- **Android TV**: leanback layout with D-pad / remote navigation
- **Mobile**: bottom navigation and touch layout
- Like your favourite show or movie
- Comment on any movie or show
- Open Source

## Content sources

- **Movies and shows** come from the bundled catalogue in `src/data/catalog.ts`: public-domain
  films and TV episodes streamed from the Internet Archive. The app still tries the original
  `ethrex-watch` Firestore catalogue first, so restoring that project needs no code change.
- **Live channels** live in `src/data/channels.ts`. Every entry is an official free-to-watch
  HLS stream; add any working `.m3u8` URL there and it shows up in the app.



## Tech

UragonTv is built with multiple techs

- [React Js](https://reactjs.org/) - React Js for making web app!
- [Firebase](https://firebase.google.com/) - Document based backend 
- [Redux](https://redux.js.org/) - Storing local states
- [node.js] 
- [Sass]
- [TypeScript](https://www.typescriptlang.org/) - for performance programming



## Installation

UragonTv requires node to run the project. 
Install the dependencies and devDependencies and start the server.

```sh
cd UragonTv
npm install
npm start
```

Append `?tv=1` to any URL to preview the Android TV layout in a desktop browser, or `?tv=0`
to force the phone/web layout back on.

## Android: mobile and Android TV

The same project builds one APK that runs on phones, tablets and Android TV — the manifest
declares `LEANBACK_LAUNCHER`, drops the touchscreen requirement and ships a TV banner.

Requirements: Node 18+, JDK 21 (Capacitor 8 does not build on older JDKs) and the Android
SDK (Android Studio ships both, or install them separately).

```sh
npm install
npm run android:sync   # builds the web app and copies it into android/

# then either open Android Studio:
npx cap open android

# or build from the command line:
cd android
./gradlew assembleDebug     # -> android/app/build/outputs/apk/debug/app-debug.apk
```

Install on a device or TV with `adb install app-debug.apk`, or sideload it from a USB stick.
For the Play Store, sign a release build with `./gradlew assembleRelease`.

After changing web code, run `npm run android:sync` again before rebuilding.


### It is a open source project. Feel free to contribute !

