# To exit in case any command fails
set -e
set -o pipefail


yarn build:sandbox

# Slack message for deployment
# curl -X POST https://hooks.slack.com/services/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 \
# -header 'Content-type: application/json' --data '{"text":"Deploying Builder Dashboard to Sandbox"}'


# xapp-1-A061X0UU0KH-6102568677280-0550acb6004b6d1e1ee4e545eb7cf3908cb1245c32d4e8302969100c1cd214b7


aws --profile deploy s3 cp dist s3://hkwebapp-sandbox --recursive
aws --profile deploy cloudfront create-invalidation --distribution-id EBE1KJT2EQPFV --paths "/*"