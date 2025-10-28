"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { languages, getVoicesByLanguage } from "~/lib/tts-voices";
import { generateSpeech } from "~/actions/generation";
import { ttsFormSchema, type TTSFormValues } from "~/schemas/tts";

export function TTSPanel() {
  const [loading, setLoading] = useState(false);

  const form = useForm<TTSFormValues>({
    resolver: zodResolver(ttsFormSchema),
    defaultValues: {
      text: "",
      language: "",
      voice: "",
    },
  });

  const selectedLanguage = form.watch("language");

  useEffect(() => {
    if (selectedLanguage) {
      form.setValue("voice", "");
    }
  }, [selectedLanguage, form]);

  const availableVoices = selectedLanguage
    ? getVoicesByLanguage(selectedLanguage)
    : [];

  const onSubmit = async (values: TTSFormValues) => {
    try {
      setLoading(true);
      await generateSpeech({
        text: values.text,
        language: values.language,
        voice: values.voice,
      });
      toast.success("Text-to-speech generation started!");
      form.reset();
    } catch (error) {
      toast.error("Failed to generate speech");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-muted/30 flex w-full flex-col border-r lg:w-80">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-1 flex-col"
        >
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter your text</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type the text you want to convert to speech..."
                        className="min-h-[200px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            <span className="flex items-center gap-2">
                              <span>{lang.flag}</span>
                              <span>{lang.name}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="voice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Voice</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={
                        !selectedLanguage || availableVoices.length === 0
                      }
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select voice" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableVoices.map((voice) => (
                          <SelectItem key={voice.id} value={voice.id}>
                            <div className="flex items-center justify-between gap-3">
                              <span>{voice.name}</span>
                              <span className="text-muted-foreground text-xs">
                                {voice.gender}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="border-t p-4">
            <Button
              type="submit"
              disabled={loading}
              className="font-sans font-normal"
            >
              {loading ? "Generating..." : "Generate Speech"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
