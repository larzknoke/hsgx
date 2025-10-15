"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function BillForm() {
  const formSchema = z.object({
    trainer: z.string().min(1, { message: "This field is required" }),
    stammverein: z.string().min(1, { message: "This field is required" }),
    mannschaft: z.string().min(1, { message: "This field is required" }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trainer: "",
      stammverein: "",
      mannschaft: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  function onReset() {
    form.reset();
    form.clearErrors();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={onReset}
        className="space-y-8 @container"
      >
        <div className="grid grid-cols-12 gap-6">
          <FormField
            control={form.control}
            name="trainer"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Übungsleiter/in</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Select
                      key="select-0"
                      id="trainer"
                      className=""
                      {...field}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Überungsleiter auswählen..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem key="user_1" value="user_1">
                          Johannes Wellmann
                        </SelectItem>

                        <SelectItem key="user_2" value="user_2">
                          Lars Knoke
                        </SelectItem>

                        <SelectItem key="user_3" value="user_3">
                          Kirsten Gronstedt
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stammverein"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Stammverein</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Select
                      key="select-0-1"
                      id="stammverein"
                      className=""
                      {...field}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Stammverein auswählen..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem key="hol" value="hol">
                          MTV Holzminden
                        </SelectItem>

                        <SelectItem key="sdorf" value="sdorf">
                          TV Stadtoldendorf
                        </SelectItem>

                        <SelectItem key="bevern" value="bevern">
                          MTV Bevern
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mannschaft"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Mannschaft</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Select
                      key="select-0-1-2"
                      id="mannschaft"
                      className=""
                      {...field}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Mannschaft auswählen..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem key="mD" value="mD">
                          männlich D
                        </SelectItem>

                        <SelectItem key="wC" value="wC">
                          weiblich C
                        </SelectItem>

                        <SelectItem key="herren1" value="herren1">
                          Herren 1
                        </SelectItem>

                        <SelectItem key="Herren2" value="Herren2">
                          Herren 2
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
