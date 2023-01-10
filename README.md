## Requirements
```
1. node.js 16.9.0^
2. NPM 7.21.1^
3. Git
4. A console capable of running the commands below
```
## Install and Start
Copy and paste all of this into your command console.
```bash
git clone https://github.com/daniscript/osTicket && \
cd osTicket ; npm install && \
echo "TOKEN=BOT_TOKEN
MONGOOSE=CONNECT_MONGOOSE" > ".env" && \
npm run start
```
## Available Commands
```
!ticket create | Create a ticket
!ticket close  | Close a ticket
!ticket delete | Delete a ticket
```