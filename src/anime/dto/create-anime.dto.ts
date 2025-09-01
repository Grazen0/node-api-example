import { IsInt, Length, Max, Min } from 'class-validator';

export class CreateAnimeDto {
  @Length(1, 50)
  name: string;

  @IsInt()
  @Min(1)
  @Max(1000)
  seasons: number;

  @Min(0)
  @Max(10)
  rating: number;
}
