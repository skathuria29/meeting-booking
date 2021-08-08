import React from 'react';
import classNames from 'classnames';

export const FreeMeetingRoomsList = ({ rooms, onAction, selectedRoom }) => (
  <>
      {
        rooms?.length ? rooms.map((room) => (
            <div className={classNames('flex-1 border-b-2 p-1 cursor-pointer', {
              'bg-gray-300': selectedRoom === room.id
            })} onClick={() => onAction(room.id)} key={`${room.id}_${room.name}`} data-id="meetingRoomId" >
                <div>Room Name {room?.name}</div>
                <div>Floor  {room?.floor}</div>
                <div>Building  {room?.building?.name}</div>
            </div>
        )) : <div className="flex-1"> No Free Room in this building </div>
            
     } 
    {/* <button className="btn-primary-blue mb-2" onClick={onSave}> save </button> */}
  </>
)