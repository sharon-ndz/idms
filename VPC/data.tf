data "terraform_remote_state" "s3" {
  backend = "s3"
  config = {
    bucket = var.tf_state_bucket
    key    = "env:/${var.environment}/s3/terraform.tfstate"
    region = "us-east-1"
  }
}
