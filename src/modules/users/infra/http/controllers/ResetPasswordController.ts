import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import { ResetPasswordBody } from '../validators/password.validators';

export default class ResetPasswordController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { token, password } = request.body as ResetPasswordBody;

        const resetPasswordService = container.resolve(ResetPasswordService);

        await resetPasswordService.execute({
            token,
            password
        });
        
        return response.status(204).json();
    }
}