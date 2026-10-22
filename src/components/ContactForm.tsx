"use client";
import { Check, ChevronRight, Loader2 } from "lucide-react";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/ace-input";
import { Textarea } from "./ui/ace-textarea";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { config } from "@/data/config";

const EMAILJS_USER_ID = process.env.NEXT_PUBLIC_USER_ID;
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID;

const ContactForm = () => {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { toast } = useToast();

  const [honey, setHoney] = React.useState(""); // spam trap, hidden from people

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honey) return; // a bot filled the hidden field
    setLoading(true);

    // Last resort: open the visitor's email app with the message ready
    const openMailApp = () => {
      const subject = encodeURIComponent(`Portfolio enquiry from ${fullName}`);
      const body = encodeURIComponent(`${message}\n\n${fullName}\n${email}`);
      window.location.href = `mailto:${config.email}?subject=${subject}&body=${body}`;
    };

    const sendWithEmailJS = async () => {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_USER_ID,
          template_params: { from_name: fullName, reply_to: email, message },
        }),
      });
      if (!res.ok) throw new Error(await res.text());
    };

    // FormSubmit.co forwards the message to config.email. No account or key:
    // the very first message sends an "Activate form" email to that inbox,
    // which must be clicked once. After that every message is delivered.
    const sendWithFormSubmit = async () => {
      const res = await fetch(`https://formsubmit.co/ajax/${config.contactFormId || config.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: fullName,
          email,
          message,
          _subject: `Portfolio message from ${fullName}`,
          _replyto: email,
          _template: "table",
          _captcha: "false",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) !== "true") {
        throw new Error(data.message || `FormSubmit ${res.status}`);
      }
    };

    try {
      if (EMAILJS_USER_ID && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID) {
        await sendWithEmailJS();
      } else {
        await sendWithFormSubmit();
      }
      toast({
        title: "Message sent",
        description: "Thanks! I'll reply to the email address you gave.",
        className: cn("top-0 mx-auto fixed"),
      });
      setFullName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Contact form failed:", err);
      openMailApp();
      toast({
        title: "Opening your email app",
        description: `The form couldn't send, so your email app has the message ready. Or write to ${config.email}.`,
        className: cn("top-0 w-full mx-auto"),
      });
    }
    setLoading(false);
  };
  return (
    <form className="min-w-7xl mx-auto sm:mt-4" onSubmit={handleSubmit}>
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        value={honey}
        onChange={(e) => setHoney(e.target.value)}
        className="hidden"
      />
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
        <LabelInputContainer>
          <Label htmlFor="fullname">Full name</Label>
          <Input
            id="fullname"
            placeholder="Your Name"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="you@example.com"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </LabelInputContainer>
      </div>
      <div className="grid w-full gap-1.5 mb-4">
        <Label htmlFor="content">Your Message</Label>
        <Textarea
          placeholder="Tell me about the role or project"
          id="content"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <p className="text-sm text-muted-foreground">
          Your details are only used to reply to you.
        </p>
      </div>
      <Button
        disabled={loading}
        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        type="submit"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <p>Please wait</p>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            Send Message <ChevronRight className="w-4 h-4 ml-4" />
          </div>
        )}
        <BottomGradient />
      </Button>
    </form>
  );
};

export default ContactForm;

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-brand to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent orange-400 to-transparent" />
    </>
  );
};
