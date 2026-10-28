import type { CapacitorConfig } from '@capacitor/cli';

// Packages the built web app (npm run build -> build/) as a native Android application:
// one APK for phones/tablets and one for Android TV, from the same code base.
const config: CapacitorConfig = {
    appId: 'com.uragontv.app',
    appName: 'UragonTv',
    webDir: 'build',
    android: {
        allowMixedContent: false,
        webContentsDebuggingEnabled: false,
    },
};

export default config;
