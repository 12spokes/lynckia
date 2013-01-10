/*global window, console, navigator*/

var Erizo = Erizo || {};

Erizo.sessionId = 103;

Erizo.Connection = function (spec) {
    "use strict";
    var that = {};

    spec.session_id = (Erizo.sessionId += 1);

    // Check which WebRTC Stack is installed.
    that.browser = "";

    if (typeof module !== 'undefined' && module.exports) {
        L.Logger.error('Publish/subscribe video/audio streams not supported in erizofc yet');
        that = Erizo.FcStack(spec);
    } else if (window.navigator.appVersion.match(/Chrome\/([\w\W]*?)\./)[1] === "23") {
        // Google Chrome Stable.
        console.log("Stable!");
        that = Erizo.ChromeStableStack(spec);
        that.browser = "chrome-stable";
    } else if (window.navigator.appVersion.match(/Chrome\/([\w\W]*?)\./)[1] === "26") {
        // Google Chrome Canary.
        console.log("Canary!");
        that = Erizo.ChromeCanaryStack(spec);
        that.browser = "chrome-canary";
    } else if (window.navigator.appVersion.match(/Bowser\/([\w\W]*?)\./)[1] === "26") {
        // Bowser
        that.browser = "bowser";
    } else if (window.navigator.appVersion.match(/Mozilla\/([\w\W]*?)\./)[1] === "26") {
        // Firefox
        that.browser = "mozilla";
    } else {
        // None.
        that.browser = "none";
        throw "WebRTC stack not available";
    }

    return that;
};

Erizo.GetUserMedia = function (config, callback) {
    "use strict";

    if (typeof module !== 'undefined' && module.exports) {
        L.Logger.error('Video/audio streams not supported in erizofc yet');
    } else {
        try {
            navigator.webkitGetUserMedia("audio, video", callback);
            console.log('GetUserMedia BOWSER');
        } catch (e) {
            navigator.webkitGetUserMedia(config, callback);
            console.log('GetUserMedia CHROME');
        }
    }
    

};
