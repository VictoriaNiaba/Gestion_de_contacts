import { from } from "rxjs";
import {ApiProperty} from '@nestjs/swagger';

export class CreateContactDto {
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
}
