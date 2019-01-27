import { defaultDataIdFromObject, InMemoryCache } from "apollo-cache-inmemory";

export default new InMemoryCache({
  dataIdFromObject: (obj) => {
    switch (obj.__typename) {
      case "Movie": return `Movie:${obj.id}`; // use `key` as the primary key
      default: return defaultDataIdFromObject(obj); // fall back to default handling
    }
  },
});
