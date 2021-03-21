# nestjs-class-validator-error-handler
![Tests Workflow](https://github.com/gastonmorixe/nestjs-class-validator-error-handler/actions/workflows/tests.yml/badge.svg)

GraphQL Error handler for [NestJS](https://github.com/nestjs/nest) models using [class-validator](https://github.com/typestack/class-validator)

*Note: this package is opinated to work along mongoose for now. With a few lines you can remove it as a dependency or it could be decoupled into two different decorators for those who do not use mongo/mongoose.*

## Usage

Your model must
- Extend it from the `Model` class
- Enable `class-validator` by using the decorator `@ValidateSchema()` on the class
- Export the schema using `YourModel.schema` property

Example *User.model.ts*

```typescript
import * as DB from '@nestjs/mongoose'
import * as GQL from '@nestjs/graphql'
import * as mongoose from 'mongoose'
import * as V from 'class-validator'
import { ValidateSchema, Model } from 'nestjs-class-validator-error-handler'

@GQL.ObjectType()
@DB.Schema({
  timestamps: true,
})
@ValidateSchema()
export class UserModel extends Model {
  @GQL.Field(() => GQL.ID)
  _id: mongoose.Types.ObjectId

  @GQL.Field(() => String, { nullable: false })
  @DB.Prop({
    required: true,
  })
  @V.Contains('Hello')
  username: string
}

export type UserModelDocument = UserModel & mongoose.Document
export const UserModelSchema = UserModel.schema
```


# Licence

MIT

# Author

[Gaston Morixe](https://gastonmorixe.com)
