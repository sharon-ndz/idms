# VPC ID
output "vpc_id" {
  description = "VPC ID"
  value       = module.vpc.vpc_id
}


output "default_security_group_id" {
  description = "The default security group ID of the VPC"
  value       = module.vpc.default_security_group_id
}


# Public Subnets IDs
output "public_subnets_ids" {
  description = "public subnets ids"
  value       = module.vpc.public_subnets_ids
}

# Private Subnets IDs
output "private_subnets_ids" {
  description = "private subnets ids"
  value       = module.vpc.private_subnets_ids
}

# Public Subnets CIDRs
output "public_subnets_cidrs" {
  description = "public subnets cidrs"
  value       = module.vpc.public_subnets_cidrs
}


# Private Subnets CIDRs
output "private_subnets_cidrs" {
  description = "private subnets cidrs"
  value       = module.vpc.private_subnets_cidrs
}



output "ec2_public_ip" {
  value = aws_instance.web.public_ip
}

