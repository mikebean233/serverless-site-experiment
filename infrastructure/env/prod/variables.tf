variable "project_id" { type = string }
variable "region" { type = string }
variable "cloud_functions_region" { type = string }
variable "terraform_service_account_key_file" { type = string }

variable "environment" {
  type = string
  default = "prod"
}
