#!/bin/bash

GITHUB_URL=$1
TOKEN=$2
LANG=$3
HOMETASK_ID=${4:-null}

CHECK_FOLDER="tmp"
REPO_EXISTS=$(. check-repo.sh "$GITHUB_URL")

# Clean up previous run
if [ -f ./result.json ]; then
  rm ./result.json
fi

if [ -f ./report.json ]; then
  rm ./report.json
fi

if [ -d ./"$CHECK_FOLDER" ]; then
  rm -rf "$CHECK_FOLDER"
fi
# ---

# Check if the repository exists
if [ "$REPO_EXISTS" == true ]
then
   echo 'Repo exists'
else
   $(bash  send-error.sh "$HOMETASK_ID" "$TOKEN")
    exit 1
fi

echo "CONTINUE"

#Clone repo
mkdir $CHECK_FOLDER
cd ./$CHECK_FOLDER || exit
git clone "$GITHUB_URL" .

#INSTALL DEPENDENCIES FOR HOMETASK
npm i

#Generate Homework Test Report
npx react-scripts test --watchAll=false --json > report.json

cd ../

# INSTALL DEPENDENCIES
npm i

# RUN TESTS
npm run report
npm run feedback -- "$TOKEN" "$LANG"
