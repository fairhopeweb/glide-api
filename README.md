# Glide API Columns

To add an API at `/api/hello`, create the file `api/hello.ts` with:

```ts
import * as glide from "./glide";

export default glide.api(async (params) => {
  const { name } = params;

  // Check that we got a name
  if (name === undefined) {
    return undefined;
  }

  return {
    type: "string",
    value: `Hello, ${name.value}!`,
  };
});
```

This defines a Glide API endpoint `https://<HOST>/api/hello` that takes a text value `name` and returns the text `Hello, {name}!`, which you would configure in Glide like:

![](public/column-config.png)

## Deploy

You can deploy this API on Vercel:

```shell
$ npx vercel
```
