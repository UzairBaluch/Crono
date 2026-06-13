import { CreateJobForm } from "@/shared/components/dashboard/create-job-form";
import { Header } from "@/shared/components/dashboard/header";

export default function NewJobPage() {
  return (
    <section>
      <Header
        title="Create Job"
        description="Schedule an HTTP endpoint with cron, method, headers, and body."
      />
      <CreateJobForm />
    </section>
  );
}
