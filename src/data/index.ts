import acmeLogo from "@/assets/logo-acme.png";
import apexLogo from "@/assets/logo-apex.png";
import celestiaLogo from "@/assets/logo-celestial.png";
import quantumLogo from "@/assets/logo-quantum.png";
import pulseLogo from "@/assets/logo-pulse.png";
import echoLogo from "@/assets/logo-echo.png";

export const Clients = [
  {
    logo: acmeLogo,
  },
  {
    logo: apexLogo,
  },
  {
    logo: celestiaLogo,
  },
  {
    logo: quantumLogo,
  },
  {
    logo: pulseLogo,
  },
  {
    logo: echoLogo,
  },
];

export const tabs = [
  {
    icon: "/assets/lottie/vroom.lottie",
    title: "User-friendly dashboard",
    isNew: false,
    backgroundPositionX: 0,
    backgroundPositionY: 0,
    backgroundSizeX: 150,
  },
  {
    icon: "/assets/lottie/click.lottie",
    title: "One-click form creation",
    isNew: false,
    backgroundPositionX: 98,
    backgroundPositionY: 100,
    backgroundSizeX: 135,
  },
  {
    icon: "/assets/lottie/stars.lottie",
    title: "Smart insight generator",
    isNew: true,
    backgroundPositionX: 100,
    backgroundPositionY: 27,
    backgroundSizeX: 177,
  },
];

import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import avatar4 from "@/assets/avatar-4.png";
import {
  AudioLines,
  BrainCircuit,
  LayoutDashboard,
  LineChart,
  MessageSquare,
  Shield,
} from "lucide-react";

export const testimonials = [
  {
    text: "“This product has completely transformed how I manage my projects and deadlines”",
    name: "Sophia Perez",
    title: "Director @ Quantum",
    avatarImg: avatar1,
  },
  {
    text: "“These AI tools have completely revolutionized our SEO entire strategy overnight”",
    name: "Jamie Lee",
    title: "Founder @ Pulse",
    avatarImg: avatar2,
  },
  {
    text: "“The user interface is so intuitive and easy to use, it has saved us countless hours”",
    name: "Alisa Hester",
    title: "Product @ Innovate",
    avatarImg: avatar3,
  },
  {
    text: "“Our team's productivity has increased significantly since we started using this tool”",
    name: "Alec Whitten",
    title: "CTO @ Tech Solutions",
    avatarImg: avatar4,
  },
];
export const sidebarMenu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Responses",
    icon: MessageSquare,
    path: "/dashboard/responses",
  },
  {
    name: "AI Insights",
    icon: BrainCircuit,
    path: "/dashboard/ai-insights",
  },
  {
    name: "Email Campaigns",
    icon: AudioLines,
    path: "/dashboard/email-campaigns",
  },
  {
    name: "Reports & Analytics",
    icon: LineChart,
    path: "#",
  },
  {
    name: "Upgrades",
    icon: Shield,
    path: "#",
  },
];

export const prompt =
  "Based on the description, generate a survey object with fields: name (string) for the form max character of 25-30, description (string) of the form max character of 100-120, and a questions array where every element has maximum fields of 6: label, placeholder, and the fieldType. The fieldType can be one of these options: RadioGroup, Select, Input, Textarea, or Switch. For Input fields, also include an inputType (e.g., text, email, number). For RadioGroup and Select types, return a fieldOptions array with text and value fields. For example, for RadioGroup and Select types, the field options array should look like [{text: 'Yes', value: 'yes'}, {text: 'No', value: 'no'}]. For Input, Textarea, and Switch types, the fieldOptions array should be empty (e.g., []). Ensure that the response is returned in JSON format and don't return any date picker and should always have an email field. The survey must include at least one email input field. Return only the valid JSON object like this {}. remove all the unnecessery things before and after like ```json{}```.";

export const feedbackPrompt =
  "Please analyze all feedback and provide: A sentiment score, Key themes or issues. Suggestions to address concerns........";

export const newsletterPropmt =
  "Generate a structured newsletter analyze the insight. The newsletter should include sections such as 'Subject', 'Content' (with subsections for an opening, highlighting positive sentiment, key benefits and a call to action. No need to suggest any photo. Format the response using HTML tags for paragraphs (<p>), strong text (<strong>), italicized text (<em>), and underlined text (<u>), ensuring the structure is clear and professional. Do not include DOCTYPE, head, or body tags, as this will be part of the email content.";

export const promtSuggestion = [
  "Please create a customer feedback form to gather opinions about our product's usability and design.",
  "Generate a feedback form to evaluate customer satisfaction with our recent service update and suggestions for improvement.",
  "Create a form to gather employee feedback on their work environment and team collaboration.",
  "I need a feedback form to collect opinions on our website's navigation, ease of use, and overall user experience.",
  "Generate a feedback form to assess customer experience with our support team, including response time and problem resolution.",
];
