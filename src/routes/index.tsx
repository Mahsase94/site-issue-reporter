import { createFileRoute } from "@tanstack/react-router";
import { IssueReportApp } from "../components/issue-report/App";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <IssueReportApp />;
}
