#!/bin/bash

GITHUB_URL=$1
TOKEN=$2
LANG=${3:-en}
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
   $(. send-error.sh "$HOMETASK_ID" "$TOKEN")
    exit 1
fi

echo "Cloning user's repo.."
mkdir $CHECK_FOLDER
cd ./$CHECK_FOLDER
git clone "$GITHUB_URL" .

echo "Installing student's dependencies.."
npm i

echo "Generating Homework Test Report.."
npx react-scripts test --watchAll=false --json > report.json

cd ../

echo "Installing own dependencies.."
npm i

echo "Writing report.."
npm run report

echo "Creating feedback.."
npm run feedback -- "$TOKEN" "$LANG"
