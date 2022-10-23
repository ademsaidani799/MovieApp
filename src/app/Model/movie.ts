export interface Movie {
    page: number;
    results?: (ResultsEntity)[] | null;
    dates: Dates;
    total_pages: number;
    total_results: number;
  }
  export interface ResultsEntity {
    poster_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids?: (number | null)[] | null;
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path?: string | null;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
  }
  export interface Dates {
    maximum: string;
    minimum: string;
  }
  