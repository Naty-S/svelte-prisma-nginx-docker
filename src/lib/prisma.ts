import Prisma, * as PrismaAll from "@prisma/client";


const PrismaClient = Prisma?.PrismaClient || PrismaAll?.PrismaClient;
export default PrismaClient;


export const get_known_error = function (error: PrismaAll.Prisma.PrismaClientKnownRequestError) {
  switch (error.code) {
    //  Commons errors
    case "P1000":
      return "Autenticación fallida, las credenciales de la base de datos son incorrectas.";

    case "P1001":
      return "No se pudo establecer conexión con el servidor.";

    case "P1002":
      return "Conexión establecida con el servidor, pero tiempo de espera agotado.";

    case "P1003":
      return "La base de datos no existe.";

    case "P1008":
      return "Tiempo de espera agotado para las operaciones.";

    case "P1009":
      return "La base de datos ya existe.";

    case "P1010":
      return "Acceso denegado a la base de datos.";

    case "P1011":
      return "Error al abrir una conexión TLS.";

    case "P1012":
      // More details at:
      // https://www.prisma.io/docs/reference/api-reference/error-reference#p1012
      return "Error relacionado con la version del cliente: " + error.clientVersion;

    case "P1013":
      return "The provided database string is invalid.";

    case "P1014":
      return "El modelo (tabla) no existe.";

    case "P1015":
      return "El esquema Prisma esta usando características no soportadas por la versión base de datos.";

    case "P1016":
      return "Your raw query had an incorrect number of parameters.";

    case "P1017":
      return "El servidor cerró la conexión.";

    // Prisma Client related errors
    // https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine
    case "P2000":
      return "El valor proporcionado es muy largo para su tipo.";

    case "P2001":
      return "Uno de los datos proporcionados no se puede guardar correctamente.";

    case "P2002":
      return "Ya se encuentra un registro con los datos proporcionados.";

    case "P2003":
      return "Fallo en la condicion principal de los datos.";

    case "P2004":
      return "Fallo en las condiciones en la base de datos.";

    case "P2005":
      return "El tipo de valor guardado es inválido.";

    case "P2006":
      return "El tipo de valor proporcionado no es el esperado.";

    case "P2007":
      return "Error de validación de los datos.";

    case "P2008":
      return "Fallo al leer los datos.";

    case "P2009":
      return "Fallo al validar los datos.";

    case "P2010":
      return "Raw query failed.";

    case "P2011":
      return "El valor proporcionado no puede estar vacío.";

    case "P2012":
      return "Falta un valor requerido.";

    case "P2013":
      return "Falta un argumento requerido.";

    case "P2014":
      return "El cambio que desea hacer es inválido.";

    case "P2015":
      return "Un valor relacionado no pudo ser encontrado.";

    case "P2016":
      return "Fallo en la interpretación de los datos.";

    case "P2017":
      return "Relaciones en la base de datos no conectadas.";

    case "P2018":
      return "Los valores requeridos no fueron encontrados.";

    case "P2019":
      return "Input error.";

    case "P2020":
      return "Valor fuera del rango del tipo.";

    case "P2021":
      return "La tabla no existe en la base de datos actual.";

    case "P2022":
      return "El campo no existe en la base de datos actual.";

    case "P2023":
      return "Datos inconsistentes en la base de datos.";

    case "P2024":
      return "Tiempo de espera agotado al intentar re-establecer conexión.";

    case "P2025":
      return "Operación fallida, los datos requeridos no fueron encontrados.";

    case "P2026":
      return "La base de datos actual no soporta la cartacteristica que desea usar.";

    case "P2027":
      return "Errores múltiples ocurrieron en la base de datos.";

    case "P2028":
      return "Transaction API error.";

    case "P2030":
      return "Búsqueda fallida.";

    case "P2031":
      return "MongoDB error.";

    case "P2033":
      return "El número proporcionado es del tipo incorrecto.";

    case "P2034":
      return "Transacción fallida, por favor vuelva a intentar.";

    default:
      return "Unkown Error.";
  }
};
