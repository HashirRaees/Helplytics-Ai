import { AppShell } from "@/components/app-shell/AppShell";
import { RequestComposer } from "@/components/forms/RequestComposer";

export default function CreateRequestPage() {
  return (
    <AppShell>
      <RequestComposer />
    </AppShell>
  );
}
