import React from 'react';

export const MeetingRoomsInfo = ({ data, freeRooms }) => (
    <>
    <h2>Rooms</h2>
    <div> Total {data ? data.length : 0 }</div>
    <div>Free now {freeRooms ? freeRooms.length : 0 }</div>
    </>
)

