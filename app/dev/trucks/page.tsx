import { notFound } from "next/navigation";
import Demo from "./Demo";

/** Local test page for the truck map: not available on the real site. */
export default function Page() {
  if (process.env.NODE_ENV === "production") notFound();
  return <Demo />;
}
