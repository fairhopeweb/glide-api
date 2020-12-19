# Glide API Columns

To add an API at `/api/hello`, create the file `api/hello.ts` with:

```ts
import * as glide from "./glide";

export default glide.api(async (params) => {
  const { name } = params;

  return {
    type: "string",
    value: `Hello, ${name.value}!`,
  };
});
```

This defines a Glide API endpoint `https://<HOST>/api/hello` that takes a text value `name` and returns the text `Hello, {name}!`, which you would configure in Glide like:

![](public/column-config.png)
