// This file holds the User collection logic


// This is a custom hook that works like Usetate in react but its in Node.js
import { UseStateNode } from './useSateNode';


// UserAgent Package
const parser = require('ua-parser-js');

// This is the function retrives the user data and places is local storage
export async function UserData() {
    // IP Info API
    const ipUrl = `https://ipinfo.io/json?token=${process.env.REACT_APP_IP_API_KEY}`;
    
    // Custom UseState Hook
    const [state, setState] = UseStateNode(null);


    // This is the backup service if the first one fails this part 2 of the service part 1 is service_2_a
    // IPInfo.io API has been having issues lately
    const service_2_b = async (ip) => {
        // This is to handle the edge case where the ip is not found
        if (ip === undefined || ip === null || ip === '') {
            ip = 'unknown';
        }
        // This gets the Geolocation of the user using inbuilt navigator API
        navigator.geolocation.getCurrentPosition(position => {
        /*
            There was an issue where the response was not returning it
            or being save inside a variable even ChatGPT answered this question and it was not working
            this is where the UserState Hook comes in after I saw a youtube short when taking a break from the bug
        */
        setState({latitude:position.coords.latitude, longitude:position.coords.longitude, accuracy:position.coords.accuracy})
          // this isn't working
        return;
    });

    // This will handle the response from the API and be accessed in the front end
    let res = null
    // This is to handle the edge case where the ip is not found
    if(ip !== 'unknown'){
    // This calls and external API that retrives the country code and name with an IP address which comes from service_2_a()
        res = await fetch(`https://api.iplocation.net/?cmd=ip-country&ip=${ip}`)
        .then(response => response.json())
        .then(data => {
        return data;
        })
        .catch(error => {
        return {'error': 'error'}
        })
    }


    // set value of the state to a variable for readablity
    let locationInfo = state();
    // this will be the final object that is sent to the front end
    let complete = null;
    // This to handle errors in front end to disable the buttons
    // edge case where the ip is not found but the location is
    if(res.error){
        complete = {
            'ip': ip,
            'country_code2': 'unknown',
            'country_name': 'unknown',
            'ip_number': 'unknown',
            'isp': 'unknown',
            'latitude': (locationInfo.latitude !== null) ? locationInfo.latitude : 'unknown',
            'longitude': (locationInfo.longitude !== null) ? locationInfo.longitude : 'unknown',
            'accuracy': (locationInfo.accuracy !== null) ? locationInfo.accuracy : 'unknown',
        }
        return{'res': complete , 'service': 2, 'ip': ip , error: 'service is down'};
        }
        
        // This is the final object that is created that is sent to the front end
        complete = {
            'ip': res.ip,
            'country_code2': res.country_code2,
            'country_name': res.country_name,
            'ip_number': res.ip_number,
            'isp': res.isp,
            'latitude': (locationInfo.latitude !== null) ? locationInfo.latitude : 'unknown',
            'longitude': (locationInfo.longitude !== null) ? locationInfo.longitude : 'unknown',
            'accuracy': (locationInfo.accuracy !== null) ? locationInfo.accuracy : 'unknown',
        }

        // console.log('This is the final object', complete);

        
        // this is complete response
        return {'res': complete , 'service': 2, 'ip': ip };
    }

// This is the backup service if the first one fails this part 1 of the service part 2 is service_2_b()
    
/*
    The resoning behind spliting the service is to make it easier to read and debug. 
    There is 2 seperate api services that are used to retrive the data.
*/ 
    const service_2_a = async () => {
        let res = await fetch('https://api.ipify.org/?format=json')
            .then(response =>response.json())
            .catch(error => {
            return {'error': 'error'}
        })
        if(res.error){
            /*
                this gets the Geolocation of the user using inbuilt navigator API
                incase the ipify api fails
            */
            navigator.geolocation.getCurrentPosition(position => {
            setState({latitude:position.coords.latitude, longitude:position.coords.longitude, accuracy:position.coords.accuracy})
            /*
                since is being saved in the state we can access it through the state function 
                there is no need to return anything
            */
            return;
            }); 


        let locationInfo = state();
        // this is the final object that is sent to the front end
        let complete = null;  
            
          // final object that is created that is sent to the front end
        complete = {
                'ip': 'unknown',
                'country_code2': 'unknown',
                'country_name': 'unknown',
                'ip_number': 'unknown',
                'isp': 'unknown',
                'lattidue': (locationInfo.latitude !== null) ? locationInfo.latitude : 'unknown',
                'longitude': (locationInfo.longitude !== null) ? locationInfo.longitude : 'unknown',
                'accuracy': (locationInfo.accuracy !== null) ? locationInfo.accuracy : 'unknown',
                }
                /*
                Since the IP service is down we can't get the IP address therefore we can't get the location
                Therefore no need to call service_2_b() since it will fail
              */
                return {'res': complete , 'service': 2, 'ip': 'unknown' , error: 'service is down'}
            }
            // The IP Service is working therefore we can send it to service_2_b()
        return service_2_b(res.ip)
    }

    /*
        This is the main service that is used to retrive the data and is accessed in the front end
        IPInfo.io API 
    */
    const service_1 = await fetch(ipUrl)
        .then((response) => response)
        .then(data => {
        /* 
            Catches non 200 responses and sends it to service_2_a()
        */
        if(data.status !== 200){
            console.log('This is why is calling Service 2 instead of IPInfo', data);
            return service_2_a()
        }else if(data.type === 'cors'){
            console.log('This is why is calling Service 2 instead of IPInfo', data);
            return service_2_a()
        }else{
            return data
        }
        })
    /* 
        Edgecase where the if(data.status !== 200) fails to catch a non 200 response 
        and sends it to service_2_a()
    */
        .catch(error => {
            console.log("Catch Clause", error)
            return service_2_a()
        })

        /* 
            This is when the services get called to get the data
        */
    const publicData = await service_1
        
        /*
            This is where the data gets parsed for sending to the front end from service_2
        */
    if(publicData.service === 2){
        /*
            Here we parse the user agent, using from the Navigator API
            Some of data is not available in the API therefore we have to handle it
        */
        const ua = parser(navigator.userAgent);
        let deviceType = null;
        let deviceModel = null;
        let deviceVendor = null;
        if (ua.device.model === undefined) {
            if (ua.os.name === 'Windows') {
                deviceType = 'Desktop';
                deviceModel = 'unknown';
                deviceVendor = 'unknown';
            }
            if (ua.os.name === undefined) {
                ua.os.name = 'unknown';
                deviceType = 'unknown';
                deviceModel = 'unknown';
                deviceVendor = 'unknown';
            }
        }
        if (ua.device.model !== undefined) {
            deviceType = ua.device.type;
            deviceModel = ua.device.model;
            deviceVendor = ua.device.vendor;
        }
        if(ua.cpu.architecture === undefined ){
            ua.cpu.architecture = "unknown";
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
            screenWidth: `${window.innerWidth}px`,
            screenHeight: `${window.innerHeight}px`,
        },
        browser: {
            name: ua.browser.name,
            version: ua.browser.version,
            engine:{
                name: ua.engine.name,
                version: ua.engine.version
            } 
        },
        location: {
            ip: publicData.ip,
            country_code: publicData.res.country_code2,
            country_name: publicData.res.country_name,
            ip_number: publicData.res.ip_number,
            isp: publicData.res.isp,
            latitude: publicData.res.latitude,
            longitude: publicData.res.longitude,
            accuracy: publicData.res.accuracy,
        }
    };
      // This is where we place the data into local storage
    localStorage.setItem('data', JSON.stringify(userInfoTree))
    return userInfoTree
}

    /*
        This is where the data gets parsed for sending to the front end from service_1
        Service one is more comprehensive and we have access to more data including the timezone
    */
    else{
        console.log('Service 1 was succesful this is the data', publicData);
        // The Cordinates come in a single string therefore we split them into a array to better access them
        const publicDataLocation = publicData.loc;
        let locationArray = publicDataLocation.split(',');

         // TimeZone API this then allows to compare time differences between the user and the server
        const timeZoneResponse = await fetch(`https://api.timezonedb.com/v2.1/convert-time-zone?key=${process.env.REACT_APP_TIMEZONE_API_KEY}&format=json&from=America/Los_Angeles&to=${publicData.timezone}`);
        const timeZoneData = await timeZoneResponse.json();
        const timeDiffData = (timeZoneData.fromTimestamp - timeZoneData.toTimestamp);
        
        // This gives the time offset in a more readable manner
        let timeDiffRead = null;
        
        if (timeDiffData < 0) {
            const timeDiffAbsolute = Math.abs(timeDiffData);
            const timeDiffHours = ((timeDiffAbsolute / 60) / 60);
            timeDiffRead = `Ahead by ${timeDiffHours} hours`;
        }
        
        if (timeDiffData > 0) {
            const timeDiffHours = ((timeDiffData / 60) / 60);
            timeDiffRead = `Behind by ${timeDiffHours} hours`;
        }

        if (timeDiffData === 0) {
            timeDiffRead = 'No Time Difference';
        }
    
    /*
        Here we parse the user agent, using from the Navigator API
        Some of data is not available in the API therefore we have to handle it
    */
        const ua = parser(navigator.userAgent);
        let deviceType = null;
        let deviceModel = null;
        let deviceVendor = null;
        if (ua.device.model === undefined) {
        
            if (ua.os.name === 'Windows') {
                deviceType = 'Desktop';
                deviceModel = 'unknown';
                deviceVendor = 'unknown';
            }
            if (ua.os.name === undefined) {
                ua.os.name = 'unknown';
                deviceType = 'unknown';
                deviceModel = 'unknown';
                deviceVendor = 'unknown';
            }
        }
        if (ua.device.model !== undefined) {
            deviceType = ua.device.type;
            deviceModel = ua.device.model;
            deviceVendor = ua.device.vendor;
        }
        if(ua.cpu.architecture === undefined ){
            ua.cpu.architecture = "unknown";
        }

      // This is the final object that is created that is sent to the front end via the Local Storage
        const userInfoTree = {
        location: {
            ip: publicData.ip,
            city: publicData.city,
            state: publicData.region,
            postal: publicData.postal,
            country: publicData.country,
            timeZone: publicData.timezone,
            timeDiff: timeDiffRead,
            exactLocation: {
                lat: locationArray[0],
                lon: locationArray[1],
            },

        },
        device: {
            type: deviceType,
            model: deviceModel,
            vendor: deviceVendor,
            os:{
                name: ua.os.name,
                version: ua.os.version
            },
            cpu_architecture: ua.cpu.architecture,
            screenWidth: `${window.innerWidth}px`,
            screenHeight: `${window.innerHeight}px`,
        },
        browser: {
            name: ua.browser.name,
            version: ua.browser.version,
            engine:{
                name: ua.engine.name,
                version: ua.engine.version
            } 
        },
    };
      // This is where we place the data into local storage
    localStorage.setItem('data', JSON.stringify(userInfoTree))
    return userInfoTree
    }
}