import {
    ApolloClient,
    InMemoryCache,
  } from "@apollo/client";

  export const client = new ApolloClient({
    uri: 'http://smart-meeting.herokuapp.com/',
    cache: new InMemoryCache()
  });