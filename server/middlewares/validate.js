// ميدل وير عام للتحقق من البيانات باستخدام yup
//validate.js
const validate = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (err) {
      return res.status(400).json({
        errors: err.inner.map(e => e.message),
      });
    }
  };
};

// غيري هذا السطر فقط:
export default validate;  // تصدير كـ default export