@echo off
echo Starting Ngrok for Client (5173) and Server (3000)...
echo Note: You need to have ngrok installed and authenticated.
echo.
echo For exposing the Full Stack App, usually we expose the Frontend.
echo The Frontend connects to http://localhost:3000/api.
echo If you want to access it publicly, you need to expose BOTH or proxy API through Frontend.
echo.
echo Option 1: Expose Frontend only (Local API access only works on your machine)
echo ngrok http 5173
echo.
echo Option 2: Use ngrok with configuration file to expose both (advanced)
echo.
echo For this practice, we will expose the Client.
ngrok http 5173
