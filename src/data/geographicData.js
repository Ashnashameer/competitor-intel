// Geographic hierarchy for EDGE Competitor Intelligence Hub
// India -> State -> District -> City/Location
// Scalable structure supporting all Kerala 14 districts + national expansion

export const GEOGRAPHIC_HIERARCHY = {
  country: "India",
  states: [
    {
      name: "Kerala",
      code: "KL",
      focus: true,
      districts: [
        {
          name: "Kozhikode",
          priority: "Initial Research Priority",
          cities: [
            "Kozhikode City",
            "Cyberpark / Hilite City",
            "Mavoor Road",
            "Nadakkavu",
            "Kottooli",
            "Thondayad",
            "Palazhi",
            "Kunnamangalam (NIT/IIM Area)",
            "Calicut Beach",
            "Feroke",
            "Ramanattukara",
            "Koyilandy",
            "Vadakara",
            "Balussery"
          ]
        },
        {
          name: "Ernakulam",
          priority: "Commercial Hub",
          cities: ["Kochi", "Kakkanad (Infopark)", "Edappally", "Kaloor", "Aluva", "MG Road"]
        },
        {
          name: "Thiruvananthapuram",
          priority: "Capital / Technopark Hub",
          cities: ["Thiruvananthapuram City", "Technopark (Kazhakkoottam)", "Pattom", "Palayam", "Vellayambalam"]
        },
        {
          name: "Thrissur",
          priority: "Cultural & Education Centre",
          cities: ["Thrissur City", "Round East/West", "Ayyanthole", "Ollur", "Chalakudy"]
        },
        {
          name: "Malappuram",
          priority: "High Student Density",
          cities: ["Malappuram Town", "Manjeri", "Perinthalmanna", "Kottakkal", "Tirur"]
        },
        {
          name: "Kannur",
          priority: "North Malabar Node",
          cities: ["Kannur Town", "Thalassery", "Payyanur", "Taliparamba"]
        },
        {
          name: "Palakkad",
          priority: "Industrial & Agricultural Belt",
          cities: ["Palakkad Town", "Ottapalam", "Chittur", "Mannarkkad"]
        },
        {
          name: "Kottayam",
          priority: "Literacy & Publishing Hub",
          cities: ["Kottayam Town", "Pala", "Changanassery", "Kanjirappally"]
        },
        {
          name: "Kollam",
          priority: "Southern Coastal Center",
          cities: ["Kollam City", "Karunagappally", "Kottarakkara", "Paravur"]
        },
        {
          name: "Alappuzha",
          priority: "Coastal Zone",
          cities: ["Alappuzha Town", "Cherthala", "Kayamkulam", "Mavelikkara"]
        },
        {
          name: "Pathanamthitta",
          priority: "Central Travancore",
          cities: ["Pathanamthitta Town", "Thiruvalla", "Adoor", "Ranni"]
        },
        {
          name: "Idukki",
          priority: "Highland District",
          cities: ["Thodupuzha", "Painavu", "Munnar", "Kattappana"]
        },
        {
          name: "Wayanad",
          priority: "Highland Node adjacent to Kozhikode",
          cities: ["Kalpetta", "Sulthan Bathery", "Mananthavady"]
        },
        {
          name: "Kasaragod",
          priority: "Northern Border District",
          cities: ["Kasaragod Town", "Kanhangad", "Nileshwaram"]
        }
      ]
    },
    {
      name: "Karnataka",
      code: "KA",
      focus: false,
      districts: [
        { name: "Bengaluru Urban", priority: "Tech Capital", cities: ["Koramangala", "HSR Layout", "Indiranagar", "Electronic City", "Whitefield"] },
        { name: "Mysuru", priority: "Heritage Tech Hub", cities: ["Mysuru City", "Hebbal Industrial Area"] },
        { name: "Mangaluru", priority: "Coastal Node near Kerala", cities: ["Mangaluru City", "Surathkal"] }
      ]
    },
    {
      name: "Tamil Nadu",
      code: "TN",
      focus: false,
      districts: [
        { name: "Chennai", priority: "Metro Tech Center", cities: ["OMR", "Guindy", "T. Nagar", "Velachery"] },
        { name: "Coimbatore", priority: "Textile & IT Node adjacent to Palakkad", cities: ["Gandhipuram", "RS Puram", "Saravanampatti"] }
      ]
    }
  ]
};

export const KERALA_DISTRICTS = GEOGRAPHIC_HIERARCHY.states[0].districts.map(d => d.name);

export const ALL_STATES = GEOGRAPHIC_HIERARCHY.states.map(s => s.name);

