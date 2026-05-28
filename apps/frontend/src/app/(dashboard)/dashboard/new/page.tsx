import { CreateJobForm } from "@/components/dashboard/CreateJobForm";
import { Header } from "@/components/dashboard/Header";

export default function NewJobPage() {
  return (
    <section>
      <Header
        title="Create Job"
        description="Define endpoint, method, and schedule for your next automated task."
      />
      <CreateJobForm />
    </section>
  );
}
