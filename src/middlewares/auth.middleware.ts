
import {
    CanActivate,
    ExecutionContext,
    HttpException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import axios from 'axios';
import { Permissions } from './decorators/permissions.decorator';


@Injectable()
export class RemoteAuthGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization;

        if (!token) {
            throw new HttpException('Authorization token missing', 401);
        }

        const permissions: string[] =
            this.reflector.get<string[]>(Permissions, context.getHandler()) || [];

        try {
            for (const permission of permissions) {//son los permisos requeridos, hace una peticion por permiso por que asi funciona el can-do de users
                await axios.get(
                    `http://localhost:3000/can-do/${permission}`,
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );
            }

            return true; // Si no falló ningún permiso, está autorizado
        } catch (err) {
            const status = err.response?.status || 403;
            const message = err.response?.data?.message || 'Unauthorized';
            throw new HttpException(message, status);
        }
    }
}
