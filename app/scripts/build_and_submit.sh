#!/bin/bash

# File name
file="app.json"

# Get the values from the JSON file
buildNumber=$(jq -r '.expo.ios.buildNumber' $file)
versionCode=$(jq -r '.expo.android.versionCode' $file)

# Increment the values
newBuildNumber=$(($buildNumber+1))
newVersionCode=$(($versionCode+1))

echo "Incrementing ios.buildNumber from $buildNumber to $newBuildNumber"
echo "Incrementing android.versionCode from $versionCode to $newVersionCode"

# Update the JSON file
jq --arg bn "$newBuildNumber" --argjson vc $newVersionCode '.expo.ios.buildNumber = $bn | .expo.android.versionCode = $vc' $file > temp.json && mv temp.json $file

# Push the updated app.json version numbers to git
git add $file
git commit -m "increment buildNumber=${newBuildNumber} versionCode=${newVersionCode}"
git push

eas build --auto-submit --platform ios --profile ios_submit &
eas build --auto-submit --platform android --profile android_submit &
