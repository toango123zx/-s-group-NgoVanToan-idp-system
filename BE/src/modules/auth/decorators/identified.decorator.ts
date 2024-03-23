import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';

export const Identified = applyDecorators(
  UseGuards(AuthGuard),
);
