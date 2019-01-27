import { defaultDataIdFromObject, InMemoryCache } from "apollo-cache-inmemory";
import { GetMovie_movie } from "./types/GetMovie";

export default new InMemoryCache({
  dataIdFromObject: (obj) => {
    switch (obj.__typename) {
      case "Movie": return `Movie:${obj.id}:${(obj as any as GetMovie_movie).language}`; // use `key` as the primary key
      default: return defaultDataIdFromObject(obj); // fall back to default handling
    }
  },
});
