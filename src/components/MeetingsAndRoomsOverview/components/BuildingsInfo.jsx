import React from 'react';

export const BuildingsInfo = ({ data }) => {
    return (
    <div className="mb-2 border-b-2 p-1">
        <div className="font-medium text-lg	">Buildings</div>
        <div className="text-sm	"> Total {data ? data.length : 0 }</div>
    </div>
    )
   

}

