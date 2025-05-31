###VPC###
enable_dns_support          = true
enable_dns_hostnames        = true
vpc_name                    = "stage-cfs-vpc"
vpc_cidr                    = "10.122.0.0/16"

###IGW###
internet_gateway_name       = "stage-cfs-igw"

###NGW###
total_nat_gateway_required  = 3
eip_for_nat_gateway_name    = "stage-cfs-eip"
nat_gateway_name            = "stage-cfs-ngw"

###Private Subnets###
private_lb_subnets = {
    "routes": [],
    "cidrs_blocks": ["10.122.15.0/26", "10.122.15.64/26", "10.122.15.128/26"],
    "subnets_name_prefix": "stage-lb",
    "route_table_name": "stage-lb"
}

private_app_subnets = {
    "routes": [],
    "cidrs_blocks": ["10.122.16.0/22", "10.122.20.0/22", "10.122.24.0/22"],
    "subnets_name_prefix": "stage-app",
    "route_table_name": "stage-app"
}

##Private Data Subnets
private_data_subnets = {
    "routes": [],
    "cidrs_blocks": ["10.122.40.0/24", "10.122.41.0/24", "10.122.42.0/24"],
    "subnets_name_prefix": "stage-data",
    "route_table_name": "stage-data",
    "is_public": true
}

##Private Services Subnets
private_services_subnets = {
    "routes": [],
    "cidrs_blocks": ["10.122.254.0/26", "10.122.254.64/26", "10.122.254.128/26"],
    "subnets_name_prefix": "stage-service",
    "route_table_name": "stage-service",
}

###Public Subnets###
public_subnets = {
    "routes": [],
    "cidrs_blocks": ["10.122.0.0/24", "10.122.1.0/24", "10.122.2.0/24"],
    "subnets_name_prefix": "stage-public",
    "map_public_ip_on_launch": true,
    "route_table_name": "stage-public"
}
