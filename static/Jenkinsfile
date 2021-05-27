pipeline {
    agent {
        docker {
            image 'node:16.2.0-alpine3.12'
            args '-p 3000:3000'
        }
    }
    environment {
        HOME = '.'
    }
    stages {
        stage('Build') {
            steps {
                dir("./static") {
                     sh 'pwd'
                     sh 'ls -All'
                     sh 'npm install'
                     sh 'npm run build'
                }
            }
        }
    }
}
