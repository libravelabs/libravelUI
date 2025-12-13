import { buildMetadata } from "./utils";

export const meta = {
  page: (params = {}) => buildMetadata(params),

  home: (params = {}) =>
    buildMetadata({
      title: "Craft an amazing website with just copy/paste",
      useSuffix: true,
      ...params,
    }),

  docs: (params = {}) =>
    buildMetadata({
      ...params,
    }),
};
