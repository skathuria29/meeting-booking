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
        <div>
            Title <span><input required placeholder="Please enter title" data-id="title"  onChange={onChange}></input></span>
        </div>
        <div>
            Date <span><input required placeholder="format dd/mm/yyyy" data-id="date"  onChange={onChange}></input></span>
        </div>
        <div>
            Start Time <span><input required placeholder="format HH:MM" data-id="startTime" onChange={onChange}></input></span>
        </div>
        <div>
            End Time <span><input required placeholder="format HH:MM" data-id="endTime" onChange={onChange}></input></span>
        </div>
        <div>
            {
                data && data.length ? <BuildingOptions data={data} onAction={onChange} active={selectedBuilding}/> : null 
            }
        </div>
        <button onClick={onAction}>next</button>
    </>
)