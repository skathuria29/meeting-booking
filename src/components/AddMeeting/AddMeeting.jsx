import React, { useState, useMemo, useCallback } from 'react';
import { getFreeRoomsInBuildings } from '../helper';
import { useAddMeetingMutation } from '../hooks/useAddMeetingMutation';
import { FreeMeetingRoomsList } from './FreeMeetingRoomsList';
import { AddMeetingDetailsForm } from './AddMeetingDetailsForm';
import { ButtonActions } from './ButtonActions';


const DEAFULT_SELECTED_BUILDING = "-1"; //building id

export const AddMeeting = ({ data, onAction }) => {
    const [selectedBuilding, setSelectedBuilding ] = useState(DEAFULT_SELECTED_BUILDING);
    const [newMeeting, setNewMeeting] = useState({});
    const [isNext, setNextPage ] = useState(false);


    const freeRoomsInBuilding = useMemo(() => getFreeRoomsInBuildings(data, selectedBuilding, {
        startTime: newMeeting.startTime,
        endTime: newMeeting.endTime,
        date: newMeeting.date
    }), [data, selectedBuilding, newMeeting]);

   

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

    const onActionHandler = useCallback((action) => {
        const { type } = action;
        switch(type){
            case 'SAVE': return  saveMeetingFn(newMeeting);
            case 'NEXT': return  setNextPage(true);
            case 'CLOSE': return  onAction({
                action: { type: 'OVERVIEW'}
            })
        
            default: return;
        }
    }, [newMeeting, onAction, saveMeetingFn]);


    return (
        <div className="container w-1/2 border-2 rounded flex flex-col min-h-1/2">
            {
                isNext 
                ? <FreeMeetingRoomsList rooms={freeRoomsInBuilding} onAction={selectRoom} onSave={onActionHandler} selectedRoom ={newMeeting?.meetingRoomId}/>
                : <AddMeetingDetailsForm onAction={() => setNextPage(true)} onChange={onChangeHandler} data={data} selectedBuilding={selectedBuilding}/>   
                 
            }
            <ButtonActions isNext={isNext} onAction={onActionHandler}/>
        </div>
    )
};