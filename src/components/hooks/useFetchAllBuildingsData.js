
import { gql, useQuery } from '@apollo/client';

export const FETCH_BUILDINGS_AND_MEETING_INFO = gql`
    query getBuildings {
        Buildings {
        name
        id
        meetingRooms {
            name
            floor
            id
            building {
                name
                id
            }
            meetings {
            title
            date
            startTime
            endTime
            }
        }
        }
    }
`;



export const useFetchAllBuildingsData = () => {
    const { loading, error, data } = useQuery(FETCH_BUILDINGS_AND_MEETING_INFO);

    return{
        data: data?.Buildings,
        loading: loading ?? true,
        error
    }
}
