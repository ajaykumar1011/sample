export const POST_METHOD = "POST";
export const GET_METHOD = "GET";
export const PUT_METHOD = "PUT";

export function validateFormWithErrors(formValues) {
  let requiredKeys = Object.keys(formValues).filter((key) => formValues[key].isRequired);
  const nonFilledKeys = requiredKeys.filter(
    (key) => !formValues[key] || !formValues[key].value?.toString().trim().length
  );
  if (nonFilledKeys.length) {
    return {
      errorExists: true,
      upatedErrors: nonFilledKeys.reduce(
        (p, c) => ({
          ...p,
          [c]: { ...formValues[c], errored: true, errorMsg: formValues[c].msgText || `Field is mandatory` }
        }),
        {}
      )
    };
  }
  return { errorExists: false };
}

export function formatPayload(formValues) {
  return Object.keys(formValues).reduce((p, c) => ({ ...p, [c]: formValues[c].value }), {});
}
