import acmeLogo from "@/assets/logo-acme.png";
import apexLogo from "@/assets/logo-apex.png";
import celestiaLogo from "@/assets/logo-celestial.png";
import quantumLogo from "@/assets/logo-quantum.png";
import pulseLogo from "@/assets/logo-pulse.png";
import echoLogo from "@/assets/logo-echo.png";
import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import avatar4 from "@/assets/avatar-4.png";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  AudioLines,
  BrainCircuit,
  CaseLower,
  CaseUpper,
  Columns2,
  Columns3,
  Columns4,
  LayoutDashboard,
  LineChart,
  MessageSquare,
  RectangleHorizontal,
  Shield,
  TextSearchIcon,
} from "lucide-react";
import { Column } from "drizzle-orm";
import {
  Facebook,
  Frame,
  Framer,
  Image,
  Link2,
  PanelTop,
  Projector,
  RectangleEllipsis,
  SquareSplitVertical,
  Text,
  TextSelectionIcon,
  Twitter,
} from "lucide-react";
import { ElementLayoutProps, Option } from "./type";

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
  // {
  //   name: "AI Insights",
  //   icon: BrainCircuit,
  //   path: "/dashboard/ai-insights",
  // },
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
  "Generate a valid json object based on the description, with fields: name (string) for the form max character of 25-30, description (string) of the form max character of 100-120, and a questions array where every element has maximum fields of 6: label, placeholder, and the fieldType. The fieldType can be one of these options: RadioGroup, Select, Input, Textarea, or Switch. For Input fields, also include an inputType (e.g., text, email, number). For RadioGroup and Select types, return a fieldOptions array with text and value fields. For example, for RadioGroup and Select types, the field options array should look like [{text: 'Yes', value: 'yes'}, {text: 'No', value: 'no'}]. For Input, Textarea, and Switch types, the fieldOptions array should be empty (e.g., []). Ensure that the response is returned in valid JSON format and don't return any date picker and should always have an email field. Return a single JSON object that strictly adheres to the specified structure and constraints. Make sure to add a email field no matter the form type is. Remove any backtick and json lable at the beginning or end.";

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

export const elementColumnMoudle: ElementLayoutProps[] = [
  {
    label: "1 Column",
    type: "column",
    numberOfCol: 1,
    icon: RectangleHorizontal,
  },
  {
    label: "2 Column",
    type: "column",
    numberOfCol: 2,
    icon: Columns2,
  },
  {
    label: "3 Column",
    type: "column",
    numberOfCol: 3,
    icon: Columns3,
  },
  {
    label: "4 Column",
    type: "column",
    numberOfCol: 4,
    icon: Columns4,
  },
];

export const elementsList = [
  {
    icon: RectangleEllipsis,
    label: "Button",
    type: "Button",
    content: "Sample Button",
    url: "#",
    style: {
      textAlign: "center",
      backgroundColor: "#007bff",
      color: "#ffffff",
      padding: "10px",
      width: "auto",
      fontSize: "16px",
      borderRadius: "6px",
      fontWeight: "normal",
      objectFit: "contain",
    },
    outerStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
  },
  {
    icon: TextSelectionIcon,
    type: "Text",
    label: "Text",
    content: "Sample Text",
    style: {
      backgroundColor: "",
      color: "#000000",
      padding: "8px",
      textAlign: "center",
      fontSize: "18px",
      fontWeight: "normal",
      textTransform: "", // lowercase , capitilized
    },
    outerStyle: {
      backgroundColor: "#fff",
      width: "100%",
    },
  },
  {
    icon: TextSelectionIcon,
    type: "Paragraph",
    label: "Paragraph",
    textarea: "Add a paragraph",
    style: {
      backgroundColor: "",
      color: "#000000",
      padding: "8px",
      textAlign: "center",
      fontSize: "16px",
      fontWeight: "normal",
      textTransform: "", // uppercase, capitilized, lowercase
    },
    outerStyle: {
      backgroundColor: "#fff",
      width: "100%",
    },
  },
  {
    icon: Image,
    type: "Image",
    label: "Image",
    imageUrl: "/imagePlaceholder.png",
    alt: "Image",
    url: "#",
    style: {
      backgroundColor: "",
      padding: "10px",
      height: "50%",
      width: "70%",
      margin: "0px",
      borderRadius: "0px",
    },
    outerStyle: {
      display: "flex",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "",
    },
  },
  // {
  //   icon: Frame,
  //   type: "Logo",
  //   label: "Logo",
  //   imageUrl: "/imagePlaceholder.png",
  //   alt: "logo",
  //   url: "#",
  //   style: {
  //     backgroundColor: "",
  //     padding: "10px",
  //     height: "30%",
  //     width: "30%",
  //   },
  //   outerStyle: {
  //     display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     backgroundColor: "",
  //     width: "100%",
  //   },
  // },
  // {
  //   icon: PanelTop,
  //   type: "LogoHeader",
  //   label: "Logo Header",
  //   imageUrl: "/logo.svg",
  //   alt: "logo",
  //   url: "#",
  //   style: {
  //     backgroundColor: "#ffffff",
  //     padding: "10px",
  //     height: "40%",
  //     width: "40%",
  //   },
  //   outerStyle: {
  //     display: "flex",
  //     justifyContent: "left",
  //     alignItems: "center",
  //     backgroundColor: "#fff",
  //     width: "100%",
  //   },
  // },
  {
    icon: SquareSplitVertical,
    type: "Divider",
    label: "Divider",
    style: {
      padding: "10px",
      width: "100%",
    },
    outerStyle: {
      color: "#fff",
    },
  },
  {
    type: "SocialIcons",
    icon: Twitter,
    label: "Social Icons",
    socialIcons: [
      {
        icon: "https://cdn-icons-png.flaticon.com/128/2111/2111463.png",
        url: "",
      },
      {
        icon: "https://cdn-icons-png.flaticon.com/128/5968/5968852.png",
        url: "",
      },
      {
        icon: "https://cdn-icons-png.flaticon.com/128/5968/5968756.png",
        url: "",
      },
    ],
    options: [
      {
        icon: "https://cdn-icons-png.flaticon.com/128/2111/2111463.png",
        url: "",
      },
      {
        icon: "https://cdn-icons-png.flaticon.com/128/5968/5968852.png",
        url: "",
      },
      {
        icon: "https://cdn-icons-png.flaticon.com/128/5968/5968756.png",
        url: "",
      },
    ],
    style: {
      width: 40,
      height: 40,
    },
    outerStyle: {
      display: "flex",
      gap: 15,
    },
  },
];

export const TextAlignOption = [
  {
    icon: AlignLeft,
    value: "left",
  },
  {
    icon: AlignCenter,
    value: "center",
  },
  {
    icon: AlignRight,
    value: "right",
  },
];
export const TextTransformOption = [
  {
    icon: CaseUpper,
    value: "uppercase",
  },
  {
    icon: CaseUpper,
    value: "capitalize",
  },
  {
    icon: CaseLower,
    value: "lowercase",
  },
  {
    icon: TextSearchIcon,
    value: "initial",
  },
];
export const FontWeightOption = [
  {
    id: 1,
    value: "normal",
  },
  {
    id: 2,
    value: "bold",
  },
];
