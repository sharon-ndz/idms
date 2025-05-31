module "vpc" {
  source                     = "git@github.com:tributetechnology/tributetech-terraform-modules.git//vpc"

  ###General###
  environment                = var.environment
  common_tags                = var.common_tags
  region                     = var.region

  ###VPC###
  instance_tenancy           = var.instance_tenancy
  enable_dns_support         = var.enable_dns_support
  enable_dns_hostnames       = var.enable_dns_hostnames
  vpc_name                   = var.vpc_name
  vpc_cidr                   = var.vpc_cidr

  ###IGW###
  internet_gateway_name      = var.internet_gateway_name

  ###NGW###
  total_nat_gateway_required = var.total_nat_gateway_required
  eip_for_nat_gateway_name   = var.eip_for_nat_gateway_name
  nat_gateway_name           = var.nat_gateway_name

  ###Public Subnets###
  public_subnets             = var.public_subnets

  ###Private LB Subnets###
  private_lb_subnets        = var.private_lb_subnets

  ###Private App Subnets###
  private_app_subnets        = var.private_app_subnets

  ##Private Data Subnets
  private_data_subnets       = var.private_data_subnets

  ##Private Services Subnets
  private_services_subnets   = var.private_services_subnets

  ##VPC Flow Logs
  s3_endpoint_name_prefix    = var.s3_endpoint_name_prefix
  vpc_flow_logs              = local.vpc_flow_logs
}
