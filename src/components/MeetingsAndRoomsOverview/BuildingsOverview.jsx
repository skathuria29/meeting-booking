import React, { useCallback, useMemo } from 'react';
import { BuildingsInfo } from './components/BuildingsInfo';
import {MeetingRoomsInfo  } from './components/MeetingRoomsInfo';
import { MeetingsInfo } from './components/MeetingsInfo';
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
        action: { type: 'ADD_MEETING'}
    }), [onAction]);

   return ( 
    <div className="container w-1/2 border-2 rounded flex flex-col min-h-1/2">
        <BuildingsInfo data={data}/>
        <MeetingRoomsInfo data={meetingRooms} freeRooms={freeRooms}/>
        <MeetingsInfo data={meetingRooms} currentlyRunningCount={currentRunningNumberOfMeetings}/>
        <button onClick={addMeetingHandler} className="btn-primary-blue">Add Meeting</button>
    </div>)
}