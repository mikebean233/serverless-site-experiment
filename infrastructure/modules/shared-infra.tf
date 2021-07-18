provider "google" {
  credentials = file(var.terraform_service_account_key_file)
  project     = var.project_id
  region      = var.region
}

resource "random_string" "random" {
  length = 10
  special = false
  upper = false
}

resource "google_storage_bucket" "get_projects_function_bucket" {
  name = "get_projects_function_bucket_${var.environment}_${random_string.random.result}"
}

resource "google_storage_bucket_object" "archive" {
  name   = "index.zip"
  bucket = google_storage_bucket.get_projects_function_bucket.name
  source = "../../../dynamic/getProjects/index.zip"
}

resource "google_cloudfunctions_function" "get_projects_function" {
  name        = "get-projects"
  description = "Function to handle getting projects form fire store"
  runtime     = "nodejs14"
  region      = var.cloud_functions_region

  available_memory_mb   = 128
  source_archive_bucket = google_storage_bucket.get_projects_function_bucket.name
  source_archive_object = google_storage_bucket_object.archive.name
  trigger_http          = true
  entry_point           = "getProjects"

  environment_variables = {
    PROJECT_ID = var.project_id
    COLLECTION = "project"
  }
}

# IAM entry for all users to invoke the function
resource "google_cloudfunctions_function_iam_member" "invoker" {
  project        = google_cloudfunctions_function.get_projects_function.project
  region         = google_cloudfunctions_function.get_projects_function.region
  cloud_function = google_cloudfunctions_function.get_projects_function.name

  role   = "roles/cloudfunctions.invoker"
  member = "allUsers"
}
