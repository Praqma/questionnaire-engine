node {
  checkout scm
    stage('Install dependencies') {
      sh 'docker run --rm -v /home/ubuntu/workspace/workspace/maturity-model_questionnaire:/usr/src/app -w /usr/src/app -p 3003:3000 node:8 npm install'
    }
    stage("Test") {
      sh 'docker run --rm -v /home/ubuntu/workspace/workspace/maturity-model_questionnaire:/usr/src/app -w /usr/src/app -p 3003:3000 node:8 npm test'
    }
    stage('Deploy') {
        echo 'Deploying....'
    }
}
