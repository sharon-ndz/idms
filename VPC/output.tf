# VPC ID
output "vpc_id" {
  description = "VPC ID"
  value       = module.vpc.vpc_id
}

# Public Subnets IDs
output "public_subnets_ids" {
  description = "public subnets ids"
  value       = module.vpc.public_subnets_ids
}

# LB Subnets IDs
output "lb_subnets_ids" {
  description = "lb subnets ids"
  value       = module.vpc.lb_subnets_ids
}

# App Subnets IDs
output "app_subnets_ids" {
  description = "app subnets ids"
  value       = module.vpc.app_subnets_ids
}

# Data Subnets IDs
output "data_subnets_ids" {
  description = "data subnets ids"
  value       = module.vpc.data_subnets_ids
}

# Services Subnets IDs
output "services_subnets_ids" {
  description = "services subnets ids"
  value       = module.vpc.services_subnets_ids
}

# Public Subnets CIDRs
output "public_subnets_cidrs" {
  description = "public subnets cidrs"
  value       = module.vpc.public_subnets_cidrs
}

# LB Subnets CIDRs
output "lb_subnets_cidrs" {
  description = "lb subnets cidrs"
  value       = module.vpc.lb_subnets_cidrs
}

# App Subnets CIDRs
output "app_subnets_cidrs" {
  description = "app subnets cidrs"
  value       = module.vpc.app_subnets_cidrs
}

# Data Subnets CIDRs
output "data_subnets_cidrs" {
  description = "data subnets cidrs"
  value       = module.vpc.data_subnets_cidrs
}

# Services Subnets CIDRs
output "services_subnets_cidrs" {
  description = "services subnets cidrs"
  value       = module.vpc.services_subnets_cidrs
}
