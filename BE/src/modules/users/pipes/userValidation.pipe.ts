import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class UserValidationPipe implements PipeTransform {
  transform(idUser: any, metadata: ArgumentMetadata) {
    return idUser;
  }
  
}