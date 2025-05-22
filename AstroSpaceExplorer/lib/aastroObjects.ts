export type AstroObject = {
  id: number;
  name: string;
  type: 'planet' | 'moon' | 'star';
  description: string;
  diameter_km: number;
  distance_from_earth_km: number;
  temperature_c: number;
  image_url: string;
};

export const astroObjects: AstroObject[] = [
  {
    id: 1,
    name: 'Earth',
    type: 'planet',
    description: 'Our home – the third planet from the Sun.',
    diameter_km: 12742,
    distance_from_earth_km: 0,
    temperature_c: 15,
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg',
  },
  {
    id: 2,
    name: 'Moon',
    type: 'moon',
    description: 'Earth’s natural satellite.',
    diameter_km: 3474,
    distance_from_earth_km: 384400,
    temperature_c: -20,
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg',
  },
  {
    id: 3,
    name: 'Sun',
    type: 'star',
    description: 'The star at the center of our solar system.',
    diameter_km: 1391000,
    distance_from_earth_km: 149600000,
    temperature_c: 5500,
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Solar_sys.jpg',
  },
  {
    id: 4,
    name: 'Mars',
    type: 'planet',
    description: 'The red planet – fourth from the Sun.',
    diameter_km: 6779,
    distance_from_earth_km: 225000000,
    temperature_c: -63,
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg',
  },
  {
    id: 5,
    name: 'Jupiter',
    type: 'planet',
    description: 'The largest planet in our solar system.',
    diameter_km: 139820,
    distance_from_earth_km: 588000000,
    temperature_c: -145,
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg',
  },
  {
    id: 6,
    name: 'Europa',
    type: 'moon',
    description: 'One of Jupiter’s moons – believed to have a subsurface ocean.',
    diameter_km: 3122,
    distance_from_earth_km: 628300000,
    temperature_c: -160,
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Europa-moon.jpg',
  },
  {
    id: 7,
    name: 'Saturn',
    type: 'planet',
    description: 'Known for its prominent ring system.',
    diameter_km: 116460,
    distance_from_earth_km: 1200000000,
    temperature_c: -178,
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg',
  },
  {
    id: 8,
    name: 'Sirius',
    type: 'star',
    description: 'The brightest star in the night sky, located in the Canis Major constellation.',
    diameter_km: 2400000,
    distance_from_earth_km: 81500000000000,
    temperature_c: 9940,
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Sirius_A_and_B_Hubble_photo.jpg',
  },
  {
    id: 9,
    name: 'Titan',
    type: 'moon',
    description: 'The largest moon of Saturn – has a thick atmosphere and liquid lakes.',
    diameter_km: 5150,
    distance_from_earth_km: 1222000000,
    temperature_c: -179,
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Titan_in_true_color.jpg',
  },
  {
    id: 10,
    name: 'Proxima Centauri',
    type: 'star',
    description: 'The closest known star to the Sun, part of the Alpha Centauri system.',
    diameter_km: 200000,
    distance_from_earth_km: 40100000000000,
    temperature_c: 3042,
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Proxima_Centauri_by_HST.jpg',
  },
];
