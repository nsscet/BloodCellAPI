API Documentation
---

Routes
---

There are mainly two types of routes - ones which can be accessed without authentication and those which can be accessed with authentication.

All the routes which can be accessed without authentication are in /routes/routes.js and the routes which need authentication are in /routes/admin.js

Unprotected routes
---
get /
  - returns a welcome message if the connection to api is proper
