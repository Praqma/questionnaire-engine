node {
  checkout scm
  def workspace = pwd()
    stage('Preparation') {
      echo "Building in dir: $PWD"
      sh "docker run --rm -v ${workspace}:/usr/src/app -w /usr/src/app -p 3003:3000 node:8 npm install"
    }
    stage("Build") {

    }
    stage("Test") {
      sh "docker run --rm -v ${workspace}:/usr/src/app -w /usr/src/app -p 3003:3000 node:8 npm test"
    }
    stage('Deploy') {
        echo 'Deploying....'
    }
}
