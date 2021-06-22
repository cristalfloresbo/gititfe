export interface Rating {
  ratedUser: number;
  raterUser: number;
  score: number;
}

export interface RatingUpdate {
  id: string;
  ratedUser: number;
  raterUser: number;
  score: number;
}

