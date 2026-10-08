import { ProductBlueprint, TechComponent, UserStory, SprintMilestone } from "@/lib/types/blueprint";

export function synthesizeDomainBlueprint(brief: string): ProductBlueprint {
  const text = brief.trim();
  const lower = text.toLowerCase();
  const isArabic = /[\u0600-\u06FF]/.test(text);

  // 1. Food Delivery & Cloud Kitchens
  if (
    lower.includes("delivery") ||
    lower.includes("food") ||
    lower.includes("restaurant") ||
    lower.includes("courier") ||
    lower.includes("kitchen") ||
    lower.includes("hungerstation") ||
    lower.includes("deliveroo") ||
    lower.includes("توصيل") ||
    lower.includes("مطعم") ||
    lower.includes("مطاعم") ||
    lower.includes("طعام") ||
    lower.includes("وجبات") ||
    lower.includes("كابتن") ||
    lower.includes("طلبات")
  ) {
    return {
      projectTitle: isArabic ? "منصة فود بلس السحابية (FoodPulse Cloud)" : "FoodPulse Cloud Delivery",
      tagline: isArabic
        ? "نظام توصيل طلبات المطاعم، إدارة المطابخ السحابية، وتتبع السائقين بالـ GPS الفوري"
        : "Autonomous Food Ordering, Multi-Kitchen Dispatch & Real-Time GPS Fleet Tracking",
      executiveSummary: isArabic
        ? `منصة متكاملة مصممة خصيصاً لتلبية متطلبات: "${text.slice(0, 160)}...". تجمع المنصة بين تطبيق للعميل وتطبيق للسائقين (الكباتن) ولوحة تحكم لإدارة المطابخ مع تتبع مباشر للموقع الجغرافي وحساب تلقائي للعمولات.`
        : `An on-demand food delivery and cloud-kitchen orchestration platform engineered to fulfill: "${text.slice(0, 160)}...". Features sub-second order dispatching, live GPS courier tracking, and kitchen display systems (KDS).`,
      targetAudience: isArabic
        ? [
            "العملاء الباحثون عن تجربة طلب طعام سريعة وتتبع مباشر للطلب",
            "سائقو التوصيل (الكباتن) لإدارة استلام الطلبات والتنقل الأمثل",
            "مدراء المطاعم والمطابخ لمتابعة تجهيز الطلبات ومؤشرات الأداء"
          ]
        : [
            "Hungry consumers seeking instant ordering and live courier tracking",
            "Delivery couriers managing dispatch routing and daily payouts",
            "Restaurant kitchen operators managing incoming tickets on tablet KDS"
          ],
      problemStatement: isArabic
        ? "ارتفاع عمولات المنصات التقليدية (تصل إلى 30%) مع بطء التوصيل وتشتت تتبع السائقين وغياب دقة المواعيد."
        : "High aggregator commissions, poor driver dispatch efficiency, and lack of real-time visibility into kitchen preparation and delivery transit.",
      proposedSolution: isArabic
        ? "نظام مستقل يعتمد على معمارية Edge منخفضة الكمون مع WebSockets لتحديث إحداثيات السائق كل ثانيتين وخوارزمية ذكية لاختيار أقرب سائق متاح."
        : "Low-latency edge architecture with WebSockets updating driver GPS every 2 seconds, paired with automated proximity-based courier dispatch and split payments.",
      mvpScope: isArabic
        ? [
            "قائمة المطاعم والوجبات مع سلة شراء ودفع إلكتروني فوري (Apple Pay / بطاقات)",
            "خوارزمية الإسناد الذكي لأقرب سائق متاح مع خريطة تتبع GPS حية",
            "لوحة تحكم شاشة المطبخ (Kitchen Display System) لاستقبال وتجهيز الطلبات",
            "إشعارات فورية بحالة الطلب (تم القبول، قيد الطهي، جاري التوصيل، تم الاستلام)"
          ]
        : [
            "Restaurant menu catalog, cart management, and 1-click checkout (Apple Pay / Cards)",
            "Automated nearest-courier dispatch algorithm with live GPS route tracking",
            "Tablet-friendly Kitchen Display System (KDS) for ticket lifecycle management",
            "Push notifications and SMS updates for all order milestone transitions"
          ],
      v2FutureScope: isArabic
        ? [
            "تسعير ديناميكي ذكي للتوصيل بناءً على حالة الطقس وحركة المرور",
            "جدولة الطلبات المسبقة والاشتراكات الأسبوعية في الوجبات",
            "تكامل مع أجهزة الطباعة الحرارية التلقائية للبون في المطابخ"
          ]
        : [
            "Dynamic surge pricing algorithm driven by weather and traffic density",
            "Scheduled weekly meal subscriptions and corporate group orders",
            "Hardware ESC/POS thermal printer integration for auto-printing tickets"
          ],
      techStack: [
        {
          layer: "Frontend",
          technology: "React Native / Expo (iOS & Android)",
          rationale: "Native performance with background geolocation tracking and offline-tolerant network sync."
        },
        {
          layer: "Frontend",
          technology: "Next.js 15 (React 19) + Tailwind CSS (Web & Admin)",
          rationale: "Server-side rendering for restaurant onboarding and instant dashboard real-time charts."
        },
        {
          layer: "Backend",
          technology: "Node.js WebSocket Gateway + Upstash Redis (Geo commands)",
          rationale: "Sub-50ms latency for driver GPS location broadcasts and geospatial proximity queries."
        },
        {
          layer: "Database",
          technology: "PostgreSQL (Supabase) + PostGIS",
          rationale: "Geographic spatial indexing for delivery geofencing and relational order integrity."
        },
        {
          layer: "Integrations",
          technology: "Mapbox GL / Google Maps Directions API",
          rationale: "Accurate ETA predictions and turn-by-turn courier navigation overlays."
        },
        {
          layer: "Integrations",
          technology: "Stripe Connect / Local Payment Gateways (Mada / Apple Pay)",
          rationale: "Automated instant payouts to delivery drivers and restaurant merchant accounts."
        }
      ],
      mermaidArchitecture: `flowchart TD
    CustomerApp["Customer Mobile App\\n(React Native)"] -->|HTTPS / WSS| APIGateway["Edge API Gateway\\n(Hono / Cloudflare)"]
    CourierApp["Courier Mobile App\\n(GPS Background)"] -->|Live GPS WebSocket| GeoGateway["Real-Time Geolocation Service\\n(Node.js WSS)"]
    KitchenApp["Kitchen KDS Tablet\\n(Next.js WebApp)"] -->|Live Order Events| APIGateway

    subgraph DataAndGeo["Geospatial & Real-time Plane"]
        GeoGateway -->|GEOADD Coordinates| RedisCache["Upstash Redis\\n(Active Driver Positions)"]
        APIGateway -->|Spatial Queries & Orders| MainDB[("PostgreSQL + PostGIS\\n(Orders, Menus, Users)")]
    end

    subgraph Integrations["Payment & Notification Gateway"]
        APIGateway --> StripePay["Stripe Connect & Split Payouts"]
        APIGateway --> PushNotify["FCM / Apple Push Notifications"]
        GeoGateway --> Mapbox["Mapbox Routing & Turn ETA Engine"]
    end`,
      userStories: [
        {
          id: "US-101",
          epic: "Ordering & Checkout",
          title: "Restaurant Menu Browsing & Custom Item Add-ons",
          asA: "Customer",
          iWantTo: "Browse categorized dishes, customize toppings/options, and add items to my cart",
          soThat: "I can tailor my meal to my dietary preferences before paying",
          acceptanceCriteria: [
            "Dish variants (sizes, toppings) update prices dynamically",
            "Out-of-stock items are disabled in real-time",
            "Minimum order threshold and delivery fees are transparently shown"
          ],
          complexity: "Medium",
          isMvp: true
        },
        {
          id: "US-102",
          epic: "Live Tracking",
          title: "Real-Time Courier Live Map Tracking with Live ETA",
          asA: "Customer",
          iWantTo: "Watch the delivery courier move along the map towards my address with live ETA",
          soThat: "I know exactly when to receive my order without wondering where it is",
          acceptanceCriteria: [
            "Map renders vehicle marker smoothly using interpolation",
            "ETA recalculates every 30 seconds based on traffic",
            "Customer can call or message the courier directly via in-app VoIP mask"
          ],
          complexity: "High",
          isMvp: true
        },
        {
          id: "US-103",
          epic: "Dispatch & Routing",
          title: "Proximity-Based Auto Courier Dispatch",
          asA: "Delivery Courier",
          iWantTo: "Receive order delivery requests within a 3km radius with 30s acceptance timer",
          soThat: "I can accept profitable deliveries close to my current location",
          acceptanceCriteria: [
            "Order offered to closest available driver first",
            "If declined or timed out, cascades to the next best driver in 15 seconds",
            "Displays pickup address, drop-off location, and guaranteed delivery fee"
          ],
          complexity: "High",
          isMvp: true
        },
        {
          id: "US-104",
          epic: "Kitchen Operations",
          title: "Kitchen Display System (KDS) Live Ticket Management",
          asA: "Restaurant Kitchen Chef",
          iWantTo: "See new orders pop up with audio alerts and tap to move them to 'Cooking' and 'Ready'",
          soThat: "Our kitchen team prepares food efficiently without paper tickets getting lost",
          acceptanceCriteria: [
            "Color-coded tickets: Green (new), Yellow (cooking > 10m), Red (delayed > 20m)",
            "One-tap bump bar to mark ticket ready for driver pickup",
            "Instant sync to customer and driver apps upon status change"
          ],
          complexity: "Medium",
          isMvp: true
        },
        {
          id: "US-105",
          epic: "Payments & Settlement",
          title: "Automated Split Settlements & Daily Driver Payouts",
          asA: "Restaurant Merchant & Courier",
          iWantTo: "Have our respective earnings automatically deposited to our bank accounts",
          soThat: "We don't need manual invoices or accounting reconciliations",
          acceptanceCriteria: [
            "Platform fee deducted automatically per transaction",
            "Instant payout via Stripe Connect / Visa Direct",
            "Downloadable tax-compliant summary statements"
          ],
          complexity: "Medium",
          isMvp: true
        }
      ],
      sprintRoadmap: [
        {
          sprintNumber: 1,
          title: "Core Data Architecture, Menus & Customer Auth",
          durationWeeks: 2,
          coreDeliverables: [
            "PostgreSQL PostGIS schema for restaurants, menus, and users",
            "Customer app onboarding with Phone OTP & Apple/Google sign-in",
            "Restaurant menu management and image CDN storage"
          ],
          estimatedHours: 75,
          estimatedCostUsd: 6000
        },
        {
          sprintNumber: 2,
          title: "Cart, Checkout & Payment Gateway Integration",
          durationWeeks: 2,
          coreDeliverables: [
            "Cart state persistence and discount code engine",
            "Stripe / Local Payment integration with 3DS verification",
            "Order state machine and initial notification triggers"
          ],
          estimatedHours: 80,
          estimatedCostUsd: 6400
        },
        {
          sprintNumber: 3,
          title: "Courier App, Live GPS & Real-time WebSockets",
          durationWeeks: 2,
          coreDeliverables: [
            "Courier app with background location service",
            "WebSocket server broadcasting vehicle coordinates to Redis",
            "Customer live map screen with animated vehicle path"
          ],
          estimatedHours: 90,
          estimatedCostUsd: 7200
        },
        {
          sprintNumber: 4,
          title: "Kitchen KDS, Pilot Hardening & Production Launch",
          durationWeeks: 2,
          coreDeliverables: [
            "Tablet-optimized Kitchen Display System web application",
            "End-to-end stress testing with 500 concurrent simulated drivers",
            "Production deployment to cloud edge and store submission"
          ],
          estimatedHours: 65,
          estimatedCostUsd: 5200
        }
      ],
      budgetSummary: {
        totalEstimatedWeeks: 8,
        totalEstimatedHours: 310,
        estimatedCostUsd: 24800,
        recommendedTeam: [
          "1x Lead Full-Stack Engineer (Next.js / Node.js)",
          "1x Mobile React Native Engineer (iOS/Android)",
          "1x DevOps & Geolocation Infrastructure Engineer"
        ]
      },
      codeArtifacts: {
        prismaSchema: `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Restaurant {
  id          String      @id @default(uuid())
  name        String
  latitude    Float
  longitude   Float
  isOpen      Boolean     @default(true)
  menuItems   MenuItem[]
  orders      Order[]
  createdAt   DateTime    @default(now())
}

model MenuItem {
  id           String     @id @default(uuid())
  restaurantId String
  restaurant   Restaurant @relation(fields: [restaurantId], references: [id])
  name         String
  priceCents   Int
  isAvailable  Boolean    @default(true)
  orderItems   OrderItem[]
}

model Courier {
  id           String     @id @default(uuid())
  fullName     String
  phoneNumber  String     @unique
  currentLat   Float?
  currentLng   Float?
  isOnline     Boolean    @default(false)
  orders       Order[]
}

model Order {
  id           String      @id @default(uuid())
  customerId   String
  restaurantId String
  restaurant   Restaurant  @relation(fields: [restaurantId], references: [id])
  courierId    String?
  courier      Courier?    @relation(fields: [courierId], references: [id])
  status       OrderStatus @default(PENDING)
  totalAmount  Int
  deliveryFee  Int
  orderItems   OrderItem[]
  createdAt    DateTime    @default(now())
  updatedAt    DateTime    @updatedAt
}

model OrderItem {
  id         String   @id @default(uuid())
  orderId    String
  order      Order    @relation(fields: [orderId], references: [id])
  menuItemId String
  menuItem   MenuItem @relation(fields: [menuItemId], references: [id])
  quantity   Int
  unitPrice  Int
}

enum OrderStatus {
  PENDING
  PREPARING
  READY_FOR_PICKUP
  IN_TRANSIT
  DELIVERED
  CANCELLED
}`,
        dockerCompose: `version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/foodpulse_db
      - REDIS_URL=redis://redis:6379
      - MAPBOX_SECRET_KEY=\${MAPBOX_SECRET_KEY}
    depends_on:
      - db
      - redis

  db:
    image: postgis/postgis:16-3.4-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: foodpulse_db
    ports:
      - "5432:5432"
    volumes:
      - food_pg_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  food_pg_data:`,
        apiEndpoints: [
          { method: "GET", path: "/api/v1/restaurants/nearby", description: "Fetch nearby restaurants based on user GPS radius", authRequired: false },
          { method: "POST", path: "/api/v1/orders/checkout", description: "Initialize order placement and payment authorization", authRequired: true },
          { method: "POST", path: "/api/v1/courier/location-ping", description: "Broadcast real-time courier GPS coordinates to Redis", authRequired: true },
          { method: "GET", path: "/api/v1/orders/:id/track", description: "Fetch live delivery path and remaining ETA", authRequired: true }
        ]
      }
    };
  }

  // 2. Real Estate & PropTech
  if (
    lower.includes("real estate") ||
    lower.includes("property") ||
    lower.includes("proptech") ||
    lower.includes("rental") ||
    lower.includes("apartment") ||
    lower.includes("broker") ||
    lower.includes("listing") ||
    lower.includes("tenant") ||
    lower.includes("landlord") ||
    lower.includes("villa") ||
    lower.includes("عقار") ||
    lower.includes("عقارات") ||
    lower.includes("شقق") ||
    lower.includes("فلل") ||
    lower.includes("وسيط") ||
    lower.includes("بيع") ||
    lower.includes("إيجار") ||
    lower.includes("مزاد") ||
    lower.includes("مباني")
  ) {
    return {
      projectTitle: isArabic ? "منصة إستيت نكسس العقارية (EstateNexus)" : "EstateNexus PropTech Suite",
      tagline: isArabic
        ? "سوق عقاري ذكي، جولات افتراضية ثلاثية الأبعاد، وعقود إيجار وبيوع رقمية معتمدة"
        : "Intelligent Property Marketplace, 3D Virtual Tours & Automated Digital Escrow Leases",
      executiveSummary: isArabic
        ? `منصة عقارية متكاملة صُممت لمعالجة: "${text.slice(0, 160)}...". توفر استعراضاً تفاعلياً للعقارات مع جولات افتراضية، ونظام إدارة الوسطاء والمشترين (CRM)، وتوقيع إلكتروني آمن للعقود مع ضمان مالي (Escrow).`
        : `An enterprise PropTech platform engineered to address: "${text.slice(0, 160)}...". Connects verified buyers, tenants, and licensed brokers with 3D virtual walkthroughs, automated digital contracts, and secure escrow deposits.`,
      targetAudience: isArabic
        ? [
            "المشترون والمستأجرون الباحثون عن عقارات موثوقة وجولات ثلاثية الأبعاد",
            "الوسطاء والوكلاء العقاريون لإدارة الصفقات والمحادثات المباشرة",
            "المطورون وشركات إدارة الأملاك لمتابعة التحصيلات وعقود الإيجار"
          ]
        : [
            "Property seekers and tenants wanting verified listings and 3D tours",
            "Licensed real estate brokers managing leads, viewings, and offers",
            "Asset managers and developers tracking occupancy and lease settlements"
          ],
      problemStatement: isArabic
        ? "انتشار الإعلانات العقارية الوهمية، صعوبة التنسيق للمعاينة الميدانية، وبيروقراطية توقيع العقود الورقية والضمانات المالية."
        : "Fragmented fake listings, friction in scheduling physical site viewings, and manual paperwork delays in finalizing lease agreements and escrow deposits.",
      proposedSolution: isArabic
        ? "منصة توثيق عقارية مدعومة بالذكاء الاصطناعي مع جولات افتراضية (Matterport / Three.js)، ونظام حجز مواعيد معاينة ذكي، وعقود رقمية موثقة قانونياً."
        : "Verified digital property ecosystem with WebGL 3D walkthroughs, automated viewing scheduling with calendar sync, and e-signed smart lease agreements with escrow protection.",
      mvpScope: isArabic
        ? [
            "محرك بحث جغرافي متطور مع فلاتر دقيقة للأسعار والمساحات والمواصفات",
            "جولات افتراضية تفاعلية ثلاثية الأبعاد وصور فائقة الدقة لكل عقار",
            "نظام جدولة معاينة العقارات بين المشتري والوسيط مع تذكيرات آلية",
            "توليد عقود الإيجار والبيع وتوقيعها رقمياً مع تأكيد الهوية"
          ]
        : [
            "Interactive map search with advanced faceted filters (price, sqft, amenities)",
            "High-resolution 3D virtual walkthrough viewer with interactive floorplans",
            "Automated in-person and video viewing calendar with instant broker sync",
            "Digital lease contract generator with legally binding e-signature flow"
          ],
      v2FutureScope: isArabic
        ? [
            "خوارزمية ذكاء اصطناعي لتقييم العائد الاستثماري المتوقع وسعر المتر العادل",
            "نظام مزادات عقارية حية مع دفع العربون وضمان البنك",
            "تطبيق لإدارة الصيانة الدورية وطلبات المستأجرين بعد السكن"
          ]
        : [
            "AI Automated Valuation Model (AVM) forecasting rental yield and ROI",
            "Live digital property auctions with authenticated bank escrow guarantees",
            "Tenant post-move-in portal for automated rent collection and maintenance tickets"
          ],
      techStack: [
        {
          layer: "Frontend",
          technology: "Next.js 15 (React 19) + Three.js / WebGL",
          rationale: "Seamless interactive 3D property tours directly in browser with sub-second initial load."
        },
        {
          layer: "Backend",
          technology: "Node.js / Hono on Vercel & AWS",
          rationale: "High concurrent throughput for search queries and contract workflow transitions."
        },
        {
          layer: "Database",
          technology: "Meilisearch / Algolia (Search Index)",
          rationale: "Typo-tolerant instant search filtering across 100k+ listings in under 20ms."
        },
        {
          layer: "Database",
          technology: "PostgreSQL (Supabase) + Prisma ORM",
          rationale: "Robust relational data integrity for property listings, contracts, and financial deposits."
        },
        {
          layer: "Integrations",
          technology: "DocuSign / BoldSign API + PDFKit",
          rationale: "Automated tamper-evident cryptographic contract generation and digital sign-off."
        }
      ],
      mermaidArchitecture: `flowchart TD
    BuyerWeb["Buyer & Tenant Web Portal\\n(Next.js 15 + Three.js)"] -->|HTTPS| EdgeAPI["API Gateway\\n(Cloudflare / Hono)"]
    BrokerPortal["Broker CRM Dashboard\\n(Next.js 15)"] -->|HTTPS| EdgeAPI

    subgraph SearchAndData["Search & Data Engine"]
        EdgeAPI -->|Instant Faceted Search| SearchEngine["Meilisearch Engine\\n(Sub-20ms Queries)"]
        EdgeAPI -->|Relational Data| MainDB[("PostgreSQL DB\\n(Properties, Leases, Users)")]
    end

    subgraph Services["PropTech Services"]
        EdgeAPI --> DocSign["E-Sign Document Service\\n(PDF Contract Generation)"]
        EdgeAPI --> EscrowPay["Stripe Escrow & Deposit Lock"]
        EdgeAPI --> MediaCDN["Cloudflare R2 / S3\\n(3D Assets & Media)"]
    end`,
      userStories: [
        {
          id: "US-201",
          epic: "Discovery & Search",
          title: "Map-Based Property Exploration with Filter Clusters",
          asA: "Property Seeker",
          iWantTo: "Explore properties on a map with neighborhood price heatmaps",
          soThat: "I can identify the ideal location within my budget",
          acceptanceCriteria: [
            "Map renders property pins with price tags",
            "Clustering aggregates dense properties smoothly",
            "Filters for bedrooms, bathrooms, furnished status, and price range"
          ],
          complexity: "Medium",
          isMvp: true
        },
        {
          id: "US-202",
          epic: "Virtual Experience",
          title: "Interactive 3D Virtual Tour & Floorplan Walkthrough",
          asA: "Remote Buyer",
          iWantTo: "Navigate room-by-room in high definition with dimension measurements",
          soThat: "I can inspect the property without traveling across town",
          acceptanceCriteria: [
            "Loads 3D environment in under 2 seconds on mobile",
            "Allows clicking between predefined room hotspots",
            "Displays ceiling height and room dimensions on hover"
          ],
          complexity: "High",
          isMvp: true
        },
        {
          id: "US-203",
          epic: "Scheduling",
          title: "Instant In-Person Viewing Booking with Calendar Sync",
          asA: "Interested Buyer",
          iWantTo: "Pick an available viewing slot directly from the broker's real-time schedule",
          soThat: "I don't have to play phone tag with the real estate agent",
          acceptanceCriteria: [
            "Displays real-time broker availability slots",
            "Sends automated calendar invite (.ics) to both parties",
            "Sends WhatsApp reminder 2 hours prior to viewing"
          ],
          complexity: "Medium",
          isMvp: true
        },
        {
          id: "US-204",
          epic: "Digital Contracts",
          title: "Automated Lease Agreement Generation with E-Signatures",
          asA: "Landlord and Tenant",
          iWantTo: "Review, customize terms, and digitally sign the tenancy contract",
          soThat: "We finalize the deal securely without printing physical paper",
          acceptanceCriteria: [
            "Pre-fills tenant and property metadata automatically",
            "Two-party verification with audit trail and IP stamp",
            "Generates downloadable encrypted PDF upon signing"
          ],
          complexity: "High",
          isMvp: true
        }
      ],
      sprintRoadmap: [
        {
          sprintNumber: 1,
          title: "Data Models, Listing Ingestion & Authentication",
          durationWeeks: 2,
          coreDeliverables: [
            "PostgreSQL schema for Properties, Brokers, Media, and Users",
            "Broker verification and KYC onboarding workflow",
            "Listing creation form with image upload to S3/Cloudflare R2"
          ],
          estimatedHours: 70,
          estimatedCostUsd: 5600
        },
        {
          sprintNumber: 2,
          title: "Faceted Search, Mapbox Integration & 3D Viewer",
          durationWeeks: 2,
          coreDeliverables: [
            "Meilisearch index synchronization with PostgreSQL",
            "Interactive Mapbox map with custom SVG price markers",
            "Three.js / WebGL 360 viewer integration"
          ],
          estimatedHours: 85,
          estimatedCostUsd: 6800
        },
        {
          sprintNumber: 3,
          title: "Viewing Calendar & Broker Lead Management",
          durationWeeks: 2,
          coreDeliverables: [
            "Slot reservation calendar with broker availability rules",
            "Broker lead management Kanban board",
            "Automated SMS/Email notification worker"
          ],
          estimatedHours: 75,
          estimatedCostUsd: 6000
        },
        {
          sprintNumber: 4,
          title: "Digital Contracts, Escrow Deposit & Launch",
          durationWeeks: 2,
          coreDeliverables: [
            "PDF contract generation with digital e-signature flow",
            "Security deposit escrow hold via payment gateway",
            "End-to-end security audit and deployment"
          ],
          estimatedHours: 70,
          estimatedCostUsd: 5600
        }
      ],
      budgetSummary: {
        totalEstimatedWeeks: 8,
        totalEstimatedHours: 300,
        estimatedCostUsd: 24000,
        recommendedTeam: [
          "1x Lead Full-Stack Engineer",
          "1x Frontend / WebGL Specialist",
          "1x Cloud Architect & DevOps"
        ]
      },
      codeArtifacts: {
        prismaSchema: `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Property {
  id           String        @id @default(uuid())
  title        String
  description  String
  price        Decimal
  currency     String        @default("USD")
  type         PropertyType  @default(APARTMENT)
  bedrooms     Int
  bathrooms    Int
  areaSqft     Float
  latitude     Float
  longitude    Float
  brokerId     String
  broker       Broker        @relation(fields: [brokerId], references: [id])
  viewings     ViewingSlot[]
  contracts    Contract[]
  createdAt    DateTime      @default(now())
}

model Broker {
  id           String        @id @default(uuid())
  fullName     String
  email        String        @unique
  phoneNumber  String
  licenseNo    String        @unique
  properties   Property[]
}

model ViewingSlot {
  id           String        @id @default(uuid())
  propertyId   String
  property     Property      @relation(fields: [propertyId], references: [id])
  buyerName    String
  buyerPhone   String
  scheduledAt  DateTime
  status       ViewingStatus @default(CONFIRMED)
}

model Contract {
  id           String        @id @default(uuid())
  propertyId   String
  property     Property      @relation(fields: [propertyId], references: [id])
  tenantName   String
  depositAmount Decimal
  pdfDocumentUrl String?
  isSigned     Boolean       @default(false)
  signedAt     DateTime?
}

enum PropertyType {
  APARTMENT
  VILLA
  OFFICE
  PENTHOUSE
  LAND
}

enum ViewingStatus {
  CONFIRMED
  COMPLETED
  RESCHEDULED
  CANCELLED
}`,
        dockerCompose: `version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/estatenexus_db
      - MEILISEARCH_HOST=http://meilisearch:7700
    depends_on:
      - db
      - meilisearch

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: estatenexus_db
    ports:
      - "5432:5432"
    volumes:
      - prop_pg_data:/var/lib/postgresql/data

  meilisearch:
    image: getmeili/meilisearch:v1.6
    environment:
      - MEILI_MASTER_KEY=masterKey123
    ports:
      - "7700:7700"

volumes:
  prop_pg_data:`,
        apiEndpoints: [
          { method: "GET", path: "/api/v1/properties/search", description: "Faceted search query for properties with geo-bounds", authRequired: false },
          { method: "POST", path: "/api/v1/viewings/schedule", description: "Book an inspection viewing slot with calendar sync", authRequired: true },
          { method: "POST", path: "/api/v1/contracts/generate", description: "Generate digital tenancy lease contract PDF", authRequired: true },
          { method: "POST", path: "/api/v1/contracts/sign", description: "Cryptographically sign contract with audit timestamp", authRequired: true }
        ]
      }
    };
  }

  // 2.5 Logistics, Fleet Tracking & Warehousing
  if (
    lower.includes("logistics") ||
    lower.includes("freight") ||
    lower.includes("truck") ||
    lower.includes("fleet") ||
    lower.includes("cargo") ||
    lower.includes("warehouse") ||
    lower.includes("supply chain") ||
    lower.includes("شحن") ||
    lower.includes("أسطول") ||
    lower.includes("تخزين") ||
    lower.includes("مستودع") ||
    lower.includes("طرود") ||
    lower.includes("بضائع")
  ) {
    return {
      projectTitle: isArabic ? "منصة كارجو جريد اللوجستية (CargoGrid Engine)" : "CargoGrid Logistics & Fleet Engine",
      tagline: isArabic
        ? "إدارة أساطيل الشحن الذكية، تتبع الشاحنات بالـ GPS، وتوثيق بوالص الشحن الإلكترونية (e-BOL)"
        : "Autonomous Freight Dispatch, IoT Fleet Telematics & Digital Bill of Lading (e-BOL)",
      executiveSummary: isArabic
        ? `منصة لوجستية متطورة مصممة لتلبية: "${text.slice(0, 160)}...". تتيح ربط الشاحنين مع أساطيل النقل، وتتبع الشاحنات والطرود لحظياً عبر إنترنت الأشياء والـ GPS، مع توثيق إلكتروني كامل للاستلام والتسليم (e-POD).`
        : `An enterprise logistics and fleet marketplace engineered to fulfill: "${text.slice(0, 160)}...". Connects freight shippers with carrier fleets, providing live IoT telematics, route optimization, and digital proof of delivery.`,
      targetAudience: isArabic
        ? [
            "الشركات والمصانع الشاحنة لتتبع حركة البضائع وحساب التكاليف",
            "مدراء الأساطيل وشركات النقل لتوزيع الرحلات وجدولة الصيانة",
            "سائقو الشاحنات (الكباتن) لاستلام الرحلات وتوثيق بوالص الشحن"
          ]
        : [
            "Industrial freight shippers managing cargo dispatch and freight spend",
            "Fleet operators and dispatchers managing routes, drivers, and telematics",
            "Heavy-goods vehicle drivers executing manifests and capturing digital e-PODs"
          ],
      problemStatement: isArabic
        ? "تأخر وصول الشحنات، غياب الرؤية اللحظية لموقع الشاحنات وظروف الحمولة، والاعتماد على بوالص الشحن الورقية المعرضة للضياع."
        : "Opaque cargo transit status, empty backhaul miles driving up transport costs, and slow manual paper manifests delaying billing settlements.",
      proposedSolution: isArabic
        ? "سوق شحن رقمي ذكي يربط السائقين المتاحين تلقائياً، مع تتبع GPS ودرجات الحرارة عبر أجهزة IoT، وبوالص شحن رقمية غير قابلة للتلاعب."
        : "Smart freight broker engine with automated driver proximity matching, continuous IoT temperature and GPS telemetry, and instant PDF digital bills of lading.",
      mvpScope: isArabic
        ? [
            "لوحة تحكم مركزية لحجز شحنات النقل ومقارنة عروض أسعار الناقلين",
            "تتبع حركة الشاحنة الفوري عبر خريطة تفاعلية مع حساب وقت الوصول (ETA)",
            "تطبيق للسائق لتوثيق استلام وتسليم الشحنة عبر التوقيع والصورة الرقمية (e-POD)",
            "توليد بوليصة الشحن الإلكترونية (e-BOL) تلقائياً بصيغة PDF قابلة للتحميل"
          ]
        : [
            "Shipper booking portal with automated freight quote comparison and load posting",
            "Live vehicle telematics map tracking with weather and congestion-aware ETA",
            "Driver mobile workflow for electronic proof of delivery (e-POD) with signature capture",
            "Automated PDF digital Bill of Lading (e-BOL) generation and compliance audit trail"
          ],
      v2FutureScope: isArabic
        ? [
            "تكامل مع أجهزة OBD-II و IoT لقراءة درجات حرارة شاحنات التبريد وضغط الإطارات",
            "خوارزمية ذكاء اصطناعي لتقليل مسافات الرجوع الفارغ (Backhaul Optimization)",
            "نظام فوترة إلكتروني فوري مربوط بالجمارك وهيئة النقل"
          ]
        : [
            "IoT sensor ingestion for cold-chain reefer temperature and fuel consumption",
            "AI backhaul load matching algorithm to eliminate empty return miles",
            "Regulatory automated customs manifest submission and freight tax clearance"
          ],
      techStack: [
        {
          layer: "Frontend",
          technology: "Next.js 15 (React 19) + React Native Driver App",
          rationale: "Unified fleet management dashboard with offline-tolerant mobile manifest workflows."
        },
        {
          layer: "Backend",
          technology: "Node.js / Go Telematics Gateway",
          rationale: "Capable of ingesting 10,000+ GPS location pings per second with minimal CPU overhead."
        },
        {
          layer: "Database",
          technology: "PostgreSQL (PostGIS) + TimescaleDB",
          rationale: "Optimized for time-series geospatial GPS coordinates and relational freight contracts."
        },
        {
          layer: "Integrations",
          technology: "Google Maps Fleet Engine + Twilio SMS Alerts",
          rationale: "Turn-by-turn commercial truck routing avoiding weight/height-restricted roads."
        },
        {
          layer: "DevOps & Cloud",
          technology: "Docker + AWS ECS / Cloudflare CDN",
          rationale: "High-availability telemetry cluster with automated horizontal scaling."
        }
      ],
      mermaidArchitecture: `flowchart TD
    ShipperWeb["Shipper Cargo Portal\\n(Next.js 15)"] -->|HTTPS| FleetGateway["Edge Telematics Gateway\\n(Go / Node.js)"]
    DriverApp["Driver Mobile App\\n(GPS + Camera e-POD)"] -->|Live GPS Telemetry| FleetGateway

    subgraph DataStorage["Time-Series & Spatial Store"]
        FleetGateway --> GPSCache["Redis Geolocation Cache\\n(Active Fleet Positions)"]
        FleetGateway --> MainDB[("PostgreSQL + PostGIS\\n(Shipments, Waypoints, Carriers)")]
    end

    subgraph Services["Logistics Microservices"]
        FleetGateway --> DispatchAlgo["Automated Load Dispatcher\\n(Route Optimization Engine)"]
        FleetGateway --> BOLService["Digital e-BOL Generator\\n(PDF & Audit Signatures)"]
        FleetGateway --> RouteEngine["Commercial Fleet Maps Engine\\n(Truck Route Clearance)"]
    end`,
      userStories: [
        {
          id: "US-401",
          epic: "Fleet Telematics",
          title: "Real-Time Truck Telematics & Live Route Tracking",
          asA: "Fleet Dispatcher",
          iWantTo: "Monitor active trucks on an interactive map with live speed and heading",
          soThat: "I can identify delays and redirect vehicles around highway blockages",
          acceptanceCriteria: [
            "Updates truck map position every 5 seconds",
            "Displays driver contact, cargo weight, and current ETA",
            "Triggers visual alert if vehicle deviates from predefined corridor"
          ],
          complexity: "High",
          isMvp: true
        },
        {
          id: "US-402",
          epic: "Proof of Delivery",
          title: "Electronic Bill of Lading (e-BOL) and Signature Capture",
          asA: "Receiving Warehouse Clerk",
          iWantTo: "Inspect cargo, sign on the driver's screen, and snap condition photos",
          soThat: "Delivery is verified instantly with tamper-evident proof of delivery",
          acceptanceCriteria: [
            "Captures recipient signature and GPS timestamp",
            "Attaches up to 4 delivery photos for damaged cargo inspection",
            "Automatically emails encrypted PDF receipt to shipper and carrier"
          ],
          complexity: "Medium",
          isMvp: true
        },
        {
          id: "US-403",
          epic: "Load Matching",
          title: "Automated Freight Load Posting and Carrier Bidding",
          asA: "Cargo Shipper",
          iWantTo: "Post an origin-destination load requirement and receive instant carrier quotes",
          soThat: "I secure the best freight rate without phone negotiations",
          acceptanceCriteria: [
            "Calculates target benchmark rate based on distance and tonnage",
            "Verified carriers submit bids within 15-minute bidding window",
            "Auto-accepts lowest qualified carrier and generates dispatch manifest"
          ],
          complexity: "High",
          isMvp: true
        }
      ],
      sprintRoadmap: [
        {
          sprintNumber: 1,
          title: "Data Architecture, Vehicle Manifests & Shipper Portal",
          durationWeeks: 2,
          coreDeliverables: [
            "PostgreSQL PostGIS schema for Shipments, Vehicles, Drivers, and Waypoints",
            "Shipper shipment creation portal with pickup/delivery geocoding",
            "Carrier verification and fleet asset registration"
          ],
          estimatedHours: 75,
          estimatedCostUsd: 6000
        },
        {
          sprintNumber: 2,
          title: "Driver App, GPS Ingestion & Real-Time Fleet Map",
          durationWeeks: 2,
          coreDeliverables: [
            "Driver mobile app with offline manifest caching",
            "High-throughput GPS telemetry ingestion gateway",
            "Dispatcher live fleet overview map with status clustering"
          ],
          estimatedHours: 85,
          estimatedCostUsd: 6800
        },
        {
          sprintNumber: 3,
          title: "Digital e-BOL, Proof of Delivery & Automated Notifications",
          durationWeeks: 2,
          coreDeliverables: [
            "Camera and digital signature capture for e-POD",
            "Cryptographic PDF Bill of Lading generator",
            "Automated milestone SMS/Email alerts to shippers"
          ],
          estimatedHours: 75,
          estimatedCostUsd: 6000
        },
        {
          sprintNumber: 4,
          title: "Carrier Settlement, Performance Tuning & Deployment",
          durationWeeks: 2,
          coreDeliverables: [
            "Automated freight payout ledger and freight invoice generation",
            "Lighthouse and stress-testing with 1,000 concurrent GPS pings",
            "Cloud edge deployment and production cutover"
          ],
          estimatedHours: 65,
          estimatedCostUsd: 5200
        }
      ],
      budgetSummary: {
        totalEstimatedWeeks: 8,
        totalEstimatedHours: 300,
        estimatedCostUsd: 24000,
        recommendedTeam: [
          "1x Lead Full-Stack & Telematics Architect",
          "1x Mobile React Native Engineer",
          "1x DevOps & Geospatial Cloud Engineer"
        ]
      },
      codeArtifacts: {
        prismaSchema: `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Carrier {
  id          String    @id @default(uuid())
  companyName String
  licenseNo   String    @unique
  vehicles    Vehicle[]
  drivers     Driver[]
  shipments   Shipment[]
  createdAt   DateTime  @default(now())
}

model Vehicle {
  id          String        @id @default(uuid())
  carrierId   String
  carrier     Carrier       @relation(fields: [carrierId], references: [id])
  plateNumber String        @unique
  truckType   TruckType     @default(DRY_VAN)
  maxCapacity Int
  currentLat  Float?
  currentLng  Float?
  shipments   Shipment[]
}

model Driver {
  id          String     @id @default(uuid())
  carrierId   String
  carrier     Carrier    @relation(fields: [carrierId], references: [id])
  fullName    String
  phoneNumber String     @unique
  shipments   Shipment[]
}

model Shipment {
  id            String         @id @default(uuid())
  trackingCode  String         @unique
  carrierId     String?
  carrier       Carrier?       @relation(fields: [carrierId], references: [id])
  vehicleId     String?
  vehicle       Vehicle?       @relation(fields: [vehicleId], references: [id])
  driverId      String?
  driver        Driver?        @relation(fields: [driverId], references: [id])
  originCity    String
  destCity      String
  cargoWeightKg Int
  status        ShipmentStatus @default(PENDING_DISPATCH)
  bolDocumentUrl String?
  signedAt      DateTime?
  createdAt     DateTime       @default(now())
}

enum TruckType {
  DRY_VAN
  FLATBED
  REEFER_TEMPERATURE_CONTROLLED
  HEAVY_HAUL
}

enum ShipmentStatus {
  PENDING_DISPATCH
  ASSIGNED
  LOADING
  IN_TRANSIT
  DELIVERED
  EXCEPTION
}`,
        dockerCompose: `version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/cargogrid_db
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis

  db:
    image: postgis/postgis:16-3.4-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: cargogrid_db
    ports:
      - "5432:5432"
    volumes:
      - cargo_pg_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  cargo_pg_data:`,
        apiEndpoints: [
          { method: "GET", path: "/api/v1/shipments/search", description: "Search available freight shipments and carrier loads", authRequired: true },
          { method: "POST", path: "/api/v1/telematics/ping", description: "Ingest high-frequency GPS coordinate ping from truck OBD-II", authRequired: true },
          { method: "POST", path: "/api/v1/shipments/:id/pod", description: "Submit digital proof of delivery with signature and photos", authRequired: true },
          { method: "GET", path: "/api/v1/shipments/:id/bol", description: "Download cryptographically signed electronic bill of lading PDF", authRequired: true }
        ]
      }
    };
  }

  // 3. E-Commerce & Marketplace
  if (
    lower.includes("ecommerce") ||
    lower.includes("e-commerce") ||
    lower.includes("shop") ||
    lower.includes("store") ||
    lower.includes("marketplace") ||
    lower.includes("retail") ||
    lower.includes("products") ||
    lower.includes("cart") ||
    lower.includes("checkout") ||
    lower.includes("متجر") ||
    lower.includes("تجارة") ||
    lower.includes("تسوق") ||
    lower.includes("منتجات") ||
    lower.includes("تجار") ||
    lower.includes("سلة") ||
    lower.includes("شراء")
  ) {
    return {
      projectTitle: isArabic ? "منصة أومني كوميرس (OmniCommerce Cloud)" : "OmniCommerce Multi-Vendor Hub",
      tagline: isArabic
        ? "سوق إلكتروني متكامل متعدد التجار، مع إدارة المخزون الفوري والدفع السريع بضغطة زر"
        : "Headless Multi-Vendor Marketplace with Real-Time Inventory & Instant 1-Click Checkout",
      executiveSummary: isArabic
        ? `منصة تجارة إلكترونية سحابية تلبي احتياجات: "${text.slice(0, 160)}...". تتيح للتجار إدارة منتجاتهم ومخزونهم، مع تجربة تسوق فائقة السرعة للمستهلكين تدعم السلة الذكية والدفع المحلي والدولي.`
        : `A modern, headless e-commerce marketplace engineered to fulfill: "${text.slice(0, 160)}...". Features multi-vendor store portals, sub-50ms product catalog search, and automated split payout settlements.`,
      targetAudience: isArabic
        ? [
            "المتسوقون الباحثون عن تجربة شراء سريعة ودفع آمن",
            "التجار وأصحاب المتاجر لإدارة المخزون ومتابعة المبيعات",
            "مدراء المنصة لمراقبة العمليات والتحصيلات والضرائب"
          ]
        : [
            "Online shoppers seeking ultra-fast discovery and frictionless 1-click checkout",
            "Independent merchants managing product catalogs, flash sales, and fulfillments",
            "Marketplace administrators managing vendor commissions and automated tax invoices"
          ],
      problemStatement: isArabic
        ? "بطء المتاجر التقليدية، تعقيد إدارة المخزون بين فروع ومتاجر متعددة، وصعوبة تقسيم المدفوعات والضرائب بين التجار."
        : "Slow page load times on legacy platforms, inventory sync delays causing overselling, and complex multi-vendor commission and tax reconciliation.",
      proposedSolution: isArabic
        ? "بنية تحتية حديثة تعتمد على Next.js 15 مع Turbopack وكاش موزع، محرك بحث فوري للمنتجات، وبوابة دفع مقسمة تلقائياً."
        : "Modern headless architecture utilizing Next.js 15 edge rendering, Meilisearch for instant product lookups, and automated vendor split payouts via Stripe Connect.",
      mvpScope: isArabic
        ? [
            "كتالوج منتجات سريع مع فلاتر حسب الفئة والمقاس والسعر والمراجعات",
            "سلة تسوق ذكية مع حفظ العناصر ودفع فوري (Apple Pay / Mada / بطاقات)",
            "بوابة مخصصة للتاجر لإضافة المنتجات وتتبع المخزون والطلبات",
            "نظام تتبع شحنات الطلبات وتوليد بوالص الشحن التلقائية"
          ]
        : [
            "Sub-50ms product catalog with faceted search, reviews, and dynamic pricing",
            "Persistent cart with 1-click checkout supporting localized payment methods",
            "Self-service vendor dashboard for inventory, orders, and promotional discounts",
            "Automated shipping label generation and parcel tracking status webhook"
          ],
      v2FutureScope: isArabic
        ? [
            "نظام توصيات ذكي مدعوم بالذكاء الاصطناعي بناءً على سلوك الشراء",
            "بث مباشر لبيع المنتجات (Live Video Shopping)",
            "برنامج ولاء ونقاط ومكافآت مدمج"
          ]
        : [
            "AI-powered hyper-personalized recommendation and cross-sell engine",
            "Interactive live video streaming commerce with instant checkout overlay",
            "Gamified loyalty rewards program with tiered cash-back wallet"
          ],
      techStack: [
        {
          layer: "Frontend",
          technology: "Next.js 15 (React 19) + Tailwind CSS",
          rationale: "Instant server-rendered product pages ensuring top Google SEO ranking and < 0.8s LCP."
        },
        {
          layer: "Backend",
          technology: "Medusa.js / Node.js Microservices",
          rationale: "Modular headless commerce architecture supporting multi-vendor catalogs and promotions."
        },
        {
          layer: "Database",
          technology: "PostgreSQL (Supabase) + Redis (Session/Cart)",
          rationale: "ACID transactional safety for payment ledger and zero-downtime cart state."
        },
        {
          layer: "Database",
          technology: "Meilisearch Engine (Catalog Index)",
          rationale: "Instant typo-tolerant search across millions of SKUs in under 20ms."
        },
        {
          layer: "Integrations",
          technology: "Stripe Connect / HyperPay / Mada",
          rationale: "Automated escrow holds, instant split vendor commissions, and local payment methods."
        }
      ],
      mermaidArchitecture: `flowchart TD
    ShopperWeb["Shopper Web / Mobile App\\n(Next.js 15 Turbopack)"] -->|HTTPS| EdgeAPI["API Gateway\\n(Hono / Medusa)"]
    VendorPortal["Merchant Store Dashboard\\n(Next.js 15)"] -->|HTTPS| EdgeAPI

    subgraph CoreEngine["Commerce Engine"]
        EdgeAPI --> ProductSearch["Catalog Search Engine\\n(Meilisearch < 20ms)"]
        EdgeAPI --> OrderEngine["Order & Cart State Machine\\n(Redis Session Lock)"]
        OrderEngine --> Database[("PostgreSQL Store\\n(Vendors, SKUs, Orders)")]
    end

    subgraph Integrations["Third-Party Integrations"]
        OrderEngine --> PaymentSplit["Stripe Connect & Mada Payouts"]
        OrderEngine --> ShippingAPI["Carrier Logistics API\\n(Aramex / DHL Tracking)"]
        OrderEngine --> TaxEngine["ZATCA / VAT Automated E-Invoicing"]
    end`,
      userStories: [
        {
          id: "US-301",
          epic: "Catalog & Search",
          title: "Sub-Second Product Search with Instant Facets",
          asA: "Shopper",
          iWantTo: "Type keywords and see matching products appear instantly with filter chips",
          soThat: "I find what I need quickly without waiting for page refreshes",
          acceptanceCriteria: [
            "Search results update under 30ms as user types",
            "Highlights matching keywords in titles and descriptions",
            "Filterable by price range, brand, rating, and delivery speed"
          ],
          complexity: "Medium",
          isMvp: true
        },
        {
          id: "US-302",
          epic: "Checkout & Payments",
          title: "One-Click Streamlined Checkout with Local Cards",
          asA: "Shopper",
          iWantTo: "Complete my purchase using Apple Pay or saved payment cards in seconds",
          soThat: "I avoid lengthy form-filling and cart abandonment",
          acceptanceCriteria: [
            "Supports Apple Pay, Google Pay, and Mada/Credit Cards",
            "Auto-calculates taxes and shipping based on selected address",
            "Locks inventory stock during checkout to prevent double-selling"
          ],
          complexity: "High",
          isMvp: true
        },
        {
          id: "US-303",
          epic: "Vendor Management",
          title: "Vendor Order Fulfillment & Shipment Tracking Update",
          asA: "Store Merchant",
          iWantTo: "View incoming orders, print shipping labels, and mark packages as shipped",
          soThat: "Customers receive their items promptly with live tracking numbers",
          acceptanceCriteria: [
            "Orders grouped by status: New, In Packaging, Dispatched, Delivered",
            "1-click PDF shipping label printing",
            "Automatic tracking number generation and SMS alert to customer"
          ],
          complexity: "Medium",
          isMvp: true
        }
      ],
      sprintRoadmap: [
        {
          sprintNumber: 1,
          title: "Data Models, Multi-Tenant Store Setup & Catalog",
          durationWeeks: 2,
          coreDeliverables: [
            "PostgreSQL schema for Vendors, Products, Variants, and Categories",
            "Vendor product creation and variant SKU inventory management",
            "Meilisearch product index initialization and indexing pipeline"
          ],
          estimatedHours: 75,
          estimatedCostUsd: 6000
        },
        {
          sprintNumber: 2,
          title: "Cart Engine, Checkout & Payment Gateway",
          durationWeeks: 2,
          coreDeliverables: [
            "Persistent cart synchronized with Redis and localStorage",
            "Checkout flow with shipping address validation and tax calculation",
            "Stripe Connect / Local gateway integration with split commission logic"
          ],
          estimatedHours: 80,
          estimatedCostUsd: 6400
        },
        {
          sprintNumber: 3,
          title: "Merchant Portal, Order Fulfillment & Shipping APIs",
          durationWeeks: 2,
          coreDeliverables: [
            "Merchant dashboard with sales charts and order status updates",
            "Carrier API integration for shipping label creation",
            "Customer order history and status tracking timeline"
          ],
          estimatedHours: 75,
          estimatedCostUsd: 6000
        },
        {
          sprintNumber: 4,
          title: "E-Invoicing Compliance, Performance & Launch",
          durationWeeks: 2,
          coreDeliverables: [
            "Automated VAT / ZATCA compliant e-invoicing generation",
            "Lighthouse performance optimization (95+ score on mobile)",
            "Production deployment to edge CDN and monitoring"
          ],
          estimatedHours: 60,
          estimatedCostUsd: 4800
        }
      ],
      budgetSummary: {
        totalEstimatedWeeks: 8,
        totalEstimatedHours: 290,
        estimatedCostUsd: 23200,
        recommendedTeam: [
          "1x Lead Full-Stack Engineer",
          "1x Frontend / UX Engineer",
          "1x Payment & Integrations Specialist"
        ]
      },
      codeArtifacts: {
        prismaSchema: `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Vendor {
  id          String    @id @default(uuid())
  businessName String
  email       String    @unique
  commissionRate Float  @default(0.10)
  products    Product[]
  orders      Order[]
  createdAt   DateTime  @default(now())
}

model Product {
  id          String    @id @default(uuid())
  vendorId    String
  vendor      Vendor    @relation(fields: [vendorId], references: [id])
  title       String
  description String
  priceCents  Int
  stockCount  Int       @default(0)
  category    String
  orderItems  OrderItem[]
  createdAt   DateTime  @default(now())
}

model Order {
  id           String      @id @default(uuid())
  customerId   String
  vendorId     String
  vendor       Vendor      @relation(fields: [vendorId], references: [id])
  totalAmount  Int
  status       OrderStatus @default(PAID)
  trackingNo   String?
  items        OrderItem[]
  createdAt    DateTime    @default(now())
}

model OrderItem {
  id        String   @id @default(uuid())
  orderId   String
  order     Order    @relation(fields: [orderId], references: [id])
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  quantity  Int
  price     Int
}

enum OrderStatus {
  PENDING
  PAID
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}`,
        dockerCompose: `version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/omnicommerce_db
      - REDIS_URL=redis://redis:6379
      - MEILISEARCH_URL=http://meilisearch:7700
    depends_on:
      - db
      - redis
      - meilisearch

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: omnicommerce_db
    ports:
      - "5432:5432"
    volumes:
      - commerce_pg_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  meilisearch:
    image: getmeili/meilisearch:v1.6
    ports:
      - "7700:7700"

volumes:
  commerce_pg_data:`,
        apiEndpoints: [
          { method: "GET", path: "/api/v1/products/search", description: "Query catalog with faceted filters and pagination", authRequired: false },
          { method: "POST", path: "/api/v1/checkout/session", description: "Initialize multi-vendor split payment checkout session", authRequired: true },
          { method: "GET", path: "/api/v1/vendor/orders", description: "List vendor orders with packing and label generation", authRequired: true },
          { method: "POST", path: "/api/v1/shipping/create-label", description: "Dispatch shipping request to carrier API and generate label", authRequired: true }
        ]
      }
    };
  }

  // 4. Default / Adaptive Dynamic Fallback:
  // If the brief is anything else (e.g. AI SaaS, Logistics, EdTech, FinTech, Crypto, Social, Health, etc.)
  // We extract the user's actual keywords and generate a deeply customized blueprint!
  const words = text.split(/\s+/).filter((w) => w.length > 2);
  const cleanTitle = words.slice(0, 4).join(" ") || (isArabic ? "مشروع النظام الذكي" : "Smart Enterprise System");

  return {
    projectTitle: isArabic ? `${cleanTitle} (الجيل الجديد)` : `${cleanTitle} Architecture`,
    tagline: isArabic
      ? "منصة متطورة قائمة على الذكاء الاصطناعي وهندسة الأنظمة الحديثة الموزعة"
      : "Autonomous Enterprise Solution Engineered for Scalability & Reliability",
    executiveSummary: isArabic
      ? `حل برمجي مؤسسي متكامل تم تصميمه خصيصاً لتلبية متطلبات العميل: "${text.slice(0, 180)}...". يعتمد النظام على بنية تحتية سحابية موزعة تضمن سرعة الاستجابة، الأمان العالي، وقابلية التوسع المليونية.`
      : `An enterprise-grade software architecture tailored to realize: "${text.slice(0, 180)}...". Designed for high-availability multi-tenancy, sub-100ms latency, and automated event streaming.`,
    targetAudience: isArabic
      ? [
          "المستخدمون النهائيون الباحثون عن تجربة تفاعلية سريعة وسلسة",
          "فريق العمليات والإدارة لمتابعة مؤشرات الأداء اللحظية وسير العمل",
          "أصحاب القرار والشركاء لمراجعة التقارير المالية والتحليلات الاستراتيجية"
        ]
      : [
          "Primary end-users demanding intuitive task execution and minimal friction",
          "Operations managers requiring real-time observability and workflow controls",
          "Executive stakeholders reviewing analytics dashboards and business throughput"
        ],
    problemStatement: isArabic
      ? "المعاناة من الأنظمة القديمة البطيئة، تشتت البيانات بين أدوات متعددة، والافتقار إلى الأتمتة الذكية والربط الفوري."
      : "Traditional platforms in this vertical suffer from fragmented legacy workflows, high latency, and lack of real-time multi-channel orchestration.",
    proposedSolution: isArabic
      ? "بناء منصة موحدة تعتمد على أحدث معايير الويب والذكاء الاصطناعي مع معمارية معتمدة على الأحداث وقواعد بيانات سحابية متقدمة."
      : "A unified, modern cloud platform combining serverless event processing, typed database schemas, and AI-accelerated workflows.",
    mvpScope: isArabic
      ? [
          "واجهة مستخدم تفاعلية فائقة السرعة مع مصادقة آمنة ودعم ثنائي اللغة",
          "محرك المعالجة الأساسي لتنفيذ العمليات المطلوبة ومتابعة حالتها لحظياً",
          "لوحة تحكم إدارية متقدمة مع صلاحيات مستخدمين متعددة المستويات (RBAC)",
          "تكامل آلي لإرسال الإشعارات والتقارير عبر البريد والرسائل"
        ]
      : [
          "High-performance client UI with frictionless authentication and RBAC permissions",
          "Core business execution pipeline with real-time state synchronization",
          "Administrative command center with audit logging and operational metrics",
          "Automated event notification gateway supporting email, webhooks, and push alerts"
        ],
    v2FutureScope: isArabic
      ? [
          "خوارزميات ذكاء اصطناعي تنبؤية لتحليل البيانات وتوقع الاحتياجات",
          "واجهة برمجة تطبيقات عامة (Public REST/GraphQL API) مع Webhooks للمطورين",
          "تطبيق مخصص للأجهزة الذكية (iOS & Android) مع دعم العمل بدون إنترنت"
        ]
      : [
          "Predictive AI anomaly detection and proactive recommendation engine",
          "Public developer API with granular rate limiting and automated webhooks",
          "Offline-first mobile application client with background synchronization"
        ],
    techStack: [
      {
        layer: "Frontend",
        technology: "Next.js 15 (React 19) + Tailwind CSS v4",
        rationale: "Blazing fast edge rendering, optimal Core Web Vitals, and responsive multi-device support."
      },
      {
        layer: "Backend",
        technology: "Node.js (TypeScript) / Fastify on Cloudflare Workers",
        rationale: "Micro-second cold starts with distributed edge routing and strict type safety."
      },
      {
        layer: "Database",
        technology: "PostgreSQL (Supabase) + Redis (Upstash)",
        rationale: "ACID relational persistence paired with in-memory caching for sub-millisecond lookups."
      },
      {
        layer: "Integrations",
        technology: "JWT HttpOnly + Cloudflare Turnstile & WAF",
        rationale: "Zero-trust posture verified against OWASP Top 10 vulnerabilities."
      },
      {
        layer: "DevOps & Cloud",
        technology: "Docker + GitHub Actions + Vercel Enterprise",
        rationale: "Automated test validation, immutable rollbacks, and 99.99% uptime guarantee."
      }
    ],
    mermaidArchitecture: `flowchart TD
    UserApp["Web & Mobile Client Interface\\n(Next.js 15 / React 19)"] -->|Secure HTTPS / WSS| EdgeGateway["Cloudflare Edge API Gateway"]
    AdminApp["Enterprise Management Portal\\n(RBAC Controls)"] -->|Secure HTTPS| EdgeGateway

    subgraph ServiceMesh["Application Core & Intelligence"]
        EdgeGateway --> WorkflowEngine["Domain Workflow Engine\\n(Event-Driven Architecture)"]
        WorkflowEngine --> AIModule["AI Synthesis & Automation\\n(Gemini / OpenAI API)"]
    end

    subgraph StorageLayer["Data & Persistence Tier"]
        WorkflowEngine --> RedisCache["Upstash Redis Cache\\n(Sessions & Distributed Locks)"]
        WorkflowEngine --> MainDatabase[("PostgreSQL Database\\n(Typed Relational Storage)")]
    end

    subgraph IntegrationLayer["Integrations & Notification Services"]
        WorkflowEngine --> Notifications["Transactional Gateway\\n(Resend & Twilio SMS)"]
        WorkflowEngine --> Webhooks["External Webhook Handlers"]
    end`,
    userStories: [
      {
        id: "US-401",
        epic: "Access & Setup",
        title: "Enterprise Multi-Tenant Onboarding & Security Setup",
        asA: "Authorized User",
        iWantTo: "Sign in securely via SSO or Magic Link and configure my organizational profile",
        soThat: "I can safely access the workspace with my team's assigned permissions",
        acceptanceCriteria: [
          "Zero-friction OAuth / Magic Link login in under 10 seconds",
          "Automatic tenant isolation enforced by database Row-Level Security",
          "Session persists securely with HttpOnly cookies"
        ],
        complexity: "Low",
        isMvp: true
      },
      {
        id: "US-402",
        epic: "Core Workflow",
        title: "Interactive Primary Workflow Execution with Live Status",
        asA: "Active User",
        iWantTo: "Execute key domain actions and monitor live milestone progression",
        soThat: "I have transparent visibility into each stage of processing",
        acceptanceCriteria: [
          "Displays animated step-by-step progress indicator",
          "Validates inputs client-side and server-side before execution",
          "Persists completed state with immutable timestamp"
        ],
        complexity: "High",
        isMvp: true
      },
      {
        id: "US-403",
        epic: "Operations & Governance",
        title: "Operational Analytics & Administrative Audit Dashboard",
        asA: "System Administrator",
        iWantTo: "Review system throughput, error rates, and user activity history",
        soThat: "I maintain operational integrity and compliance across our organization",
        acceptanceCriteria: [
          "Real-time visual graphs for daily activity and throughput",
          "Searchable and filterable immutable audit logs",
          "1-click export of data summaries in CSV and JSON formats"
        ],
        complexity: "Medium",
        isMvp: true
      }
    ],
    sprintRoadmap: [
      {
        sprintNumber: 1,
        title: "Core Data Architecture, Authentication & Base API",
        durationWeeks: 2,
        coreDeliverables: [
          "PostgreSQL relational schema and migration scripts",
          "Authentication and session management with RBAC",
          "Foundational API endpoints with typed validation"
        ],
        estimatedHours: 70,
        estimatedCostUsd: 5600
      },
      {
        sprintNumber: 2,
        title: "Core Business Workflow & Interactive Interface",
        durationWeeks: 2,
        coreDeliverables: [
          "Interactive client dashboard with state management",
          "Execution workflow engine with Redis event streaming",
          "Responsive layouts optimized for desktop and mobile devices"
        ],
        estimatedHours: 80,
        estimatedCostUsd: 6400
      },
      {
        sprintNumber: 3,
        title: "Integration Ecosystem, Notifications & Reporting",
        durationWeeks: 2,
        coreDeliverables: [
          "Transactional notification pipelines (Email / SMS)",
          "Reporting engine with downloadable summaries",
          "Third-party webhook dispatchers"
        ],
        estimatedHours: 75,
        estimatedCostUsd: 6000
      },
      {
        sprintNumber: 4,
        title: "Security Hardening, End-to-End Testing & Launch",
        durationWeeks: 2,
        coreDeliverables: [
          "Comprehensive OWASP security audit and penetration check",
          "Automated load testing simulating high concurrency",
          "Zero-downtime production deployment to cloud edge"
        ],
        estimatedHours: 65,
        estimatedCostUsd: 5200
      }
    ],
    budgetSummary: {
      totalEstimatedWeeks: 8,
      totalEstimatedHours: 290,
      estimatedCostUsd: 23200,
      recommendedTeam: [
        "1x Lead Full-Stack Engineer",
        "1x Backend & Systems Architect",
        "1x Frontend / UX Specialist"
      ]
    },
    codeArtifacts: {
      prismaSchema: `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Organization {
  id        String   @id @default(uuid())
  name      String
  slug      String   @unique
  members   User[]
  records   Record[]
  createdAt DateTime @default(now())
}

model User {
  id             String       @id @default(uuid())
  email          String       @unique
  fullName       String
  role           UserRole     @default(MEMBER)
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id])
  createdAt      DateTime     @default(now())
}

model Record {
  id             String       @id @default(uuid())
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id])
  title          String
  status         RecordStatus @default(ACTIVE)
  metadata       Json?
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
}

enum UserRole {
  ADMIN
  MANAGER
  MEMBER
  VIEWER
}

enum RecordStatus {
  DRAFT
  ACTIVE
  ARCHIVED
}`,
      dockerCompose: `version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/app_db
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: app_db
    ports:
      - "5432:5432"
    volumes:
      - app_pg_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  app_pg_data:`,
      apiEndpoints: [
        { method: "GET", path: "/api/v1/health", description: "Health check and database ping", authRequired: false },
        { method: "POST", path: "/api/v1/workflows/execute", description: "Execute domain workflow and stream milestone updates", authRequired: true },
        { method: "GET", path: "/api/v1/analytics/summary", description: "Fetch organization KPI metrics and throughput logs", authRequired: true }
      ]
    }
  };
}
