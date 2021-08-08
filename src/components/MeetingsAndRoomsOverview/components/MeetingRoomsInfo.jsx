import React from 'react';

export const MeetingRoomsInfo = ({ data, freeRooms }) => (
    <div className="mb-2 border-b-2 p-1 flex-1">
        <div className="font-medium text-lg">Rooms</div>
        <div className="text-sm"> Total {data ? data.length : 0 }</div>
        <div className="text-sm">Free now {freeRooms ? freeRooms.length : 0 }</div>
    </div>
)

