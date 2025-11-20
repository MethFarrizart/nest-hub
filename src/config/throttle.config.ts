import { ThrottlerGuard, ThrottlerException } from '@nestjs/throttler';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ThrottlingHandler extends ThrottlerGuard {
  protected throwThrottlingException(): void {
    throw new ThrottlerException(process.env.THROTTLE_ERROR_MESSAGE);
  }
}
