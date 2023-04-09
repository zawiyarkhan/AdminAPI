// Calender API controller guys

const {google} = require('googleapis');
require ('dotenv').config();


const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const CalenderID = process.env.CALENDER_ID;


const SCOPES = '';
const calender = google.calendar({version: "v3"});

const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);

const TIMEOFFSET = '+5:00';

const dateTimeForCalander = () => {

    let date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }

    let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;

    let event = new Date(Date.parse(newDateTime));

    let startDate = event;
    // Delay in end time is 1
    let endDate = new Date(new Date(startDate).setHours(startDate.getHours()+1));

    return {
        'start': startDate,
        'end': endDate
    }
};

const insertEvent = async (event) => {

    try {
        let response = await calendar.events.insert({
            auth: auth,
            calendarId: CalenderID,
            resource: event
        });
    
        if (response['status'] == 200 && response['statusText'] === 'OK') {
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.log(`Error at insertEvent --> ${error}`);
        return 0;
    }
};

const getEvents = async (dateTimeStart, dateTimeEnd) => {

    try {
        let response = await calender.events.list({
            auth: auth,
            calendarId: CalenderID,
            timeMin: dateTimeStart,
            timeMax: dateTimeEnd,
            timeZone: 'Asia/Kolkata'
        });
    
        let items = response['data']['items'];
        return items;
    } catch (error) {
        console.log(`Error at getEvents --> ${error}`);
        return 0;
    }
};

const deleteEvent = async (eventId) => {

    try {
        let response = await calendar.events.delete({
            auth: auth,
            calendarId: calendarId,
            eventId: eventId
        });

        if (response.data === '') {
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.log(`Error at deleteEvent --> ${error}`);
        return 0;
    }
};


const createAPI = (req, res) =>{
    try {
        insertEvent(req.body)
            .then(result => {
                res.send(result);
            })
            .catch(error => {
                res.send(error)
            });

    } catch (error) {
        console.log(error)
    }
}

const getAPI = ()=>{
    try {
        getEvents()
    } catch (error) {
        console.log(error);
    }
}

const deleteAPI = () => {
    try {
        deleteEvent(req.body)
            .then(result => {
                res.send(result);
            })
            .catch(error => {
                console.log(error);
            })
    } catch (error) {
        console.log(error)
    }
}


module.exports = {createAPI, getAPI, deleteAPI};
