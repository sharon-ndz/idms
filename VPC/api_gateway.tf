resource "aws_apigatewayv2_api" "backend_api" {
  name          = "backend-api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_vpc_link" "backend_vpc_link" {
  name               = "backend-vpc-link"
  security_group_ids = [module.vpc.default_security_group_id]
  subnet_ids        = var.private_app_subnets.cidrs_blocks
}

resource "aws_apigatewayv2_integration" "backend_integration" {
  api_id                 = aws_apigatewayv2_api.backend_api.id
  integration_type       = "HTTP_PROXY"
  connection_type        = "VPC_LINK"
  connection_id          = aws_apigatewayv2_vpc_link.backend_vpc_link.id
  integration_uri        = aws_lb.backend_nlb.arn
}

resource "aws_apigatewayv2_route" "backend_route" {
  api_id    = aws_apigatewayv2_api.backend_api.id
  route_key = "ANY /{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.backend_integration.id}"
}
