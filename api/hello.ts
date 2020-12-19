import * as glide from "./glide";

// This is the /api/hello endpoint
export default glide.api(async (params) => {
  const { name } = params;

  return {
    type: "string",
    value: `Hello, ${name.value}!`,
  };
});
