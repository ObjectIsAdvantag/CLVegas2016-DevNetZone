# Check real-time activities in the DevNetZone at Cisco Live Vegas 2016

Call the +1-323-374-3199 (a Tropo self-service IVR - Interactive Voice Response - attached to a Vegas Tropo phone number) 
- have the next DevNetZone activities interactively spoken to you (via Tropo Speech To Text),
- get details for an activity (Tropo DTMF - touch tone),
- subscribe to an activity and get an SMS (Tropo outbound SMS)

Text your email to the +1-323-374-3199 (via Tropo bi-directional SMS support)
or a local number closer to you (via Tropo WW local phone numbers)
- have your email address added to the DevNet zone (via a Tropo API Outbound request)
- create a Spark Room to get interactive messaging (via Cisco Spark APIs)

Launch a CiscoSpark client (Web, iOS, android, windows or mac)
- get into the DevNetZone Team 
- get real time info what's going on (via the CiscoDevNet Spark bot)
- pick a session room to interact with the speaker and other attendees


# Architecture

The DevNetZone Bot and IVR leverage the Activities API,
leveraging the Cisco Spark and Tropo APIs,

The bot is deployed on CleverCloud servers, and persists its Data into PostgreSQL.

This repo contains the Activities API


# Want to learn more

DEVNET2002

DEVNET3002


# License

MIT, see license file.

Feel free to use, reuse, extend, and contribute



