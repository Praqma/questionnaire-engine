node("docker") {
    docker.withRegistry('edmond', 'b4963529-89aa-432e-a7e1-81f67335ff67') {

        git url: "git@github.com:Praqma/maturity-model.git", credentialsId: '27582316-7933-40f8-a89c-a35d0b4e9f5c'

        sh "git rev-parse HEAD > .git/commit-id"
        def commit_id = readFile('.git/commit-id').trim()
        println commit_id

        stage "build"
        def app = docker.build "your-project-name"

        stage "publish"
        app.push 'master'
        app.push "${commit_id}"
    }
}
