# agora

A clone of [agora.eto.tech]. AGORA stands for AI GOvernance and Regulatory
Archive.

[agora.eto.tech]: https://agora.eto.tech

# setup

This repo uses [corpus-api] so run that first. Then, generate the webpages once.
Finally, serve the website.

```sh
deno task generate
deno task serve
```

[corpus-api]: https://github.com/policyobservatory/corpus-api
