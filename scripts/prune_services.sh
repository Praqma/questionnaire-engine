# requires to have $AWS_SERVICE_NAME_PROD declared in the shell where the script is executed

destroy_service() {
  fargate service scale $1 0
  fargate service destroy $1
}

kill_old_services() {
  if [ "$AWS_SERVICE_NAME_PROD" = "" ]; then
    echo "[!] Could not prune ECS services. AWS_SERVICE_NAME_PROD not defined."
  else
    # get the list of all running services except AWS_SERVICE_NAME_PROD
    fargate service list | grep -v $AWS_SERVICE_NAME_PROD | grep -o '^\S*' | grep -v NAME | sed '/^$/d' | while read line
    do
      destroy_service $line
    done
  fi
}

kill_old_services
