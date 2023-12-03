const JSLib = {
    // void Function: Use by call APIOpenUrl();
    APINetwork()
    {
        return window.adNetwork;
    },
    APIOs(){
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            return 'android';
        } else if (cc.sys.os == cc.sys.OS_IOS) {
            return 'ios';
        } else {
            return 'default';
        }
    },
    APIOpenUrl() {
        let clickTag = '';
        console.log('%c APICALL %c API OpenUrl : ', + window.adNetwork, 'background:darkslateblue;color:white', 'background:white;color:darkslateblue;');
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            clickTag = window.androidLink;
        } else if (cc.sys.os == cc.sys.OS_IOS) {
            clickTag = window.iosLink;
        } else {
            clickTag = window.defaultLink;
        }
        switch (window.adNetwork) {
            case 'applovin':
            case 'unity':
                mraid.open(clickTag);
                break;
            case 'facebook':
                FbPlayableAd.onCTAClick();
                break;
            case 'ironsource':
                dapi.openStoreUrl(clickTag);
                break;
            case 'mintegral':
                window.install && window.install();
                break;
            case 'tiktok':
                window.playableSDK.openAppStore();
                break;
            case 'vungle':
                parent.postMessage('download','*');
                break;
            default:
                window.open(clickTag);
        }
    },
    // same
    APIEnd() {
        console.log('%c APICALL %c API END : ' + window.adNetwork, 'background:darkslateblue;color:white', 'background:white;color:darkslateblue;');
        switch (window.adNetwork) {
            case 'mintegral':
                window.gameEnd && window.gameEnd();
                break;
            case 'vungle':
                parent.postMessage('complete','*');
                break;
            default:
                break;
        }
    },
    // same
    APIRetry() {
        console.log('%c APICALL %c API RETRY : ' + window.adNetwork, 'background:darkslateblue;color:white', 'background:white;color:darkslateblue;');
        switch (window.adNetwork) {
            case 'mintegral':
                window.gameRetry && window.gameRetry();
                break;
            default:
                break;
        }
    },
    // return Function.
    APIGetVolumn() {
        console.log('%c APICALL %c API Get Volumn : ' + window.adNetwork, 'background:darkslateblue;color:white', 'background:white;color:darkslateblue;');
        switch (window.adNetwork) {
            case 'ironsource':
                return dapi.getAudioVolume();
            default:
                return 1;
        }
    },
    // Function has callback. Check that game is ready 
    APICallIsReady(callbackFocus, callbackBlur) {
        console.log('%c APICALL %c API Call isREADY : ' + window.adNetwork, 'background:darkslateblue;color:white', 'background:white;color:darkslateblue;');
        switch (window.adNetwork) {
            case 'ironsource':
                console.log('%c APICALL %c check DAPI isready', 'background:darkslateblue;color:white', 'background:white;color:darkslateblue;');
                (dapi.isReady()) ? dapiOnReadyCallBack() : dapi.addEventListener("ready", dapiOnReadyCallBack);
                break;
            case 'unity':
            case 'applovin':
                console.log('%c APICALL %c MRAID check isready', 'background:darkslateblue;color:white', 'background:white;color:darkslateblue;');
                (mraid.getState() === 'loading') ? mraid.addEventListener('ready', mraidOnReadyCallBack) : mraidOnReadyCallBack();
                break;
            case 'mintegral':
                console.log('%c APICALL %c check Min isready', 'background:darkslateblue;color:white', 'background:white;color:darkslateblue;');
                window.gameReady && window.gameReady();
                defaultOnReadyCallBack();
                break;
            case 'tiktok':
                window.playableSDK.isViewable().then((viewable)=>{
                    if(viewable)
                    {
                        callbackFocus();
                    }
                    else
                    {
                        callbackBlur();
                    }
                });
                break;
            case 'vungle':
                console.log('%c APICALL %c check Vungle isready', 'background:darkslateblue;color:white', 'background:white;color:darkslateblue;');
                window.addEventListener('ad-event-pause',callbackBlur);
                window.addEventListener('ad-event-resume',callbackFocus);
                break;
            default:
                console.log('%c APICALL %c check default isready', 'background:darkslateblue;color:white', 'background:white;color:darkslateblue;');
                defaultOnReadyCallBack();
                break;
        }

        function dapiOnReadyCallBack() {
            dapi.removeEventListener('ready', dapiOnReadyCallBack);

            (dapi.isViewable())?callbackFocus():callbackBlur();

            dapi.addEventListener("viewableChange", dapiViewableChangeCallBack);

        }

        function dapiViewableChangeCallBack(viewable) {
            console.log('%c APICALL %c DAPI ViewableChange', 'background:darkslateblue;color:white', 'background:white;color:darkslateblue;');
            (viewable) ? callbackFocus() : callbackBlur();
        }

        function mraidOnReadyCallBack() {
            mraid.removeEventListener('ready', mraidOnReadyCallBack);
            (mraid.isViewable())?callbackFocus():callbackBlur();

            mraid.addEventListener('viewableChange', mraidViewableChangeCallBack);
        }

        function mraidViewableChangeCallBack(viewable) {
            console.log('%c APICALL %c MRAID ViewableChange', 'background:darkslateblue;color:white', 'background:white;color:darkslateblue;');
            (viewable) ? callbackFocus() : callbackBlur();
        }


        function defaultOnReadyCallBack() {
            console.log('%c APICALL %c DEFAULT ', 'background:darkslateblue;color:white', 'background:white;color:darkslateblue;');
            callbackFocus();
            defaultViewableChangeCallBack();
        }

        function defaultViewableChangeCallBack() {
            window.addEventListener('focus', () => {
                console.log('%c APICALL %c WINDOW event Focus', 'background:darkslateblue;color:white', 'background:white;color:darkslateblue;');
                callbackFocus();
            });
            window.addEventListener('blur', () => {
                console.log('%c APICALL %c WINDOW event Blur', 'background:darkslateblue;color:white', 'background:white;color:darkslateblue;');
                callbackBlur();
            });
        }
    },
    APICallChangeVolumn(callback) {
        console.log('%c APICALL %c API Change Volumn : ' + window.adNetwork, 'background:darkslateblue;color:white', 'background:white;color:darkslateblue;');
        switch (window.adNetwork) {
            case 'ironsource':
                dapi.addEventListener("audioVolumeChange", () => {
                    console.log('%c APICALL %c DAPI volumn change', 'background:darkslateblue;color:white', 'background:white;color:darkslateblue;');
                    callback();
                });
                break;
            default:
                window.addEventListener('volumechange', () => {
                    console.log('%c APICALL %c WINDOW volumn change', 'background:darkslateblue;color:white', 'background:white;color:darkslateblue;');
                    callback();
                });
                break;
        }
    },

    APIGetScreenSize() {
        console.log('%c APICALL %c API GetScreenSize : ' + window.adNetwork, 'background:darkslateblue;color:white', 'background:white;color:darkslateblue;');
        switch (window.adNetwork) {
            case 'ironsource':
                console.log('%c APICALL %c DAPI GetScreenSize', 'background:darkslateblue;color:white', 'background:white;color:darkslateblue;');
                return dapi.getScreenSize();
            case 'unity':
                console.log('%c APICALL %c MRAID GetScreenSize', 'background:darkslateblue;color:white', 'background:white;color:darkslateblue;');
                return mraid.getScreenSize();
            default:
                return {
                    width: cc.game.canvas.width, height: cc.game.canvas.height
                };
        }
    },
    APICallResizeScreen(callback) {
        console.log('%c APICALL %c API Resize Screen : ' + window.adNetwork, 'background:darkslateblue;color:white', 'background:white;color:darkslateblue;');
        switch (window.adNetwork) {
            case 'ironsource':
                console.log('%c APICALL %c DAPI', 'background:darkslateblue;color:white', 'background:white;color:darkslateblue;');
                dapi.addEventListener("adResized", callback);
                break;
            default:
                cc.view.setResizeCallback(() => {
                    console.log('%c APICALL %c cc.view.setResize', 'background:darkslateblue;color:white', 'background:white;color:darkslateblue;');
                    callback();
                });
                window.addEventListener('resize', () => {
                    console.log('%c APICALL %c addListener: Resize', 'background:darkslateblue;color:white', 'background:white;color:darkslateblue;');
                    callback();
                });
                window.addEventListener("orientationchange", () => {
                    console.log('%c APICALL %c addListener: OrientationChange', 'background:darkslateblue;color:white', 'background:white;color:darkslateblue;');
                    callback();
                });
        }
    }
}
export default JSLib;