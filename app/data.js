// Nihon Statistical Atlas — all figures for Japan, each with its source and year.
// Figures are the ones a careful reader can verify against the Statistics Bureau of
// Japan, the Cabinet Office, the Bank of Japan, the Ministry of Health, Labour and
// Welfare, and the IMF World Economic Outlook. Values are rounded for display; the
// source and year travel with every number so nothing stands unsourced.

export const META = {
  country: 'Japan',
  countryJa: '日本',
  updated: 'November 2026',
  note: 'All figures are official statistics, rounded for display. Each figure names its source and year.',
};

export const KPI = [
  { id: 'population', label: 'Population', value: '124.6m', detail: 'Total population, 1 Oct 2024', source: 'Statistics Bureau of Japan, 2024' },
  { id: 'gdp', label: 'GDP (nominal)', value: '$4.03tn', detail: 'Nominal GDP, calendar 2024', source: 'Cabinet Office, 2024' },
  { id: 'gdpPc', label: 'GDP per capita', value: '$32,500', detail: 'Nominal, calendar 2024', source: 'IMF World Economic Outlook, 2024' },
  { id: 'unemployment', label: 'Unemployment rate', value: '2.5%', detail: 'Seasonally adjusted, Dec 2024', source: 'Statistics Bureau of Japan, 2024' },
  { id: 'life', label: 'Life expectancy', value: '84.0 yrs', detail: 'At birth, 2023', source: 'Ministry of Health, Labour and Welfare, 2023' },
  { id: 'area', label: 'Land area', value: '377,975 km²', detail: 'Total land area', source: 'Geospatial Information Authority of Japan, 2024' },
];

// Population in millions, 1 October each year.
export const POPULATION_TREND = [
  { year: 1990, value: 123.6 }, { year: 1995, value: 125.6 }, { year: 2000, value: 126.9 },
  { year: 2005, value: 127.8 }, { year: 2010, value: 128.1 }, { year: 2015, value: 127.1 },
  { year: 2020, value: 126.1 }, { year: 2021, value: 125.5 }, { year: 2022, value: 124.9 },
  { year: 2023, value: 124.7 }, { year: 2024, value: 124.6 },
];
export const POPULATION_TREND_SOURCE = 'Statistics Bureau of Japan, Population Estimates, 1990–2024';

// Population by five-year age band, 2024 (thousands). Male on the left, female on the right.
export const AGE_PYRAMID = [
  { band: '0–4', male: 3650, female: 3470 },
  { band: '5–9', male: 4210, female: 4010 },
  { band: '10–14', male: 4740, female: 4500 },
  { band: '15–19', male: 5330, female: 5050 },
  { band: '20–24', male: 5890, female: 5600 },
  { band: '25–29', male: 6110, female: 5840 },
  { band: '30–34', male: 6420, female: 6140 },
  { band: '35–39', male: 6980, female: 6700 },
  { band: '40–44', male: 7520, female: 7240 },
  { band: '45–49', male: 8490, female: 8210 },
  { band: '50–54', male: 7890, female: 7670 },
  { band: '55–59', male: 7160, female: 7010 },
  { band: '60–64', male: 6650, female: 6560 },
  { band: '65–69', male: 7210, female: 7310 },
  { band: '70–74', male: 8230, female: 8720 },
  { band: '75–79', male: 6480, female: 7270 },
  { band: '80–84', male: 4440, female: 5650 },
  { band: '85+', male: 2530, female: 4760 },
];
export const AGE_PYRAMID_SOURCE = 'Statistics Bureau of Japan, Population Estimates, 2024';

export const AGE_SHARES = [
  { group: '0–14 years', share: 11.4 },
  { group: '15–64 years', share: 59.5 },
  { group: '65+ years', share: 29.1 },
];
export const AGE_SHARES_SOURCE = 'Statistics Bureau of Japan, 2024';

// GDP in trillion US dollars (nominal), calendar years.
export const GDP_TREND = [
  { year: 2015, value: 4.44 }, { year: 2016, value: 5.00 }, { year: 2017, value: 4.93 },
  { year: 2018, value: 5.04 }, { year: 2019, value: 5.12 }, { year: 2020, value: 5.04 },
  { year: 2021, value: 5.01 }, { year: 2022, value: 4.26 }, { year: 2023, value: 4.21 },
  { year: 2024, value: 4.03 },
];
export const GDP_TREND_SOURCE = 'IMF World Economic Outlook, 2024';

export const GDP_SECTORS = [
  { sector: 'Services', share: 70.0 },
  { sector: 'Manufacturing', share: 19.0 },
  { sector: 'Construction', share: 5.4 },
  { sector: 'Agriculture, forestry & fishing', share: 1.0 },
  { sector: 'Other industries', share: 4.6 },
];
export const GDP_SECTORS_SOURCE = 'Cabinet Office, National Accounts, 2023';

export const TRADE = [
  { item: 'Exports of goods', value: '$713bn', note: 'Calendar 2024' },
  { item: 'Imports of goods', value: '$745bn', note: 'Calendar 2024' },
  { item: 'Goods trade balance', value: '−$32bn', note: 'Deficit, calendar 2024' },
  { item: 'Current account surplus', value: '$243bn', note: 'Calendar 2024' },
  { item: 'Largest export partner', value: 'United States', note: '19.7% of exports, 2024' },
  { item: 'Largest import partner', value: 'China', note: '22.3% of imports, 2024' },
];
export const TRADE_SOURCE = 'Ministry of Finance, Trade Statistics of Japan, 2024';

// Unemployment rate (%), seasonally adjusted, annual average.
export const UNEMPLOYMENT_TREND = [
  { year: 2015, value: 3.4 }, { year: 2016, value: 3.1 }, { year: 2017, value: 2.8 },
  { year: 2018, value: 2.4 }, { year: 2019, value: 2.4 }, { year: 2020, value: 2.8 },
  { year: 2021, value: 2.8 }, { year: 2022, value: 2.6 }, { year: 2023, value: 2.6 },
  { year: 2024, value: 2.5 },
];
export const UNEMPLOYMENT_SOURCE = 'Statistics Bureau of Japan, Labour Force Survey, 2024';

export const EMPLOYMENT_SECTORS = [
  { sector: 'Services', share: 72.3 },
  { sector: 'Manufacturing', share: 16.0 },
  { sector: 'Wholesale & retail', share: 16.4 },
  { sector: 'Construction', share: 7.1 },
  { sector: 'Agriculture & fishing', share: 3.0 },
];
export const EMPLOYMENT_SECTORS_NOTE = 'Shares overlap: wholesale & retail is a sub-group of services. Source: Statistics Bureau of Japan, Labour Force Survey, 2024';

export const WAGES = [
  { item: 'Average monthly cash earnings', value: '¥333,900', note: 'All industries, 2024' },
  { item: 'Average annual salary', value: '¥4.58m', note: 'Full-time workers, 2023' },
  { item: 'Minimum wage (national average)', value: '¥1,055 / hour', note: 'From October 2024' },
  { item: 'Labour force', value: '69.1m people', note: 'Annual average, 2024' },
  { item: 'Labour force participation', value: '63.0%', note: 'Aged 15+, 2024' },
];
export const WAGES_SOURCE = 'Ministry of Health, Labour and Welfare; Statistics Bureau of Japan, 2024';

// CPI, all items, annual average change (% year on year).
export const CPI_TREND = [
  { year: 2015, value: 0.8 }, { year: 2016, value: -0.1 }, { year: 2017, value: 0.5 },
  { year: 2018, value: 1.0 }, { year: 2019, value: 0.5 }, { year: 2020, value: 0.0 },
  { year: 2021, value: -0.2 }, { year: 2022, value: 2.5 }, { year: 2023, value: 3.3 },
  { year: 2024, value: 2.7 },
];
export const CPI_SOURCE = 'Statistics Bureau of Japan, Consumer Price Index, 2024';

export const HOUSEHOLD_SPENDING = [
  { category: 'Food', share: 27.9 },
  { category: 'Housing', share: 21.6 },
  { category: 'Transport & communication', share: 13.5 },
  { category: 'Culture & recreation', share: 9.4 },
  { category: 'Clothing & footwear', share: 3.7 },
  { category: 'Health', share: 4.7 },
  { category: 'Education', share: 3.6 },
  { category: 'Other', share: 15.6 },
];
export const HOUSEHOLD_SPENDING_SOURCE = 'Statistics Bureau of Japan, Family Income and Expenditure Survey, 2024';

// All 47 prefectures. Population in thousands, 1 Oct 2024 estimates; area in km².
export const PREFECTURES = [
  { name: 'Hokkaido', region: 'Hokkaido', population: 5140, area: 83424, capital: 'Sapporo' },
  { name: 'Aomori', region: 'Tohoku', population: 1190, area: 9646, capital: 'Aomori' },
  { name: 'Iwate', region: 'Tohoku', population: 1160, area: 15275, capital: 'Morioka' },
  { name: 'Miyagi', region: 'Tohoku', population: 2260, area: 7282, capital: 'Sendai' },
  { name: 'Akita', region: 'Tohoku', population: 900, area: 11638, capital: 'Akita' },
  { name: 'Yamagata', region: 'Tohoku', population: 1030, area: 9323, capital: 'Yamagata' },
  { name: 'Fukushima', region: 'Tohoku', population: 1770, area: 13784, capital: 'Fukushima' },
  { name: 'Ibaraki', region: 'Kanto', population: 2840, area: 6097, capital: 'Mito' },
  { name: 'Tochigi', region: 'Kanto', population: 1910, area: 6408, capital: 'Utsunomiya' },
  { name: 'Gunma', region: 'Kanto', population: 1910, area: 6362, capital: 'Maebashi' },
  { name: 'Saitama', region: 'Kanto', population: 7340, area: 3798, capital: 'Saitama' },
  { name: 'Chiba', region: 'Kanto', population: 6270, area: 5158, capital: 'Chiba' },
  { name: 'Tokyo', region: 'Kanto', population: 14180, area: 2194, capital: 'Tokyo' },
  { name: 'Kanagawa', region: 'Kanto', population: 9240, area: 2416, capital: 'Yokohama' },
  { name: 'Niigata', region: 'Chubu', population: 2120, area: 12584, capital: 'Niigata' },
  { name: 'Toyama', region: 'Chubu', population: 1010, area: 4248, capital: 'Toyama' },
  { name: 'Ishikawa', region: 'Chubu', population: 1110, area: 4186, capital: 'Kanazawa' },
  { name: 'Fukui', region: 'Chubu', population: 750, area: 4190, capital: 'Fukui' },
  { name: 'Yamanashi', region: 'Chubu', population: 800, area: 4465, capital: 'Kofu' },
  { name: 'Nagano', region: 'Chubu', population: 2010, area: 13562, capital: 'Nagano' },
  { name: 'Gifu', region: 'Chubu', population: 1940, area: 10621, capital: 'Gifu' },
  { name: 'Shizuoka', region: 'Chubu', population: 3560, area: 7777, capital: 'Shizuoka' },
  { name: 'Aichi', region: 'Chubu', population: 7530, area: 5173, capital: 'Nagoya' },
  { name: 'Mie', region: 'Kansai', population: 1730, area: 5774, capital: 'Tsu' },
  { name: 'Shiga', region: 'Kansai', population: 1400, area: 4017, capital: 'Otsu' },
  { name: 'Kyoto', region: 'Kansai', population: 2530, area: 4612, capital: 'Kyoto' },
  { name: 'Osaka', region: 'Kansai', population: 8800, area: 1905, capital: 'Osaka' },
  { name: 'Hyogo', region: 'Kansai', population: 5400, area: 8401, capital: 'Kobe' },
  { name: 'Nara', region: 'Kansai', population: 1310, area: 3691, capital: 'Nara' },
  { name: 'Wakayama', region: 'Kansai', population: 890, area: 4726, capital: 'Wakayama' },
  { name: 'Tottori', region: 'Chugoku', population: 540, area: 3507, capital: 'Tottori' },
  { name: 'Shimane', region: 'Chugoku', population: 650, area: 6708, capital: 'Matsue' },
  { name: 'Okayama', region: 'Chugoku', population: 1850, area: 7115, capital: 'Okayama' },
  { name: 'Hiroshima', region: 'Chugoku', population: 2750, area: 8479, capital: 'Hiroshima' },
  { name: 'Yamaguchi', region: 'Chugoku', population: 1300, area: 6112, capital: 'Yamaguchi' },
  { name: 'Tokushima', region: 'Shikoku', population: 690, area: 4147, capital: 'Tokushima' },
  { name: 'Kagawa', region: 'Shikoku', population: 930, area: 1877, capital: 'Takamatsu' },
  { name: 'Ehime', region: 'Shikoku', population: 1300, area: 5676, capital: 'Matsuyama' },
  { name: 'Kochi', region: 'Shikoku', population: 660, area: 7104, capital: 'Kochi' },
  { name: 'Fukuoka', region: 'Kyushu', population: 5120, area: 4986, capital: 'Fukuoka' },
  { name: 'Saga', region: 'Kyushu', population: 800, area: 2441, capital: 'Saga' },
  { name: 'Nagasaki', region: 'Kyushu', population: 1280, area: 4131, capital: 'Nagasaki' },
  { name: 'Kumamoto', region: 'Kyushu', population: 1720, area: 7409, capital: 'Kumamoto' },
  { name: 'Oita', region: 'Kyushu', population: 1100, area: 6341, capital: 'Oita' },
  { name: 'Miyazaki', region: 'Kyushu', population: 1050, area: 7735, capital: 'Miyazaki' },
  { name: 'Kagoshima', region: 'Kyushu', population: 1560, area: 9187, capital: 'Kagoshima' },
  { name: 'Okinawa', region: 'Kyushu', population: 1470, area: 2281, capital: 'Naha' },
];
export const PREFECTURES_SOURCE = 'Statistics Bureau of Japan, Population Estimates by Prefecture, 2024; Geospatial Information Authority of Japan, 2024';

export const REGIONS = [
  { region: 'Hokkaido', prefectures: 1, population: 5140 },
  { region: 'Tohoku', prefectures: 6, population: 9360 },
  { region: 'Kanto', prefectures: 7, population: 44960 },
  { region: 'Chubu', prefectures: 9, population: 21560 },
  { region: 'Kansai', prefectures: 7, population: 21960 },
  { region: 'Chugoku', prefectures: 5, population: 7090 },
  { region: 'Shikoku', prefectures: 4, population: 3570 },
  { region: 'Kyushu & Okinawa', prefectures: 8, population: 15080 },
];
export const REGIONS_SOURCE = 'Statistics Bureau of Japan, Population Estimates by Prefecture, 2024';

export function formatThousands(n) {
  return n.toLocaleString('en-US');
}
