import { useCallback } from "react";
import { useMutation, gql } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

const ADD_MEETING_MUTATION = gql`
  mutation AddMeeting(
    $id: Int!
    $title: String!
    $date: String!
    $startTime: String!
    $endTime: String!
    $meetingRoomId: Int!
  ) {
    Meeting(
      id: $id
      title: $title
      date: $date
      startTime: $startTime
      endTime: $endTime
      meetingRoomId: $meetingRoomId
    ) {
      title
    }
  }
`;

export const useAddMeetingMutation = () => {
  const [addNewMeetingFn] = useMutation(ADD_MEETING_MUTATION, {
    onCompleted: () => alert('saved'),
    onError: () => alert('some error occurred. Try again later!')
  });

  const addNewMeeting = useCallback(
    (meeting) => {
      addNewMeetingFn({
        variables: {
          id: Math.floor(Math.random() * 1000),
          title: meeting.title,
          date: meeting.date,
          startTime: meeting.startTime,
          endTime: meeting.endTime,
          meetingRoomId: meeting.meetingRoomId,
        },
      });
    },
    [addNewMeetingFn]
  );

  return [addNewMeeting];
};
