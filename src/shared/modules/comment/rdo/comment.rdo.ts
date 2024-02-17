import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/index.js';

export class CommentRdo {
  @Expose()
  public id: string;

  @Expose()
  public publicationDate: Date;

  @Expose()
  public text: string;

  @Expose()
  public rating: number;

  @Expose()
  public offerId: string;

  @Expose()
  @Type(() => UserRdo)
  public user: UserRdo;
}
