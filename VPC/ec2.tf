resource "aws_instance" "web" {
  ami           = "ami-0f9de6e2d2f067fca" # Replace with correct AMI for your region
  instance_type = var.instance_type

  subnet_id              = module.vpc.public_subnets_ids[0]
  vpc_security_group_ids = [module.vpc.default_security_group_id]
  iam_instance_profile   = aws_iam_instance_profile.ec2_ssm_profile.name
  user_data = <<-EOF
              #!/bin/bash
              sudo yum update -y
              sudo yum install -y amazon-ssm-agent
              sudo systemctl enable amazon-ssm-agent
              sudo systemctl start amazon-ssm-agent
              EOF
  tags = {
    Name = "Backend API2-HEY"
  }
}
