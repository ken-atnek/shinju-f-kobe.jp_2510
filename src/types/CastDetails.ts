export type CastDetail = {
  castId: string;
  castName: string;
  castNameEn: string;
  castImage: string;
  age: number;
  tall: number;
  bust: number;
  cup: string;
  west: number;
  hip: number;
  catchCopy: string;
  rankings?: {
    [key: string]: number;
  };
  type: number[];
  badges?: string[];
};
