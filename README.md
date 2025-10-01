## MxRep's Official Backend Service

Designed to store data from our Roblox production line simulator and serve our financial frontend
application, this node + express + postrgres backend is the official backend of the
R&EIT department's MxRep project.

### Architecture Design

It's made to be simple but powerful, hosting an array of endpoints both for receiving POST requests
from our Roblox simulator game, and offering GET requests for our education finance app to turn the 
raw production line data of the simulator into meaningful financial indicators and forecasts.

That's why Node + Express was chosen.

As for our database, we went with robust Postgres for organized sql and to manage our delicately
related 15+ tables.

### TBD...