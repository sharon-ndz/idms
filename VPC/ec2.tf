resource "aws_instance" "web" {
  ami           = "ami-0c94855ba95c71c99" # Replace with correct AMI for your region
  instance_type = var.instance_type

  subnet_id              = module.vpc.public_subnets[0]
  vpc_security_group_ids = [module.vpc.default_security_group_id]

  tags = {
    Name = "Backend API"
  }
}
