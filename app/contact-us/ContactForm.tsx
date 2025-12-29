"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { X, CheckCircle2, XCircle } from "lucide-react";
import { submitContactForm } from "@/app/actions/contact";
import { formSchema } from "@/lib/schemas";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending"
  >("idle");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setStatus("sending");
    const result = await submitContactForm(values);
    setStatus("idle");
    if (result.success) {
      form.reset();
      toast.custom(
        (t) => (
          <ToastWithProgress
            t={t}
            type="success"
            message="Message sent successfully!"
          />
        ),
        { duration: 5000 }
      );
    } else {
      toast.custom(
        (t) => (
          <ToastWithProgress
            t={t}
            type="error"
            message={result.message}
          />
        ),
        { duration: 5000 }
      );
    }
  }

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="herobtn-primary cursor-pointer max-w-60 w-full m-auto" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}


function ToastWithProgress({
  t,
  message,
  type,
}: {
  t: string | number;
  message: string;
  type: "success" | "error";
}) {
  return (
    <div className="relative w-[320px] overflow-hidden rounded-xl border bg-background shadow-lg">
      <div className="flex items-start gap-3 p-4">
        {type === "success" ? (
          <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
        ) : (
          <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
        )}

        <div className="text-sm font-medium">{message}</div>

        <button
          onClick={() => toast.dismiss(t)}
          className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div
        className={`absolute bottom-0 left-0 h-1 ${
          type === "success" ? "bg-green-500" : "bg-red-500"
        } animate-toast-progress`}
      />
    </div>
  );
}