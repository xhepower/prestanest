import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // CON ESTA FUNCION DE PODEMOS PERSONALIZAR SI
  //  QUEREMOS LANZAR ERRORES PERZONALIZADOS
  handleRequest(err, user) {
    if (err || !user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Usuario no autorizado',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }
}
