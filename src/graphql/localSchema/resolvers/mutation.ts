import { InMemoryCache } from "apollo-cache-inmemory";

const Mutation = {
  updateLanguage(_: any, {language}: { language: string }, {cache}: { cache: InMemoryCache }) {
    cache.writeData({
      data: {
        language,
      },
    });

    return true;
  },
};

export default Mutation;
