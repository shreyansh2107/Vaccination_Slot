require('dotenv').config();
const axios = require('axios');
const nodemailer = require('nodemailer');
const date = require('date-and-time');

let add = ['18bit057@ietdavv.edu.in', '18bit051@ietdavv.edu.in', '18bit012@ietdavv.edu.in', 484774, 462023, 461775, '18bit010@ietdavv.edu.in', 452010, 'upreliah@gmail.com', 487001, 462023, 462047, 473331, 457001, 444203, 451001, 'madhumehra372@gmail.com', 'mradula75hbad@gmail.com', 'Vipinnice99@gmail.com', '18bit063@ietdavv.edu.in', 'mshahroz161099@gmail.com', 'santoshmehar@gmail.com'];

const now = new Date();
let samay = date.format(now, 'DD/MM/YYYY');

let pin = [462023, 462023];
let mails = ["luciferrrr2020@gmail.com"];


for (let f = 0; f < pin.length; f++) {

    axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin[f]}&date=${samay}`, {
        method: "GET",
        headers: {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0",
            "accept": "application/json",
        }
    })

        .then((response) => {
            let ans = "";
            let count = 0;
            for (let i of response.data.centers) {
                for (let j of i.sessions) {
                    let available_capacity = i.sessions[0].available_capacity;
                    let agelimit = i.sessions[0].min_age_limit;
                    let dose1 = i.sessions[0].available_capacity_dose1;
                    let dose2 = i.sessions[0].available_capacity_dose2;
                    let vaccine = i.sessions[0].vaccine;
                    let first = i.name;
                    let address = i.address;
                    if (available_capacity >= 1) {
                        ans += `Slot Capacity : ${j.available_capacity} \n`;
                        ans += `Vaccine : ${j.vaccine} \n`;
                        ans += `Address : ${first}, ${address} \n`;
                        ans += `Minimum Age Limit: ${agelimit} \n`;
                        ans += `Dose 1: ${dose1} \n`;
                        ans += `Dose 2: ${dose2} \n\n`;
                        count++;
                    }
                }
            }
            if (count >= 1) {
                let transport = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD
                    }
                });

                let mailOption = {
                    from: 'shreyanshmehra786@gmail.com',
                    to: `${mails[f]}`,
                    subject: 'Hurry!! Vaccine Slots is Available in your area',
                    text: ans
                };

                let mail = transport.sendMail(mailOption, function (err, data) {
                    if (err) {
                        console.log('Error Occurs', err);
                    } else {
                        console.log('Email sent!!!');
                    }
                });
            }
        })
        .catch(err => console.error(err))

}


