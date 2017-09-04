node {
  checkout scm
  def workspace = pwd()
    stage('Test') {
      sh "docker run --rm -v ${workspace}:/usr/src/app -w /usr/src/app -p 3003:3000 node:8 npm install"
      sh "docker run --rm -v ${workspace}:/usr/src/app -w /usr/src/app -p 3003:3000 node:8 npm test"
    }
    stage('Lint') {
      sh "docker run --rm -v ${workspace}:/usr/src/app -w /usr/src/app -p 3003:3000 node:8 npm run lint"
    }
    stage("Build") {
      sh "docker run --rm -v ${workspace}:/usr/src/app -w /usr/src/app -p 3003:3000 node:8 npm run build"
    }
    stage('Deploy') {
        echo 'Deploying....'
    }
}
