resource "aws_lb" "backend_nlb" {
  name               = "backend-nlb"
  internal           = true  # Private within the VPC
  load_balancer_type = "network"
  subnets            = var.private_app_subnets.cidrs_blocks
}

resource "aws_lb_target_group" "backend_target_group" {
  name        = "backend-target-group"
  port        = 80
  protocol    = "TCP"
  vpc_id      = module.vpc.vpc_id
  target_type = "instance"
}

resource "aws_lb_target_group_attachment" "backend_instance_attachment" {
  target_group_arn = aws_lb_target_group.backend_target_group.arn
  target_id        = aws_instance.web.id
}
