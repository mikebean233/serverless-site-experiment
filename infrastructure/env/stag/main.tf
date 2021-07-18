terraform {
  backend "gcs" {
  }
}

module "shared-infra" {
  source = "../../modules"
  project_id = var.project_id
  region = var.region
  environment = var.environment
  terraform_service_account_key_file = var.terraform_service_account_key_file
  cloud_functions_region = var.cloud_functions_region
}
