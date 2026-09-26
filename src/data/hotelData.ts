import { Room, Amenity, Review } from '../types';

export const HOTEL_INFO = {
  name: "The Aurelia",
  fullName: "The Aurelia Hotel & Residences",
  tagline: "Luxury, Comfort & Elegance",
  subTagline: "Hotel & Residences",
  established: "Est. 1928",
  status: "Heritage Landmark",
  address: "108 Aurelia Boulevard, Grand Avenue, Heritage District, Metropolis 10001",
  phoneTollFree: "+1 (800) 555-0199",
  phoneInternational: "+1 (212) 555-0188",
  emailConcierge: "concierge@theaureliahotel.com",
  emailReservations: "reservations@theaureliahotel.com",
  emailContact: "aafrin512@theaureliahotel.com",
  checkInTime: "15:00",
  checkOutTime: "12:00 (3:00 PM for Privilege Club Members)",
  ratings: {
    overall: 4.95,
    max: 5.0,
    reviewCount: 856,
    cleanliness: 5.0,
    service: 4.98,
    comfort: 4.95,
    location: 4.97,
    dining: 4.92,
    awards: [
      "Forbes Travel Guide 5-Star Rated 2026",
      "Prix Villégiature 2025 Grand Winner",
      "World Luxury Hotel Awards - Best Heritage Urban Oasis"
    ]
  },
  keyFigures: [
    { figure: "24 / 7", label: "Clefs d'Or Service" },
    { figure: "3,200 sq.m", label: "Hydrotherapy & Spa" },
    { figure: "10 Gbps", label: "Dedicated Fiber Mesh" },
    { figure: "Phantom VIII", label: "House Chauffeur Fleet" }
  ]
};

export const INITIAL_ROOMS: Room[] = [
  {
    id: "deluxe-room",
    name: "Deluxe Room",
    chamberNumber: "Chamber 01",
    tier: "Deluxe",
    pricePerNight: 420,
    subPriceLabel: "Taxes & artisanal breakfast included",
    wing: "Courtyard Wing",
    sizeSqm: 45,
    maxGuests: 2,
    bedConfig: "1 King Bed",
    view: "Garden Courtyard",
    description: "An intimate sanctuary featuring refined Italian marble bathroom, handcrafted furnishings, and tranquil courtyard vistas designed for deep repose.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWP_OII0KrYxzkxPleU7_2gGe4OVGpQdJXeaMfaWO8b9FaQmGyAhd3iH2AdMLpFesvlc9f8lKsKkOKspaqw-3Q0tSBTL9S7wdYNynxxtjMfnDKY6tp_2l8wFCeEfUQn05fdEHsIyXPzTZrwThZV4kEwhbZayXj4RSX8paI655zN1f4WUtPGScs10lamAtJjpRstfG85ZfDNjvwYOrB2sarR1mYtLBWIAR2LEyw674DZdpSrrb2duKonw",
    galleryImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBWP_OII0KrYxzkxPleU7_2gGe4OVGpQdJXeaMfaWO8b9FaQmGyAhd3iH2AdMLpFesvlc9f8lKsKkOKspaqw-3Q0tSBTL9S7wdYNynxxtjMfnDKY6tp_2l8wFCeEfUQn05fdEHsIyXPzTZrwThZV4kEwhbZayXj4RSX8paI655zN1f4WUtPGScs10lamAtJjpRstfG85ZfDNjvwYOrB2sarR1mYtLBWIAR2LEyw674DZdpSrrb2duKonw",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCVD7rm40QB-kyvibiWRejjeuNrIHsCagtne-TjR9H7pWtiqH31-og8s7VmpsoZw9j1F6QCBLweCDERzX8TFKkimafQmTlctLb2u4mRMoyUpZQ06qqWoWITWEIBwRoG96TmLcLDXJ-5CW4wizt-Sq5vLjLdiRJcwZv5WgvV0XBZQxU5-aWPV7OCV5oSnUWQP4Xqa_EcXsTvwli6NTifMVVyDhDwivNv8wI8xtpcrpQiwNsV7FZQrrhkUg"
    ],
    features: [
      "High-speed Wi-Fi",
      "Nespresso Bar",
      "Walk-in Rain Shower",
      "Smart TV"
    ],
    amenitiesList: [
      "800-thread Rivolta Carmignani linens",
      "Acqua di Parma toiletries",
      "Circadian ambient mood lighting",
      "Artisanal morning tea tray",
      "Bespoke soundproofing triple-glazing"
    ],
    hasBalcony: false,
    hasOceanView: false,
    hasKingBed: true,
    hasPrivateJacuzzi: false
  },
  {
    id: "premium-room",
    name: "Premium Room",
    chamberNumber: "Chamber 02",
    tier: "Premium",
    pricePerNight: 650,
    subPriceLabel: "Complimentary sunset aperitif hour",
    wing: "Upper Levels",
    sizeSqm: 62,
    maxGuests: 3,
    bedConfig: "1 King / 2 Doubles",
    view: "Skyline Horizon",
    description: "Spacious luxury accented by expansive floor-to-ceiling windows, private sunset balcony, and soaking freestanding tub overlooking evening lights.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNm-tlodayXAf9tMfolfXqdLOpwFkUTgEgD5F2cPvBqIxYJfltMkUSLoLIZ5YTZ6ZogUBve2tFKYGs5_GlIhAuTfMHh8yaIiouNR2q2AGTHQsviIMPnb6m3Mojg6uxJtH9cq-LaCwzOfXnvrH482XSa-KXcw5dt6gOhoKBV8Cg3-ICxg4ZQBrJECCNdN2kf_oqnqiyJcJRSbgB3micYn6pVEEHkMWOknT9qJmhbQSO883tYFV0PF3PdQ",
    galleryImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBNm-tlodayXAf9tMfolfXqdLOpwFkUTgEgD5F2cPvBqIxYJfltMkUSLoLIZ5YTZ6ZogUBve2tFKYGs5_GlIhAuTfMHh8yaIiouNR2q2AGTHQsviIMPnb6m3Mojg6uxJtH9cq-LaCwzOfXnvrH482XSa-KXcw5dt6gOhoKBV8Cg3-ICxg4ZQBrJECCNdN2kf_oqnqiyJcJRSbgB3micYn6pVEEHkMWOknT9qJmhbQSO883tYFV0PF3PdQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBf2CTGJ9Ldf2IRJ8ZzYltWFVs6vp9zL0gPMHd5kOq6giz8qsul4DSJBwhb-6JoZIv0KpARLC0GWfFvD17UpJHMnX59OPXE08voKKU0PVzZ05B20RWjkQv9mZ9wUN2NnvztkW6gUjrUyvHwT6hHzQ9b_CYSDgeE_VM3ikUbVG7hZ8uwAtpOYEi1ej5FcqK4qSKyCrorXr6hYRxFTIkmsmyd3NVMzipra-GigWBgpOglhAGaLq1SfgwlYA"
    ],
    features: [
      "Private Balcony",
      "Deep Soaking Tub",
      "24/7 In-Room Dining",
      "Premium Audio"
    ],
    amenitiesList: [
      "Freestanding stone bathtub with skyline panorama",
      "Devialet wireless acoustic sound system",
      "Walk-in dressing parlor",
      "Personalized mixology cocktail cart",
      "Complimentary pressing of two garments daily"
    ],
    hasBalcony: true,
    hasOceanView: false,
    hasKingBed: true,
    hasPrivateJacuzzi: false
  },
  {
    id: "executive-suite",
    name: "Executive Suite",
    chamberNumber: "Chamber 03",
    tier: "Executive",
    pricePerNight: 890,
    subPriceLabel: "Includes 38th Floor Executive Club Lounge Privileges",
    badge: "Corner Residence",
    wing: "Corner Residence",
    sizeSqm: 85,
    maxGuests: 3,
    bedConfig: "1 California King",
    view: "City & Ocean View",
    description: "A sophisticated corner suite featuring a separate living parlor, curated art collection, executive writing desk, and cocktail wet bar.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBt-enAreVzoTC4pPbUKGvh0WZDooqnRjdBbZ0RJAC1--LWLmzyCllldN3-oWCsHUGq4On73Lc-OIMTreXBER0YK_mFxKBWMtDgaYLyPKLHGfK8WnzMa8TDRioffy1AHtRpXYTeT0kHU3oWahykU5w-LuFLp_XutgKBDNMmdnSPlZcN8jO-zCTZVouBExZDNYLuMecU-etQwRQ-wbzugsdkf9X8SB_LoSWWwWgP9LP3H4v91RFmnRJjog",
    galleryImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBt-enAreVzoTC4pPbUKGvh0WZDooqnRjdBbZ0RJAC1--LWLmzyCllldN3-oWCsHUGq4On73Lc-OIMTreXBER0YK_mFxKBWMtDgaYLyPKLHGfK8WnzMa8TDRioffy1AHtRpXYTeT0kHU3oWahykU5w-LuFLp_XutgKBDNMmdnSPlZcN8jO-zCTZVouBExZDNYLuMecU-etQwRQ-wbzugsdkf9X8SB_LoSWWwWgP9LP3H4v91RFmnRJjog",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC7RIFhpsbT9cShuzXCPVvlPevk4KiRB22o08tUA9oIYr2Z8BfJ3rO6dhY8fMrYzBmy6zb93JI7fFyB8wRRqtMn6sFH7_r-wJFeeXoP-CjDF7OqyoDP6Wqxx3joDSK1LZpHH71RvKusL041px4wn-HWXWZPKfCuqZStfwb_arIm8NDMS_yAAMjQiqFjI19Wam-GlxlpFQynXf5Hrat0KQ8MLkk-AAIIpWmORTDoyqPxYr0KFI3k9LLV6g"
    ],
    features: [
      "Separate Living Area",
      "Executive Lounge Access",
      "Cocktail Bar",
      "Marble Bath"
    ],
    amenitiesList: [
      "Executive Club Lounge dining & private meeting rooms",
      "Dual Calacatta vanity & oversized rainfall shower",
      "Curated library of rare architectural monographs",
      "Sub-zero wine cellar with 12 vintage selections",
      "Private in-suite boardroom setup upon request"
    ],
    hasBalcony: true,
    hasOceanView: true,
    hasKingBed: true,
    hasPrivateJacuzzi: false
  },
  {
    id: "aurelia-luxury-suite",
    name: "Aurelia Luxury Suite",
    chamberNumber: "The Aurelia Crown",
    tier: "Grand Penthouse",
    pricePerNight: 1250,
    subPriceLabel: "Includes private airport limousine transfer",
    badge: "Grand Penthouse Collection",
    wing: "Penthouse Level • Private Pool",
    sizeSqm: 135,
    maxGuests: 4,
    bedConfig: "2 King Beds",
    view: "Ocean Panorama",
    description: "The pinnacle of Aurelia hospitality. Expansive dual-bedroom penthouse featuring private outdoor plunge pool, dedicated 24-hour butler, and bespoke dining salon.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDstxH3q9QtDFsL-0wtQEz5oV4GLWKbbq6f_LR4BnovMYP5hsKQbL2DLY5jZdSaHaUgU7c9V6Ig-IHoayF5zl3sCoByUdHg6qCA1Gj62dfxD5Unyt3hI4Dw2so-CtJW4PbDTs-_aHuvY_vlZMAzXMqUAI7o8pqk3M5TQOBKMEnAf7BS3hWjQHW6aNbZ-dAJU2uqo9rxKsVOYunOWFv5rCthl2_VF2_snQZE0pl2-6Km1gdNq39s_cKnpQ",
    galleryImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDstxH3q9QtDFsL-0wtQEz5oV4GLWKbbq6f_LR4BnovMYP5hsKQbL2DLY5jZdSaHaUgU7c9V6Ig-IHoayF5zl3sCoByUdHg6qCA1Gj62dfxD5Unyt3hI4Dw2so-CtJW4PbDTs-_aHuvY_vlZMAzXMqUAI7o8pqk3M5TQOBKMEnAf7BS3hWjQHW6aNbZ-dAJU2uqo9rxKsVOYunOWFv5rCthl2_VF2_snQZE0pl2-6Km1gdNq39s_cKnpQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDeb1ctEDzHozOiP53WX5aZDBhuIbRB3XohhxyWs9l5lISv2tZy3nizZs3Xw9yfXivy3x1IkFl0yxQbPJAQ_jk_BVMS1ZLqIV3Hny2rJuEvEWHY9lrAzF1J5n_AMdF4vgqzXpklomHCPJq6qF61GTXn2w_iuQHo8nyNm8vdCF5L1fWwJpCSJWkFIC4akzKl6j3J-KgPC4F-hoMNKltl2y-AmJPSuT7ugC1azqwo6EfjqIAlJdEFB9w0tA"
    ],
    features: [
      "Private Plunge Pool",
      "24-hr Butler Service",
      "Private Dining Salon",
      "VIP Airport Transfer"
    ],
    amenitiesList: [
      "Dedicated Les Clefs d'Or personal butler assigned 24/7",
      "Private heated rooftop lap pool & sun deck cabana",
      "Direct private express elevator access with biometric key",
      "Complimentary house Rolls-Royce Phantom airport transfers",
      "Grand piano in residence & private sommelier tastings"
    ],
    hasBalcony: true,
    hasOceanView: true,
    hasKingBed: true,
    hasPrivateJacuzzi: true
  }
];

export const AMENITIES_LIST: Amenity[] = [
  {
    id: "pool",
    title: "Swimming Pool",
    category: "recreation",
    categories: ["recreation", "wellness"],
    location: "Level 28 Rooftop",
    hours: "06:00 – 23:00 Daily",
    highlightTag: "Adults & Family",
    description: "Ozone-filtered rooftop infinity pool with heated thermal loungers, panoramic sun decks, and champagne cabanas.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDstxH3q9QtDFsL-0wtQEz5oV4GLWKbbq6f_LR4BnovMYP5hsKQbL2DLY5jZdSaHaUgU7c9V6Ig-IHoayF5zl3sCoByUdHg6qCA1Gj62dfxD5Unyt3hI4Dw2so-CtJW4PbDTs-_aHuvY_vlZMAzXMqUAI7o8pqk3M5TQOBKMEnAf7BS3hWjQHW6aNbZ-dAJU2uqo9rxKsVOYunOWFv5rCthl2_VF2_snQZE0pl2-6Km1gdNq39s_cKnpQ",
    iconName: "pool",
    metricLabel: "Hydrothermic 29°C Constant",
    metricIcon: "water_lux",
    actionText: "Cabanas",
    actionPayload: "Rooftop Cabana Reservation"
  },
  {
    id: "fitness",
    title: "Fitness Center",
    category: "wellness",
    categories: ["wellness", "recreation"],
    location: "Level 4 Mezzanine",
    hours: "24 Hours Access",
    highlightTag: "Technogym Biostrength",
    description: "Technogym wellness sanctuary equipped with state-of-the-art biomechanical gear, reformer Pilates studio, and certified private trainers.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBF5Hqz9_beJWb3kFxPfUr5O7gbArsUsdesk2Q-G4JO4LRcDexep4Avzr9SLOsV8mOCdr_OjqjGNO2C-4T3oCqMH0vDocfmQ9eCe_3blv-INV6ESKUJok_-o0yykqO8cbOF8yPydm1hYvTOghcIQApGC_zkoZ_qXXttim8qgvbKNt7QtiOGMaiPG0RduPQ8RMqC9aKxfFkj_sdAPzHBGZVhTSSLx2mv_EQowFEZlqGKhLNNzXPn_4LvSw",
    iconName: "fitness_center",
    metricLabel: "Private Coaches On-Call",
    metricIcon: "person",
    actionText: "Book Trainer",
    actionPayload: "Private Trainer Session"
  },
  {
    id: "wifi",
    title: "Free High-Speed Wi-Fi",
    category: "business",
    categories: ["business", "services"],
    location: "Property-Wide",
    hours: "Symmetric Ultra-Low Latency",
    highlightTag: "1,000 Mbps",
    badgeTag: "Mesh 6E",
    description: "Fiberoptic mesh coverage spanning every chamber, private garden cabana, and club lounge. Seamless encrypted roaming.",
    iconName: "wifi",
    metricLabel: "WPA3 Enterprise Level",
    metricIcon: "security",
    actionText: "Speed Specs",
    actionPayload: "High-Speed Mesh Network Details",
    isMeshVisual: true
  },
  {
    id: "front-desk",
    title: "24/7 Front Desk & Concierge",
    category: "services",
    categories: ["services"],
    location: "Main Grand Hall",
    hours: "Continuous Service",
    highlightTag: "Les Clefs d'Or Certified",
    description: "Les Clefs d'Or concierge desk, private jet transfers, front-row opera reservations, and multilingual personal hosts.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUYS1d4aSq3GaH0hU_mhZh85cVYWq9mTO0e0Ok0DfjPa6BWANC2o4T3sV70cOBcuPcndGX4KaLBClEYG4RjPhJuqmof8oYd4n1okP7UgdOzdeh50cdRP0M5gN-nvR-EjRheUGRwJlpRO1YY1kVsj8js2jFF_e0ZnkqJl30UW2LFtdRoVJUF_VjEZDP2_KDWEoJyuJhSJkLgmSmI7m89YQ9NjAz_32I2TWLxx1tfXoj7DPfY_oF-3evZw",
    iconName: "room_service",
    metricLabel: "12 Languages Spoken",
    metricIcon: "translate",
    actionText: "Direct Connect",
    actionPayload: "Front Desk & Butler Dispatch"
  },
  {
    id: "room-service",
    title: "Room Service & In-Suite Dining",
    category: "services",
    categories: ["services", "recreation"],
    location: "Private In-Suite",
    hours: "24h À La Minute",
    highlightTag: "Sommelier Curated",
    description: "Master chef curated dining menus prepared à la minute, served with fine porcelain and sommelier pairings in your residence.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBf2CTGJ9Ldf2IRJ8ZzYltWFVs6vp9zL0gPMHd5kOq6giz8qsul4DSJBwhb-6JoZIv0KpARLC0GWfFvD17UpJHMnX59OPXE08voKKU0PVzZ05B20RWjkQv9mZ9wUN2NnvztkW6gUjrUyvHwT6hHzQ9b_CYSDgeE_VM3ikUbVG7hZ8uwAtpOYEi1ej5FcqK4qSKyCrorXr6hYRxFTIkmsmyd3NVMzipra-GigWBgpOglhAGaLq1SfgwlYA",
    iconName: "restaurant_menu",
    metricLabel: "Grand Cru Cellar Access",
    metricIcon: "wine_bar",
    actionText: "View Menu",
    actionPayload: "In-Suite Dining Menu"
  },
  {
    id: "valet",
    title: "Free Valet & Chauffeur",
    category: "services",
    categories: ["services"],
    location: "Porte-Cochère",
    hours: "24 Hours Subterranean",
    highlightTag: "EV Rapid Ready",
    description: "Subterranean climate-controlled parking, EV rapid chargers, and house Rolls-Royce Phantom transfers within the metro center.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXn8KGtOw5d_DZe-6I2zAmmP6u9vofyDnLCelIhDldQ4alhcenbTLrdQUFjt7pDNuPAUrnc0nNW5UoFBMaYioFSe5NL9DSc0hjBliqavgm5IoGf9FT-MagHj56Vfi6xj83x1fC3zx6Q44CUBUpGpN53r7ITgsO97Pz6WLuUFkRFmdVpkKTnSPXtSainxpPa2UuaURgplemBlB2SOzTBIg6RP_UmTWYNuzFU-F2_Aqjh9SN-mpOVVM11w",
    iconName: "directions_car",
    metricLabel: "Porsche & Tesla Superchargers",
    metricIcon: "ev_station",
    actionText: "Request Car",
    actionPayload: "Airport / City Chauffeur"
  },
  {
    id: "concierge",
    title: "Concierge Service",
    category: "services",
    categories: ["services"],
    location: "Dedicated Service",
    hours: "Private Protocol",
    highlightTag: "Dedicated Butler",
    description: "Dedicated personal butler service, personalized itinerary curation, private salon viewings, and discreet reservations.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_N-KlCypkJMasgJwxhABLUStU-7W2pAmkhtMXkVsRe8gmjZrGEbMzEFQ_wwWl1aD0TEpioC8QSfAJLvtq-C43V18yZWO9KDt86NaIOwWKVrxT_AiTxbMcG7HDKTz9N74Y7lw9vYuvHbvpCptxedja2XqRAzxa6eE7DpN3hO-KAPkMj0KkBMcYroAvzkiDTCR5kI1cdt3J7nOOKEx0SvILpiBuP1tiD1Eqm8ye_yGKMAgQJ1VM4ASyQw",
    iconName: "support_agent",
    metricLabel: "VIP Priority Allocations",
    metricIcon: "event_seat",
    actionText: "Consult",
    actionPayload: "Personal Butler Consultation"
  },
  {
    id: "business",
    title: "Business Facilities & Library",
    category: "business",
    categories: ["business"],
    location: "The East Salon",
    hours: "End-to-End Encrypted",
    highlightTag: "12-Seat Executive",
    description: "Private executive boardroom salons, high-security video conferencing, and tranquil curated reading salon with rare first editions.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_DrMeiFVJQbVc1nZ7HIYLTv45tgWwhrkLHPc7uQBoFDb8jXSxV2B5vBzbbp0blOw27210RsFmzVzoUp6h2gFVqjFDoXeiqLs4kV1DP4-F9KBe6o8janL4Su-K1V-4MBXdsj1snft1o8VdE8bdht1_qaljSHWm5h3v6JwaYHvOWQP5G07nHAqwZ58EikqiqRaBwJPOrYAubx0ANaKnAVPqcdMj7jzS0UtiyCOsnFs-zV7olk-Cc7JkTA",
    iconName: "local_library",
    metricLabel: "Discreet Secretarial Staff",
    metricIcon: "print",
    actionText: "Reserve Salon",
    actionPayload: "Executive Boardroom Booking"
  },
  {
    id: "spa",
    title: "Aurelia Spa Sanctuary",
    category: "wellness",
    categories: ["wellness"],
    location: "Subterranean Haven",
    hours: "08:00 – 22:00 Daily",
    highlightTag: "Biologique Recherche",
    description: "Thermal hydrotherapy suites, Finnish cedar saunas, cold plunge baths, and restorative botanical treatments crafted by master healers.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNDZi7kjDpcmJcd6bR9L5EY4kLQ9-CeDIp2Eec3JSYKgFwrJ85mDpd_CplL8zgzSGKzqXuHE9wtp4MId3xxn55G4ebrzS34ZynR2_f_bWomxuq8qedVIzi_BZhP0YI_02kJhj-Vp6cMVmwdFzk6MsKBi0kGnBRGElq4-aSUKpu4VBvbMu_Sgoqpxyi7q1LdFYYupLwfjmg9bEbIODVw82JGULwVyuTusWAYCmZW4pai8W1YVV1-O029w",
    iconName: "hot_tub",
    metricLabel: "6 Private Treatment Suites",
    metricIcon: "self_improvement",
    actionText: "Book Ritual",
    actionPayload: "Spa Sanctuary Treatment"
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Eleanor Vance-Sterling",
    location: "London, UK",
    avatarLetter: "E",
    suiteType: "Aurelia Luxury Suite",
    stayDate: "Stayed Oct 2026",
    rawDate: "2026-10-18",
    rating: 5.0,
    headline: "“An extraordinary masterclass in attentiveness.”",
    content: "The concierge organized a private gallery viewing at midnight. Unrivaled serenity in the city center. Every subtle detail from arrival to departure was curated with flawless precision.",
    helpfulCount: 34,
    category: "suites",
    categories: ["suites"],
    isVerified: true
  },
  {
    id: "rev-2",
    author: "Henri & Charlotte de Montmirail",
    location: "Geneva, Switzerland",
    avatarLetter: "H",
    suiteType: "Penthouse Residence",
    stayDate: "Stayed Aug 2026",
    rawDate: "2026-08-12",
    rating: 5.0,
    headline: "“Exceeded every standard across Europe and Asia.”",
    content: "The Aurelia Grand Suite exceeded every standard of luxury we have encountered. The private balcony breakfast overlooking the manicured gardens was completely unforgettable.",
    helpfulCount: 48,
    category: "suites",
    categories: ["suites", "romantic"],
    isVerified: true
  },
  {
    id: "rev-3",
    author: "David K. Takahashi",
    location: "Tokyo, Japan",
    avatarLetter: "D",
    suiteType: "Executive Suite",
    stayDate: "Stayed Oct 2026",
    rawDate: "2026-10-02",
    rating: 5.0,
    headline: "“Quiet luxury executed without ostentation.”",
    content: "From the custom Egyptian cotton bedding to the silent climate control, every second was bliss. The dedicated study area provided an effortless workspace between meetings.",
    helpfulCount: 29,
    category: "executive",
    categories: ["executive"],
    isVerified: true
  },
  {
    id: "rev-4",
    author: "Sophia Al-Mansoor",
    location: "Dubai, UAE",
    avatarLetter: "S",
    suiteType: "Deluxe Room",
    stayDate: "Stayed Sep 2026",
    rawDate: "2026-09-21",
    rating: 5.0,
    headline: "“Rolls-Royce arrival and immediate suite check-in.”",
    content: "The airport transfer and immediate in-suite check-in set a magnificent tone. The rooftop infinity pool is breathtaking during twilight cocktails. An absolute dream.",
    helpfulCount: 53,
    category: "dining",
    categories: ["dining", "romantic"],
    isVerified: true
  },
  {
    id: "rev-5",
    author: "Marcus & Julian Sterling",
    location: "New York, USA",
    avatarLetter: "M",
    suiteType: "Premium Room",
    stayDate: "Stayed Jul 2026",
    rawDate: "2026-07-30",
    rating: 5.0,
    headline: "“Impeccable acoustic seclusion in the heritage district.”",
    content: "The private dining salon was exquisite; our sommelier paired each course with vintage cellars rarely found outside personal estates. Unsurpassed peacefulness.",
    helpfulCount: 41,
    category: "executive",
    categories: ["executive", "dining"],
    isVerified: true
  },
  {
    id: "rev-6",
    author: "Isabella Rossi",
    location: "Milan, Italy",
    avatarLetter: "I",
    suiteType: "Executive Suite",
    stayDate: "Stayed Jun 2026",
    rawDate: "2026-06-15",
    rating: 5.0,
    headline: "“Personalized aromatherapy bath preparations.”",
    content: "The thermal spa suites and customized botanical bath experiences are unmatched anywhere in the world. Truly a healing sanctuary amidst an energetic metropolis.",
    helpfulCount: 62,
    category: "dining",
    categories: ["dining", "suites"],
    isVerified: true
  }
];

export const IN_SUITE_MENU = [
  {
    category: "Morning Culinary Harvest (06:00 - 11:30)",
    items: [
      {
        name: "Imperial White Sturgeon Caviar Scramble",
        description: "Organic pasture eggs whisked with Isigny butter, chives, brioche croutons, 30g Oscietra caviar",
        price: "$68"
      },
      {
        name: "Wild Truffle & Chantrelle Dutch Baby",
        description: "Cast-iron baked pancake, slow-roasted wild chanterelles, Aged Comté cream, micro herbs",
        price: "$46"
      },
      {
        name: "Aurelia Viennoiserie Basket",
        description: "Freshly baked saffron kouign-amann, pistachio pain au chocolat, Sicilian fig preserves & cultured butter",
        price: "$34"
      }
    ]
  },
  {
    category: "Master Chef Mains & All-Day Repast",
    items: [
      {
        name: "A5 Miyazaki Wagyu Tenderloin (180g)",
        description: "Charred over Binchotan coals, pomme purée with bone marrow, black winter truffle jus",
        price: "$145"
      },
      {
        name: "Line-Caught Mediterranean Turbot",
        description: "Poached in aromatic court-bouillon, sea asparagus, champagne velouté, fingerling potatoes",
        price: "$98"
      },
      {
        name: "Heirloom Brittany Lobster Tagliolini",
        description: "Hand-rolled egg pasta, butter-poached sweet blue lobster tail, Meyer lemon zest, tomato confit",
        price: "$82"
      }
    ]
  },
  {
    category: "Sommelier Cellar Allocations",
    items: [
      {
        name: "Dom Pérignon Brut Millésimé 2013",
        description: "Champagne, France • Delicate brioche notes, crystalline minerality, endless fine effervescence",
        price: "$480"
      },
      {
        name: "Domaine de la Romanée-Conti Échezeaux 2017",
        description: "Burgundy, France • Rose petal, exotic spice, profound silk tannins, decanted table-side",
        price: "$2,850"
      },
      {
        name: "Château Margaux 1er Grand Cru Classé 2010",
        description: "Bordeaux, France • Blackberry liquor, graphite, cedar, velvety power with 30-year lineage",
        price: "$1,650"
      }
    ]
  }
];
