export const MISSING = "MISSING" as const;

export const content = {
  site: {
    clinicName: "Varsha Diet Clinic",
    practitionerName: "Dt. Varsha Ladkat",
    practitionerTitle: "Dietician and Nutritionist",
    tagline: "Healthy Eating, Happy Living",
    pages: [
      { label: "Home", href: "/" },
      { label: "High-Protein Recipes", href: "/recipes" },
      { label: "Packages", href: "/packages" },
    ],
    nav: [
      { label: "Home", href: "/" },
      { label: "Results", href: "#results" },
      { label: "Diet Plans", href: "#diet-plans" },
      { label: "Recipes", href: "#recipes" },
      { label: "About", href: "/about-us" },
      { label: "FAQ’s", href: "#faq" },
    ],
    menuIcon: "/images/icons/menu.svg",
    closeIcon: "/images/icons/close.svg",
  },

  whatsapp: {
    visible: true,
    countryCode: "91",
    number: "9699145567",
    defaultMessage: "Hi Varsha, I'd like to know more about your diet plans.",
  },

  // Hero — top of the homepage. Photo is real.
  hero: {
    visible: true,
    // SEO H1 from the SEO handoff (10 Oct 2026), shortened to keep the hero at 4 lines.
    // Earlier headline: "Evidence-based nutrition built for real Indian lifestyles."
    headline: "Personalised Dietitian in Bibwewadi, Pune",
    subtext:
      "Specialized clinical care for PCOD, diabetes, thyroid health, and pregnancy. Work directly with a dietitian who listens first.",
    image: "/images/hero/varsha-photo.jpeg",
    imageAlt: "Dt. Varsha Ladkat, dietitian at Varsha Diet Clinic in Bibwewadi, Pune",
    decorative1440: "/images/hero/decorative-1440.webp",
    decorative1920: "/images/hero/decorative-1920.webp",
    decorativeAlt: "Indian dishes",
    dishes: [
      { src: "/images/hero/dish-1.png", alt: "Indian dish" },
      { src: "/images/hero/dish-2.png", alt: "Indian dish" },
      { src: "/images/hero/dish-3.png", alt: "Indian dish" },
      { src: "/images/hero/dish-4.png", alt: "Indian dish" },
      { src: "/images/hero/dish-5.png", alt: "Indian dish" },
    ],
    nameTag: "DT. Varsha Ladkat",
    nameTagTail: "/images/icons/name-tag-tail.svg",
    primaryCta: {
      label: "Book Consultation",
      action: "whatsapp" as const,
      icon: "/images/icons/whatsapp.svg",
    },
    secondaryCta: {
      label: "Explore Diet Plans",
      href: "/packages",
      icon: "/images/icons/salad.svg",
    },
  },

  // Slim strip under the hero. Only show a stat when its own visible flag is true.
  trustBar: {
    visible: false,
    stats: [
      {
        visible: true,
        label: "Years of experience",
        value: "5",
      },
      {
        // UNCONFIRMED — verify with Varsha, number looks like placeholder
        visible: false,
        label: "Clients helped",
        value: "4000-5000",
      },
      {
        visible: true,
        label: "Diet plans",
        value: "11",
      },
      {
        // UNCONFIRMED — registration photo reads 481733; pricing sheet may show a different number
        visible: true,
        label: "Registration no.",
        value: "481733",
      },
    ],
  },

  // Meet Varsha — registration, title, and her own words from landing-page.md
  qualifications: {
    visible: false,
    heading: "Meet Varsha",
    name: "Dt. Varsha Ladkat",
    title: "Dietician and Nutritionist",
    // UNCONFIRMED — registration photo reads 481733; pricing sheet may show a different number
    registrationNumber: "481733",
    registrationImage: "/images/registration-number.jpeg",
    yearsOfPractice: "5",
    story: [
      "I focus on transforming your daily relationship with food rather than just handing you a restrictive, temporary meal plan.",
      "I combine evidence-based clinical nutrition with realistic lifestyle design so your results are actually sustainable.",
      "I specialize in a guilt-free approach that prioritizes your overall energy and well-being over just the number on the scale.",
    ],
  },

  // Specialities — names and prices from /images/diet-plans-pricing.jpg. No benefit blurbs were provided.
  specialities: {
    visible: false,
    heading: "Specialities",
    items: [
      {
        name: "Thyroid Diet Plan",
        icon: "thyroid",
        prices: { oneMonth: 3000, threeMonths: 8500, sixMonths: 15000 },
        // PLACEHOLDER — LOW RISK
        blurb: "Balanced nutrition to support healthy thyroid function.",
      },
      {
        name: "Diabetes Management Plan",
        icon: "diabetes",
        prices: { oneMonth: 3000, threeMonths: 8500, sixMonths: 15000 },
        // PLACEHOLDER — LOW RISK
        blurb: "Practical meal plans to help manage blood sugar day to day.",
      },
      {
        name: "PCOD Diet Plan",
        icon: "pcod",
        prices: { oneMonth: 3500, threeMonths: 9500, sixMonths: 17000 },
        // PLACEHOLDER — LOW RISK
        blurb: "Nutrition support tailored to hormonal balance and PCOD symptoms.",
      },
      {
        name: "GDM (Gestational Diabetes Mellitus) Diet Plan",
        icon: "gdm",
        prices: { oneMonth: 3500, threeMonths: 9500, sixMonths: 17000 },
        // PLACEHOLDER — LOW RISK
        blurb: "Safe, guided nutrition for a healthy pregnancy with GDM.",
      },
      {
        name: "Weight Gain Diet Plan",
        icon: "weight-gain",
        prices: { oneMonth: 3500, threeMonths: 9500, sixMonths: 17000 },
        // PLACEHOLDER — LOW RISK
        blurb: "Structured plans to help you gain weight the healthy way.",
      },
      {
        name: "Weight Loss Diet Plan",
        icon: "weight-loss",
        prices: { oneMonth: 3500, threeMonths: 9500, sixMonths: 17000 },
        // PLACEHOLDER — LOW RISK
        blurb: "Sustainable plans built around real food, not restriction.",
      },
      {
        name: "Muscle Gain Diet Plan",
        icon: "muscle",
        prices: { oneMonth: 3500, threeMonths: 9500, sixMonths: 17000 },
        // PLACEHOLDER — LOW RISK
        blurb: "Nutrition to support your strength and fitness goals.",
      },
      {
        name: "IBS (Irritable Bowel Syndrome) Diet Plan",
        icon: "ibs",
        prices: { oneMonth: 3500, threeMonths: 9500, sixMonths: 17000 },
        // PLACEHOLDER — LOW RISK
        blurb: "Gentle, structured eating to help manage IBS symptoms.",
      },
      {
        name: "Child Nutrition Plan",
        icon: "child",
        prices: { oneMonth: 3000, threeMonths: 8500, sixMonths: 15000 },
        // PLACEHOLDER — LOW RISK
        blurb: "Age-appropriate nutrition guidance for growing children.",
      },
      {
        name: "Pregnancy Diet Plan (Pre/Post)",
        icon: "pregnancy",
        prices: { oneMonth: 3500, threeMonths: 9500, sixMonths: 17000 },
        // PLACEHOLDER — LOW RISK
        blurb: "Supportive nutrition through pregnancy and after.",
      },
      {
        name: "Detox Diet Plan",
        icon: "detox",
        prices: { oneMonth: 2500, threeMonths: 7500, sixMonths: 13000 },
        // PLACEHOLDER — LOW RISK
        blurb: "A short-term reset to help you feel lighter and more energised.",
      },
    ],
  },

  // Before/after — real photo pairs. Names and result lines are dummy stand-ins
  // in the same pattern as the Figma caption for Shivam, until Varsha confirms.
  beforeAfter: {
    visible: true,
    heading: "Real Results naturally.",
    subtext:
      "No crash diets. No supplements. Just everyday home-cooked food and expert clinical guidance.",
    beforeLabel: "Before",
    afterLabel: "After",
    prevLabel: "Previous result",
    nextLabel: "Next result",
    prevIcon: "/images/icons/chevron-prev.svg",
    nextIcon: "/images/icons/chevron-next.svg",
    chevronCircle: "/images/icons/chevron-circle.svg",
    clients: [
      {
        before: "/images/results/man-06-before.jpeg",
        after: "/images/results/man-06-after.jpeg",
        name: "Shivam",
        result: "Gained 5kg and built lean muscle in just 3 months",
        caption: "Shivam gained 5kg and built lean muscle in just 3 months.",
      },
      {
        before: "/images/results/woman-01-before.jpeg",
        after: "/images/results/woman-01-after.jpeg",
        // DUMMY
        name: "Priya",
        // DUMMY
        result: "Lost 8kg in 4 months",
        caption: "Priya lost 8kg in 4 months eating everyday home-cooked food.",
      },
      {
        before: "/images/results/woman-02-before.jpeg",
        after: "/images/results/woman-02-after.jpeg",
        // DUMMY
        name: "Meera",
        // DUMMY
        result: "Lost 6kg in 3 months",
        caption: "Meera lost 6kg in 3 months without crash diets or supplements.",
      },
      {
        before: "/images/results/woman-03-before.jpeg",
        after: "/images/results/woman-03-after.jpeg",
        // DUMMY
        name: "Anjali",
        // DUMMY
        result: "Lost 9kg in 5 months",
        caption: "Anjali lost 9kg in 5 months and feels more energetic every day.",
      },
      {
        before: "/images/results/woman-04-before.jpeg",
        after: "/images/results/woman-04-after.jpeg",
        // DUMMY
        name: "Sneha",
        // DUMMY
        result: "Dropped 2 sizes in 4 months",
        caption: "Sneha dropped 2 sizes in 4 months on a plan built around home food.",
      },
      {
        before: "/images/results/woman-05-before.jpeg",
        after: "/images/results/woman-05-after.jpeg",
        // DUMMY
        name: "Kavya",
        // DUMMY
        result: "Lost 7kg in 3 months",
        caption: "Kavya lost 7kg in 3 months and kept the results without supplements.",
      },
    ],
  },

  // How it works — generic process copy until Varsha confirms the real steps.
  howItWorks: {
    visible: true,
    heading: "Your Journey to Better Health",
    subtext: "A simple, transparent process designed to support you at every step.",
    connector: "/images/how-it-works/connector.svg",
    steps: [
      {
        title: "Say Hello",
        body: "Drop a WhatsApp message to start the conversation. No complicated forms, no hassle.",
        number: "/images/how-it-works/01.svg",
        numberWidth: 150,
        numberHeight: 121,
        numberWidth1920: 208,
        numberHeight1920: 167,
      },
      {
        title: "First Consultation",
        body: "We sit down to deeply understand your lifestyle, medical history, and exact goals.",
        number: "/images/how-it-works/02.svg",
        numberWidth: 184,
        numberHeight: 121,
        numberWidth1920: 242,
        numberHeight1920: 158,
      },
      {
        title: "Get Custom Plan",
        body: "Receive a clinical diet chart built around your routine and the foods you actually enjoy.",
        number: "/images/how-it-works/03.svg",
        numberWidth: 186,
        numberHeight: 121,
        numberWidth1920: 244,
        numberHeight1920: 158,
      },
      {
        title: "Stay on Track",
        body: "Get weekly check-ins and direct WhatsApp support to keep you moving forward.",
        number: "/images/how-it-works/04.svg",
        numberWidth: 195,
        numberHeight: 121,
        numberWidth1920: 253,
        numberHeight1920: 157,
      },
    ],
  },

  // Recipes teaser — three cards from the recipe document, linking to /recipes
  recipesTeaser: {
    visible: true,
    heading: "Eat what you love",
    subtext:
      "Healthy doesn't mean boring. A sneak peek at the delicious, high-protein meals you will actually enjoy eating.",
    cta: {
      label: "View all recipes",
      href: "/recipes",
      icon: "/images/icons/link-next.svg",
    },
    recipeIds: [
      "paneer-bhurji",
      "moong-dal-chilla",
      "soya-chunk-stir-fry",
      "masala-egg-bhurji",
    ],
  },

  // Full recipes page — names, protein, time, and steps from /images/recipes/high-protein-indian-recipes.pdf
  recipes: {
    visible: true,
    heading: "Eat what you love",
    subtext:
      "Healthy doesn't mean boring. A sneak peek at the delicious, high-protein meals you will actually enjoy eating.",
    pagePlate: "/images/recipes/page-plate.png",
    pagePlateAlt: "Indian dish",
    document: "/images/recipes/high-protein-indian-recipes.pdf",
    ingredientsHeading: "Ingredients",
    methodHeading: "How to make it",
    closeLabel: "Close",
    clockIcon: "/images/icons/clock.svg",
    proteinIcon: "/images/icons/protein.svg",
    checkIcon: "/images/icons/check.svg",
    closeIcon: "/images/icons/sheet-cross.svg",
    items: [
      {
        id: "paneer-bhurji",
        name: "Paneer Bhurji (Scrambled Cottage Cheese)",
        image: "/images/recipes/paneer-bhurji.jpeg",
        protein: "~18g per serving",
        time: "15 mins",
        // PLACEHOLDER — LOW RISK
        meal: "Breakfast",
        ingredients: [
          "200g Paneer, crumbled",
          "1 Onion & 1 Tomato, finely chopped",
          "1 Green Chilli, chopped",
          "1/2 tsp Cumin seeds, Turmeric, and Garam Masala",
          "1 tbsp Oil or Ghee",
        ],
        steps: [
          "Heat oil in a pan and add cumin seeds. Let them splutter.",
          "Add chopped onions and green chilli, sauté until golden.",
          "Add tomatoes and spices, cook until soft and mushy.",
          "Mix in crumbled paneer and cook for 2-3 minutes (do not overcook). Garnish with coriander.",
        ],
      },
      {
        id: "moong-dal-chilla",
        name: "Moong Dal Chilla (Lentil Pancakes)",
        image: "/images/recipes/moong-dal-chilla.jpeg",
        protein: "~12g per chilla",
        time: "15 mins (plus soaking)",
        // PLACEHOLDER — LOW RISK
        meal: "Breakfast",
        ingredients: [
          "1 cup Yellow Moong Dal (soaked for 2-3 hours)",
          "1 inch Ginger & 1 Green Chilli",
          "Pinch of Asafoetida (Hing) and Salt to taste",
          "Oil or Ghee for cooking",
        ],
        steps: [
          "Blend the soaked dal, ginger, and chilli into a smooth batter. Add a little water as needed.",
          "Add salt and hing to the batter.",
          "Spread a ladle of batter on a hot non-stick pan in a circular motion like a dosa.",
          "Drizzle a few drops of oil and cook both sides until golden and crisp.",
        ],
      },
      {
        id: "soya-chunk-stir-fry",
        name: "Soya Chunk Stir Fry (Dry)",
        image: "/images/recipes/soya-chunk-stir-fry.jpeg",
        protein: "~25g per serving",
        time: "20 mins",
        // PLACEHOLDER — LOW RISK
        meal: "Lunch/Dinner",
        ingredients: [
          "1 cup Soya Chunks (Nutrela / Meal Maker)",
          "1 Capsicum & 1 Onion, sliced",
          "1 tsp Ginger-Garlic paste",
          "1/2 tsp Cumin powder, Coriander powder, and Garam Masala",
          "1 tbsp Oil",
        ],
        steps: [
          "Boil the soya chunks in salted water for 5 minutes. Drain, rinse with cold water, and squeeze out all excess water completely.",
          "Heat oil, add ginger-garlic paste and sauté.",
          "Add sliced onion and capsicum, stir fry on high heat for 2 minutes to retain crunch.",
          "Add the squeezed soya chunks and dry spices. Toss well and roast for 4-5 minutes.",
        ],
      },
      {
        id: "masala-egg-bhurji",
        name: "Quick Masala Egg Bhurji (Scrambled Eggs)",
        image: "/images/recipes/masala-egg-bhurji.jpeg",
        protein: "~18g per serving",
        time: "10 mins",
        // PLACEHOLDER — LOW RISK
        meal: "Breakfast",
        ingredients: [
          "3 whole eggs (or 1 whole egg + 3 egg whites)",
          "1 small Onion & 1 small Tomato, finely chopped",
          "1 Green Chilli, chopped",
          "Pinch of Turmeric, Salt, and Red Chilli Powder",
          "1 tsp Butter or Oil",
        ],
        steps: [
          "Crack the eggs into a bowl, add a pinch of salt, and whisk well.",
          "Heat butter/oil in a pan. Sauté onions and green chilli until soft.",
          "Add tomatoes and dry spices. Cook for 2 minutes until it forms a chunky base.",
          "Lower the heat, pour in the eggs, and stir continuously until scrambled and cooked.",
        ],
      },
      {
        id: "roasted-chana-salad",
        name: "Roasted Chana Salad (Chickpea Salad)",
        image: "/images/recipes/roasted-chana-salad.jpeg",
        protein: "~15g per bowl",
        time: "10 mins (No cook)",
        meal: "Snack",
        ingredients: [
          "1 cup Roasted Chana (Bhuna Chana without skin)",
          "1 Cucumber & 1 Tomato, chopped",
          "1/2 Onion, finely chopped",
          "1 tbsp Lemon juice",
          "Chaat Masala and Salt to taste",
        ],
        steps: [
          "In a large mixing bowl, combine the roasted chana, chopped cucumber, tomato, and onion.",
          "Sprinkle chaat masala and salt according to your preference.",
          "Squeeze lemon juice over the mixture and toss everything together thoroughly.",
          "Serve immediately as a refreshing, crunchy high-protein snack.",
        ],
      },
    ],
  },

  // SEO — titles, descriptions and site settings from the SEO developer handoff (10 Oct 2026).
  // Page titles stay under 52 characters.
  seo: {
    // Preferred public address. Change this one value when a custom domain goes live.
    siteUrl: "https://varsha-landing-page-two.vercel.app",
    locale: "en_IN",
    // 1200x630 share card shown when a link is posted on WhatsApp, Instagram or Google.
    shareImage: "/og-image.jpg",
    shareImageAlt: "Dt. Varsha Ladkat, dietitian at Varsha Diet Clinic in Bibwewadi, Pune",
    // MISSING — needs Varsha's GA4 measurement ID (looks like G-XXXXXXXXXX). Tracking stays off until set.
    ga4Id: MISSING as string,
    // MISSING — Search Console HTML-tag verification code. Not added until Varsha provides it.
    searchConsoleVerification: MISSING as string,
    home: {
      title: "Dietitian in Bibwewadi, Pune | Varsha Diet Clinic",
      description:
        "Looking for a dietitian in Bibwewadi, Pune? Personalised nutrition plans for weight, PCOD, thyroid and diabetes. Book a consultation with Varsha Diet Clinic.",
    },
    packages: {
      title: "Diet Plans in Pune, In-Person or Online | Varsha",
      description:
        "Diet plans for thyroid, diabetes, PCOD, GDM, weight gain and weight loss in Pune. Choose in-person or online consultation with Varsha Diet Clinic.",
    },
    recipes: {
      title: "High-Protein Indian Recipes | Varsha Diet Clinic",
      description:
        "Easy high-protein Indian recipes from Varsha Diet Clinic in Pune, including paneer bhurji, moong dal chilla and soya chunk stir fry.",
    },
    about: {
      title: "About Us | Varsha’s Diet Clinic, Bibwewadi Pune",
      description:
        "Learn about Varsha’s Diet Clinic in Bibwewadi, Pune, and our personalised nutrition guidance for weight management and individual dietary needs.",
    },
    // Opening hours are read from location.hours. Business facts for structured data come from
    // location, footer and whatsapp. Never add ratings, reviews or credentials here.
    businessType: "MedicalBusiness",
  },

  // About Us — copy from "About Us — Website Content & SEO Brief" (10 Oct 2026).
  about: {
    visible: true,
    path: "/about-us",
    heading: "About Varsha’s Diet Clinic",
    intro: {
      heading: "Your Health, Your Goals, Your Personalised Nutrition Journey",
      paragraphs: [
        "At Varsha’s Diet Clinic, we believe that healthy living starts with the right nutrition, practical food choices, and sustainable lifestyle habits. Our aim is to help individuals make informed dietary decisions through personalised nutrition guidance that fits their health needs, food preferences, daily routine, and personal goals.",
        "Led by Dt. Varsha Ladkat, Varsha’s Diet Clinic focuses on making nutrition guidance practical, approachable, and easier to follow in everyday life. We understand that every individual is different, which is why dietary recommendations should be tailored to individual needs rather than relying on a one-size-fits-all approach.",
      ],
    },
    services: {
      heading: "Our Nutrition Services",
      intro: "We provide nutrition guidance and personalised diet planning for the following areas:",
      items: [
        {
          title: "Weight Management",
          body: "Practical dietary guidance for healthy weight loss and weight gain.",
        },
        {
          title: "PCOS/PCOD Nutrition",
          body: "Food and lifestyle guidance to support overall wellbeing alongside appropriate medical care.",
        },
        {
          title: "Diabetes Nutrition",
          body: "Individualised meal-planning support to help manage dietary choices alongside prescribed treatment.",
        },
        {
          title: "Thyroid Nutrition",
          body: "Nutrition guidance tailored to individual needs and medical advice.",
        },
        {
          title: "Pregnancy-Related Nutrition",
          body: "Support for pregnancy-related dietary needs.",
        },
        {
          title: "Personalised Diet Plans",
          body: "Dietary recommendations based on individual goals, food preferences, lifestyle and consultation findings.",
        },
      ],
    },
    approach: {
      heading: "Our Approach",
      items: [
        {
          title: "Personalised Guidance",
          body: "Recommendations are tailored to individual circumstances, preferences and goals.",
        },
        {
          title: "Practical Food Choices",
          body: "We focus on achievable dietary habits and familiar foods that fit everyday routines.",
        },
        {
          title: "Sustainable Habits",
          body: "We encourage consistent, long-term lifestyle improvements rather than extreme or restrictive approaches.",
        },
        {
          title: "Individual Attention",
          body: "Nutritional needs, concerns and progress can guide consultation and follow-up, where available.",
        },
      ],
    },
    why: {
      heading: "Why Choose Varsha’s Diet Clinic?",
      items: [
        "Personalised nutrition guidance based on individual needs.",
        "Practical dietary recommendations for everyday life.",
        "Support for a range of nutrition and weight-management goals.",
        "A focus on balanced eating and sustainable lifestyle habits.",
        "Convenient access to the clinic in Bibwewadi, Pune.",
      ],
    },
    meet: {
      heading: "Meet Dt. Varsha Ladkat",
      body: "Dt. Varsha Ladkat is associated with Varsha’s Diet Clinic, where the focus is on helping individuals understand their dietary needs and make informed food choices.",
      photo: "/images/hero/varsha-photo.jpeg",
      photoAlt: "Dt. Varsha Ladkat, dietitian at Varsha’s Diet Clinic in Bibwewadi, Pune",
      // MISSING — add only verified qualifications, experience, certifications and memberships.
      // The section stays hidden until Varsha confirms them. Do not publish unconfirmed credentials.
      credentials: {
        visible: false,
        heading: "Qualifications and experience",
        items: [] as string[],
      },
    },
    cta: {
      heading: "Start Your Nutrition Journey",
      paragraphs: [
        "Whether your goal is to improve your eating habits, manage your weight, or receive personalised dietary guidance, the first step is understanding your individual needs.",
        "Contact Varsha’s Diet Clinic in Bibwewadi, Pune, to enquire about a consultation and explore the nutrition guidance that may be suitable for you.",
      ],
      primary: {
        label: "Book a Consultation",
        message: "Hi Varsha, I'd like to book a consultation.",
      },
      secondary: { label: "Chat on WhatsApp" },
    },
    disclaimer:
      "Nutrition guidance supports overall health and does not replace medical diagnosis, prescribed treatment or advice from your treating healthcare professional.",
  },

  // Free first consultation pop-up. Turn off with visible: false.
  // CONFIRM WITH VARSHA before publishing: she must honour the free first consultation.
  offer: {
    visible: true,
    showAfterMs: 4500,
    modalMs: 10000,
    countdownSeconds: 900,
    heading: "You’ve unlocked your first consultation for free",
    congrats: "Congratulations!",
    body: "Your first consultation with Dt. Varsha Ladkat is on us. Claim it before the timer runs out.",
    priceLabel: "First consultation",
    freeLabel: "FREE",
    timerLabel: "Offer ends in",
    chipLabel: "Free consultation ends in",
    expiredLabel: "Offer ended",
    cta: { label: "Claim my free consultation", message: "Hi Varsha, I'd like to claim my free first consultation." },
    dismissLabel: "Maybe later",
    closeLabel: "Close",
  },

  labels: {
    email: "Email",
    phone: "WhatsApp",
    whatsapp: "Whatsapp",
    call: "Call",
    instagram: "Instagram",
    hours: "Clinic Hours",
    maps: "Open in Maps",
    from: "From",
    all: "All",
    registration: "Reg. no.",
  },

  // Contact strip above the footer. Actions use the real WhatsApp, phone, and maps links only.
  talkToUs: {
    visible: true,
    heading: "Lets build your plan together",
    items: [
      {
        kind: "whatsapp" as const,
        label: "Chat on Whatsapp",
        detail: "+91 9699145567",
        icon: "/images/contact/whatsapp.png",
        arrow: "/images/icons/arrow-whatsapp.svg",
      },
      {
        kind: "maps" as const,
        label: "Open in Maps",
        detail: "Mukta Clinic",
        icon: "/images/contact/maps.png",
        arrow: "/images/icons/arrow-maps.svg",
      },
      {
        kind: "call" as const,
        label: "Call Now",
        detail: "+91 9699145567",
        icon: "/images/contact/phone.png",
        arrow: "/images/icons/arrow-phone.svg",
      },
    ],
  },

  // Testimonials — Google review screenshots only. WhatsApp quotes were marked dummy and are not used.
  testimonials: {
    visible: true,
    heading: "Real Stories, Real Results",
    reviewsHeading: "Reviews",
    subtext:
      "Hear from people who transformed their health without giving up the food they love.",
    video: "/images/reviews/client-video.mp4",
    // Four YouTube Shorts from Varsha's channel. Tiles play muted in the background (a still
    // image on slow or data-saver connections); a click opens the video from the start with sound.
    videos: [
      { kind: "youtube" as const, id: "hCLNsR6SSxE" },
      { kind: "youtube" as const, id: "XTgW598P3qU" },
      { kind: "youtube" as const, id: "GipyNHeD5wQ" },
      { kind: "youtube" as const, id: "IRY8lf4KrAo" },
    ],
    youtubeChannel: "https://www.youtube.com/@VarshasDietClinic",
    playLabel: "Play video",
    watchLabel: "Watch on YouTube",
    closeLabel: "Close",
    sourceLabel: "Google",
    googleIcon: "/images/icons/google.svg",
    avatarColor: "#4f74f2",
    cta: {
      label: "See all\nGoogle reviews",
      href: "https://maps.app.goo.gl/ksq5J1F9dkcyFemL8",
      arrow: "/images/icons/arrow-reviews.svg",
    },
    homepagePreviewCount: 8,
    items: [
      {
        source: "google" as const,
        image: "/images/reviews/review-01.png",
        name: "Varsha Bajange",
        quote:
          "I was very underweight and had low energy levels. After following the diet plan from this clinic, I gained weight gradually and started feeling more energetic and confident. The dietitian is very supportive and always available for guidance. Truly satisfied with the results! thank you varsha madam",
      },
      {
        source: "google" as const,
        image: "/images/reviews/review-02.png",
        name: "Sakshi Gujarani",
        quote:
          "We consulted this dietician for my grandfather, who has renal issues and diabetes. The diet plan provided was very well-balanced, easy to follow, and tailored perfectly to his condition. We’ve seen noticeable improvement in his health and overall well-being. Highly recommend for anyone managing kidney and diabetic conditions.",
      },
      {
        source: "google" as const,
        image: "/images/reviews/review-03.png",
        name: "Ashu Shilimkar",
        quote:
          "My Blood reports show slight nutritional deficiencies. I m going varsha diet clinic consultation. She give me proper diet plan With proper dietary modifications and supplementation, levels can be improved. A customized diet plan is recommended for better results. thank u so much.",
      },
      {
        source: "google" as const,
        image: "/images/reviews/review-04.png",
        name: "Sangita Shendge",
        quote:
          "My son is 10 years old. admitted in hospital.giving diet related pediatric case with fever, weakness and low platelet.giving best diet. recovery is fast. improving my son strength, better appetite.and recovery.thank u so much varsha madam. I m so happy.",
      },
      {
        source: "google" as const,
        image: "/images/reviews/review-05.png",
        name: "Shon Chopda",
        quote:
          "I m following regular diet, controled sugar level. Maintained my weight. I m happy now. Feeling better. Thank u. Highly recommend varsha diet clinic",
      },
      {
        source: "google" as const,
        image: "/images/reviews/review-06.png",
        name: "Pushpa Boddu",
        quote:
          "Dm pt.recently I visit diet clinic. My health issues. Control sugar level in proper diet plan. Following regularly. I m happy. Thank u",
      },
      {
        source: "google" as const,
        image: "/images/reviews/review-07.png",
        name: "Jayshree Shah",
        quote:
          "I had a very good experience with the diet consultation for Rt feeding in a diabetic patient.the diet plan was well structured, nutritionally balanced, and specialy tailored to control blood sugar levels while ensuring adequate calories and protein.highly recommend for anyone looking expert diet advice on clinical Nutrition especially for tube feeding and diabetic care.",
      },
      {
        source: "google" as const,
        image: "/images/reviews/review-08.png",
        name: "Pratibha Rade",
        quote:
          "I m rade Dilip. Diabetic and tuberculosis pt.follwing properly diet.sugar control.feeling happy. Dialy following diet and regular exercise. Thank u so much dt.varsha ladkat madam.",
      },
    ],
  },

  // Pricing — full list from the pricing sheet. Homepage snapshot is the first four rows, not a "popular" ranking.
  pricing: {
    visible: true,
    heading: "Specialized Diet Plans",
    subtext:
      "Clinical nutrition tailored to your exact health goals. Every plan includes direct WhatsApp access to your dietitian. Choose in-person visits at the clinic or online consultations by video call.",
    sheetImage: "/images/diet-plans-pricing.jpg",
    currency: "INR",
    cta: { label: "View all Plans", href: "/packages" },
    homepagePreviewCount: 5,
    chatLabel: "Know the price here",
    pagePlates: [
      { src: "/images/hero/dish-5.png", alt: "Indian dish" },
      { src: "/images/hero/dish-4.png", alt: "Indian dish" },
    ],
    icons: {
      calendar: "/images/icons/calendar.svg",
      chevronDown: "/images/icons/chevron-down.svg",
      chevronRight: "/images/icons/chevron-right.svg",
      linkNext: "/images/icons/link-next.svg",
    },
    modeLabel: "Consultation type",
    modes: { inPerson: "In-person", online: "Online" },
    durationLabels: {
      oneMonth: "1 month",
      threeMonths: "3 months",
      sixMonths: "6 months",
    },
    consultations: [
      { name: "First-Time Consultation", charge: 500 },
      { name: "Home Visit Diet Consultation (Per Visit)", charge: 800 },
      { name: "Follow-Up Session (In-Person)", charge: 300 },
      { name: "Follow-Up Session (Virtual)", charge: 300 },
    ],
    plans: [
      {
        name: "Thyroid Diet Plan",
        chip: "Thyroid",
        prices: { oneMonth: 3000, threeMonths: 8500, sixMonths: 15000 },
        image: "/images/diet-plans/Thyroid Diet Plan.jpeg",
      },
      {
        name: "Diabetes Management Plan",
        chip: "Diabetes",
        prices: { oneMonth: 3000, threeMonths: 8500, sixMonths: 15000 },
        image: "/images/diet-plans/Diabetes Management Plan.jpeg",
      },
      {
        name: "PCOD Diet Plan",
        chip: "PCOD",
        prices: { oneMonth: 3500, threeMonths: 9500, sixMonths: 17000 },
        image: "/images/diet-plans/PCOD Diet Plan.jpeg",
      },
      {
        name: "GDM (Gestational Diabetes Mellitus) Diet Plan",
        chip: "GDM",
        prices: { oneMonth: 3500, threeMonths: 9500, sixMonths: 17000 },
        image: "/images/diet-plans/GDM (Gestational Diabetes Mellitus) Diet Plan.jpeg",
      },
      {
        name: "Weight Gain Diet Plan",
        chip: "Weight Gain",
        prices: { oneMonth: 3500, threeMonths: 9500, sixMonths: 17000 },
        image: "/images/diet-plans/Weight Gain Diet Plan.jpeg",
      },
      {
        name: "Weight Loss Diet Plan",
        chip: "Weight Loss",
        prices: { oneMonth: 3500, threeMonths: 9500, sixMonths: 17000 },
        image: "/images/diet-plans/Weight Loss Diet Plan.jpeg",
      },
      {
        name: "Muscle Gain Diet Plan",
        chip: "Muscle Gain",
        prices: { oneMonth: 3500, threeMonths: 9500, sixMonths: 17000 },
        image: "/images/diet-plans/Muscle Gain Diet Plan.jpeg",
      },
      {
        name: "IBS (Irritable Bowel Syndrome) Diet Plan",
        chip: "IBS",
        prices: { oneMonth: 3500, threeMonths: 9500, sixMonths: 17000 },
        image: "/images/diet-plans/IBS (Irritable Bowel Syndrome) Diet Plan.jpeg",
      },
      {
        name: "Child Nutrition Plan",
        chip: "Child",
        prices: { oneMonth: 3000, threeMonths: 8500, sixMonths: 15000 },
        image: "/images/diet-plans/Child Nutrition Plan.jpeg",
      },
      {
        name: "Pregnancy Diet Plan (Pre/Post)",
        chip: "Pregnancy",
        prices: { oneMonth: 3500, threeMonths: 9500, sixMonths: 17000 },
        image: "/images/diet-plans/Pregnancy Diet Plan (Pre:Post).jpeg",
      },
      {
        name: "Detox Diet Plan",
        chip: "Detox",
        prices: { oneMonth: 2500, threeMonths: 7500, sixMonths: 13000 },
        image: "/images/diet-plans/Detox Diet Plan.jpeg",
      },
    ],
  },

  // FAQ — only the visitor questions written down. Answers only where the pricing sheet covers them.
  faq: {
    visible: true,
    heading: "FAQs",
    subtext:
      "Honest answers to help you make an informed decision about your health journey.",
    plusIcon: "/images/icons/plus.svg",
    items: [
      {
        visible: true,
        question: "Is your first consultation free or paid?",
        answer: "The first-time consultation is ₹500.",
      },
      {
        visible: true,
        question: "Do you do video call consultations too, or only in-person?",
        // PLACEHOLDER — LOW RISK
        answer: "Available both in-person at the clinic and via video call.",
      },
      {
        visible: true,
        question: "How soon do people usually start seeing results?",
        // PLACEHOLDER — LOW RISK
        answer:
          "It depends on the person and the plan, but most clients start noticing changes within the first few weeks of following their plan consistently.",
      },
      {
        visible: true,
        question: "What do people usually ask before booking?",
        // PLACEHOLDER — LOW RISK
        answer:
          "Most people want to know how the plan is personalised to them, and whether it fits their daily routine. That's exactly what we cover in your first consultation.",
      },
    ],
  },

  // Clinic & location — address, hours, map, and contact from the notes and pricing sheet. No clinic photos were provided.
  location: {
    visible: true,
    heading: "Visit Varsha Diet Clinic in Bibwewadi, Pune",
    clinicName: "Varsha Diet Clinic",
    addressLines: [
      "Shop no 02, Plot. 64, Mahesh Society",
      "Bibwewadi, Pune, Maharashtra 411037",
    ],
    mapsUrl: "https://maps.app.goo.gl/ksq5J1F9dkcyFemL8",
    mapsArrow: "/images/icons/arrow-right.svg",
    embedQuery: "Mukta Clinic, Shop no 02, Plot. 64, Mahesh Society, Bibwewadi, Pune, Maharashtra 411037",
    // MISSING — no clinic photos provided; do not fill with stock
    photos: [] as string[],
    hours: [
      { day: "Sunday", slots: ["10am - 2pm", "5pm - 7pm"] },
      { day: "Monday", slots: ["10:30am - 1:30pm", "6pm - 8pm"] },
      { day: "Tuesday", slots: ["10:30am - 1:30pm", "6pm - 8pm"] },
      { day: "Wednesday", slots: ["5pm - 7:30pm"] },
      { day: "Thursday", slots: ["5pm - 7:30pm"] },
      { day: "Friday", slots: ["5pm - 7:30pm"] },
      { day: "Saturday", slots: ["10:30am - 1:30pm", "5pm - 8pm"] },
    ],
  },

  // Closing band
  finalCta: {
    visible: true,
    // PLACEHOLDER — LOW RISK
    headline: "Let's build your health plan together.",
    primaryCta: {
      label: "Chat on WhatsApp",
      action: "whatsapp" as const,
    },
  },

  // Footer — logo, contact, hours, and Instagram from provided materials.
  footer: {
    visible: true,
    logo: "/images/logo.svg",
    logoFallbacks: ["/images/logo.png", "/images/logo.jpeg"],
    mark: "/images/icons/footer-mark.svg",
    tagline: "Healthy Eating, Happy Living",
    taglineLines: ["Healthy Eating.", "Happy Living."],
    email: "varshasdietclinic@gmail.com",
    phone: "+91 9699145567",
    instagram: {
      handle: "varshasdietclinic",
      url: "https://www.instagram.com/varshasdietclinic?igsi=MXVqY3Z0d3FlazBkbQ%3D%3D&utm_source=qr",
    },
    youtube: {
      handle: "VarshasDietClinic",
      url: "https://www.youtube.com/@VarshasDietClinic",
    },
    linkedin: {
      url: "https://www.linkedin.com/in/varsha-ladkat-b6059330a",
    },
    socialLabels: { instagram: "Instagram", youtube: "YouTube", linkedin: "LinkedIn" },
    links: [
      { label: "Home", href: "/" },
      { label: "Results", href: "/#results" },
      { label: "Diet Plans", href: "/packages" },
      { label: "High-Protein Recipes", href: "/recipes" },
      { label: "About Us", href: "/about-us" },
    ],
    copyright: "© Varshas diet clinic",
    credit: "Website by Mayur",
  },
};

export function whatsappHref(message = content.whatsapp.defaultMessage) {
  return `https://wa.me/${content.whatsapp.countryCode}${content.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export function whatsappPlanHref(planName: string, duration?: string) {
  const extra = duration ? ` (${duration})` : "";
  return whatsappHref(`Hi Varsha, I'm interested in the ${planName}${extra}.`);
}

export function formatInr(amount: number) {
  const digits = Math.round(amount).toString();
  const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `₹${grouped}`;
}

export type Content = typeof content;
