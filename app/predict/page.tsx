import { redirect } from "next/navigation";

export default function PredictFallback() {
  // If they land on /predict, just send them back home to search properly
  redirect("/");
}