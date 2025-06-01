resource "aws_instance" "web" {
  ami           = "ami-03a13a09a711d3871" # Replace with correct AMI for your region
  instance_type = var.instance_type

  subnet_id              = module.vpc.public_subnets_ids[0]
  vpc_security_group_ids = [module.vpc.default_security_group_id]

  tags = {
    Name = "Backend API"
  }
}
