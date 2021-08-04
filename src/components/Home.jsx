import React, { useCallback, useState} from "react";
// import { BuildingsInfo } from './BuildingsInfo';
// import { MeetingRoomsInfo } from './MeetingRoomsInfo';
import { useFetchAllBuildingsData } from './hooks/useFetchAllBuildingsData';
import { BuildingsOverview } from './MeetingsAndRoomsOverview';
import { AddMeeting } from './AddMeeting';
// import { getFreeRoomsAndRunningMeetings} from './helper';

const VIEW_MAP = {
  'CREATE': AddMeeting,
  'DEFAULT': BuildingsOverview,
}

export const Home = () => {
  const { data, loading, error } = useFetchAllBuildingsData();
  const [ viewStatus, setViewStatus] = useState('DEFAULT');


  const onAction = useCallback(({ action, payload = {}}) => {
    switch(action?.type){
      case 'CREATE': return  setViewStatus('CREATE');
      case 'SELECT_ROOMS': return setViewStatus('SELECT_ROOMS');
      case 'DEFAULT': return setViewStatus('DEFAULT');
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
  <div>
    <Component data={data} onAction={onAction} />
  </div>
 )
};
