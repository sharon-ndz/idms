 ###General###
variable "environment" {}
variable "region" {
  default = "us-east-1"
}

variable "tf_state_bucket" {
  type = string
  default     = "my-terraform-state-bucket"
  description = "S3 bucket for Terraform state storage"
}

variable "common_tags" {
  type = map
}

###VPC###
variable "instance_tenancy" {
  type = string
  default = "default"
}
variable "enable_dns_support" {
  type = bool
  default = true
}
variable "enable_dns_hostnames" {
  type = bool
  default = true
}
variable "vpc_name" {
  type = string
  default = "my-app-vpc"
}
variable "vpc_cidr" {
  type = string
  default = "10.0.0.0/16"
}

###IGW###
variable "internet_gateway_name" {
  type = string
  default = "my-app-igw"
}

###NGW###
variable "total_nat_gateway_required" {
  type = number
  default = 2
}
variable "eip_for_nat_gateway_name" {
  type = string
  default = "my-app-nat-eip"
}
variable "nat_gateway_name" {
  type = string
  default = "my-app-nat-gw"
}

###Private LB Subnets###
variable "private_lb_subnets" {
  type = object({
    routes                   = list(any)
    cidrs_blocks             = list(string)
    subnets_name_prefix      = string
    route_table_name         = string
  })
}

###Private App Subnets###
variable "private_app_subnets" {
  type = object({
    routes                   = list(any)
    cidrs_blocks             = list(string)
    subnets_name_prefix      = string
    route_table_name         = string
  })
}

##Private Data Subnets
variable "private_data_subnets" {
  type = object({
    routes                   = list(any)
    cidrs_blocks             = list(string)
    subnets_name_prefix      = string
    route_table_name         = string
    is_public                = bool
  })
}

##Private Services Subnets
variable "private_services_subnets" {
  type = object({
    routes                   = list(any)
    cidrs_blocks             = list(string)
    subnets_name_prefix      = string
    route_table_name         = string
  })
}

###Public Subnets###
variable "public_subnets" {
  type = object({
    routes                   = list(any)
    cidrs_blocks             = list(string)
    subnets_name_prefix      = string
    map_public_ip_on_launch  = bool
    route_table_name         = string
  })
}

##Flow Logs###
variable "s3_endpoint_name_prefix" {
  type = string
  description = "name of the s3 vpc endpoint"
}


variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "key_name" {
  default = "github-ci-key"
}
variable "public_key_path" {
  default = "~/.ssh/github-ci-key.pub"
}
