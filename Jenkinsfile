node('dockerhost1') {
    stage('Checkout') {
        echo 'Getting source code...'
        checkout scm
    }

    stage('Test') {
        echo 'Testing...'
        sh 'npm test'
    }
    stage('Lint') {
        echo 'Testing...'
        sh 'npm lint'
    }

    stage('Start') {
      //  find out
    }
}
