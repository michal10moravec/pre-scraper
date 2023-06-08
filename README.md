## How to run on AMD64
- install dependencies: `yarn`
- run: `yarn start`

## How to run on ARM64
- install chromium browser: `sudo apt install chromium-browser`
- set 
- install dependencies: `yarn`
- run: `yarn start`

## Example .env
```
PRE_USERNAME=
PRE_PASSWORD=
SERVER_HOST=
SERVER_PORT=
BROWSER_EXECUTABLE_PATH=
```

## How to run as a service
- update the file paths in the `pre.service` file to be correct (for node and pre-scraper)
- copy the `pre.service` file to this path `/lib/systemd/system/pre.service`
- start the service: `sudo systemctl start pre.service`
- (optional) enable the service: `sudo systemctl enable pre.service` - this will start the service on system startup
