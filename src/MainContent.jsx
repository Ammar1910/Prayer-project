import React from 'react'
import Grid from '@mui/material/Grid2';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Prayer from './components/Prayer';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import "moment/dist/locale/ar"
moment.locale("ar");
export default function MainContent() {
    const [remainingTime, setRemainingTime] = useState("")
    const [nextPrayerIndex, setNextPrayerIndex] = useState(0)
    const [today, setToday] = useState("")
    const [timings, setTimings] = useState({
        "Fajr": "",

        "Dhuhr": "",
        "Asr": "",

        "Maghrib": "",
        "Isha": "",


    })
    const [selectdCity, setselectdCity] = useState({
        displayName: "القاهرة",
        apiName: "cairo"
    })

    const avaCities = [
        {
            displayName: "القاهرة",
            apiName: "cairo"
        },
        {
            displayName: "الاسكندرية",
            apiName: "Alexandria"
        },
        {
            displayName: "كفر تورمص",
            apiName: "cairo"
        },
        {
            displayName: "الشرقية",
            apiName: "Ash Sharqīyah"
        }
    ];

    const prayersArray = [
        { key: "Fajr", Name: "الفجر" },
        { key: "Dhuhr", Name: "الظهر" },
        { key: "Asr", Name: "العصر" },
        { key: "Maghrib", Name: "المغرب" },
        { key: "Isha", Name: "العشاء" },

    ];
    const getTiming = async () => {

        const response = await axios.get(`https://api.aladhan.com/v1/timingsByCity?country=EG&city=${selectdCity.apiName}`)

        setTimings(response.data.data.timings)


    }

    useEffect(() => {
        getTiming()


    }, [selectdCity])
    useEffect(() => {
        const t = moment()
        setToday(t.format("MMM Do YYYY | h:mm"))

        let interval = setInterval(() => {
            setCountDownTimer()
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [timings])
    const handleChange = (event) => {
        setselectdCity(event.target.value)
    };

    const setCountDownTimer = () => {
        const momentNow = moment();

        let prayerIndex = null;


        if (momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) && momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))) {

            prayerIndex = 1

        } else if (momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) && momentNow.isBefore(moment(timings["Asr"], "hh:mm"))) {
            prayerIndex = 2

        } else if (momentNow.isAfter(moment(timings["Asr"], "hh:mm")) && momentNow.isBefore(moment(timings["Maghrib"], "hh:mm"))) {

            prayerIndex = 3

        } else if (momentNow.isAfter(moment(timings["Maghrib"], "hh:mm")) && momentNow.isBefore(moment(timings["Isha"], "hh:mm"))) {

            prayerIndex = 4

        } else {

            prayerIndex = 0

        }
        setNextPrayerIndex(prayerIndex)

        const nextPrayerObject = prayersArray[prayerIndex]
        const nextPrayerTiming = timings[nextPrayerObject.key]
        let remainingTime = moment(nextPrayerTiming, "hh:mm").diff(momentNow)
        const durationRemainingTime = moment.duration(remainingTime)
        const nextPrayerTimeMoment = moment(nextPrayerTiming, "hh:mm")
        if (durationRemainingTime < 0) {
            const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow)
            const fajrToMidnightDiff = nextPrayerTimeMoment.diff(moment("00:00:00", "hh:mm:ss"))
            const totalDiff = midnightDiff + fajrToMidnightDiff
            remainingTime = totalDiff

        }

        setRemainingTime(`${durationRemainingTime.seconds()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.hours()}`)




    }




    return (

        <>

            <Grid dir='rtl' container>
                <Grid size={6}>
                    <div >
                        <h2 className='x' style={{ color: "gray" }}>{today}</h2>
                        <h1 className='fontResponsive'>{selectdCity.displayName}</h1>

                    </div>

                </Grid>
                <Grid size={6}>
                    <div>
                        <h2 className='x' style={{ color: "gray" }}>متبقي حتي صلاة {prayersArray[nextPrayerIndex].Name}</h2>
                        <h1 className='fontResponsive' >{remainingTime}</h1>
                    </div>
                </Grid>
            </Grid>
            <Divider style={{ borderColor: "white", opacity: "0.2" }} />

            {/* مواقيت الصلوات */}
            <Stack dir='rtl' direction="row" justifyContent={"space-around"} style={{ marginTop: "20px" }}>
                <Grid container spacing={8} justifyContent={'center'}>
                    <Grid>< Prayer image="1.png" name='الفجر' time={timings.Fajr} /></Grid>

                    <Grid><Prayer image="2.png" name='الظهر' time={timings.Dhuhr} /></Grid>

                    <Grid> <Prayer image="3.png" name='العصر' time={timings.Asr} /></Grid>



                    <Grid><Prayer image="4.png" name='المغرب' time={timings.Maghrib} /></Grid>



                    <Grid><Prayer image="5.png" name='العشاء' time={timings.Isha} /></Grid>

                </Grid>




            </Stack>
            {/* مواقيت الصلوات */}
            <div style={{ display: "flex", justifyContent: "center " }}>

                <FormControl sx={{ m: 1, width: 250 }} >
                    <InputLabel style={{ color: "white" }} id="demo-simple-select-label">المدينة</InputLabel>
                    <Select
                        style={{ color: "white" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"

                        label="Age"
                        onChange={handleChange}
                        dir="rtl"
                    >
                        {avaCities.map((avacity) => {
                            return (
                                <MenuItem dir="rtl" key={avacity.apiName} value={{

                                    displayName: avacity.displayName,
                                    apiName: avacity.apiName
                                }}>{avacity.displayName}</MenuItem>
                            )
                        })}

                    </Select>
                </FormControl>

            </div >



        </>
    )

}
