import { IsOptional, IsNotEmpty } from 'class-validator';

export class SearchMemberDto {
  @IsOptional()
  @IsNotEmpty()
  postcode: number;

  @IsOptional()
  @IsNotEmpty()
  locality: string;
}
