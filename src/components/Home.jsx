import React, { useCallback, useState} from "react";
import { useFetchAllBuildingsData } from './hooks/useFetchAllBuildingsData';
import { BuildingsOverview } from './MeetingsAndRoomsOverview';
import { AddMeeting } from './AddMeeting';

const VIEW_MAP = {
  'ADD_MEETING': AddMeeting,
  'OVERVIEW': BuildingsOverview,
}

export const Home = () => {
  const { data, loading, error } = useFetchAllBuildingsData();
  const [ viewStatus, setViewStatus] = useState('OVERVIEW');


  const onAction = useCallback(({ action, payload = {}}) => {
    switch(action?.type){
      case 'ADD_MEETING': return  setViewStatus('ADD_MEETING');
      case 'OVERVIEW': return setViewStatus('OVERVIEW');
      default: return
    }
  }, []);

  if(error){
    return <div> some error occurred</div>
  }
  if(loading){
    <div> loading data </div>
  }

  const Component = VIEW_MAP[viewStatus];

  return ( 
    <div className="container flex flex-col mx-auto h-full justify-center	items-center mt-4">
       <Component data={data} onAction={onAction} />
    </div>
   
 )
};
