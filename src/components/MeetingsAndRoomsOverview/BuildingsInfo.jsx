import React from 'react';

export const BuildingsInfo = ({ data }) => {
    return (
        <>
        <h2>Buildings</h2>
        <div> Total {data ? data.length : 0 }</div>
        </>
    )
   

}

