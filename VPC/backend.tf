terraform {
  backend "s3" {
    bucket = "my-terraform-state-bckt"
    key    = "stage/terraform.tfstate"
    region = "us-east-1"
  }
}
