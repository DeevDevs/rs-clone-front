export type TDBMsg = {
  status: string;
};

export type StatsArrays = [string, string];

export type TDBStats = {
  _id: string;
  places: number;
  days: number;
  averageRate: number;
  distance: number;
  sites: StatsArrays[];
  countries: StatsArrays[];
  continents: StatsArrays[];
};

export type TStats = {
  id: string;
  places: number;
  days: number;
  averageRate: number;
  distance: number;
  sites: StatsArrays[];
  countries: StatsArrays[];
  continents: StatsArrays[];
  statsMsg: string | null;
};

// Update Data Objects

// export type TUpdStatsReq = {
//   statsID: string;
//   memoirID: string;
//   condition: string;
// };

export type TStatsResp = {
  status: string;
  data: TDBStats;
};
