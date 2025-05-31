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
}
variable "enable_dns_hostnames" {
  type = bool
}
variable "vpc_name" {
  type = string
}
variable "vpc_cidr" {
  type = string
}

###IGW###
variable "internet_gateway_name" {
  type = string
}

###NGW###
variable "total_nat_gateway_required" {
  type = number
}
variable "eip_for_nat_gateway_name" {
  type = string
}
variable "nat_gateway_name" {
  type = string
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
    routes              = ["10.0.0.0/16"]            # Route to main VPC CIDR
    cidrs_blocks        = ["10.0.3.0/24", "10.0.4.0/24"] # Define subnet CIDR ranges
    subnets_name_prefix = "private-app"
    route_table_name    = "private-app-rt"
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
  default     = "my-app-flowlogs"
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
