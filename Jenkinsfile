pipeline {
  agent any
  stages {
    stage('Build Backend') {
      steps {
        sh '''echo "
PORT=3000
API_TOKEN=PeRVZ5p3RS7EzmdULoXWtulJUOcj61xfi1VKcCLJxOwz3k3t0eghJ8gZHSvbuyHC
NODE_ENV=production
" > .env'''
        sh 'docker build ./star-wars-backend'
      }
    }

  }
}