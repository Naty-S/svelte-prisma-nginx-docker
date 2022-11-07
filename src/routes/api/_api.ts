import { Prisma } from "@prisma/client";

import PrismaClient, { get_known_error } from "$lib/prisma";


export const prisma = new PrismaClient();


/**
 * Handles the errors when calling the prisma client in the api routes.
 * 
 * https://www.prisma.io/docs/reference/api-reference/error-reference
 * 
 * @param error
 * @returns {string} Human readable message
 */
export const handle_error = async function (error: any) {

  let causa: string = '';
  let msg: string = "Unkown Error.";

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    causa = "There was a request related error.";
    msg = get_known_error(error);
  };

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    causa = "There was a unkown request related error.";
  };

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    causa = "\
      There was a crash in the underlying engine, Prisma Client or \
      the whole Node process must be restarted.";
  };

  if (error instanceof Prisma.PrismaClientInitializationError) {
    causa = "\
      There was a initialization error when connecting to the database o \
      the first query was executed. This may be reasons:\n\
      * The provided credentials for the database are invalid.\n\
      * There is no database server running under the provided hostname and port.\n\
      * The port that the query engine HTTP server wants to bind to is already taken.\n\
      * A missing or inaccessible environment variable.\n\
      * The query engine binary for the current platform could not be found (generator block)";
    msg = "Error de inicialización";
  };

  if (error instanceof Prisma.PrismaClientValidationError) {
    causa = "\
      There was a validation error.\n\
      Either the data provided was missing one or more required fields, or \
      the type of one or more fields was incorrect";
    msg = "Error de validación";
  };

  if (causa !== '') {
    const data: any = { causa, mensaje: error.message, fecha: new Date() };

    if (error.code) {
      data.codigo = error.code;
    };

    if (error.meta?.target) {
      data.campos = error.meta.target;
    };

    console.log(data);
    // await prisma.errors_log.create({ data });
  };

  return msg;
};
