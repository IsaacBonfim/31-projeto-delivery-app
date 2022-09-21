import RegisterService from "../services/registerService";

const RegisterController = {
  registerUser: async (req, res, next) => {
    const { body } = req;

    try {
      await RegisterService.registerUser(body);
      return res.status(201).end();
    } catch (error) {
      next(error);
    }
  }
}

export default RegisterController;
