import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class AuthValidationPipe implements PipeTransform {
  transform(login: any, metadata: ArgumentMetadata) {
    return login;
  }
  
}