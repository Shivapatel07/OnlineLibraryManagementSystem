
pipeline {
    agent any

    stages {

        stage('GitHub Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Shivapatel07/OnlineLibraryManagementSystem.git'
            }
        }

        stage('Check Node and NPM') {
            steps {
                bat 'node --version'
                bat 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t online-library-management-system:latest .'
            }
        }

        stage('Verify Docker Image') {
            steps {
                bat 'docker images'
            }
        }
    }

    post {
        success {
            echo 'BUILD SUCCESSFUL - Online Library Management System'
        }

        failure {
            echo 'BUILD FAILED - Check Jenkins Console Output'
        }

        always {
            echo 'Jenkins Pipeline Execution Completed'
        }
    }
}
