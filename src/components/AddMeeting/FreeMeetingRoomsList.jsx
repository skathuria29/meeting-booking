import React from 'react';

export const FreeMeetingRoomsList = ({ rooms, onAction, onSave }) => (
  <>
      {
        rooms?.length ? rooms.map((room) => (
            <div onClick={() => onAction(room.id)} key={`${room.id}_${room.name}`} data-id="meetingRoomId" >
                <div>Room Name {room?.name}</div>
                <div>Floor  {room?.floor}</div>
                <div>Building  {room?.building?.name}</div>
            </div>
        )) : <div> No Free Room in this building </div>
            
     } 
    <button className="btn-primary-blue mb-2" onClick={onSave}> save </button>
  </>
)