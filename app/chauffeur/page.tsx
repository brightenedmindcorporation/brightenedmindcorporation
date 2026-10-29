import { notFound } from "next/navigation";
import { TRACKING_ENABLED } from "@/lib/features";
import Client from "./Client";

export default function Page() {
  if (!TRACKING_ENABLED) notFound();
  return <Client />;
}
