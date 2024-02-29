import { IsInt, IsMongoId, IsString, Length, Max, Min } from 'class-validator';
import { CreateCommentMessages, Text } from '../const/index.js';
import { Rating } from '../../../const/index.js';

export class CreateCommentDto {
  @IsString({ message: CreateCommentMessages.text.invalidFormat })
  @Length(Text.Min, Text.Max, { message: CreateCommentMessages.text.lengthField })
  public text: string;

  @IsInt({ message: CreateCommentMessages.rating.invalidFormat })
  @Min(Rating.Min, { message: CreateCommentMessages.rating.minValue })
  @Max(Rating.Max, { message: CreateCommentMessages.rating.maxValue })
  public rating: number;

  @IsMongoId({ message: CreateCommentMessages.offerId.invalidFormat })
  public offerId: string;

  public userId: string;
}
