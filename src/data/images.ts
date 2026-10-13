/**
 * Real photographs hosted on the Unsplash CDN (free to use under the Unsplash License).
 * IDs were cross-checked against Unsplash API search results and photo descriptions.
 */
export const photos = {
  // Uzbekistan & Central Asia
  samarkand: "1700326550141-67038e439693",
  samarkandSherdor: "1728565721798-cf65c7bf1efe",
  samarkandBibiKhanym: "1666803324220-43e9021af2b7",
  samarkandShahiZinda: "1558185730-e5b096912bbd",
  samarkandGurEmir: "1579983291208-99ab7827fd5c",
  samarkandStreet: "1671054522980-206498bf4ed6",
  bukhara: "1668370109951-578f78d8e688",
  bukharaArk: "1668356485014-6ad9f4af5cbe",
  bukharaOld: "1666988727732-55b32686cec3",
  chorMinor: "1666034956412-bc5fb93a1b01",
  tashkent: "1654861857754-4a6a5a1de01e",
  tashkentMetro: "1666034956424-a699ed33996a",
  tashkentCity: "1715966943791-727660fbee0f",
  chorsuSpices: "1601963404496-e6fcffa44f71",
  plov: "1641893728260-19493532d6b9",
  amirsoy: "1712780943624-b5d3f7a72792",
  chimgan: "1712780945573-9323e033e109",
  almaty: "1717486489848-5c79b4d45879",
  almatyMedeu: "1643284674143-546c5ac3c1b4",
  bishkek: "1728977571861-fa12369bb5a0",
  baku: "1622673486788-9e20bd2e8a1d",
  tbilisi: "1505294399615-2479253a4990",
  // Europe
  paris: "1502602898657-3e91760cbb34",
  rome: "1552832230-c0197dd311b5",
  barcelona: "1660855562147-2f2eab48c0c7",
  prague: "1673022177475-5f15ec15ff11",
  lisbon: "1536663815808-535e2280d2c2",
  swissAlps: "1530122037265-a5f1f91d3b99",
  istanbul: "1623439844752-524658b16ce6",
  cappadocia: "1604156789095-3348604c0f43",
  // Asia
  tokyo: "1526481280693-3bfa7568e0f3",
  tokyoShibuya: "1611725243170-cb733fb06761",
  seoul: "1570191913384-7b4ff11716e7",
  bali: "1555400038-63f5ba517a47",
  thailand: "1534008897995-27a23e859048",
  singapore: "1701931723049-d343592d0cc7",
  kualaLumpur: "1519860153616-7eeaf39fffd5",
  tajMahal: "1716896427993-ddad7c7ec891",
  maldives: "1590523277543-a94d2e4eb00b",
  // Middle East & Africa
  dubai: "1512453979798-5ea266f8880c",
  cairo: "1667852976103-54718f19d453",
  marrakech: "1525980061034-0ae884f8357a",
  capeTown: "1529528070131-eda9f3e90919",
  // Americas & Oceania
  rio: "1507125524815-d9d6dccda1dc",
  sydney: "1506973035872-a4ec16b8e8d9",
  // Lifestyle
  planning: "1488646953014-85cb44e25828",
  wing: "1530469641172-8ac15d0a7d6a",
  wingSunset: "1551748629-08d916ed6682",
  passport: "1581553673739-c4906b5d0de8",
  family: "1597524678053-5e6fef52d8a3",
  friendsMountains: "1559054109-82d938dac629",
  resortPool: "1540541338287-41700207dee6",
} as const;

export type PhotoKey = keyof typeof photos;

export function unsplash(id: string, width: number, quality = 72) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

export function unsplashSrcSet(id: string, widths: number[] = [480, 768, 1080, 1440, 1920]) {
  return widths.map((w) => `${unsplash(id, w)} ${w}w`).join(", ");
}
