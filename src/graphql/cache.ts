import { defaultDataIdFromObject, InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";
import { GetLanguage } from "./types/GetLanguage";

const cache = new InMemoryCache({

  dataIdFromObject: (obj) => {
    const getLanguageQuery = gql`
      query GetLanguage {
        language @client
      }
    `;

    const cacheData: GetLanguage = cache.readQuery<GetLanguage>({
      query: getLanguageQuery,
    })!;

    switch (obj.__typename) {
      case "Movie":
        return `Movie:${obj.id}:${cacheData.language}`;
      case "Keyword":
        return `Keyword:${obj.id}:${cacheData.language}`;
      case "Genre":
        return `Genre:${obj.id}:${cacheData.language}`;
      default:
        return defaultDataIdFromObject(obj); // fall back to default handling
    }
  },
});
export default cache;
