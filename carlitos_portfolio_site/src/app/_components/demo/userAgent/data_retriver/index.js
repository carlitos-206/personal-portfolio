// NPM imports
const parser = require('ua-parser-js');

export function UserData() {
    const ua = parser(navigator.userAgent);
    console.log('UA:', ua)
    let deviceType = null;
    let deviceModel = null;
    let deviceVendor = null;
    if (ua.device.model === undefined) {
        if (ua.os.name === 'Windows') {
            deviceType = 'Desktop';
            deviceModel = ' - ';
            deviceVendor = ' - ';
        }
        if (ua.os.name === undefined) {
            ua.os.name = ' - ';
            deviceType = ' - ';
            deviceModel = ' - ';
            deviceVendor = ' - ';
        }
    }
    if (ua.device.model !== undefined) {
        deviceType = ua.device.type;
        deviceModel = ua.device.model;
        deviceVendor = ua.device.vendor;
    }
    if(ua.cpu.architecture === undefined ){
        ua.cpu.architecture = " - ";
    }

  // This is the final object that is created that is sent to the front end via the Local Storage
    const userInfoTree = {
        device: {
            type: deviceType,
            model: deviceModel,
            vendor: deviceVendor,
            os:{
                name: ua.os.name,
                version: ua.os.version
            },
            cpu_architecture: ua.cpu.architecture,
            screenWidth: `${window.screen.width}px`,
            screenHeight: `${window.screen.height}px`,
        },
        browser: {
            name: ua.browser.name,
            version: ua.browser.version,
            engine:{
                name: ua.engine.name,
                version: ua.engine.version
            },
            screenWidth: `${window.innerWidth}px`,
            screenHeight: `${window.innerHeight}px`, 
        }
    };
    return userInfoTree;
}