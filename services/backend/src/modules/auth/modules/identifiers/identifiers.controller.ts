import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { IdentifiersPayloadDto } from '../../definitions';

import { IdentifiersService } from './identifiers.service';

@Controller()
export class IdentifiersController {
    constructor(private readonly identifiersService: IdentifiersService) {}

    @MessagePattern({ cmd: 'user.identifier.create' })
    createIdentifier(@Payload() payload: IdentifiersPayloadDto) {
        return this.identifiersService.createIdentifier(payload);
    }
}
