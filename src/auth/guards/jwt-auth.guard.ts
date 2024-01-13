import { Injectable, ExecutionContext } from '@nestjs/common';

// importamos a reflector para obtener la metadata
import { Reflector } from '@nestjs/core';
// importamos a "UseGuards" y a "AuthGuard"
import { AuthGuard } from '@nestjs/passport';
// traemos la definición del decorador @IsPublic() que habíamos creado
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

// vamos a extender la funcionalidad del AuthGuard('jwt')
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // inyectamos al reflector como una dependencia
  constructor(private reflector: Reflector) {
    // como hacemos herencia, llamamos a "super()"
    super();
  }

  // creamos una funcionalidad para validar la activación
  // le enviamos el contexto de ejecución donde recibimos lametadata
  canActive(context: ExecutionContext) {
    // validamos si el Endpoint tiene en su metadata si es público
    const IsPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());

    // el Endpoint es público?
    if (IsPublic) {
      // retornamos el acceso sin necesidad de validar
      return true;
    }

    // si no
    // le decimos que realize la validación que hace desde su herencia
    return super.canActivate(context);
  }
}
