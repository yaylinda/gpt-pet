#!/bin/bash

TEMPLATE_FILE="$(pwd)/.env.local.template"
ENV_FILE="$(pwd)/.env.local"
SECRETS_FILE="$(pwd)/.env.secrets"

cat "$TEMPLATE_FILE" > "$ENV_FILE"

# Get the local IP address
IP=$(ifconfig | grep inet | grep -v inet6 | grep -v 127.0.0.1 | awk '{print $2}' | cut -d'/' -f1 | head -n1)

# Replace {LOCAL_IP} with the IP in .env.local
sed -i "" "s/{LOCAL_IP}/$IP/g" "$ENV_FILE"

# Run supabase status, get the ANON_KEY value
ANON_KEY=$(supabase status -o env 2>/dev/null | grep ANON_KEY | cut -d '"' -f2)

# Replace {ANON_KEY} with the actual ANON_KEY in .env.local
sed -i "" "s/{ANON_KEY}/$ANON_KEY/g" "$ENV_FILE"

# Copy the contents of .env.secrets to .env.local
cat "$SECRETS_FILE" >> "$ENV_FILE"
