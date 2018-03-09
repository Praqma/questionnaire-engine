# Before calling this script make sure you have the following environment variables defined (MailJet API credentials):
# MJ_APIKEY_PUBLIC
# MJ_APIKEY_PRIVATE

# Pass on the recipient emails for the script as the first argument:
RECIPIENT_EMAIL=$1

send_mail() {
  curl -s \
      -X POST \
      --user "$MJ_APIKEY_PUBLIC:$MJ_APIKEY_PRIVATE" \
      https://api.mailjet.com/v3.1/send \
      -H "Content-Type: application/json" \
      -d '{
        "Messages": [{
          "From": {
            "Email": "epe@praqma.net",
            "Name": "Questionnaire-Engine Pipeline"
          },
          "To": [{
            "Email": "'$RECIPIENT_EMAIL'",
            "Name": "CI coder"
          }],
          "Subject": "Your build is ready for release!",
          "TextPart": "Greetings! \n\n Your pipeline has finished building your release candidate. \n\n Follow this link and click on HOLD -> Approve to approve the release: \n https://circleci.com/workflow-run/'$CIRCLE_WORKFLOW_WORKSPACE_ID'"
        }]
      }'
}

# check vars are defined
if [ -z $MJ_APIKEY_PUBLIC ] || [ -z $MJ_APIKEY_PRIVATE ]; then
  echo "MJ_APIKEY not found. Did you remember to add the API keys from MailJet?"
else
  send_mail
fi
