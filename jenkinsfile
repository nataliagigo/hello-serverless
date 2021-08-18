pipeline {
    agent any
    stages {
        stage('build sin test') {
            steps {
                nodejs(nodeJSInstallationName: 'nodejs') {
                    sh 'npm install'                    
                    // stash name: "ws", includes: "**"
                }           
            }
        }        
        stage('deploy') {
            steps {
                nodejs(nodeJSInstallationName: 'nodejs') {
                    withAWS(credentials: 'aws-credentials') {
                    sh 'serverless deploy'
                    }
                }
            }
        }
    }
}