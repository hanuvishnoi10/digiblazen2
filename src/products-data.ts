import { Product, Inquiry, Order } from "./types";

export const initialProducts: Product[] = [
  {
    id: "prod-3",
    title: "Veo 3 Ultra Access (25,000 Credits)",
    description: "Unlock premium Veo 3 Ultra access with 25,000 AI credits included. Perfect for creators, marketers, agencies, and businesses looking to generate high-quality AI content, videos, images, and creative assets with a smooth and reliable experience.",
    longDescription: "Unlock premium Veo 3 Ultra access with 25,000 AI credits included. Perfect for creators, marketers, agencies, and businesses looking to generate high-quality AI content, videos, images, and creative assets with a smooth and reliable experience.",
    price: 45,
    priceInr: 4300,
    category: "videos",
    thumbnail: "https://res.cloudinary.com/dwymt9xi4/image/upload/v1780595351/Google_Flow_rmhegq.png",
    features: [
      "25,000 AI Credits Included",
      "Instant Account Activation",
      "Private Login Credentials",
      "Smooth & Reliable Performance"
    ],
    salesCount: 124,
    rating: 4.9,
    fileSize: "Web App Access",
    format: "Private Keys & Credentials",
    demoUrl: "https://labs.google/fx/tools/flow",
    websiteUrl: "https://labs.google/fx/tools/flow",
    validity: "30 Days Access",
    warranty: "25 Days Warranty"
  },
  {
    id: "prod-5",
    title: "ElevenLabs Creator Plan",
    description: "Unlock premium AI voice generation and advanced AI video creation with the ElevenLabs Creator Plan. Access industry-leading voice cloning, realistic AI narration, video generation tools, motion control, upscaling, and cinematic content creation from a single account.",
    longDescription: `Unlock premium AI voice generation and advanced AI video creation with the ElevenLabs Creator Plan. Access industry-leading voice cloning, realistic AI narration, video generation tools, motion control, upscaling, and cinematic content creation from a single account.

Key Advantages:
• 131,000 Credits Included
• Premium AI Voice Cloning & Audio Generation
• Advanced AI Video Creation Tools
• Full Email Access & Instant Activation

License and Validity:
• 1 Month Plan
• 25 Days Warranty
• Full Mail Access
• Instant Delivery

Available Models & Tools:
• Kling 3.0 & Motion Control
• Seedance 2.0 & Seedance 2.0 Fast
• Veo 3.1 Lite
• Gen-4.5
• Lip Sync & Upscaling
• Audio-Backed Video Generation
• Editing Tools
• AI Voice Cloning
• Professional Narration Tools
• Studio-Quality Voice Generation

Subscription Options:
• 1 Month Plan
• 3 Months Plan
• 12 Months Plan

DM for Subscription Pricing`,
    price: 10,
    priceInr: 949,
    category: "videos & audio",
    thumbnail: "https://res.cloudinary.com/dwymt9xi4/image/upload/v1779604427/229981_fexm1f.jpg",
    features: [
      "131,000 Credits Included",
      "Premium AI Voice Cloning & Audio Generation",
      "Advanced AI Video Creation Tools",
      "Full Email Access & Instant Activation"
    ],
    salesCount: 156,
    rating: 4.9,
    fileSize: "Web Service Access",
    format: "Subscription Account Credentials",
    demoUrl: "https://elevenlabs.io",
    websiteUrl: "https://elevenlabs.io",
    validity: "1 Month Plan",
    warranty: "25 Days Warranty"
  },
  {
    id: "prod-6",
    title: "Google AI Pro + 5TB Storage",
    description: "Unlock premium Google Workspace, extensive cloud storage, advanced reasoning, and cinematic AI media creation tools. (Official Value: $300+)",
    longDescription: `Unlock premium Google Workspace, extensive cloud storage, advanced reasoning, and cinematic AI media creation tools with the Google AI Pro + 5TB Storage subscription.

### Included Features:
• Gemini 3.1 Pro
• Deep Research
• 5TB Google One Storage
• Antigravity Access
• Veo 3.1
• Nano Banana Pro
• Workspace Integration
• 1,000 AI Credits Every Month`,
    price: 11,
    priceInr: 999,
    category: "Coding, Video, AI Chatbots",
    thumbnail: "https://res.cloudinary.com/dwymt9xi4/image/upload/v1780596814/copy_of_a-robotic-hand-reaching-upward-surrounded-by-gemini-and-thumbs-down-icons-with-the-text-google-ai-pro-and-the-google-logo-above_rgq0aw.avif",
    features: [
      "5TB Google One Cloud Storage Included",
      "Gemini 3.1 Pro & Deep Research Access",
      "Veo 3.1 + Nano Banana Pro Video Generation",
      "1,000 Monthly AI Credits Included"
    ],
    salesCount: 218,
    rating: 4.9,
    fileSize: "5 TB Cloud Allocation",
    format: "Private Account Access",
    demoUrl: "https://one.google.com",
    websiteUrl: "https://one.google.com",
    validity: "18 Months Access",
    warranty: "12 Months Warranty"
  },
  {
    id: "prod-7",
    title: "ChatGPT Plus",
    description: "Unlock premium access to the latest ChatGPT models with fast priority speeds, stable account credentials, and advanced assistant tools.",
    longDescription: `Unlock premium access to ChatGPT with the latest models, fast & priority response speeds, stable premium account access, and instant activation & delivery—all from a single stable account.

### Included Features:
• Latest ChatGPT Models
• Advanced AI Chat Assistance
• Content Writing & Research
• Coding & Debugging Support
• Productivity & Learning Tools
• Priority Access During Peak Hours`,
    price: 5,
    priceInr: 499,
    category: "AI Chatbots",
    thumbnail: "https://res.cloudinary.com/dwymt9xi4/image/upload/v1780596967/Chat-GPT-logo_qzkvlk.webp",
    features: [
      "Access to the Latest ChatGPT Models",
      "Fast & Priority Response Speeds",
      "Stable Premium Account Access",
      "Instant Activation & Delivery"
    ],
    salesCount: 342,
    rating: 4.9,
    fileSize: "Web Portal Access",
    format: "Premium Shared/Private Credentials",
    demoUrl: "https://chatgpt.com",
    websiteUrl: "https://chatgpt.com",
    validity: "1 Month Plan",
    warranty: "25 Days Warranty"
  },
  {
    id: "prod-8",
    title: "Google Antigravity Ultra",
    description: "Access Google's state-of-the-art autonomous AI coding agent with premium Antigravity Ultra model capabilities, high-speed execution, and secure personal environment.",
    longDescription: `Unlock the full power of Google's flagship autonomous coding environment with the Antigravity Ultra Plan. Experience premium multi-agent workflows, code generation, instant execution environments, and zero-compromise security.

### Included Features:
• Advanced AI Tools & Capabilities
• High-Speed Performance
• Secure & Reliable Access
• Enhanced Productivity Features
• Stable Usage Experience
• Regular Updates & Improvements
• Premium-Level Functionality
• Minimal Downtime`,
    price: 37,
    priceInr: 3499,
    category: "Coding, Videos, AI Chatbots",
    thumbnail: "https://res.cloudinary.com/dwymt9xi4/image/upload/v1780597135/Google-Unveils-Antigravity-The-AI-Coding-Tool-That-Builds-and-Tests-Code-Itself_rkhuc0.webp",
    features: [
      "5,000 Credits Included",
      "Premium Antigravity Ultra Access",
      "Mail-Based Account Activation",
      "Fast, Stable & Secure Performance"
    ],
    salesCount: 89,
    rating: 5.0,
    fileSize: "Cloud Access Port",
    format: "Verified Portal Login",
    demoUrl: "https://ai.studio",
    websiteUrl: "https://ai.studio",
    validity: "1 Month Plan",
    warranty: "25 Days Warranty"
  },
  {
    id: "prod-9",
    title: "Adobe Creative Cloud Enterprise",
    description: "Unlock the complete Adobe Creative Cloud experience with enterprise-level access on your own email. Perfect for designers, video editors, and creative professionals.",
    longDescription: `Unlock the complete Adobe Creative Cloud experience with enterprise-level access on your own email. Perfect for designers, video editors, content creators, marketers, and creative professionals who need industry-leading software and AI-powered creative tools.

### Included Applications & Features:
• Photoshop
• Premiere Pro
• After Effects
• Illustrator
• Lightroom
• Adobe Express
• Acrobat Pro
• Beta Applications
• Nano Banana Included
• 24/7 Adobe Support
• Windows, Mac & iPad Support
• Annual Billing Benefits`,
    price: 13,
    priceInr: 1199,
    category: "Design, Videos, Creative Tools",
    thumbnail: "https://res.cloudinary.com/dwymt9xi4/image/upload/v1780597917/adobe_cloud_gag8um.jpg",
    features: [
      "20+ Adobe Apps & Beta Applications Included",
      "4,000 AI Credits Every Month",
      "1TB Cloud Storage Included",
      "Activation on Your Own Email"
    ],
    salesCount: 174,
    rating: 4.9,
    fileSize: "1 TB Cloud Storage",
    format: "Enterprise Seat Activation",
    demoUrl: "https://www.adobe.com",
    websiteUrl: "https://www.adobe.com",
    validity: "4 Months Plan",
    warranty: "4 Months Warranty"
  },
  {
    id: "prod-10",
    title: "YouTube Premium + YouTube Music",
    description: "Enjoy an ad-free entertainment experience with YouTube Premium and YouTube Music. Stream videos and music without interruptions, download content for offline viewing, and enjoy background playback across your devices.",
    longDescription: `Enjoy an ad-free entertainment experience with YouTube Premium and YouTube Music. Stream videos and music without interruptions, download content for offline viewing, and enjoy background playback across your devices.

### Included Features:
• Ad-Free YouTube Viewing
• YouTube Music Premium
• Background Playback
• Offline Downloads
• High-Quality Audio Streaming
• Multi-Device Access
• Official Subscription Benefits`,
    price: 1,
    priceInr: 89,
    category: "Streaming, Music, Entertainment",
    thumbnail: "https://res.cloudinary.com/dwymt9xi4/image/upload/v1780598205/yt_premium_fq3j4q.jpg",
    features: [
      "Official Activation on Your Email",
      "YouTube Premium + YouTube Music Included",
      "Ad-Free Video & Music Streaming",
      "Pay After Successful Activation"
    ],
    salesCount: 428,
    rating: 4.9,
    fileSize: "Official Link",
    format: "Email Activation Invite",
    demoUrl: "https://youtube.com/premium",
    websiteUrl: "https://youtube.com/premium",
    validity: "1 Month Plan",
    warranty: "30 Days Warranty"
  },
  {
    id: "prod-11",
    title: "Replit Core Plan",
    description: "Build, deploy, and collaborate faster with Replit Core Plan. Get premium development tools, AI-powered coding assistance, always-on hosting, and enhanced performance—all activated directly on your own email account.",
    longDescription: `Build, deploy, and collaborate faster with Replit Core Plan. Get premium development tools, AI-powered coding assistance, always-on hosting, and enhanced performance—all activated directly on your own email account.

### Included Features:
• Unlimited Private Repls
• 2× Boosted CPU & RAM Performance
• Always-On Hosting
• Private Deployment Environment
• Custom Domain Support
• AI Coding Assistance
• 10GB Storage per Repl
• Team Collaboration Features
• Advanced Workspace Tools`,
    price: 37,
    priceInr: 3499,
    category: "Coding, Development, AI Tools",
    thumbnail: "https://res.cloudinary.com/dwymt9xi4/image/upload/v1780598380/replit_a3tl5y.jpg",
    features: [
      "1 Year Premium Access",
      "Access to Replit AI Coding Tools",
      "Always-On Hosting & Private Deployments",
      "Activation on Your Own Email"
    ],
    salesCount: 112,
    rating: 4.9,
    fileSize: "10 GB Cloud Storage",
    format: "Email Workspace Invite",
    demoUrl: "https://replit.com",
    websiteUrl: "https://replit.com",
    validity: "12 Months Access",
    warranty: "12 Months Warranty"
  },
  {
    id: "prod-12",
    title: "DZINE AI Master Plan",
    description: "Unlock unlimited AI image generation, access premium AI video models with 9,000 video credits, and experience comprehensive creative tools.",
    longDescription: `Unlock unlimited AI image generation, access premium AI video models with 9,000 video credits, and experience comprehensive creative tools under the DZINE AI Master Plan (Official Value: $59.99 / Month).

### Included Models & Tools:
• Seedance
• Kling
• Veo
• Wan
• Sora
• Motion Control & Lip Sync
• Midjourney
• GPT Image 1.5
• Nano Banana Pro 4K
• Flux.2
• Seedream 4.5

### Creative Features:
• Text to Image
• Text to Video
• Face Swap
• Outfit Try-On
• Character Consistency
• Background Removal
• Storyboard Creation
• Portrait Enhancement
• Image to 3D
• 8K Video Upscaling`,
    price: 40,
    priceInr: 3699,
    category: "AI Tools, Videos, Design",
    thumbnail: "https://res.cloudinary.com/dwymt9xi4/image/upload/v1780598451/dzine_ai_dvmtuk.jpg",
    features: [
      "Unlimited AI Image Generation",
      "9,000 Video Credits Every Month",
      "Access to Premium AI Video Models",
      "Credit Rollover Included"
    ],
    salesCount: 145,
    rating: 4.9,
    fileSize: "9,000 Credits/Month",
    format: "Verified Account Login",
    demoUrl: "https://www.dzine.ai",
    websiteUrl: "https://www.dzine.ai",
    validity: "Monthly Master Plan",
    warranty: "20 Days Warranty"
  },
  {
    id: "prod-13",
    title: "Canva Pro",
    description: "Supercharge your designs, documents, and content creation with Canva Pro's unlimited visual assets, high-performance templates, and advanced team tools.",
    longDescription: `Unlock the ultimate visual creation toolkit for design, content production, and productivity. Canva Pro provides everything you need to create professional graphics, engage audiences, and scale your personal or brand identity effortlessly.

### Included Features:
• 420K+ Premium Templates
• 71M+ Stock Photos
• 4.5M+ Graphic Elements
• 2.5M+ Premium Videos
• 3,000+ Fonts
• 25,000+ Audio Tracks
• 14 Animation Effects
• Unlimited Folders
• 1TB Cloud Storage
• Advanced Brand Kit
• Unlimited Color Palettes
• Custom Font Uploads
• Custom Logo Uploads
• Team Collaboration Features`,
    price: 3.10,
    priceInr: 300,
    category: "Design, Content Creation, Productivity",
    thumbnail: "https://res.cloudinary.com/dwymt9xi4/image/upload/v1780598790/canva_rn3c2v.jpg",
    features: [
      "420,000+ Premium Templates Included",
      "71M+ Photos, Videos & Design Assets",
      "1TB Cloud Storage",
      "Advanced Brand Kit & Team Features"
    ],
    salesCount: 512,
    rating: 4.9,
    fileSize: "1 TB Cloud Storage",
    format: "Shared/Team Admin Invite",
    demoUrl: "https://www.canva.com",
    websiteUrl: "https://www.canva.com",
    validity: "12 Months Access",
    warranty: "12 Months Warranty"
  },
  {
    id: "prod-14",
    title: "OpenArt Premium",
    description: "Create stunning images, cinematic videos, consistent characters, and professional creative content with OpenArt Premium. Access top-tier AI models, advanced generation tools, and powerful editing features from a single creative platform.",
    longDescription: `Create stunning images, cinematic videos, consistent characters, and professional creative content with OpenArt Premium. Access top-tier AI models, advanced generation tools, and powerful editing features from a single creative platform.

### Available Plans:
• 12,000 Credits
• 24,000 Credits
• 106,000 Credits

### Included Models:
• Kling
• Grok
• Sora 2
• Hailuo AI
• Veo 3
• Runway
• Wan
• LTX Studio
• Vidu
• Pika
• Flux
• SDXL
• OpenArt Custom Models

### Premium Creation Tools:
• Text-to-Image Generation
• Text-to-Video Generation
• Image-to-Video Conversion
• Lip-Sync Video Creation
• AI Character Consistency
• Personalized AI Models
• One-Click Story Generation
• Face Swap
• Background Removal
• Object Removal & Inpainting
• AI Upscaling
• Image Enhancement
• Style Transfer
• Pose Control
• Sketch-to-Image
• AI Avatars
• Portrait Enhancement
• Batch Image Generation
• Commercial-Ready Exports
• Z-Image Turbo Generation`,
    price: 0,
    priceInr: 0,
    category: "AI Art, Video Generation, Design",
    thumbnail: "https://res.cloudinary.com/dwymt9xi4/image/upload/v1780599054/openartphoto_hqumbo.jpg",
    features: [
      "Access to Premium AI Image & Video Models",
      "Consistent Characters & Personalized Models",
      "Image-to-Video and Text-to-Video Generation",
      "Multiple Credit Plans Available"
    ],
    salesCount: 168,
    rating: 4.9,
    fileSize: "12k / 24k / 106k Credits",
    format: "Private ID & Password Access",
    demoUrl: "https://openart.ai",
    websiteUrl: "https://openart.ai",
    validity: "1 Month Access",
    warranty: "30 Days Warranty"
  },
  {
    id: "prod-15",
    title: "Framer Pro",
    description: "Design, build, and publish stunning websites with Framer Pro. Create professional landing pages, portfolios, startup websites, and business sites using powerful AI tools, premium templates, and advanced design capabilities—without writing code.",
    longDescription: `Design, build, and publish stunning websites with Framer Pro. Create professional landing pages, portfolios, startup websites, and business sites using powerful AI tools, premium templates, and advanced design capabilities—without writing code.

### Key Advantages:
• AI-Powered Website Generation
• Premium Templates & Components
• Custom Domain & Hosting Included
• Unlimited Projects & Publishing

### Included Features:
• AI Website Builder
• Premium Templates Library
• Custom Domain Connection
• Built-In Hosting
• CMS & Dynamic Content
• SEO Optimization Tools
• Forms & Analytics
• Smooth Animations & Interactions
• Real-Time Collaboration
• Responsive Design Controls
• Custom Code Support
• Fast Global CDN Delivery`,
    price: 34,
    priceInr: 3200,
    category: "Website Builder, Design, No-Code",
    thumbnail: "https://res.cloudinary.com/dwymt9xi4/image/upload/v1780641729/framer_nz4hqv.jpg",
    features: [
      "AI-Powered Website Generation",
      "Premium Templates & Components",
      "Custom Domain & Hosting Included",
      "Unlimited Projects & Publishing"
    ],
    salesCount: 142,
    rating: 4.9,
    fileSize: "Web Builder Access",
    format: "Own Email Activation",
    demoUrl: "https://www.framer.com",
    websiteUrl: "https://www.framer.com",
    validity: "1 Year Access",
    warranty: "1 Year Warranty"
  },
  {
    id: "prod-16",
    title: "Lovable Pro",
    description: "Build websites, web apps, SaaS products, and MVPs using AI-powered development. Lovable Pro helps founders, freelancers, agencies, and indie hackers turn simple prompts into production-ready applications with rapid iteration and deployment.",
    longDescription: `Build websites, web apps, SaaS products, and MVPs using AI-powered development. Lovable Pro helps founders, freelancers, agencies, and indie hackers turn simple prompts into production-ready applications with rapid iteration and deployment.

Key Advantages:
• AI-Powered Website & App Generation
• Build Full Projects from Simple Prompts
• Live Preview & Rapid Iteration
• Custom Components & Code Editing

Included Features:
• AI Website Builder
• AI Web App Generation
• Landing Page Creation
• SaaS MVP Development
• Full-Stack Project Generation
• Responsive Design Support
• Custom Component Creation
• Code Export & Editing
• Database Integration Support
• Real-Time Preview
• Fast Deployment Workflow
• Team Collaboration Features`,
    price: 0,
    priceInr: 0,
    category: "Coding, AI Development, Website Builder",
    thumbnail: "https://res.cloudinary.com/dwymt9xi4/image/upload/v1780599340/lovable_rrvz0w.png",
    features: [
      "AI-Powered Website & App Generation",
      "Build Full Projects from Simple Prompts",
      "Live Preview & Rapid Iteration",
      "Custom Components & Code Editing"
    ],
    salesCount: 158,
    rating: 4.9,
    fileSize: "AI Custom Web Apps",
    format: "Premium Pro Access",
    demoUrl: "https://lovable.dev",
    websiteUrl: "https://lovable.dev",
    validity: "Limited Slots Available",
    warranty: "Stable Performance"
  }
];

export const defaultInquiries: Inquiry[] = [
  {
    id: "inq-1",
    name: "Alex Johnson",
    email: "alex@creatorlabs.com",
    subject: "Bulk licensing for dev team",
    message: "Hello! We are interested in getting 15 licenses for the Ultimate Notion OS Workspace. Do you offer custom discounts for large agency teams?",
    date: "2026-05-20T14:32:00Z",
    status: "pending"
  }
];

export const defaultOrders: Order[] = [
  {
    id: "order-101",
    customerName: "Jane Miller",
    customerEmail: "jane@notionpower.co",
    items: [
      { productId: "prod-2", productTitle: "The Ultimate Notion OS Workspace", price: 19 }
    ],
    totalPrice: 19,
    date: "2026-05-21T02:15:00Z",
    paymentMethod: "Card Proxy Payment",
    status: "completed"
  },
  {
    id: "order-102",
    customerName: "Devon Carter",
    customerEmail: "devon.codes@gmail.com",
    items: [
      { productId: "prod-1", productTitle: "Indie Creator Starter Kit", price: 29 },
      { productId: "prod-6", productTitle: "Google AI Pro + 5TB Storage", price: 11 }
    ],
    totalPrice: 40,
    date: "2026-05-21T05:30:00Z",
    paymentMethod: "Stripe Wallet checkout",
    status: "completed"
  }
];
