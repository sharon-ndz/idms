locals {
  vpc_flow_logs = {
    bucket_arn                = data.terraform_remote_state.s3.outputs.vpc_flow_logs_bucket_arn
    log_destination_type      = "s3"
    traffic_type              = "ALL"
    max_aggregation_interval  = "60"
    name_prefix               = var.s3_endpoint_name_prefix
  }
}
