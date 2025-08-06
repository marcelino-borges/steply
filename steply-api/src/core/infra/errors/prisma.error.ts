import { Prisma } from "prisma/client";

import {
  MODEL_NAME_PLACEHOLDER,
  MODEL_FIELD_PLACEHOLDER,
} from "@/core/domain/constants/database";
import { Dictionary } from "@/core/application/locales";

export class PrismaError extends Error {
  private readonly prismaError: Prisma.PrismaClientKnownRequestError;
  private readonly friendlyMessage: string;
  private readonly dictionary: Dictionary;

  constructor(
    prismaError: Prisma.PrismaClientKnownRequestError,
    dictionary: Dictionary,
  ) {
    super(prismaError.message);
    this.dictionary = dictionary;
    this.prismaError = prismaError;
    this.friendlyMessage = this.buildMessage(prismaError);
  }

  private replacePlaceholderOrFillString(
    originalMessage: string,
    placeholder: string,
    toFillIn?: string,
  ) {
    if (toFillIn?.length) {
      return originalMessage.replace(new RegExp(placeholder, "g"), toFillIn);
    } else if (originalMessage.startsWith(placeholder)) {
      return originalMessage.replace(new RegExp(`${placeholder}\\s?`, "g"), "");
    } else if (originalMessage.endsWith(placeholder)) {
      return originalMessage.replace(new RegExp(`\\s?${placeholder}`, "g"), "");
    }

    return originalMessage;
  }

  private getPrismaTranslatedMessage(
    errorCode: string,
    {
      modelName,
      target,
      field_name,
    }: { modelName?: string; target?: string; field_name?: string },
  ) {
    const errorsDictionary = this.dictionary.dbErrors;
    let message = (errorsDictionary as Record<string, string>)[errorCode];

    if (!message?.length) return errorsDictionary.unknown;

    if (message.includes(MODEL_NAME_PLACEHOLDER)) {
      message = this.replacePlaceholderOrFillString(
        message,
        MODEL_NAME_PLACEHOLDER,
        modelName,
      );
    }

    if (message.includes(MODEL_FIELD_PLACEHOLDER)) {
      let toFill = field_name ?? target;

      message = this.replacePlaceholderOrFillString(
        message,
        MODEL_FIELD_PLACEHOLDER,
        toFill,
      );
    }

    return message;
  }

  private findTranslatedField(fieldName: string) {
    const dictionary = this.dictionary.modelsFields;
    let translatedTarget = fieldName;
    const fields = Object.keys(dictionary);

    for (const field of fields) {
      if (new RegExp(field, "i").test(fieldName)) {
        translatedTarget = (dictionary as Record<string, string>)[field];
        break;
      }
    }

    return translatedTarget;
  }

  private consolidateWhenStringOrArray(prop: string | Array<unknown>) {
    if (typeof prop === "string") {
      const uniqueFields = Object.keys(this.dictionary.modelsFields);

      for (const field of uniqueFields) {
        if (prop.includes(field)) {
          return (this.dictionary.modelsFields as Record<string, string>)[
            field
          ];
        }
      }
    }

    if (Array.isArray(prop)) {
      const targets = prop as string[];

      let targetsTogether = this.dictionary.modelsFields.unknown;

      if (targets.length > 1) {
        targetsTogether = "";

        targets.forEach((target, index) => {
          const translated = this.findTranslatedField(target);
          let divisor = "";

          if (index === targets.length - 1) {
            divisor = ` ${this.dictionary.and} `;
          } else if (index > 0 && index < targets.length - 1) {
            divisor = ", ";
          }

          targetsTogether += `${divisor}${translated}`;
        });
      } else if (targets.length === 1) {
        const translated = this.findTranslatedField(targets[0]);
        targetsTogether = translated;
      }

      return targetsTogether;
    }

    return this.dictionary.modelsFields.unknown;
  }

  private buildPrismaErrorData(error: Prisma.PrismaClientKnownRequestError) {
    const fieldsDictionary = this.dictionary.modelsFields;
    const modelsDictionary = this.dictionary.dbModels;
    let modelName = error.meta?.modelName ?? modelsDictionary.Unknown;
    let target: string | undefined;
    let fieldName: string | undefined;

    if (error.meta?.modelName) {
      const name = (modelsDictionary as Record<string, string>)[
        error.meta.modelName as string
      ];

      if (name) {
        modelName = name;
      }
    }

    if (error.meta?.column && typeof error.meta.column === "string") {
      const uniqueFields = Object.keys(fieldsDictionary);

      for (const field of uniqueFields) {
        if (error.meta.column.includes(field)) {
          target = (fieldsDictionary as Record<string, string>)[field];
          break;
        }
      }
    }

    if (error.meta?.target) {
      target = this.consolidateWhenStringOrArray(
        error.meta.target as string | string[],
      );
    }

    if (error.meta?.field_name) {
      fieldName = this.consolidateWhenStringOrArray(
        error.meta.field_name as string | string[],
      );
    }
    return {
      modelName,
      target,
      fieldName,
    };
  }

  private buildMessage(error: Prisma.PrismaClientKnownRequestError) {
    const { modelName, target, fieldName } = this.buildPrismaErrorData(error);

    const message = this.getPrismaTranslatedMessage(error.code, {
      modelName: modelName as string,
      target: target as string,
      field_name: fieldName as string,
    });

    return message;
  }

  public getMessage() {
    return (
      this.friendlyMessage.charAt(0).toUpperCase() +
      this.friendlyMessage.slice(1)
    );
  }

  public getPrismaError() {
    return this.prismaError;
  }
}
