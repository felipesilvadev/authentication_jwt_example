import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { classToClass } from 'class-transformer';

import User from '../models/User';

class UserController {
  public async index(request: Request, response: Response) {
    const usersRepository = getRepository(User);

    const users = await usersRepository.find();

    return response.json(classToClass(users));
  }

  public async store(request: Request, response: Response) {
    const { email, password } = request.body;

    const usersRepository = getRepository(User);

    const userExists = await usersRepository.findOne({ where: { email } });

    if (userExists) {
      return response.status(409).json({ error: 'User already exists' });
    }

    const user = usersRepository.create({ email, password });

    await usersRepository.save(user);

    return response.json(classToClass(user));
  }
}

export default new UserController();