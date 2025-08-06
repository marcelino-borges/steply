import { Catch, ArgumentsHost, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { Prisma } from "prisma/client";

import { PrismaError } from "@/core/infra/errors/prisma.error";
import { Lang, t } from "@/core/application/locales";
import { BaseErrorFilter } from "@/core/infra/filters/base-error.filter";

@Catch(Prisma.PrismaClientKnownRequestError)
export class DatabaseErrorsFilter extends BaseErrorFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    super.catch(exception, host);

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const lang = request.headers["lang"]?.toString() || "en";

    const prismaError = new PrismaError(exception, t(lang as Lang));
    let status = HttpStatus.UNPROCESSABLE_ENTITY;

    if (exception.code === "P2025") {
      status = HttpStatus.BAD_REQUEST;
    }

    const message = prismaError.getMessage();

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
