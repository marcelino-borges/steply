import { ExceptionFilter, ArgumentsHost } from "@nestjs/common";

export abstract class BaseErrorFilter implements ExceptionFilter {
  catch(exception: Error, _: ArgumentsHost) {
    console.error(
      `⛔ Error ${exception.name} caught: `,
      JSON.stringify(exception, null, 2),
    );
  }
}
