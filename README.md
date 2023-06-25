# Tests on JS Tests lecture of BSA

## Run tests

```bash
# run test
./test.sh <repo url> <token> <language: ua | en>  <hometask id>

# show feedback
cat ./result.json
```
```json
{
    "token": string,
    "userHometaskId": string,
    "mark": number,
    "generatedFeedback": string
}
```


## Github REST API

To make more than 50 calls you need to set up token:

1. Create .env file
   ```bash
   cp .env.example .env
   ```

2. Create GitHub [personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)
   > Settings -> Developer Settings -> Personal access token -> Generate token

3. Add generated token to env variable: GITHUB_TOKEN

4. Enjoy
