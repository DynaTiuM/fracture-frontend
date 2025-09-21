export type CrystalAction = 'absorb' | 'fix' | 'hold';

export interface Crystal {
  energy: number;
  broken: boolean;
  sessionStart: Date;
}
