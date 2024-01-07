pipeline {
  agent any
  stages {
    stage('Build Backend') {
      parallel {
        stage('Build Backend') {
          steps {
            sh 'docker build ./star-wars-backend'
          }
        }

        stage('Create Env file') {
          steps {
            sh '''echo "
PORT=3000
API_TOKEN=PeRVZ5p3RS7EzmdULoXWtulJUOcj61xfi1VKcCLJxOwz3k3t0eghJ8gZHSvbuyHC
NODE_ENV=production
" > .env'''
          }
        }

      }
    }

  }
}