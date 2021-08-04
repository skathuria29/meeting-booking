import React, { useCallback, useMemo } from 'react';
import { BuildingsInfo } from './BuildingsInfo';
import {MeetingRoomsInfo  } from './MeetingRoomsInfo';
import { MeetingsInfo } from './MeetingsInfo';
import { getFreeRoomsAndRunningMeetings } from '../helper';


export const BuildingsOverview = ({ data, onAction }) => {

    const meetingRooms = useMemo(() => {
        return data ? data.reduce((accm, building) => {
            if(building?.meetingRooms){
                accm.push(...building.meetingRooms)
            }
            return accm;
        }, []) : []
    }, [data])


    const { freeRooms, currentRunningNumberOfMeetings } = useMemo(() => getFreeRoomsAndRunningMeetings(meetingRooms), [meetingRooms]);

    const addMeetingHandler = useCallback(() => onAction({
        action: { type: 'CREATE'}
    }), [onAction]);

   return ( <div>
    <BuildingsInfo data={data}/>
    <MeetingRoomsInfo data={meetingRooms} freeRooms={freeRooms}/>
    <MeetingsInfo data={meetingRooms} currentlyRunningCount={currentRunningNumberOfMeetings}/>
    <button onClick={addMeetingHandler}>Add Meeting</button>
</div>)
}