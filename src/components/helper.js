
const checkIfTimeIsInRange = (date, min, max) => (date.getTime() >= min.getTime() && date.getTime() <= max.getTime());
const formatDate = (date) => {
    const splitDate = date.split("/");

    return new Date(`${splitDate[1]}/${splitDate[0]}/${splitDate[2]}`);
}

const convertToDateTime = (time, date) => {
    const dateTime = formatDate(date);
    const hours = time.split(":")[0];
    const minutes = time.split(":")[1];

    dateTime.setHours(hours)
    dateTime.setMinutes(minutes);
    dateTime.setSeconds(0);

    return dateTime;
}

export const getFreeRoomsAndRunningMeetings = (meetingRooms, specificDateTime) => {
    let currentRunningNumberOfMeetings = 0;
    const currentlyFreeRooms = meetingRooms.filter(({ meetings }) => {
        const isMeetingRoomBooked = meetings.some(meeting => {
            const minTime = convertToDateTime(meeting.startTime, meeting.date); // 21:00
            const maxTime = convertToDateTime(meeting.endTime, meeting.date);
            if(specificDateTime){
                const { date, startTime, endTime} = specificDateTime;
                const meetingStartTime = convertToDateTime(startTime, date);
                const meetingEndTime = convertToDateTime(endTime, date);
                if((checkIfTimeIsInRange(meetingStartTime, minTime, maxTime) || checkIfTimeIsInRange(meetingEndTime, minTime, maxTime))){
                    // currentRunningMeetings.push(meeting);
                    return true;
                }
            }
            else {
                const currentDate = new Date() ;
                if(checkIfTimeIsInRange(currentDate, minTime, maxTime)){
                    return true;
                }
            }

          return false;
        });
        if(isMeetingRoomBooked){
            currentRunningNumberOfMeetings++;
            return false;
        }
        return true;
    })

    return {
        freeRooms: currentlyFreeRooms,
        currentRunningNumberOfMeetings
    }

}

export const getFreeRoomsInBuildings = (buildings, selectedBuildingId, specificDate) => {
    const parseBuildingId = Number(selectedBuildingId); //select returns string value;
    if(specificDate.startTime && specificDate.endTime && specificDate.date && parseBuildingId > 0){
       
        const selectedBuildingDataIndex = buildings.findIndex(({ id }) => id === parseBuildingId);

        if(selectedBuildingDataIndex !== -1){
            const selectedBuilding = buildings[selectedBuildingDataIndex];
            const meetingRooms = selectedBuilding?.meetingRooms;

            return getFreeRoomsAndRunningMeetings(meetingRooms, specificDate)?.freeRooms ?? [];
        }
    }
    return [];
 }

const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

export const getMeetingsTotalMeetingsOnSpecificDay = (meetings, date) => {
    const dateTime = date ?? new Date();

    return meetings.filter(meeting => datesAreOnSameDay(
        formatDate(meeting.date),
        dateTime
    ))
}