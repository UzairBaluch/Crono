import { CreateJobForm } from "@/shared/components/dashboard/create-job-form";
import { Header } from "@/shared/components/dashboard/header";

export default function CreateJobPage() {
  return (
    <section>
      <Header
        title="Create Job"
        description="Complete setup in under 60 seconds with simple defaults."
      />
      <CreateJobForm />
    </section>
  );
}
