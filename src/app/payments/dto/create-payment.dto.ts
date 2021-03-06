import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  Min,
} from 'class-validator';
import { OrdersEntity } from 'src/app/orders/orders.entity';
import { MessageHelper } from 'src/helpers/message.helper';
import { RegExHelper } from 'src/helpers/regex.helper';
import { Method } from '../../../config/enum/method.enum';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsEnum(Method, { message: MessageHelper.METHOD_VALID })
  method: Method;

  @IsOptional()
  @IsInt()
  @Min(1)
  installments: number;

  @IsOptional()
  @IsString()
  @Matches(RegExHelper.cardNumber, { message: MessageHelper.CARD_NUMBER_VALID })
  cardNumber: string;

  @IsOptional()
  @IsString()
  @Matches(RegExHelper.printedName, {
    message: MessageHelper.PRINTED_NAME_VALID,
  })
  printedName: string;

  @IsOptional()
  @IsString()
  @Matches(RegExHelper.dueDate, { message: MessageHelper.DUE_DATE_VALID })
  dueDate: string;

  @IsOptional()
  @IsString()
  @Matches(RegExHelper.securityCode, {
    message: MessageHelper.SECURITY_CODE_VALID,
  })
  securityCode: string;

  @IsNotEmpty()
  @IsUUID()
  order: OrdersEntity;
}
