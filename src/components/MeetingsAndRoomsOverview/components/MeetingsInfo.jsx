import React, {useMemo } from 'react';
import { getMeetingsTotalMeetingsOnSpecificDay } from '../../helper';

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
        <div className="mb-2 p-1">
            <div className="font-medium text-lg	">Meetings</div>
            <div className="text-sm"> Total { totalMeetingsToday ? totalMeetingsToday.length : 0 } today</div>
            <div className="text-sm">Total {currentlyRunningCount} going on now</div>
        </div>
    )
   

}

