import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { CredentialsBrowser, type CredentialItem } from "@/components/CredentialsBrowser";
import { store } from "@/lib/data/store";

export default function CredentialsPage() {
  const credentials = store.getCredentials();
  const userCreds = store.getUserCredentials();

  const items: CredentialItem[] = credentials.map((credential) => ({
    credential,
    status: userCreds.find((u) => u.credentialId === credential.id)?.status,
  }));

  const completed = userCreds.filter((u) => u.status === "COMPLETED").length;
  const inProgress = userCreds.filter((u) => u.status === "IN_PROGRESS").length;

  return (
    <>
      <PageHeader
        title="Industry Credentials"
        description="Browse certifications by career track and track your progress."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Available" value={credentials.length} icon="badge-check" tone="brand" />
        <StatCard label="In progress" value={inProgress} icon="target" tone="gold" />
        <StatCard label="Completed" value={completed} icon="award" tone="green" />
      </div>

      <CredentialsBrowser items={items} />
    </>
  );
}
