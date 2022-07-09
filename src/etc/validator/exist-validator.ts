import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { DataSource, getConnection, getRepository } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistValidator implements ValidatorConstraintInterface {

    async validate(value: any, validationArguments: ValidationArguments) {

        let find = { [validationArguments.constraints[1]]: validationArguments.value};
        let cek = await getConnection().getRepository(validationArguments.constraints[0].findOne(find));
        
        if(cek) return false;
        return true;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return validationArguments.property + '' + validationArguments.value + ' Account Already Exists'
    }

}

export function IsExist(option: any, validationOption?: ValidationOptions){
    return function (object:any, propertyName: string){
        registerDecorator(
            {
                name: 'IsExist',
                target: object.constructor,
                propertyName: propertyName,
                constraints:option,
                options: validationOption,
                validator: ExistValidator,
                async: true
            }
        )
    }
}
