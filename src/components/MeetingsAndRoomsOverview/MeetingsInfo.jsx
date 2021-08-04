import React, {useMemo } from 'react';
import { getMeetingsTotalMeetingsOnSpecificDay } from '../helper';

export const MeetingsInfo = ({ data, currentlyRunningCount }) => {

    const meetings = useMemo(() => {
        return data ? data.reduce((accm, meetingRoom) => {
            if(meetingRoom?.meetings){
                accm.push(...meetingRoom.meetings)
            }
            return accm;
        }, []) : []
    }, [data])

    const totalMeetingsToday = getMeetingsTotalMeetingsOnSpecificDay(meetings);

    return (
        <>
        <h2>Meetings</h2>
        <div> Total { totalMeetingsToday ? totalMeetingsToday.length : 0 } today</div>
        <div>Total {currentlyRunningCount} going on now</div>
        </>
    )
   

}

