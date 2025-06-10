export const deepSpaceMissions = [
  {
    id: "voyager1",
    name: "Voyager 1",
    year: 1977,
    destination: "Interstellar Space",
    image: require("../assets/missions/voyager.png"),
    fact: "Voyager 1 er det fjernest menneskeskabte objekt.",
    position: { top: 40, left: 250 }, // juster til dit kort
  },
  {
    id: "hubble",
    name: "Hubble Space Telescope",
    year: 1990,
    destination: "Low Earth Orbit",
    image: require("../assets/missions/hubble.png"),
    fact: "Hubble har taget over 1.5 millioner billeder.",
    position: { top: 200, left: 100 },
  },
  {
    id: "perseverance",
    name: "Perseverance Rover",
    year: 2020,
    destination: "Mars",
    image: require("../assets/missions/perseverance.png"),
    fact: "Den samler prøver til en fremtidig hjemrejse.",
    position: { top: 100, left: 150 },
  },
  {
    id: "jwst",
    name: "James Webb Space Telescope",
    year: 2021,
    destination: "L2 Point",
    image: require("../assets/missions/jwst.png"),
    fact: "Webb kan se tilbage til universets barndom.",
    position: { top: 180, left: 300 },
  },
]
