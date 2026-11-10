# Copyright 2026 Arkemis S.r.l.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

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
