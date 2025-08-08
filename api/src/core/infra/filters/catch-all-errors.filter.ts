import { Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { Response } from "express";

import { BaseErrorFilter } from "./base-error.filter";

@Catch(HttpException)
export class CatchAllErrorsFilter extends BaseErrorFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    super.catch(exception, host);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();

    const message = exception.message;

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
