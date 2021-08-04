import React, { useState, useMemo } from 'react';
import { getFreeRoomsInBuildings } from '../helper';
import { useAddMeetingMutation } from '../hooks/useAddMeetingMutation';
import { FreeMeetingRoomsList } from './FreeMeetingRoomsList';
import { AddMeetingDetailsForm } from './AddMeetingDetailsForm';


const DEAFULT_SELECTED_BUILDING = "-1"; //building id

export const AddMeeting = ({ data, onAction }) => {
    const [selectedBuilding, setSelectedBuilding ] = useState(DEAFULT_SELECTED_BUILDING);
    const [newMeeting, setNewMeeting] = useState({});
    const [isNext, setNextPage ] = useState(false);

    const meetingRooms = useMemo(() => {
        return data ? data.reduce((accm, building) => {
            if(building?.meetingRooms){
                accm.push(...building.meetingRooms)
            }
            return accm;
        }, []) : []
    }, [data])

    const freeRoomsInBuilding = useMemo(() => getFreeRoomsInBuildings(data, selectedBuilding, {
        startTime: newMeeting.startTime,
        endTime: newMeeting.endTime,
        date: newMeeting.date
    }), [data, selectedBuilding, newMeeting]);

   
    const closeAddMeetingView = () => onAction({
        action: { type: 'DEFAULT'}
    })

    const onChangeHandler = (e) => {
        const key = e.target.dataset.id;
        const value = e.target.value;
        if(key === "selectedBuilding"){
            return setSelectedBuilding(value);
        }
        return setNewMeeting(prevState => ({
            ...prevState,
            [key]: value,
        }))
    }

    const selectRoom = (index) => setNewMeeting(prevState => ({
        ...prevState,
        meetingRoomId: index,
    }))

    const [saveMeetingFn] = useAddMeetingMutation(newMeeting);
    

    const onSave  = () => {
        //add validations later since every field is required
        saveMeetingFn(newMeeting);
    }

    return (
        <div>
            {
                isNext 
                ? <FreeMeetingRoomsList rooms={freeRoomsInBuilding} onAction={selectRoom} onSave={onSave}/>
                : <AddMeetingDetailsForm onAction={() => setNextPage(true)} onChange={onChangeHandler} data={data} selectedBuilding={selectedBuilding}/>   
                 
            }
             <button onClick={closeAddMeetingView}> close</button>
        </div>
    )
};