
import { gql, useQuery } from '@apollo/client';

export const FETCH_ALL_MEETING_ROOMS = gql`
    query fetchAllMeetingRooms {
        MeetingRooms {
            name
            floor
            building {
                name
            }
            meetings {
                title
                startTime
                endTime
            }
        }
    }
    
`;



export const useFetchAllMeetingRooms = () => {
    const { loading, error, data } = useQuery(FETCH_ALL_MEETING_ROOMS);

    return{
        data: data?.MeetingRooms,
        loading,
        error
    }
}
