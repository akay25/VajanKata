export const validateYupSchema = async (schema: object, formData: any) => {
  try {
    // @ts-ignore
    await schema.validate(formData, { abortEarly: false });
    return null;
  } catch (e) {
    // Populate the errors from errors
    const errors = {};
    for (const error of e.inner) {
      // @ts-ignore
      errors[error.path] = error.message;
    }
    return errors;
  }
};

