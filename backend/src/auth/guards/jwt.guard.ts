import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

// connected ni siya sa jwt.strategy.ts ayaw kalimte
export class JwtAuthGuard extends AuthGuard('alufan') {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context)
    }
}