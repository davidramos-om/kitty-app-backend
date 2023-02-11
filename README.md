# Nest JS API
<hr/>

## Description
This is a simple GraphQL API built with Nest JS. 

It connects to the CoinMarketCap API to get the latest cryptocurrency prices.

Also it connects to the CoinGecko API to get additional information about the cryptocurrencies such as the market cap, volume, circulating supply, etc.


## App

[Kitty App](https://github.com/davidramos-om/kitty-app)

## Deploy to Vercel

<details>
<summary>1. Create a vercel config file</summary>
<p><br/>add a file called 'vercel.json` to the root of the project with a content like this:
</p>

```json
{
    "version": 2,
    "builds": [
        {
            "src": "dist/main.js",
            "use": "@vercel/node",
            "config": {
                "maxLambdaSize": "10mb",
                "includeFiles": [
                    "dist/**"
                ]
            }
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "dist/main.js",
            "methods": [
                "GET",
                "POST",
                "PUT",
                "DELETE"
            ]
        }
    ]
}
```
</details>
<br/>
<details>
<summary>2. Run the following commands</summary>

```bash
    npm i -g vercel # Install Vercel CLI globally
    vercel --version # Check Vercel CLI version
    vercel --login # Login to Vercel
    vercel --prod # Deploy to production   
```
</details>
<br/>
<details>
<summary>3. Issues with the deployment</summary>

1. EROFS: read-only file system, open 'schema.gql' : 
    - Solution: in app.module, change the following:
    ```ts
    // autoSchemaFile: 'schema.gql',
     autoSchemaFile: true, // or isDevlEnvironment() ? 'schema.gql' : true,
    ```

</details>
