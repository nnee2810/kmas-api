pipeline {
  agent any
  environment {
    AWS_ACCOUNT_ID="526510891582"
    AWS_ECR_REGION="ap-southeast-1"
    IMAGE_NAME="kmas-service"
    IMAGE_TAG="latest"
    AWS_ECR_URI="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_ECR_REGION}.amazonaws.com"
    AWS_ECR_IMAGE_URI="${AWS_ECR_URI}/${IMAGE_NAME}:${IMAGE_TAG}"
  }
  stages {
    stage("Init") {
      def dockerHome = tool "docker"
      env.PATH = "${dockerHome}/bin:${env.PATH}" 
    }
    stage("Login AWS") {
      steps {
        script {
          sh "aws ecr get-login-password --region ${AWS_ECR_REGION} | docker login --username AWS --password-stdin ${AWS_ECR_URI}"
        }
      }
    }
    stage("Build image") {
      steps {
        script {
          sh "docker build -t ${IMAGE_NAME} ."
        }
      }
    }

    stage("Tag image") {
      steps {
        script {
          sh "docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${AWS_ECR_IMAGE_URI}"
        }
      }
    }
    stage("Push image") {
      steps {
        sh "docker push ${AWS_ECR_IMAGE_URI}"
      }
    }

  }

}