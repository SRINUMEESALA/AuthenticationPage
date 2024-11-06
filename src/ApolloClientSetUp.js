import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: "https://hasura.dev.orahi.com/v1/graphql",
});

const wsLink = new GraphQLWsLink(
  createClient({ url: "wss://hasura.dev.orahi.com/v1/graphql" })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const CustomApolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default CustomApolloClient;

//                         (or)

// // src/apollo.js
// import { ApolloClient, InMemoryCache } from "@apollo/client";

// const customApolloClient = new ApolloClient({
// uri: "https://hasura.dev.orahi.com/v1/graphql",
// cache: new InMemoryCache(),
// });

// export default customApolloClient;
