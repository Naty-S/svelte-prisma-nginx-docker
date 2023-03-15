import * as yup from "yup";


export const validation = function () {

  return yup.object().shape({
    info: yup.string()
  });
};
