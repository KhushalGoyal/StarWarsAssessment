pipeline {
  agent any
  stages {
    stage('Build Backend') {
      parallel {
        stage('Build Backend') {
          steps {
            sh '''cd star-wars-backend
echo "
PORT=3000
API_TOKEN=PeRVZ5p3RS7EzmdULoXWtulJUOcj61xfi1VKcCLJxOwz3k3t0eghJ8gZHSvbuyHC
NODE_ENV=production
" > .env'''
            sh 'ls -al'
            sh 'docker build ./star-wars-backend -t star-wars-backend/v1'
          }
        }

        stage('Build Frontend') {
          steps {
            sh 'docker build ./star-wars-frontend -t star-wars-frontend/v1'
          }
        }

      }
    }

  }
}