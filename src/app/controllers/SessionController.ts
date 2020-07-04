import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { classToClass } from 'class-transformer';

import User from '../models/User';

class SessionController {
  public async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      return response.status(401).json({ error: 'User does not exists' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return response.status(401).json({ error: 'Password does not match' });
    }

    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' });

    return response.json({
      user: classToClass(user),
      token
    });
  }
}

export default new SessionController();