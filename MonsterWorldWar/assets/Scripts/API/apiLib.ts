import JSLib = require('./JSLib.js');

export default class APILib {

    static APINetwork(){
        return JSLib.APINetwork();
    }
    static APIOs() {
        return JSLib.APIOs();
    }

    static APIOpenURL() {
        JSLib.APIOpenUrl();
    }

    static APIEnd() {
        JSLib.APIEnd();
    }

    static APIRetry() {
        JSLib.APIRetry();
    }

    static APIGetScreenSize() {
        return JSLib.APIGetScreenSize();
    }

    static APIGetVolumn() {
        return JSLib.APIGetVolumn();
    }

    static APICallIsReady(callbackFocus, callbackBlur) {
        JSLib.APICallIsReady(callbackFocus, callbackBlur);
    }

    static APICallChangeVolumn(callback) {
        JSLib.APICallChangeVolumn(callback);
    }
    
    static APICallResizeScreen(callback) {
        JSLib.APICallResizeScreen(callback);
    }

}

export enum Network{
    googleAds = 'googleads',
    unity = 'unity',
    applovin = 'applovin',
    mintegral = 'mintegral',
    ironsource = 'ironsource',
    tiktok = 'tiktok',
    vungle = 'vungle',
    pc = 'default'
}
export enum Os{
    pc = 'default',
    android = 'android',
    ios = 'ios'
}