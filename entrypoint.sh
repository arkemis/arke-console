#!/bin/bash

# Create __ENV.js file in the public directory
echo "window.__ENV = {" > ./public/__ENV.js

# Loop through all environment variables
for var in $(env | grep '^NEXT_PUBLIC_' | cut -d= -f1); do
  # Extract the variable name and value
  value=$(printenv "$var")
  # Format and append to __ENV.js
  echo "  $var: \"${value}\"," >> ./public/__ENV.js
done

# Close the JSON object in __ENV.js
echo "};" >> ./public/__ENV.js

# Start the server
node server.js
