pipeline {
  agent any
  environment {
    AWS_ACCOUNT_ID="526510891582"
    AWS_USER_NAME="kmas-service"
    AWS_ACCESS_KEY_ID="AKIAXVFT6UI7NM4YVHWB"
    AWS_SECRET_ACCESS_KEY="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"
    AWS_REGION="ap-southeast-1"
    IMAGE_NAME="kmas-service"
    IMAGE_TAG="latest"
    AWS_ECR_URI="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
    AWS_ECR_IMAGE_URI="${AWS_ECR_URI}/${IMAGE_NAME}:${IMAGE_TAG}"
  }
  
  stages {
    stage("Login AWS") {
      steps {
        script {
          sh "aws configure set aws_access_key_id ${AWS_ACCESS_KEY_ID}"
          sh "aws configure set aws_secret_access_key  ${AWS_SECRET_ACCESS_KEY}"
          sh "aws configure set region ${AWS_REGION}"
          sh "aws configure set output json"
          sh "aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ECR_URI}"
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