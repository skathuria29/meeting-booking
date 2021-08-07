import React from 'react';

const BuildingOptions = ({ data: buildings, onAction, active}) => (
    <select data-id="selectedBuilding"  onChange={onAction} >
         <option disabled selected value> -- select a building -- </option>
        {
            buildings.map(building => <option label={building.name} value={building.id} key={building.id}>{ building.id }</option>)
        }
    </select>
)

export const AddMeetingDetailsForm = ({ onChange, onAction, data, selectedBuilding }) => (
    <>
       <div className="p-2">
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-medium text-md text-grey-darkest"> Title </label>
                <input className="border py-2 px-3 text-grey-darkest" required placeholder="Please enter title" data-id="title"  onChange={onChange}></input>
            </div>
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-medium text-md text-grey-darkest">Date</label>
                <input className="border py-2 px-3 text-grey-darkest" required placeholder="format dd/mm/yyyy" data-id="date"  onChange={onChange}></input>
            </div>
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-medium text-md text-grey-darkest">Start Time </label>
                <input className="border py-2 px-3 text-grey-darkest" required placeholder="format HH:MM" data-id="startTime" onChange={onChange}></input>
            </div>
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-medium text-md text-grey-darkest">End Time </label>
                <input className="border py-2 px-3 text-grey-darkest" required placeholder="format HH:MM" data-id="endTime" onChange={onChange}></input>
            </div>
            <div className="flex flex-col mb-4">
                {
                    data && data.length ? <BuildingOptions data={data} onAction={onChange} active={selectedBuilding}/> : null 
                }
            </div>
       </div>
        <button className="btn-primary-blue mb-2 " onClick={onAction}>next</button>
    </>
)