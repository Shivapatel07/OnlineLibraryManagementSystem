pipeline {
    agent any

    environment {
        IMAGE_NAME = 'online-library:latest'
        CONTAINER_NAME = 'online-library-container'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Node and npm') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'node --version'
                        sh 'npm --version'
                    } else {
                        bat 'node --version'
                        bat 'npm --version'
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm install'
                    } else {
                        bat 'npm install'
                    }
                }
            }
        }

        stage('Application Tests') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm test'
                    } else {
                        bat 'npm test'
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker build -t ${IMAGE_NAME} .'
                    } else {
                        bat 'docker build -t %IMAGE_NAME% .'
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully. Docker image is ready.'
        }
        failure {
            echo 'Pipeline failed. Check the stage logs.'
        }
    }
}
