
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 用户表
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Course
 * 课程表
 */
export type Course = $Result.DefaultSelection<Prisma.$CoursePayload>
/**
 * Model Unit
 * 单元表
 */
export type Unit = $Result.DefaultSelection<Prisma.$UnitPayload>
/**
 * Model Lesson
 * 课时表
 */
export type Lesson = $Result.DefaultSelection<Prisma.$LessonPayload>
/**
 * Model Conversation
 * 对话会话表
 */
export type Conversation = $Result.DefaultSelection<Prisma.$ConversationPayload>
/**
 * Model Message
 * 消息表
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model UserProgress
 * 用户进度表
 */
export type UserProgress = $Result.DefaultSelection<Prisma.$UserProgressPayload>
/**
 * Model VocabItem
 * 词汇表
 */
export type VocabItem = $Result.DefaultSelection<Prisma.$VocabItemPayload>
/**
 * Model UserVocabProgress
 * 用户词汇掌握表
 */
export type UserVocabProgress = $Result.DefaultSelection<Prisma.$UserVocabProgressPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.course`: Exposes CRUD operations for the **Course** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Courses
    * const courses = await prisma.course.findMany()
    * ```
    */
  get course(): Prisma.CourseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.unit`: Exposes CRUD operations for the **Unit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Units
    * const units = await prisma.unit.findMany()
    * ```
    */
  get unit(): Prisma.UnitDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lesson`: Exposes CRUD operations for the **Lesson** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Lessons
    * const lessons = await prisma.lesson.findMany()
    * ```
    */
  get lesson(): Prisma.LessonDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.conversation`: Exposes CRUD operations for the **Conversation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Conversations
    * const conversations = await prisma.conversation.findMany()
    * ```
    */
  get conversation(): Prisma.ConversationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userProgress`: Exposes CRUD operations for the **UserProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserProgresses
    * const userProgresses = await prisma.userProgress.findMany()
    * ```
    */
  get userProgress(): Prisma.UserProgressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vocabItem`: Exposes CRUD operations for the **VocabItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VocabItems
    * const vocabItems = await prisma.vocabItem.findMany()
    * ```
    */
  get vocabItem(): Prisma.VocabItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userVocabProgress`: Exposes CRUD operations for the **UserVocabProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserVocabProgresses
    * const userVocabProgresses = await prisma.userVocabProgress.findMany()
    * ```
    */
  get userVocabProgress(): Prisma.UserVocabProgressDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.4.2
   * Query Engine version: 94a226be1cf2967af2541cca5529f0f7ba866919
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Course: 'Course',
    Unit: 'Unit',
    Lesson: 'Lesson',
    Conversation: 'Conversation',
    Message: 'Message',
    UserProgress: 'UserProgress',
    VocabItem: 'VocabItem',
    UserVocabProgress: 'UserVocabProgress'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "course" | "unit" | "lesson" | "conversation" | "message" | "userProgress" | "vocabItem" | "userVocabProgress"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Course: {
        payload: Prisma.$CoursePayload<ExtArgs>
        fields: Prisma.CourseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CourseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findFirst: {
            args: Prisma.CourseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findMany: {
            args: Prisma.CourseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          create: {
            args: Prisma.CourseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          createMany: {
            args: Prisma.CourseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CourseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          delete: {
            args: Prisma.CourseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          update: {
            args: Prisma.CourseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          deleteMany: {
            args: Prisma.CourseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CourseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CourseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          upsert: {
            args: Prisma.CourseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          aggregate: {
            args: Prisma.CourseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourse>
          }
          groupBy: {
            args: Prisma.CourseGroupByArgs<ExtArgs>
            result: $Utils.Optional<CourseGroupByOutputType>[]
          }
          count: {
            args: Prisma.CourseCountArgs<ExtArgs>
            result: $Utils.Optional<CourseCountAggregateOutputType> | number
          }
        }
      }
      Unit: {
        payload: Prisma.$UnitPayload<ExtArgs>
        fields: Prisma.UnitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UnitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UnitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>
          }
          findFirst: {
            args: Prisma.UnitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UnitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>
          }
          findMany: {
            args: Prisma.UnitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>[]
          }
          create: {
            args: Prisma.UnitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>
          }
          createMany: {
            args: Prisma.UnitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UnitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>[]
          }
          delete: {
            args: Prisma.UnitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>
          }
          update: {
            args: Prisma.UnitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>
          }
          deleteMany: {
            args: Prisma.UnitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UnitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UnitUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>[]
          }
          upsert: {
            args: Prisma.UnitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>
          }
          aggregate: {
            args: Prisma.UnitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUnit>
          }
          groupBy: {
            args: Prisma.UnitGroupByArgs<ExtArgs>
            result: $Utils.Optional<UnitGroupByOutputType>[]
          }
          count: {
            args: Prisma.UnitCountArgs<ExtArgs>
            result: $Utils.Optional<UnitCountAggregateOutputType> | number
          }
        }
      }
      Lesson: {
        payload: Prisma.$LessonPayload<ExtArgs>
        fields: Prisma.LessonFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LessonFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LessonFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>
          }
          findFirst: {
            args: Prisma.LessonFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LessonFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>
          }
          findMany: {
            args: Prisma.LessonFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>[]
          }
          create: {
            args: Prisma.LessonCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>
          }
          createMany: {
            args: Prisma.LessonCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LessonCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>[]
          }
          delete: {
            args: Prisma.LessonDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>
          }
          update: {
            args: Prisma.LessonUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>
          }
          deleteMany: {
            args: Prisma.LessonDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LessonUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LessonUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>[]
          }
          upsert: {
            args: Prisma.LessonUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonPayload>
          }
          aggregate: {
            args: Prisma.LessonAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLesson>
          }
          groupBy: {
            args: Prisma.LessonGroupByArgs<ExtArgs>
            result: $Utils.Optional<LessonGroupByOutputType>[]
          }
          count: {
            args: Prisma.LessonCountArgs<ExtArgs>
            result: $Utils.Optional<LessonCountAggregateOutputType> | number
          }
        }
      }
      Conversation: {
        payload: Prisma.$ConversationPayload<ExtArgs>
        fields: Prisma.ConversationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConversationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConversationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findFirst: {
            args: Prisma.ConversationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConversationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findMany: {
            args: Prisma.ConversationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          create: {
            args: Prisma.ConversationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          createMany: {
            args: Prisma.ConversationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConversationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          delete: {
            args: Prisma.ConversationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          update: {
            args: Prisma.ConversationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          deleteMany: {
            args: Prisma.ConversationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConversationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConversationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          upsert: {
            args: Prisma.ConversationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          aggregate: {
            args: Prisma.ConversationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConversation>
          }
          groupBy: {
            args: Prisma.ConversationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConversationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConversationCountArgs<ExtArgs>
            result: $Utils.Optional<ConversationCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      UserProgress: {
        payload: Prisma.$UserProgressPayload<ExtArgs>
        fields: Prisma.UserProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload>
          }
          findFirst: {
            args: Prisma.UserProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload>
          }
          findMany: {
            args: Prisma.UserProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload>[]
          }
          create: {
            args: Prisma.UserProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload>
          }
          createMany: {
            args: Prisma.UserProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserProgressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload>[]
          }
          delete: {
            args: Prisma.UserProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload>
          }
          update: {
            args: Prisma.UserProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload>
          }
          deleteMany: {
            args: Prisma.UserProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserProgressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload>[]
          }
          upsert: {
            args: Prisma.UserProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload>
          }
          aggregate: {
            args: Prisma.UserProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserProgress>
          }
          groupBy: {
            args: Prisma.UserProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserProgressCountArgs<ExtArgs>
            result: $Utils.Optional<UserProgressCountAggregateOutputType> | number
          }
        }
      }
      VocabItem: {
        payload: Prisma.$VocabItemPayload<ExtArgs>
        fields: Prisma.VocabItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VocabItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VocabItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabItemPayload>
          }
          findFirst: {
            args: Prisma.VocabItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VocabItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabItemPayload>
          }
          findMany: {
            args: Prisma.VocabItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabItemPayload>[]
          }
          create: {
            args: Prisma.VocabItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabItemPayload>
          }
          createMany: {
            args: Prisma.VocabItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VocabItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabItemPayload>[]
          }
          delete: {
            args: Prisma.VocabItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabItemPayload>
          }
          update: {
            args: Prisma.VocabItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabItemPayload>
          }
          deleteMany: {
            args: Prisma.VocabItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VocabItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VocabItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabItemPayload>[]
          }
          upsert: {
            args: Prisma.VocabItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabItemPayload>
          }
          aggregate: {
            args: Prisma.VocabItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVocabItem>
          }
          groupBy: {
            args: Prisma.VocabItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<VocabItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.VocabItemCountArgs<ExtArgs>
            result: $Utils.Optional<VocabItemCountAggregateOutputType> | number
          }
        }
      }
      UserVocabProgress: {
        payload: Prisma.$UserVocabProgressPayload<ExtArgs>
        fields: Prisma.UserVocabProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserVocabProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVocabProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserVocabProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVocabProgressPayload>
          }
          findFirst: {
            args: Prisma.UserVocabProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVocabProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserVocabProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVocabProgressPayload>
          }
          findMany: {
            args: Prisma.UserVocabProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVocabProgressPayload>[]
          }
          create: {
            args: Prisma.UserVocabProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVocabProgressPayload>
          }
          createMany: {
            args: Prisma.UserVocabProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserVocabProgressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVocabProgressPayload>[]
          }
          delete: {
            args: Prisma.UserVocabProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVocabProgressPayload>
          }
          update: {
            args: Prisma.UserVocabProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVocabProgressPayload>
          }
          deleteMany: {
            args: Prisma.UserVocabProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserVocabProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserVocabProgressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVocabProgressPayload>[]
          }
          upsert: {
            args: Prisma.UserVocabProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVocabProgressPayload>
          }
          aggregate: {
            args: Prisma.UserVocabProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserVocabProgress>
          }
          groupBy: {
            args: Prisma.UserVocabProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserVocabProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserVocabProgressCountArgs<ExtArgs>
            result: $Utils.Optional<UserVocabProgressCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    course?: CourseOmit
    unit?: UnitOmit
    lesson?: LessonOmit
    conversation?: ConversationOmit
    message?: MessageOmit
    userProgress?: UserProgressOmit
    vocabItem?: VocabItemOmit
    userVocabProgress?: UserVocabProgressOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    conversations: number
    progress: number
    vocabProgress: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversations?: boolean | UserCountOutputTypeCountConversationsArgs
    progress?: boolean | UserCountOutputTypeCountProgressArgs
    vocabProgress?: boolean | UserCountOutputTypeCountVocabProgressArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountConversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserProgressWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountVocabProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserVocabProgressWhereInput
  }


  /**
   * Count Type CourseCountOutputType
   */

  export type CourseCountOutputType = {
    units: number
    vocabs: number
    conversations: number
  }

  export type CourseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    units?: boolean | CourseCountOutputTypeCountUnitsArgs
    vocabs?: boolean | CourseCountOutputTypeCountVocabsArgs
    conversations?: boolean | CourseCountOutputTypeCountConversationsArgs
  }

  // Custom InputTypes
  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseCountOutputType
     */
    select?: CourseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountUnitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UnitWhereInput
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountVocabsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VocabItemWhereInput
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountConversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
  }


  /**
   * Count Type UnitCountOutputType
   */

  export type UnitCountOutputType = {
    lessons: number
  }

  export type UnitCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lessons?: boolean | UnitCountOutputTypeCountLessonsArgs
  }

  // Custom InputTypes
  /**
   * UnitCountOutputType without action
   */
  export type UnitCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitCountOutputType
     */
    select?: UnitCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UnitCountOutputType without action
   */
  export type UnitCountOutputTypeCountLessonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LessonWhereInput
  }


  /**
   * Count Type LessonCountOutputType
   */

  export type LessonCountOutputType = {
    progress: number
    conversations: number
  }

  export type LessonCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    progress?: boolean | LessonCountOutputTypeCountProgressArgs
    conversations?: boolean | LessonCountOutputTypeCountConversationsArgs
  }

  // Custom InputTypes
  /**
   * LessonCountOutputType without action
   */
  export type LessonCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonCountOutputType
     */
    select?: LessonCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LessonCountOutputType without action
   */
  export type LessonCountOutputTypeCountProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserProgressWhereInput
  }

  /**
   * LessonCountOutputType without action
   */
  export type LessonCountOutputTypeCountConversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
  }


  /**
   * Count Type ConversationCountOutputType
   */

  export type ConversationCountOutputType = {
    messages: number
  }

  export type ConversationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | ConversationCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationCountOutputType
     */
    select?: ConversationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }


  /**
   * Count Type VocabItemCountOutputType
   */

  export type VocabItemCountOutputType = {
    userProgress: number
  }

  export type VocabItemCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userProgress?: boolean | VocabItemCountOutputTypeCountUserProgressArgs
  }

  // Custom InputTypes
  /**
   * VocabItemCountOutputType without action
   */
  export type VocabItemCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabItemCountOutputType
     */
    select?: VocabItemCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VocabItemCountOutputType without action
   */
  export type VocabItemCountOutputTypeCountUserProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserVocabProgressWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    passwordHash: string | null
    displayName: string | null
    avatarUrl: string | null
    role: string | null
    language: string | null
    preferredLangs: string | null
    settings: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    passwordHash: string | null
    displayName: string | null
    avatarUrl: string | null
    role: string | null
    language: string | null
    preferredLangs: string | null
    settings: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    email: number
    passwordHash: number
    displayName: number
    avatarUrl: number
    role: number
    language: number
    preferredLangs: number
    settings: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    passwordHash?: true
    displayName?: true
    avatarUrl?: true
    role?: true
    language?: true
    preferredLangs?: true
    settings?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    passwordHash?: true
    displayName?: true
    avatarUrl?: true
    role?: true
    language?: true
    preferredLangs?: true
    settings?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    passwordHash?: true
    displayName?: true
    avatarUrl?: true
    role?: true
    language?: true
    preferredLangs?: true
    settings?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    email: string | null
    passwordHash: string | null
    displayName: string | null
    avatarUrl: string | null
    role: string
    language: string
    preferredLangs: string | null
    settings: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    displayName?: boolean
    avatarUrl?: boolean
    role?: boolean
    language?: boolean
    preferredLangs?: boolean
    settings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    conversations?: boolean | User$conversationsArgs<ExtArgs>
    progress?: boolean | User$progressArgs<ExtArgs>
    vocabProgress?: boolean | User$vocabProgressArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    displayName?: boolean
    avatarUrl?: boolean
    role?: boolean
    language?: boolean
    preferredLangs?: boolean
    settings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    displayName?: boolean
    avatarUrl?: boolean
    role?: boolean
    language?: boolean
    preferredLangs?: boolean
    settings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    displayName?: boolean
    avatarUrl?: boolean
    role?: boolean
    language?: boolean
    preferredLangs?: boolean
    settings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "passwordHash" | "displayName" | "avatarUrl" | "role" | "language" | "preferredLangs" | "settings" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversations?: boolean | User$conversationsArgs<ExtArgs>
    progress?: boolean | User$progressArgs<ExtArgs>
    vocabProgress?: boolean | User$vocabProgressArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      conversations: Prisma.$ConversationPayload<ExtArgs>[]
      progress: Prisma.$UserProgressPayload<ExtArgs>[]
      vocabProgress: Prisma.$UserVocabProgressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      email: string | null
      passwordHash: string | null
      displayName: string | null
      avatarUrl: string | null
      role: string
      language: string
      preferredLangs: string | null
      settings: string | null
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversations<T extends User$conversationsArgs<ExtArgs> = {}>(args?: Subset<T, User$conversationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    progress<T extends User$progressArgs<ExtArgs> = {}>(args?: Subset<T, User$progressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    vocabProgress<T extends User$vocabProgressArgs<ExtArgs> = {}>(args?: Subset<T, User$vocabProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserVocabProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly displayName: FieldRef<"User", 'String'>
    readonly avatarUrl: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly language: FieldRef<"User", 'String'>
    readonly preferredLangs: FieldRef<"User", 'String'>
    readonly settings: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly deletedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.conversations
   */
  export type User$conversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    cursor?: ConversationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * User.progress
   */
  export type User$progressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProgressInclude<ExtArgs> | null
    where?: UserProgressWhereInput
    orderBy?: UserProgressOrderByWithRelationInput | UserProgressOrderByWithRelationInput[]
    cursor?: UserProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserProgressScalarFieldEnum | UserProgressScalarFieldEnum[]
  }

  /**
   * User.vocabProgress
   */
  export type User$vocabProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVocabProgress
     */
    select?: UserVocabProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVocabProgress
     */
    omit?: UserVocabProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVocabProgressInclude<ExtArgs> | null
    where?: UserVocabProgressWhereInput
    orderBy?: UserVocabProgressOrderByWithRelationInput | UserVocabProgressOrderByWithRelationInput[]
    cursor?: UserVocabProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserVocabProgressScalarFieldEnum | UserVocabProgressScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Course
   */

  export type AggregateCourse = {
    _count: CourseCountAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  export type CourseMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    language: string | null
    level: string | null
    category: string | null
    coverUrl: string | null
    isPublished: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    metadata: string | null
  }

  export type CourseMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    language: string | null
    level: string | null
    category: string | null
    coverUrl: string | null
    isPublished: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    metadata: string | null
  }

  export type CourseCountAggregateOutputType = {
    id: number
    title: number
    description: number
    language: number
    level: number
    category: number
    coverUrl: number
    isPublished: number
    createdAt: number
    updatedAt: number
    createdBy: number
    metadata: number
    _all: number
  }


  export type CourseMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    language?: true
    level?: true
    category?: true
    coverUrl?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    metadata?: true
  }

  export type CourseMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    language?: true
    level?: true
    category?: true
    coverUrl?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    metadata?: true
  }

  export type CourseCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    language?: true
    level?: true
    category?: true
    coverUrl?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    metadata?: true
    _all?: true
  }

  export type CourseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Course to aggregate.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Courses
    **/
    _count?: true | CourseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseMaxAggregateInputType
  }

  export type GetCourseAggregateType<T extends CourseAggregateArgs> = {
        [P in keyof T & keyof AggregateCourse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourse[P]>
      : GetScalarType<T[P], AggregateCourse[P]>
  }




  export type CourseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithAggregationInput | CourseOrderByWithAggregationInput[]
    by: CourseScalarFieldEnum[] | CourseScalarFieldEnum
    having?: CourseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseCountAggregateInputType | true
    _min?: CourseMinAggregateInputType
    _max?: CourseMaxAggregateInputType
  }

  export type CourseGroupByOutputType = {
    id: string
    title: string
    description: string | null
    language: string
    level: string
    category: string | null
    coverUrl: string | null
    isPublished: boolean
    createdAt: Date
    updatedAt: Date
    createdBy: string | null
    metadata: string | null
    _count: CourseCountAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  type GetCourseGroupByPayload<T extends CourseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseGroupByOutputType[P]>
            : GetScalarType<T[P], CourseGroupByOutputType[P]>
        }
      >
    >


  export type CourseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    language?: boolean
    level?: boolean
    category?: boolean
    coverUrl?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    metadata?: boolean
    units?: boolean | Course$unitsArgs<ExtArgs>
    vocabs?: boolean | Course$vocabsArgs<ExtArgs>
    conversations?: boolean | Course$conversationsArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    language?: boolean
    level?: boolean
    category?: boolean
    coverUrl?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    metadata?: boolean
  }, ExtArgs["result"]["course"]>

  export type CourseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    language?: boolean
    level?: boolean
    category?: boolean
    coverUrl?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    metadata?: boolean
  }, ExtArgs["result"]["course"]>

  export type CourseSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    language?: boolean
    level?: boolean
    category?: boolean
    coverUrl?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    metadata?: boolean
  }

  export type CourseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "language" | "level" | "category" | "coverUrl" | "isPublished" | "createdAt" | "updatedAt" | "createdBy" | "metadata", ExtArgs["result"]["course"]>
  export type CourseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    units?: boolean | Course$unitsArgs<ExtArgs>
    vocabs?: boolean | Course$vocabsArgs<ExtArgs>
    conversations?: boolean | Course$conversationsArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CourseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CourseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CoursePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Course"
    objects: {
      units: Prisma.$UnitPayload<ExtArgs>[]
      vocabs: Prisma.$VocabItemPayload<ExtArgs>[]
      conversations: Prisma.$ConversationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      language: string
      level: string
      category: string | null
      coverUrl: string | null
      isPublished: boolean
      createdAt: Date
      updatedAt: Date
      createdBy: string | null
      metadata: string | null
    }, ExtArgs["result"]["course"]>
    composites: {}
  }

  type CourseGetPayload<S extends boolean | null | undefined | CourseDefaultArgs> = $Result.GetResult<Prisma.$CoursePayload, S>

  type CourseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CourseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CourseCountAggregateInputType | true
    }

  export interface CourseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Course'], meta: { name: 'Course' } }
    /**
     * Find zero or one Course that matches the filter.
     * @param {CourseFindUniqueArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseFindUniqueArgs>(args: SelectSubset<T, CourseFindUniqueArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Course that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CourseFindUniqueOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseFindFirstArgs>(args?: SelectSubset<T, CourseFindFirstArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Courses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Courses
     * const courses = await prisma.course.findMany()
     * 
     * // Get first 10 Courses
     * const courses = await prisma.course.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const courseWithIdOnly = await prisma.course.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CourseFindManyArgs>(args?: SelectSubset<T, CourseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Course.
     * @param {CourseCreateArgs} args - Arguments to create a Course.
     * @example
     * // Create one Course
     * const Course = await prisma.course.create({
     *   data: {
     *     // ... data to create a Course
     *   }
     * })
     * 
     */
    create<T extends CourseCreateArgs>(args: SelectSubset<T, CourseCreateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Courses.
     * @param {CourseCreateManyArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CourseCreateManyArgs>(args?: SelectSubset<T, CourseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Courses and returns the data saved in the database.
     * @param {CourseCreateManyAndReturnArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CourseCreateManyAndReturnArgs>(args?: SelectSubset<T, CourseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Course.
     * @param {CourseDeleteArgs} args - Arguments to delete one Course.
     * @example
     * // Delete one Course
     * const Course = await prisma.course.delete({
     *   where: {
     *     // ... filter to delete one Course
     *   }
     * })
     * 
     */
    delete<T extends CourseDeleteArgs>(args: SelectSubset<T, CourseDeleteArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Course.
     * @param {CourseUpdateArgs} args - Arguments to update one Course.
     * @example
     * // Update one Course
     * const course = await prisma.course.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CourseUpdateArgs>(args: SelectSubset<T, CourseUpdateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Courses.
     * @param {CourseDeleteManyArgs} args - Arguments to filter Courses to delete.
     * @example
     * // Delete a few Courses
     * const { count } = await prisma.course.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CourseDeleteManyArgs>(args?: SelectSubset<T, CourseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CourseUpdateManyArgs>(args: SelectSubset<T, CourseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses and returns the data updated in the database.
     * @param {CourseUpdateManyAndReturnArgs} args - Arguments to update many Courses.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CourseUpdateManyAndReturnArgs>(args: SelectSubset<T, CourseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Course.
     * @param {CourseUpsertArgs} args - Arguments to update or create a Course.
     * @example
     * // Update or create a Course
     * const course = await prisma.course.upsert({
     *   create: {
     *     // ... data to create a Course
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Course we want to update
     *   }
     * })
     */
    upsert<T extends CourseUpsertArgs>(args: SelectSubset<T, CourseUpsertArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseCountArgs} args - Arguments to filter Courses to count.
     * @example
     * // Count the number of Courses
     * const count = await prisma.course.count({
     *   where: {
     *     // ... the filter for the Courses we want to count
     *   }
     * })
    **/
    count<T extends CourseCountArgs>(
      args?: Subset<T, CourseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CourseAggregateArgs>(args: Subset<T, CourseAggregateArgs>): Prisma.PrismaPromise<GetCourseAggregateType<T>>

    /**
     * Group by Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CourseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseGroupByArgs['orderBy'] }
        : { orderBy?: CourseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Course model
   */
  readonly fields: CourseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Course.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    units<T extends Course$unitsArgs<ExtArgs> = {}>(args?: Subset<T, Course$unitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    vocabs<T extends Course$vocabsArgs<ExtArgs> = {}>(args?: Subset<T, Course$vocabsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VocabItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    conversations<T extends Course$conversationsArgs<ExtArgs> = {}>(args?: Subset<T, Course$conversationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Course model
   */
  interface CourseFieldRefs {
    readonly id: FieldRef<"Course", 'String'>
    readonly title: FieldRef<"Course", 'String'>
    readonly description: FieldRef<"Course", 'String'>
    readonly language: FieldRef<"Course", 'String'>
    readonly level: FieldRef<"Course", 'String'>
    readonly category: FieldRef<"Course", 'String'>
    readonly coverUrl: FieldRef<"Course", 'String'>
    readonly isPublished: FieldRef<"Course", 'Boolean'>
    readonly createdAt: FieldRef<"Course", 'DateTime'>
    readonly updatedAt: FieldRef<"Course", 'DateTime'>
    readonly createdBy: FieldRef<"Course", 'String'>
    readonly metadata: FieldRef<"Course", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Course findUnique
   */
  export type CourseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findUniqueOrThrow
   */
  export type CourseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findFirst
   */
  export type CourseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findFirstOrThrow
   */
  export type CourseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findMany
   */
  export type CourseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Courses to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course create
   */
  export type CourseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to create a Course.
     */
    data: XOR<CourseCreateInput, CourseUncheckedCreateInput>
  }

  /**
   * Course createMany
   */
  export type CourseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
  }

  /**
   * Course createManyAndReturn
   */
  export type CourseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
  }

  /**
   * Course update
   */
  export type CourseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to update a Course.
     */
    data: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
    /**
     * Choose, which Course to update.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course updateMany
   */
  export type CourseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to update.
     */
    limit?: number
  }

  /**
   * Course updateManyAndReturn
   */
  export type CourseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to update.
     */
    limit?: number
  }

  /**
   * Course upsert
   */
  export type CourseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The filter to search for the Course to update in case it exists.
     */
    where: CourseWhereUniqueInput
    /**
     * In case the Course found by the `where` argument doesn't exist, create a new Course with this data.
     */
    create: XOR<CourseCreateInput, CourseUncheckedCreateInput>
    /**
     * In case the Course was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
  }

  /**
   * Course delete
   */
  export type CourseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter which Course to delete.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course deleteMany
   */
  export type CourseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Courses to delete
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to delete.
     */
    limit?: number
  }

  /**
   * Course.units
   */
  export type Course$unitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    where?: UnitWhereInput
    orderBy?: UnitOrderByWithRelationInput | UnitOrderByWithRelationInput[]
    cursor?: UnitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UnitScalarFieldEnum | UnitScalarFieldEnum[]
  }

  /**
   * Course.vocabs
   */
  export type Course$vocabsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabItem
     */
    select?: VocabItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocabItem
     */
    omit?: VocabItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabItemInclude<ExtArgs> | null
    where?: VocabItemWhereInput
    orderBy?: VocabItemOrderByWithRelationInput | VocabItemOrderByWithRelationInput[]
    cursor?: VocabItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VocabItemScalarFieldEnum | VocabItemScalarFieldEnum[]
  }

  /**
   * Course.conversations
   */
  export type Course$conversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    cursor?: ConversationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Course without action
   */
  export type CourseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
  }


  /**
   * Model Unit
   */

  export type AggregateUnit = {
    _count: UnitCountAggregateOutputType | null
    _avg: UnitAvgAggregateOutputType | null
    _sum: UnitSumAggregateOutputType | null
    _min: UnitMinAggregateOutputType | null
    _max: UnitMaxAggregateOutputType | null
  }

  export type UnitAvgAggregateOutputType = {
    orderIndex: number | null
  }

  export type UnitSumAggregateOutputType = {
    orderIndex: number | null
  }

  export type UnitMinAggregateOutputType = {
    id: string | null
    courseId: string | null
    title: string | null
    description: string | null
    orderIndex: number | null
    createdAt: Date | null
  }

  export type UnitMaxAggregateOutputType = {
    id: string | null
    courseId: string | null
    title: string | null
    description: string | null
    orderIndex: number | null
    createdAt: Date | null
  }

  export type UnitCountAggregateOutputType = {
    id: number
    courseId: number
    title: number
    description: number
    orderIndex: number
    createdAt: number
    _all: number
  }


  export type UnitAvgAggregateInputType = {
    orderIndex?: true
  }

  export type UnitSumAggregateInputType = {
    orderIndex?: true
  }

  export type UnitMinAggregateInputType = {
    id?: true
    courseId?: true
    title?: true
    description?: true
    orderIndex?: true
    createdAt?: true
  }

  export type UnitMaxAggregateInputType = {
    id?: true
    courseId?: true
    title?: true
    description?: true
    orderIndex?: true
    createdAt?: true
  }

  export type UnitCountAggregateInputType = {
    id?: true
    courseId?: true
    title?: true
    description?: true
    orderIndex?: true
    createdAt?: true
    _all?: true
  }

  export type UnitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Unit to aggregate.
     */
    where?: UnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Units to fetch.
     */
    orderBy?: UnitOrderByWithRelationInput | UnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Units from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Units.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Units
    **/
    _count?: true | UnitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UnitAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UnitSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UnitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UnitMaxAggregateInputType
  }

  export type GetUnitAggregateType<T extends UnitAggregateArgs> = {
        [P in keyof T & keyof AggregateUnit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUnit[P]>
      : GetScalarType<T[P], AggregateUnit[P]>
  }




  export type UnitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UnitWhereInput
    orderBy?: UnitOrderByWithAggregationInput | UnitOrderByWithAggregationInput[]
    by: UnitScalarFieldEnum[] | UnitScalarFieldEnum
    having?: UnitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UnitCountAggregateInputType | true
    _avg?: UnitAvgAggregateInputType
    _sum?: UnitSumAggregateInputType
    _min?: UnitMinAggregateInputType
    _max?: UnitMaxAggregateInputType
  }

  export type UnitGroupByOutputType = {
    id: string
    courseId: string
    title: string
    description: string | null
    orderIndex: number
    createdAt: Date
    _count: UnitCountAggregateOutputType | null
    _avg: UnitAvgAggregateOutputType | null
    _sum: UnitSumAggregateOutputType | null
    _min: UnitMinAggregateOutputType | null
    _max: UnitMaxAggregateOutputType | null
  }

  type GetUnitGroupByPayload<T extends UnitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UnitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UnitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UnitGroupByOutputType[P]>
            : GetScalarType<T[P], UnitGroupByOutputType[P]>
        }
      >
    >


  export type UnitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    courseId?: boolean
    title?: boolean
    description?: boolean
    orderIndex?: boolean
    createdAt?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
    lessons?: boolean | Unit$lessonsArgs<ExtArgs>
    _count?: boolean | UnitCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["unit"]>

  export type UnitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    courseId?: boolean
    title?: boolean
    description?: boolean
    orderIndex?: boolean
    createdAt?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["unit"]>

  export type UnitSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    courseId?: boolean
    title?: boolean
    description?: boolean
    orderIndex?: boolean
    createdAt?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["unit"]>

  export type UnitSelectScalar = {
    id?: boolean
    courseId?: boolean
    title?: boolean
    description?: boolean
    orderIndex?: boolean
    createdAt?: boolean
  }

  export type UnitOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "courseId" | "title" | "description" | "orderIndex" | "createdAt", ExtArgs["result"]["unit"]>
  export type UnitInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
    lessons?: boolean | Unit$lessonsArgs<ExtArgs>
    _count?: boolean | UnitCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UnitIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }
  export type UnitIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }

  export type $UnitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Unit"
    objects: {
      course: Prisma.$CoursePayload<ExtArgs>
      lessons: Prisma.$LessonPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      courseId: string
      title: string
      description: string | null
      orderIndex: number
      createdAt: Date
    }, ExtArgs["result"]["unit"]>
    composites: {}
  }

  type UnitGetPayload<S extends boolean | null | undefined | UnitDefaultArgs> = $Result.GetResult<Prisma.$UnitPayload, S>

  type UnitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UnitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UnitCountAggregateInputType | true
    }

  export interface UnitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Unit'], meta: { name: 'Unit' } }
    /**
     * Find zero or one Unit that matches the filter.
     * @param {UnitFindUniqueArgs} args - Arguments to find a Unit
     * @example
     * // Get one Unit
     * const unit = await prisma.unit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UnitFindUniqueArgs>(args: SelectSubset<T, UnitFindUniqueArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Unit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UnitFindUniqueOrThrowArgs} args - Arguments to find a Unit
     * @example
     * // Get one Unit
     * const unit = await prisma.unit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UnitFindUniqueOrThrowArgs>(args: SelectSubset<T, UnitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Unit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitFindFirstArgs} args - Arguments to find a Unit
     * @example
     * // Get one Unit
     * const unit = await prisma.unit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UnitFindFirstArgs>(args?: SelectSubset<T, UnitFindFirstArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Unit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitFindFirstOrThrowArgs} args - Arguments to find a Unit
     * @example
     * // Get one Unit
     * const unit = await prisma.unit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UnitFindFirstOrThrowArgs>(args?: SelectSubset<T, UnitFindFirstOrThrowArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Units that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Units
     * const units = await prisma.unit.findMany()
     * 
     * // Get first 10 Units
     * const units = await prisma.unit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const unitWithIdOnly = await prisma.unit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UnitFindManyArgs>(args?: SelectSubset<T, UnitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Unit.
     * @param {UnitCreateArgs} args - Arguments to create a Unit.
     * @example
     * // Create one Unit
     * const Unit = await prisma.unit.create({
     *   data: {
     *     // ... data to create a Unit
     *   }
     * })
     * 
     */
    create<T extends UnitCreateArgs>(args: SelectSubset<T, UnitCreateArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Units.
     * @param {UnitCreateManyArgs} args - Arguments to create many Units.
     * @example
     * // Create many Units
     * const unit = await prisma.unit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UnitCreateManyArgs>(args?: SelectSubset<T, UnitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Units and returns the data saved in the database.
     * @param {UnitCreateManyAndReturnArgs} args - Arguments to create many Units.
     * @example
     * // Create many Units
     * const unit = await prisma.unit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Units and only return the `id`
     * const unitWithIdOnly = await prisma.unit.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UnitCreateManyAndReturnArgs>(args?: SelectSubset<T, UnitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Unit.
     * @param {UnitDeleteArgs} args - Arguments to delete one Unit.
     * @example
     * // Delete one Unit
     * const Unit = await prisma.unit.delete({
     *   where: {
     *     // ... filter to delete one Unit
     *   }
     * })
     * 
     */
    delete<T extends UnitDeleteArgs>(args: SelectSubset<T, UnitDeleteArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Unit.
     * @param {UnitUpdateArgs} args - Arguments to update one Unit.
     * @example
     * // Update one Unit
     * const unit = await prisma.unit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UnitUpdateArgs>(args: SelectSubset<T, UnitUpdateArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Units.
     * @param {UnitDeleteManyArgs} args - Arguments to filter Units to delete.
     * @example
     * // Delete a few Units
     * const { count } = await prisma.unit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UnitDeleteManyArgs>(args?: SelectSubset<T, UnitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Units.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Units
     * const unit = await prisma.unit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UnitUpdateManyArgs>(args: SelectSubset<T, UnitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Units and returns the data updated in the database.
     * @param {UnitUpdateManyAndReturnArgs} args - Arguments to update many Units.
     * @example
     * // Update many Units
     * const unit = await prisma.unit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Units and only return the `id`
     * const unitWithIdOnly = await prisma.unit.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UnitUpdateManyAndReturnArgs>(args: SelectSubset<T, UnitUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Unit.
     * @param {UnitUpsertArgs} args - Arguments to update or create a Unit.
     * @example
     * // Update or create a Unit
     * const unit = await prisma.unit.upsert({
     *   create: {
     *     // ... data to create a Unit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Unit we want to update
     *   }
     * })
     */
    upsert<T extends UnitUpsertArgs>(args: SelectSubset<T, UnitUpsertArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Units.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitCountArgs} args - Arguments to filter Units to count.
     * @example
     * // Count the number of Units
     * const count = await prisma.unit.count({
     *   where: {
     *     // ... the filter for the Units we want to count
     *   }
     * })
    **/
    count<T extends UnitCountArgs>(
      args?: Subset<T, UnitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UnitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Unit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UnitAggregateArgs>(args: Subset<T, UnitAggregateArgs>): Prisma.PrismaPromise<GetUnitAggregateType<T>>

    /**
     * Group by Unit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UnitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UnitGroupByArgs['orderBy'] }
        : { orderBy?: UnitGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UnitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUnitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Unit model
   */
  readonly fields: UnitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Unit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UnitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    lessons<T extends Unit$lessonsArgs<ExtArgs> = {}>(args?: Subset<T, Unit$lessonsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Unit model
   */
  interface UnitFieldRefs {
    readonly id: FieldRef<"Unit", 'String'>
    readonly courseId: FieldRef<"Unit", 'String'>
    readonly title: FieldRef<"Unit", 'String'>
    readonly description: FieldRef<"Unit", 'String'>
    readonly orderIndex: FieldRef<"Unit", 'Int'>
    readonly createdAt: FieldRef<"Unit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Unit findUnique
   */
  export type UnitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    /**
     * Filter, which Unit to fetch.
     */
    where: UnitWhereUniqueInput
  }

  /**
   * Unit findUniqueOrThrow
   */
  export type UnitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    /**
     * Filter, which Unit to fetch.
     */
    where: UnitWhereUniqueInput
  }

  /**
   * Unit findFirst
   */
  export type UnitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    /**
     * Filter, which Unit to fetch.
     */
    where?: UnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Units to fetch.
     */
    orderBy?: UnitOrderByWithRelationInput | UnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Units.
     */
    cursor?: UnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Units from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Units.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Units.
     */
    distinct?: UnitScalarFieldEnum | UnitScalarFieldEnum[]
  }

  /**
   * Unit findFirstOrThrow
   */
  export type UnitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    /**
     * Filter, which Unit to fetch.
     */
    where?: UnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Units to fetch.
     */
    orderBy?: UnitOrderByWithRelationInput | UnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Units.
     */
    cursor?: UnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Units from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Units.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Units.
     */
    distinct?: UnitScalarFieldEnum | UnitScalarFieldEnum[]
  }

  /**
   * Unit findMany
   */
  export type UnitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    /**
     * Filter, which Units to fetch.
     */
    where?: UnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Units to fetch.
     */
    orderBy?: UnitOrderByWithRelationInput | UnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Units.
     */
    cursor?: UnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Units from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Units.
     */
    skip?: number
    distinct?: UnitScalarFieldEnum | UnitScalarFieldEnum[]
  }

  /**
   * Unit create
   */
  export type UnitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    /**
     * The data needed to create a Unit.
     */
    data: XOR<UnitCreateInput, UnitUncheckedCreateInput>
  }

  /**
   * Unit createMany
   */
  export type UnitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Units.
     */
    data: UnitCreateManyInput | UnitCreateManyInput[]
  }

  /**
   * Unit createManyAndReturn
   */
  export type UnitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * The data used to create many Units.
     */
    data: UnitCreateManyInput | UnitCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Unit update
   */
  export type UnitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    /**
     * The data needed to update a Unit.
     */
    data: XOR<UnitUpdateInput, UnitUncheckedUpdateInput>
    /**
     * Choose, which Unit to update.
     */
    where: UnitWhereUniqueInput
  }

  /**
   * Unit updateMany
   */
  export type UnitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Units.
     */
    data: XOR<UnitUpdateManyMutationInput, UnitUncheckedUpdateManyInput>
    /**
     * Filter which Units to update
     */
    where?: UnitWhereInput
    /**
     * Limit how many Units to update.
     */
    limit?: number
  }

  /**
   * Unit updateManyAndReturn
   */
  export type UnitUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * The data used to update Units.
     */
    data: XOR<UnitUpdateManyMutationInput, UnitUncheckedUpdateManyInput>
    /**
     * Filter which Units to update
     */
    where?: UnitWhereInput
    /**
     * Limit how many Units to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Unit upsert
   */
  export type UnitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    /**
     * The filter to search for the Unit to update in case it exists.
     */
    where: UnitWhereUniqueInput
    /**
     * In case the Unit found by the `where` argument doesn't exist, create a new Unit with this data.
     */
    create: XOR<UnitCreateInput, UnitUncheckedCreateInput>
    /**
     * In case the Unit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UnitUpdateInput, UnitUncheckedUpdateInput>
  }

  /**
   * Unit delete
   */
  export type UnitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    /**
     * Filter which Unit to delete.
     */
    where: UnitWhereUniqueInput
  }

  /**
   * Unit deleteMany
   */
  export type UnitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Units to delete
     */
    where?: UnitWhereInput
    /**
     * Limit how many Units to delete.
     */
    limit?: number
  }

  /**
   * Unit.lessons
   */
  export type Unit$lessonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    where?: LessonWhereInput
    orderBy?: LessonOrderByWithRelationInput | LessonOrderByWithRelationInput[]
    cursor?: LessonWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LessonScalarFieldEnum | LessonScalarFieldEnum[]
  }

  /**
   * Unit without action
   */
  export type UnitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
  }


  /**
   * Model Lesson
   */

  export type AggregateLesson = {
    _count: LessonCountAggregateOutputType | null
    _avg: LessonAvgAggregateOutputType | null
    _sum: LessonSumAggregateOutputType | null
    _min: LessonMinAggregateOutputType | null
    _max: LessonMaxAggregateOutputType | null
  }

  export type LessonAvgAggregateOutputType = {
    orderIndex: number | null
    duration: number | null
  }

  export type LessonSumAggregateOutputType = {
    orderIndex: number | null
    duration: number | null
  }

  export type LessonMinAggregateOutputType = {
    id: string | null
    unitId: string | null
    title: string | null
    content: string | null
    lessonType: string | null
    orderIndex: number | null
    duration: number | null
    createdAt: Date | null
  }

  export type LessonMaxAggregateOutputType = {
    id: string | null
    unitId: string | null
    title: string | null
    content: string | null
    lessonType: string | null
    orderIndex: number | null
    duration: number | null
    createdAt: Date | null
  }

  export type LessonCountAggregateOutputType = {
    id: number
    unitId: number
    title: number
    content: number
    lessonType: number
    orderIndex: number
    duration: number
    createdAt: number
    _all: number
  }


  export type LessonAvgAggregateInputType = {
    orderIndex?: true
    duration?: true
  }

  export type LessonSumAggregateInputType = {
    orderIndex?: true
    duration?: true
  }

  export type LessonMinAggregateInputType = {
    id?: true
    unitId?: true
    title?: true
    content?: true
    lessonType?: true
    orderIndex?: true
    duration?: true
    createdAt?: true
  }

  export type LessonMaxAggregateInputType = {
    id?: true
    unitId?: true
    title?: true
    content?: true
    lessonType?: true
    orderIndex?: true
    duration?: true
    createdAt?: true
  }

  export type LessonCountAggregateInputType = {
    id?: true
    unitId?: true
    title?: true
    content?: true
    lessonType?: true
    orderIndex?: true
    duration?: true
    createdAt?: true
    _all?: true
  }

  export type LessonAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lesson to aggregate.
     */
    where?: LessonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lessons to fetch.
     */
    orderBy?: LessonOrderByWithRelationInput | LessonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LessonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lessons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lessons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Lessons
    **/
    _count?: true | LessonCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LessonAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LessonSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LessonMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LessonMaxAggregateInputType
  }

  export type GetLessonAggregateType<T extends LessonAggregateArgs> = {
        [P in keyof T & keyof AggregateLesson]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLesson[P]>
      : GetScalarType<T[P], AggregateLesson[P]>
  }




  export type LessonGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LessonWhereInput
    orderBy?: LessonOrderByWithAggregationInput | LessonOrderByWithAggregationInput[]
    by: LessonScalarFieldEnum[] | LessonScalarFieldEnum
    having?: LessonScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LessonCountAggregateInputType | true
    _avg?: LessonAvgAggregateInputType
    _sum?: LessonSumAggregateInputType
    _min?: LessonMinAggregateInputType
    _max?: LessonMaxAggregateInputType
  }

  export type LessonGroupByOutputType = {
    id: string
    unitId: string
    title: string
    content: string | null
    lessonType: string
    orderIndex: number
    duration: number | null
    createdAt: Date
    _count: LessonCountAggregateOutputType | null
    _avg: LessonAvgAggregateOutputType | null
    _sum: LessonSumAggregateOutputType | null
    _min: LessonMinAggregateOutputType | null
    _max: LessonMaxAggregateOutputType | null
  }

  type GetLessonGroupByPayload<T extends LessonGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LessonGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LessonGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LessonGroupByOutputType[P]>
            : GetScalarType<T[P], LessonGroupByOutputType[P]>
        }
      >
    >


  export type LessonSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    unitId?: boolean
    title?: boolean
    content?: boolean
    lessonType?: boolean
    orderIndex?: boolean
    duration?: boolean
    createdAt?: boolean
    unit?: boolean | UnitDefaultArgs<ExtArgs>
    progress?: boolean | Lesson$progressArgs<ExtArgs>
    conversations?: boolean | Lesson$conversationsArgs<ExtArgs>
    _count?: boolean | LessonCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lesson"]>

  export type LessonSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    unitId?: boolean
    title?: boolean
    content?: boolean
    lessonType?: boolean
    orderIndex?: boolean
    duration?: boolean
    createdAt?: boolean
    unit?: boolean | UnitDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lesson"]>

  export type LessonSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    unitId?: boolean
    title?: boolean
    content?: boolean
    lessonType?: boolean
    orderIndex?: boolean
    duration?: boolean
    createdAt?: boolean
    unit?: boolean | UnitDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lesson"]>

  export type LessonSelectScalar = {
    id?: boolean
    unitId?: boolean
    title?: boolean
    content?: boolean
    lessonType?: boolean
    orderIndex?: boolean
    duration?: boolean
    createdAt?: boolean
  }

  export type LessonOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "unitId" | "title" | "content" | "lessonType" | "orderIndex" | "duration" | "createdAt", ExtArgs["result"]["lesson"]>
  export type LessonInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    unit?: boolean | UnitDefaultArgs<ExtArgs>
    progress?: boolean | Lesson$progressArgs<ExtArgs>
    conversations?: boolean | Lesson$conversationsArgs<ExtArgs>
    _count?: boolean | LessonCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LessonIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    unit?: boolean | UnitDefaultArgs<ExtArgs>
  }
  export type LessonIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    unit?: boolean | UnitDefaultArgs<ExtArgs>
  }

  export type $LessonPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lesson"
    objects: {
      unit: Prisma.$UnitPayload<ExtArgs>
      progress: Prisma.$UserProgressPayload<ExtArgs>[]
      conversations: Prisma.$ConversationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      unitId: string
      title: string
      content: string | null
      lessonType: string
      orderIndex: number
      duration: number | null
      createdAt: Date
    }, ExtArgs["result"]["lesson"]>
    composites: {}
  }

  type LessonGetPayload<S extends boolean | null | undefined | LessonDefaultArgs> = $Result.GetResult<Prisma.$LessonPayload, S>

  type LessonCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LessonFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LessonCountAggregateInputType | true
    }

  export interface LessonDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Lesson'], meta: { name: 'Lesson' } }
    /**
     * Find zero or one Lesson that matches the filter.
     * @param {LessonFindUniqueArgs} args - Arguments to find a Lesson
     * @example
     * // Get one Lesson
     * const lesson = await prisma.lesson.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LessonFindUniqueArgs>(args: SelectSubset<T, LessonFindUniqueArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Lesson that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LessonFindUniqueOrThrowArgs} args - Arguments to find a Lesson
     * @example
     * // Get one Lesson
     * const lesson = await prisma.lesson.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LessonFindUniqueOrThrowArgs>(args: SelectSubset<T, LessonFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lesson that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonFindFirstArgs} args - Arguments to find a Lesson
     * @example
     * // Get one Lesson
     * const lesson = await prisma.lesson.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LessonFindFirstArgs>(args?: SelectSubset<T, LessonFindFirstArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lesson that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonFindFirstOrThrowArgs} args - Arguments to find a Lesson
     * @example
     * // Get one Lesson
     * const lesson = await prisma.lesson.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LessonFindFirstOrThrowArgs>(args?: SelectSubset<T, LessonFindFirstOrThrowArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Lessons that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Lessons
     * const lessons = await prisma.lesson.findMany()
     * 
     * // Get first 10 Lessons
     * const lessons = await prisma.lesson.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lessonWithIdOnly = await prisma.lesson.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LessonFindManyArgs>(args?: SelectSubset<T, LessonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Lesson.
     * @param {LessonCreateArgs} args - Arguments to create a Lesson.
     * @example
     * // Create one Lesson
     * const Lesson = await prisma.lesson.create({
     *   data: {
     *     // ... data to create a Lesson
     *   }
     * })
     * 
     */
    create<T extends LessonCreateArgs>(args: SelectSubset<T, LessonCreateArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Lessons.
     * @param {LessonCreateManyArgs} args - Arguments to create many Lessons.
     * @example
     * // Create many Lessons
     * const lesson = await prisma.lesson.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LessonCreateManyArgs>(args?: SelectSubset<T, LessonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Lessons and returns the data saved in the database.
     * @param {LessonCreateManyAndReturnArgs} args - Arguments to create many Lessons.
     * @example
     * // Create many Lessons
     * const lesson = await prisma.lesson.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Lessons and only return the `id`
     * const lessonWithIdOnly = await prisma.lesson.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LessonCreateManyAndReturnArgs>(args?: SelectSubset<T, LessonCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Lesson.
     * @param {LessonDeleteArgs} args - Arguments to delete one Lesson.
     * @example
     * // Delete one Lesson
     * const Lesson = await prisma.lesson.delete({
     *   where: {
     *     // ... filter to delete one Lesson
     *   }
     * })
     * 
     */
    delete<T extends LessonDeleteArgs>(args: SelectSubset<T, LessonDeleteArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Lesson.
     * @param {LessonUpdateArgs} args - Arguments to update one Lesson.
     * @example
     * // Update one Lesson
     * const lesson = await prisma.lesson.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LessonUpdateArgs>(args: SelectSubset<T, LessonUpdateArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Lessons.
     * @param {LessonDeleteManyArgs} args - Arguments to filter Lessons to delete.
     * @example
     * // Delete a few Lessons
     * const { count } = await prisma.lesson.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LessonDeleteManyArgs>(args?: SelectSubset<T, LessonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lessons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Lessons
     * const lesson = await prisma.lesson.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LessonUpdateManyArgs>(args: SelectSubset<T, LessonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lessons and returns the data updated in the database.
     * @param {LessonUpdateManyAndReturnArgs} args - Arguments to update many Lessons.
     * @example
     * // Update many Lessons
     * const lesson = await prisma.lesson.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Lessons and only return the `id`
     * const lessonWithIdOnly = await prisma.lesson.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LessonUpdateManyAndReturnArgs>(args: SelectSubset<T, LessonUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Lesson.
     * @param {LessonUpsertArgs} args - Arguments to update or create a Lesson.
     * @example
     * // Update or create a Lesson
     * const lesson = await prisma.lesson.upsert({
     *   create: {
     *     // ... data to create a Lesson
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lesson we want to update
     *   }
     * })
     */
    upsert<T extends LessonUpsertArgs>(args: SelectSubset<T, LessonUpsertArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Lessons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonCountArgs} args - Arguments to filter Lessons to count.
     * @example
     * // Count the number of Lessons
     * const count = await prisma.lesson.count({
     *   where: {
     *     // ... the filter for the Lessons we want to count
     *   }
     * })
    **/
    count<T extends LessonCountArgs>(
      args?: Subset<T, LessonCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LessonCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lesson.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LessonAggregateArgs>(args: Subset<T, LessonAggregateArgs>): Prisma.PrismaPromise<GetLessonAggregateType<T>>

    /**
     * Group by Lesson.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LessonGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LessonGroupByArgs['orderBy'] }
        : { orderBy?: LessonGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LessonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLessonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Lesson model
   */
  readonly fields: LessonFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lesson.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LessonClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    unit<T extends UnitDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UnitDefaultArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    progress<T extends Lesson$progressArgs<ExtArgs> = {}>(args?: Subset<T, Lesson$progressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    conversations<T extends Lesson$conversationsArgs<ExtArgs> = {}>(args?: Subset<T, Lesson$conversationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Lesson model
   */
  interface LessonFieldRefs {
    readonly id: FieldRef<"Lesson", 'String'>
    readonly unitId: FieldRef<"Lesson", 'String'>
    readonly title: FieldRef<"Lesson", 'String'>
    readonly content: FieldRef<"Lesson", 'String'>
    readonly lessonType: FieldRef<"Lesson", 'String'>
    readonly orderIndex: FieldRef<"Lesson", 'Int'>
    readonly duration: FieldRef<"Lesson", 'Int'>
    readonly createdAt: FieldRef<"Lesson", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Lesson findUnique
   */
  export type LessonFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    /**
     * Filter, which Lesson to fetch.
     */
    where: LessonWhereUniqueInput
  }

  /**
   * Lesson findUniqueOrThrow
   */
  export type LessonFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    /**
     * Filter, which Lesson to fetch.
     */
    where: LessonWhereUniqueInput
  }

  /**
   * Lesson findFirst
   */
  export type LessonFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    /**
     * Filter, which Lesson to fetch.
     */
    where?: LessonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lessons to fetch.
     */
    orderBy?: LessonOrderByWithRelationInput | LessonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lessons.
     */
    cursor?: LessonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lessons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lessons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lessons.
     */
    distinct?: LessonScalarFieldEnum | LessonScalarFieldEnum[]
  }

  /**
   * Lesson findFirstOrThrow
   */
  export type LessonFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    /**
     * Filter, which Lesson to fetch.
     */
    where?: LessonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lessons to fetch.
     */
    orderBy?: LessonOrderByWithRelationInput | LessonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lessons.
     */
    cursor?: LessonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lessons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lessons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lessons.
     */
    distinct?: LessonScalarFieldEnum | LessonScalarFieldEnum[]
  }

  /**
   * Lesson findMany
   */
  export type LessonFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    /**
     * Filter, which Lessons to fetch.
     */
    where?: LessonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lessons to fetch.
     */
    orderBy?: LessonOrderByWithRelationInput | LessonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Lessons.
     */
    cursor?: LessonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lessons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lessons.
     */
    skip?: number
    distinct?: LessonScalarFieldEnum | LessonScalarFieldEnum[]
  }

  /**
   * Lesson create
   */
  export type LessonCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    /**
     * The data needed to create a Lesson.
     */
    data: XOR<LessonCreateInput, LessonUncheckedCreateInput>
  }

  /**
   * Lesson createMany
   */
  export type LessonCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Lessons.
     */
    data: LessonCreateManyInput | LessonCreateManyInput[]
  }

  /**
   * Lesson createManyAndReturn
   */
  export type LessonCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null
    /**
     * The data used to create many Lessons.
     */
    data: LessonCreateManyInput | LessonCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Lesson update
   */
  export type LessonUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    /**
     * The data needed to update a Lesson.
     */
    data: XOR<LessonUpdateInput, LessonUncheckedUpdateInput>
    /**
     * Choose, which Lesson to update.
     */
    where: LessonWhereUniqueInput
  }

  /**
   * Lesson updateMany
   */
  export type LessonUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Lessons.
     */
    data: XOR<LessonUpdateManyMutationInput, LessonUncheckedUpdateManyInput>
    /**
     * Filter which Lessons to update
     */
    where?: LessonWhereInput
    /**
     * Limit how many Lessons to update.
     */
    limit?: number
  }

  /**
   * Lesson updateManyAndReturn
   */
  export type LessonUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null
    /**
     * The data used to update Lessons.
     */
    data: XOR<LessonUpdateManyMutationInput, LessonUncheckedUpdateManyInput>
    /**
     * Filter which Lessons to update
     */
    where?: LessonWhereInput
    /**
     * Limit how many Lessons to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Lesson upsert
   */
  export type LessonUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    /**
     * The filter to search for the Lesson to update in case it exists.
     */
    where: LessonWhereUniqueInput
    /**
     * In case the Lesson found by the `where` argument doesn't exist, create a new Lesson with this data.
     */
    create: XOR<LessonCreateInput, LessonUncheckedCreateInput>
    /**
     * In case the Lesson was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LessonUpdateInput, LessonUncheckedUpdateInput>
  }

  /**
   * Lesson delete
   */
  export type LessonDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    /**
     * Filter which Lesson to delete.
     */
    where: LessonWhereUniqueInput
  }

  /**
   * Lesson deleteMany
   */
  export type LessonDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lessons to delete
     */
    where?: LessonWhereInput
    /**
     * Limit how many Lessons to delete.
     */
    limit?: number
  }

  /**
   * Lesson.progress
   */
  export type Lesson$progressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProgressInclude<ExtArgs> | null
    where?: UserProgressWhereInput
    orderBy?: UserProgressOrderByWithRelationInput | UserProgressOrderByWithRelationInput[]
    cursor?: UserProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserProgressScalarFieldEnum | UserProgressScalarFieldEnum[]
  }

  /**
   * Lesson.conversations
   */
  export type Lesson$conversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    cursor?: ConversationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Lesson without action
   */
  export type LessonDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
  }


  /**
   * Model Conversation
   */

  export type AggregateConversation = {
    _count: ConversationCountAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  export type ConversationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    courseId: string | null
    lessonId: string | null
    title: string | null
    status: string | null
    context: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConversationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    courseId: string | null
    lessonId: string | null
    title: string | null
    status: string | null
    context: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConversationCountAggregateOutputType = {
    id: number
    userId: number
    courseId: number
    lessonId: number
    title: number
    status: number
    context: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ConversationMinAggregateInputType = {
    id?: true
    userId?: true
    courseId?: true
    lessonId?: true
    title?: true
    status?: true
    context?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConversationMaxAggregateInputType = {
    id?: true
    userId?: true
    courseId?: true
    lessonId?: true
    title?: true
    status?: true
    context?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConversationCountAggregateInputType = {
    id?: true
    userId?: true
    courseId?: true
    lessonId?: true
    title?: true
    status?: true
    context?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ConversationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversation to aggregate.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Conversations
    **/
    _count?: true | ConversationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConversationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConversationMaxAggregateInputType
  }

  export type GetConversationAggregateType<T extends ConversationAggregateArgs> = {
        [P in keyof T & keyof AggregateConversation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConversation[P]>
      : GetScalarType<T[P], AggregateConversation[P]>
  }




  export type ConversationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithAggregationInput | ConversationOrderByWithAggregationInput[]
    by: ConversationScalarFieldEnum[] | ConversationScalarFieldEnum
    having?: ConversationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConversationCountAggregateInputType | true
    _min?: ConversationMinAggregateInputType
    _max?: ConversationMaxAggregateInputType
  }

  export type ConversationGroupByOutputType = {
    id: string
    userId: string
    courseId: string | null
    lessonId: string | null
    title: string | null
    status: string
    context: string | null
    createdAt: Date
    updatedAt: Date
    _count: ConversationCountAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  type GetConversationGroupByPayload<T extends ConversationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConversationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConversationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConversationGroupByOutputType[P]>
            : GetScalarType<T[P], ConversationGroupByOutputType[P]>
        }
      >
    >


  export type ConversationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    courseId?: boolean
    lessonId?: boolean
    title?: boolean
    status?: boolean
    context?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    course?: boolean | Conversation$courseArgs<ExtArgs>
    lesson?: boolean | Conversation$lessonArgs<ExtArgs>
    messages?: boolean | Conversation$messagesArgs<ExtArgs>
    _count?: boolean | ConversationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    courseId?: boolean
    lessonId?: boolean
    title?: boolean
    status?: boolean
    context?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    course?: boolean | Conversation$courseArgs<ExtArgs>
    lesson?: boolean | Conversation$lessonArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    courseId?: boolean
    lessonId?: boolean
    title?: boolean
    status?: boolean
    context?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    course?: boolean | Conversation$courseArgs<ExtArgs>
    lesson?: boolean | Conversation$lessonArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectScalar = {
    id?: boolean
    userId?: boolean
    courseId?: boolean
    lessonId?: boolean
    title?: boolean
    status?: boolean
    context?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ConversationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "courseId" | "lessonId" | "title" | "status" | "context" | "createdAt" | "updatedAt", ExtArgs["result"]["conversation"]>
  export type ConversationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    course?: boolean | Conversation$courseArgs<ExtArgs>
    lesson?: boolean | Conversation$lessonArgs<ExtArgs>
    messages?: boolean | Conversation$messagesArgs<ExtArgs>
    _count?: boolean | ConversationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ConversationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    course?: boolean | Conversation$courseArgs<ExtArgs>
    lesson?: boolean | Conversation$lessonArgs<ExtArgs>
  }
  export type ConversationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    course?: boolean | Conversation$courseArgs<ExtArgs>
    lesson?: boolean | Conversation$lessonArgs<ExtArgs>
  }

  export type $ConversationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Conversation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      course: Prisma.$CoursePayload<ExtArgs> | null
      lesson: Prisma.$LessonPayload<ExtArgs> | null
      messages: Prisma.$MessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      courseId: string | null
      lessonId: string | null
      title: string | null
      status: string
      context: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["conversation"]>
    composites: {}
  }

  type ConversationGetPayload<S extends boolean | null | undefined | ConversationDefaultArgs> = $Result.GetResult<Prisma.$ConversationPayload, S>

  type ConversationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConversationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConversationCountAggregateInputType | true
    }

  export interface ConversationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Conversation'], meta: { name: 'Conversation' } }
    /**
     * Find zero or one Conversation that matches the filter.
     * @param {ConversationFindUniqueArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConversationFindUniqueArgs>(args: SelectSubset<T, ConversationFindUniqueArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Conversation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConversationFindUniqueOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConversationFindUniqueOrThrowArgs>(args: SelectSubset<T, ConversationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conversation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConversationFindFirstArgs>(args?: SelectSubset<T, ConversationFindFirstArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conversation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConversationFindFirstOrThrowArgs>(args?: SelectSubset<T, ConversationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Conversations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Conversations
     * const conversations = await prisma.conversation.findMany()
     * 
     * // Get first 10 Conversations
     * const conversations = await prisma.conversation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conversationWithIdOnly = await prisma.conversation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConversationFindManyArgs>(args?: SelectSubset<T, ConversationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Conversation.
     * @param {ConversationCreateArgs} args - Arguments to create a Conversation.
     * @example
     * // Create one Conversation
     * const Conversation = await prisma.conversation.create({
     *   data: {
     *     // ... data to create a Conversation
     *   }
     * })
     * 
     */
    create<T extends ConversationCreateArgs>(args: SelectSubset<T, ConversationCreateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Conversations.
     * @param {ConversationCreateManyArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversation = await prisma.conversation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConversationCreateManyArgs>(args?: SelectSubset<T, ConversationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Conversations and returns the data saved in the database.
     * @param {ConversationCreateManyAndReturnArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversation = await prisma.conversation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Conversations and only return the `id`
     * const conversationWithIdOnly = await prisma.conversation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConversationCreateManyAndReturnArgs>(args?: SelectSubset<T, ConversationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Conversation.
     * @param {ConversationDeleteArgs} args - Arguments to delete one Conversation.
     * @example
     * // Delete one Conversation
     * const Conversation = await prisma.conversation.delete({
     *   where: {
     *     // ... filter to delete one Conversation
     *   }
     * })
     * 
     */
    delete<T extends ConversationDeleteArgs>(args: SelectSubset<T, ConversationDeleteArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Conversation.
     * @param {ConversationUpdateArgs} args - Arguments to update one Conversation.
     * @example
     * // Update one Conversation
     * const conversation = await prisma.conversation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConversationUpdateArgs>(args: SelectSubset<T, ConversationUpdateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Conversations.
     * @param {ConversationDeleteManyArgs} args - Arguments to filter Conversations to delete.
     * @example
     * // Delete a few Conversations
     * const { count } = await prisma.conversation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConversationDeleteManyArgs>(args?: SelectSubset<T, ConversationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Conversations
     * const conversation = await prisma.conversation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConversationUpdateManyArgs>(args: SelectSubset<T, ConversationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversations and returns the data updated in the database.
     * @param {ConversationUpdateManyAndReturnArgs} args - Arguments to update many Conversations.
     * @example
     * // Update many Conversations
     * const conversation = await prisma.conversation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Conversations and only return the `id`
     * const conversationWithIdOnly = await prisma.conversation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConversationUpdateManyAndReturnArgs>(args: SelectSubset<T, ConversationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Conversation.
     * @param {ConversationUpsertArgs} args - Arguments to update or create a Conversation.
     * @example
     * // Update or create a Conversation
     * const conversation = await prisma.conversation.upsert({
     *   create: {
     *     // ... data to create a Conversation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Conversation we want to update
     *   }
     * })
     */
    upsert<T extends ConversationUpsertArgs>(args: SelectSubset<T, ConversationUpsertArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationCountArgs} args - Arguments to filter Conversations to count.
     * @example
     * // Count the number of Conversations
     * const count = await prisma.conversation.count({
     *   where: {
     *     // ... the filter for the Conversations we want to count
     *   }
     * })
    **/
    count<T extends ConversationCountArgs>(
      args?: Subset<T, ConversationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConversationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConversationAggregateArgs>(args: Subset<T, ConversationAggregateArgs>): Prisma.PrismaPromise<GetConversationAggregateType<T>>

    /**
     * Group by Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConversationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConversationGroupByArgs['orderBy'] }
        : { orderBy?: ConversationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConversationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Conversation model
   */
  readonly fields: ConversationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Conversation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConversationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    course<T extends Conversation$courseArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$courseArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    lesson<T extends Conversation$lessonArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$lessonArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    messages<T extends Conversation$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Conversation model
   */
  interface ConversationFieldRefs {
    readonly id: FieldRef<"Conversation", 'String'>
    readonly userId: FieldRef<"Conversation", 'String'>
    readonly courseId: FieldRef<"Conversation", 'String'>
    readonly lessonId: FieldRef<"Conversation", 'String'>
    readonly title: FieldRef<"Conversation", 'String'>
    readonly status: FieldRef<"Conversation", 'String'>
    readonly context: FieldRef<"Conversation", 'String'>
    readonly createdAt: FieldRef<"Conversation", 'DateTime'>
    readonly updatedAt: FieldRef<"Conversation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Conversation findUnique
   */
  export type ConversationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findUniqueOrThrow
   */
  export type ConversationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findFirst
   */
  export type ConversationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findFirstOrThrow
   */
  export type ConversationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findMany
   */
  export type ConversationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversations to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation create
   */
  export type ConversationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to create a Conversation.
     */
    data: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
  }

  /**
   * Conversation createMany
   */
  export type ConversationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Conversations.
     */
    data: ConversationCreateManyInput | ConversationCreateManyInput[]
  }

  /**
   * Conversation createManyAndReturn
   */
  export type ConversationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * The data used to create many Conversations.
     */
    data: ConversationCreateManyInput | ConversationCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Conversation update
   */
  export type ConversationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to update a Conversation.
     */
    data: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
    /**
     * Choose, which Conversation to update.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation updateMany
   */
  export type ConversationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Conversations.
     */
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyInput>
    /**
     * Filter which Conversations to update
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to update.
     */
    limit?: number
  }

  /**
   * Conversation updateManyAndReturn
   */
  export type ConversationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * The data used to update Conversations.
     */
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyInput>
    /**
     * Filter which Conversations to update
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Conversation upsert
   */
  export type ConversationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The filter to search for the Conversation to update in case it exists.
     */
    where: ConversationWhereUniqueInput
    /**
     * In case the Conversation found by the `where` argument doesn't exist, create a new Conversation with this data.
     */
    create: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
    /**
     * In case the Conversation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
  }

  /**
   * Conversation delete
   */
  export type ConversationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter which Conversation to delete.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation deleteMany
   */
  export type ConversationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversations to delete
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to delete.
     */
    limit?: number
  }

  /**
   * Conversation.course
   */
  export type Conversation$courseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    where?: CourseWhereInput
  }

  /**
   * Conversation.lesson
   */
  export type Conversation$lessonArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null
    where?: LessonWhereInput
  }

  /**
   * Conversation.messages
   */
  export type Conversation$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Conversation without action
   */
  export type ConversationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _avg: MessageAvgAggregateOutputType | null
    _sum: MessageSumAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageAvgAggregateOutputType = {
    audioDuration: number | null
  }

  export type MessageSumAggregateOutputType = {
    audioDuration: number | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    conversationId: string | null
    role: string | null
    content: string | null
    audioUrl: string | null
    audioDuration: number | null
    metadata: string | null
    createdAt: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    conversationId: string | null
    role: string | null
    content: string | null
    audioUrl: string | null
    audioDuration: number | null
    metadata: string | null
    createdAt: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    conversationId: number
    role: number
    content: number
    audioUrl: number
    audioDuration: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type MessageAvgAggregateInputType = {
    audioDuration?: true
  }

  export type MessageSumAggregateInputType = {
    audioDuration?: true
  }

  export type MessageMinAggregateInputType = {
    id?: true
    conversationId?: true
    role?: true
    content?: true
    audioUrl?: true
    audioDuration?: true
    metadata?: true
    createdAt?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    conversationId?: true
    role?: true
    content?: true
    audioUrl?: true
    audioDuration?: true
    metadata?: true
    createdAt?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    conversationId?: true
    role?: true
    content?: true
    audioUrl?: true
    audioDuration?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MessageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MessageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _avg?: MessageAvgAggregateInputType
    _sum?: MessageSumAggregateInputType
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    conversationId: string
    role: string
    content: string
    audioUrl: string | null
    audioDuration: number | null
    metadata: string | null
    createdAt: Date
    _count: MessageCountAggregateOutputType | null
    _avg: MessageAvgAggregateOutputType | null
    _sum: MessageSumAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    role?: boolean
    content?: boolean
    audioUrl?: boolean
    audioDuration?: boolean
    metadata?: boolean
    createdAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    role?: boolean
    content?: boolean
    audioUrl?: boolean
    audioDuration?: boolean
    metadata?: boolean
    createdAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    role?: boolean
    content?: boolean
    audioUrl?: boolean
    audioDuration?: boolean
    metadata?: boolean
    createdAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    conversationId?: boolean
    role?: boolean
    content?: boolean
    audioUrl?: boolean
    audioDuration?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "conversationId" | "role" | "content" | "audioUrl" | "audioDuration" | "metadata" | "createdAt", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }
  export type MessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      conversation: Prisma.$ConversationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      conversationId: string
      role: string
      content: string
      audioUrl: string | null
      audioDuration: number | null
      metadata: string | null
      createdAt: Date
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversation<T extends ConversationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConversationDefaultArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly conversationId: FieldRef<"Message", 'String'>
    readonly role: FieldRef<"Message", 'String'>
    readonly content: FieldRef<"Message", 'String'>
    readonly audioUrl: FieldRef<"Message", 'String'>
    readonly audioDuration: FieldRef<"Message", 'Float'>
    readonly metadata: FieldRef<"Message", 'String'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model UserProgress
   */

  export type AggregateUserProgress = {
    _count: UserProgressCountAggregateOutputType | null
    _avg: UserProgressAvgAggregateOutputType | null
    _sum: UserProgressSumAggregateOutputType | null
    _min: UserProgressMinAggregateOutputType | null
    _max: UserProgressMaxAggregateOutputType | null
  }

  export type UserProgressAvgAggregateOutputType = {
    score: number | null
    timeSpent: number | null
    attempts: number | null
  }

  export type UserProgressSumAggregateOutputType = {
    score: number | null
    timeSpent: number | null
    attempts: number | null
  }

  export type UserProgressMinAggregateOutputType = {
    id: string | null
    userId: string | null
    lessonId: string | null
    completed: boolean | null
    score: number | null
    timeSpent: number | null
    attempts: number | null
    lastAccessed: Date | null
    completedAt: Date | null
  }

  export type UserProgressMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    lessonId: string | null
    completed: boolean | null
    score: number | null
    timeSpent: number | null
    attempts: number | null
    lastAccessed: Date | null
    completedAt: Date | null
  }

  export type UserProgressCountAggregateOutputType = {
    id: number
    userId: number
    lessonId: number
    completed: number
    score: number
    timeSpent: number
    attempts: number
    lastAccessed: number
    completedAt: number
    _all: number
  }


  export type UserProgressAvgAggregateInputType = {
    score?: true
    timeSpent?: true
    attempts?: true
  }

  export type UserProgressSumAggregateInputType = {
    score?: true
    timeSpent?: true
    attempts?: true
  }

  export type UserProgressMinAggregateInputType = {
    id?: true
    userId?: true
    lessonId?: true
    completed?: true
    score?: true
    timeSpent?: true
    attempts?: true
    lastAccessed?: true
    completedAt?: true
  }

  export type UserProgressMaxAggregateInputType = {
    id?: true
    userId?: true
    lessonId?: true
    completed?: true
    score?: true
    timeSpent?: true
    attempts?: true
    lastAccessed?: true
    completedAt?: true
  }

  export type UserProgressCountAggregateInputType = {
    id?: true
    userId?: true
    lessonId?: true
    completed?: true
    score?: true
    timeSpent?: true
    attempts?: true
    lastAccessed?: true
    completedAt?: true
    _all?: true
  }

  export type UserProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProgress to aggregate.
     */
    where?: UserProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProgresses to fetch.
     */
    orderBy?: UserProgressOrderByWithRelationInput | UserProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserProgresses
    **/
    _count?: true | UserProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserProgressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserProgressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserProgressMaxAggregateInputType
  }

  export type GetUserProgressAggregateType<T extends UserProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateUserProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserProgress[P]>
      : GetScalarType<T[P], AggregateUserProgress[P]>
  }




  export type UserProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserProgressWhereInput
    orderBy?: UserProgressOrderByWithAggregationInput | UserProgressOrderByWithAggregationInput[]
    by: UserProgressScalarFieldEnum[] | UserProgressScalarFieldEnum
    having?: UserProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserProgressCountAggregateInputType | true
    _avg?: UserProgressAvgAggregateInputType
    _sum?: UserProgressSumAggregateInputType
    _min?: UserProgressMinAggregateInputType
    _max?: UserProgressMaxAggregateInputType
  }

  export type UserProgressGroupByOutputType = {
    id: string
    userId: string
    lessonId: string
    completed: boolean
    score: number | null
    timeSpent: number | null
    attempts: number
    lastAccessed: Date
    completedAt: Date | null
    _count: UserProgressCountAggregateOutputType | null
    _avg: UserProgressAvgAggregateOutputType | null
    _sum: UserProgressSumAggregateOutputType | null
    _min: UserProgressMinAggregateOutputType | null
    _max: UserProgressMaxAggregateOutputType | null
  }

  type GetUserProgressGroupByPayload<T extends UserProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserProgressGroupByOutputType[P]>
            : GetScalarType<T[P], UserProgressGroupByOutputType[P]>
        }
      >
    >


  export type UserProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    lessonId?: boolean
    completed?: boolean
    score?: boolean
    timeSpent?: boolean
    attempts?: boolean
    lastAccessed?: boolean
    completedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    lesson?: boolean | LessonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userProgress"]>

  export type UserProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    lessonId?: boolean
    completed?: boolean
    score?: boolean
    timeSpent?: boolean
    attempts?: boolean
    lastAccessed?: boolean
    completedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    lesson?: boolean | LessonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userProgress"]>

  export type UserProgressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    lessonId?: boolean
    completed?: boolean
    score?: boolean
    timeSpent?: boolean
    attempts?: boolean
    lastAccessed?: boolean
    completedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    lesson?: boolean | LessonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userProgress"]>

  export type UserProgressSelectScalar = {
    id?: boolean
    userId?: boolean
    lessonId?: boolean
    completed?: boolean
    score?: boolean
    timeSpent?: boolean
    attempts?: boolean
    lastAccessed?: boolean
    completedAt?: boolean
  }

  export type UserProgressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "lessonId" | "completed" | "score" | "timeSpent" | "attempts" | "lastAccessed" | "completedAt", ExtArgs["result"]["userProgress"]>
  export type UserProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    lesson?: boolean | LessonDefaultArgs<ExtArgs>
  }
  export type UserProgressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    lesson?: boolean | LessonDefaultArgs<ExtArgs>
  }
  export type UserProgressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    lesson?: boolean | LessonDefaultArgs<ExtArgs>
  }

  export type $UserProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserProgress"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      lesson: Prisma.$LessonPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      lessonId: string
      completed: boolean
      score: number | null
      timeSpent: number | null
      attempts: number
      lastAccessed: Date
      completedAt: Date | null
    }, ExtArgs["result"]["userProgress"]>
    composites: {}
  }

  type UserProgressGetPayload<S extends boolean | null | undefined | UserProgressDefaultArgs> = $Result.GetResult<Prisma.$UserProgressPayload, S>

  type UserProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserProgressCountAggregateInputType | true
    }

  export interface UserProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserProgress'], meta: { name: 'UserProgress' } }
    /**
     * Find zero or one UserProgress that matches the filter.
     * @param {UserProgressFindUniqueArgs} args - Arguments to find a UserProgress
     * @example
     * // Get one UserProgress
     * const userProgress = await prisma.userProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserProgressFindUniqueArgs>(args: SelectSubset<T, UserProgressFindUniqueArgs<ExtArgs>>): Prisma__UserProgressClient<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserProgress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserProgressFindUniqueOrThrowArgs} args - Arguments to find a UserProgress
     * @example
     * // Get one UserProgress
     * const userProgress = await prisma.userProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, UserProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserProgressClient<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProgressFindFirstArgs} args - Arguments to find a UserProgress
     * @example
     * // Get one UserProgress
     * const userProgress = await prisma.userProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserProgressFindFirstArgs>(args?: SelectSubset<T, UserProgressFindFirstArgs<ExtArgs>>): Prisma__UserProgressClient<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProgressFindFirstOrThrowArgs} args - Arguments to find a UserProgress
     * @example
     * // Get one UserProgress
     * const userProgress = await prisma.userProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, UserProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserProgressClient<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserProgresses
     * const userProgresses = await prisma.userProgress.findMany()
     * 
     * // Get first 10 UserProgresses
     * const userProgresses = await prisma.userProgress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userProgressWithIdOnly = await prisma.userProgress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserProgressFindManyArgs>(args?: SelectSubset<T, UserProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserProgress.
     * @param {UserProgressCreateArgs} args - Arguments to create a UserProgress.
     * @example
     * // Create one UserProgress
     * const UserProgress = await prisma.userProgress.create({
     *   data: {
     *     // ... data to create a UserProgress
     *   }
     * })
     * 
     */
    create<T extends UserProgressCreateArgs>(args: SelectSubset<T, UserProgressCreateArgs<ExtArgs>>): Prisma__UserProgressClient<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserProgresses.
     * @param {UserProgressCreateManyArgs} args - Arguments to create many UserProgresses.
     * @example
     * // Create many UserProgresses
     * const userProgress = await prisma.userProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserProgressCreateManyArgs>(args?: SelectSubset<T, UserProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserProgresses and returns the data saved in the database.
     * @param {UserProgressCreateManyAndReturnArgs} args - Arguments to create many UserProgresses.
     * @example
     * // Create many UserProgresses
     * const userProgress = await prisma.userProgress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserProgresses and only return the `id`
     * const userProgressWithIdOnly = await prisma.userProgress.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, UserProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserProgress.
     * @param {UserProgressDeleteArgs} args - Arguments to delete one UserProgress.
     * @example
     * // Delete one UserProgress
     * const UserProgress = await prisma.userProgress.delete({
     *   where: {
     *     // ... filter to delete one UserProgress
     *   }
     * })
     * 
     */
    delete<T extends UserProgressDeleteArgs>(args: SelectSubset<T, UserProgressDeleteArgs<ExtArgs>>): Prisma__UserProgressClient<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserProgress.
     * @param {UserProgressUpdateArgs} args - Arguments to update one UserProgress.
     * @example
     * // Update one UserProgress
     * const userProgress = await prisma.userProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserProgressUpdateArgs>(args: SelectSubset<T, UserProgressUpdateArgs<ExtArgs>>): Prisma__UserProgressClient<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserProgresses.
     * @param {UserProgressDeleteManyArgs} args - Arguments to filter UserProgresses to delete.
     * @example
     * // Delete a few UserProgresses
     * const { count } = await prisma.userProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserProgressDeleteManyArgs>(args?: SelectSubset<T, UserProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserProgresses
     * const userProgress = await prisma.userProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserProgressUpdateManyArgs>(args: SelectSubset<T, UserProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserProgresses and returns the data updated in the database.
     * @param {UserProgressUpdateManyAndReturnArgs} args - Arguments to update many UserProgresses.
     * @example
     * // Update many UserProgresses
     * const userProgress = await prisma.userProgress.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserProgresses and only return the `id`
     * const userProgressWithIdOnly = await prisma.userProgress.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserProgressUpdateManyAndReturnArgs>(args: SelectSubset<T, UserProgressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserProgress.
     * @param {UserProgressUpsertArgs} args - Arguments to update or create a UserProgress.
     * @example
     * // Update or create a UserProgress
     * const userProgress = await prisma.userProgress.upsert({
     *   create: {
     *     // ... data to create a UserProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserProgress we want to update
     *   }
     * })
     */
    upsert<T extends UserProgressUpsertArgs>(args: SelectSubset<T, UserProgressUpsertArgs<ExtArgs>>): Prisma__UserProgressClient<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProgressCountArgs} args - Arguments to filter UserProgresses to count.
     * @example
     * // Count the number of UserProgresses
     * const count = await prisma.userProgress.count({
     *   where: {
     *     // ... the filter for the UserProgresses we want to count
     *   }
     * })
    **/
    count<T extends UserProgressCountArgs>(
      args?: Subset<T, UserProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserProgressAggregateArgs>(args: Subset<T, UserProgressAggregateArgs>): Prisma.PrismaPromise<GetUserProgressAggregateType<T>>

    /**
     * Group by UserProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProgressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserProgressGroupByArgs['orderBy'] }
        : { orderBy?: UserProgressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserProgress model
   */
  readonly fields: UserProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    lesson<T extends LessonDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LessonDefaultArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserProgress model
   */
  interface UserProgressFieldRefs {
    readonly id: FieldRef<"UserProgress", 'String'>
    readonly userId: FieldRef<"UserProgress", 'String'>
    readonly lessonId: FieldRef<"UserProgress", 'String'>
    readonly completed: FieldRef<"UserProgress", 'Boolean'>
    readonly score: FieldRef<"UserProgress", 'Int'>
    readonly timeSpent: FieldRef<"UserProgress", 'Int'>
    readonly attempts: FieldRef<"UserProgress", 'Int'>
    readonly lastAccessed: FieldRef<"UserProgress", 'DateTime'>
    readonly completedAt: FieldRef<"UserProgress", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserProgress findUnique
   */
  export type UserProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProgressInclude<ExtArgs> | null
    /**
     * Filter, which UserProgress to fetch.
     */
    where: UserProgressWhereUniqueInput
  }

  /**
   * UserProgress findUniqueOrThrow
   */
  export type UserProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProgressInclude<ExtArgs> | null
    /**
     * Filter, which UserProgress to fetch.
     */
    where: UserProgressWhereUniqueInput
  }

  /**
   * UserProgress findFirst
   */
  export type UserProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProgressInclude<ExtArgs> | null
    /**
     * Filter, which UserProgress to fetch.
     */
    where?: UserProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProgresses to fetch.
     */
    orderBy?: UserProgressOrderByWithRelationInput | UserProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProgresses.
     */
    cursor?: UserProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProgresses.
     */
    distinct?: UserProgressScalarFieldEnum | UserProgressScalarFieldEnum[]
  }

  /**
   * UserProgress findFirstOrThrow
   */
  export type UserProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProgressInclude<ExtArgs> | null
    /**
     * Filter, which UserProgress to fetch.
     */
    where?: UserProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProgresses to fetch.
     */
    orderBy?: UserProgressOrderByWithRelationInput | UserProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProgresses.
     */
    cursor?: UserProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProgresses.
     */
    distinct?: UserProgressScalarFieldEnum | UserProgressScalarFieldEnum[]
  }

  /**
   * UserProgress findMany
   */
  export type UserProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProgressInclude<ExtArgs> | null
    /**
     * Filter, which UserProgresses to fetch.
     */
    where?: UserProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProgresses to fetch.
     */
    orderBy?: UserProgressOrderByWithRelationInput | UserProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserProgresses.
     */
    cursor?: UserProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProgresses.
     */
    skip?: number
    distinct?: UserProgressScalarFieldEnum | UserProgressScalarFieldEnum[]
  }

  /**
   * UserProgress create
   */
  export type UserProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a UserProgress.
     */
    data: XOR<UserProgressCreateInput, UserProgressUncheckedCreateInput>
  }

  /**
   * UserProgress createMany
   */
  export type UserProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserProgresses.
     */
    data: UserProgressCreateManyInput | UserProgressCreateManyInput[]
  }

  /**
   * UserProgress createManyAndReturn
   */
  export type UserProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * The data used to create many UserProgresses.
     */
    data: UserProgressCreateManyInput | UserProgressCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProgressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserProgress update
   */
  export type UserProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a UserProgress.
     */
    data: XOR<UserProgressUpdateInput, UserProgressUncheckedUpdateInput>
    /**
     * Choose, which UserProgress to update.
     */
    where: UserProgressWhereUniqueInput
  }

  /**
   * UserProgress updateMany
   */
  export type UserProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserProgresses.
     */
    data: XOR<UserProgressUpdateManyMutationInput, UserProgressUncheckedUpdateManyInput>
    /**
     * Filter which UserProgresses to update
     */
    where?: UserProgressWhereInput
    /**
     * Limit how many UserProgresses to update.
     */
    limit?: number
  }

  /**
   * UserProgress updateManyAndReturn
   */
  export type UserProgressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * The data used to update UserProgresses.
     */
    data: XOR<UserProgressUpdateManyMutationInput, UserProgressUncheckedUpdateManyInput>
    /**
     * Filter which UserProgresses to update
     */
    where?: UserProgressWhereInput
    /**
     * Limit how many UserProgresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProgressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserProgress upsert
   */
  export type UserProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the UserProgress to update in case it exists.
     */
    where: UserProgressWhereUniqueInput
    /**
     * In case the UserProgress found by the `where` argument doesn't exist, create a new UserProgress with this data.
     */
    create: XOR<UserProgressCreateInput, UserProgressUncheckedCreateInput>
    /**
     * In case the UserProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserProgressUpdateInput, UserProgressUncheckedUpdateInput>
  }

  /**
   * UserProgress delete
   */
  export type UserProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProgressInclude<ExtArgs> | null
    /**
     * Filter which UserProgress to delete.
     */
    where: UserProgressWhereUniqueInput
  }

  /**
   * UserProgress deleteMany
   */
  export type UserProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProgresses to delete
     */
    where?: UserProgressWhereInput
    /**
     * Limit how many UserProgresses to delete.
     */
    limit?: number
  }

  /**
   * UserProgress without action
   */
  export type UserProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProgressInclude<ExtArgs> | null
  }


  /**
   * Model VocabItem
   */

  export type AggregateVocabItem = {
    _count: VocabItemCountAggregateOutputType | null
    _avg: VocabItemAvgAggregateOutputType | null
    _sum: VocabItemSumAggregateOutputType | null
    _min: VocabItemMinAggregateOutputType | null
    _max: VocabItemMaxAggregateOutputType | null
  }

  export type VocabItemAvgAggregateOutputType = {
    difficulty: number | null
  }

  export type VocabItemSumAggregateOutputType = {
    difficulty: number | null
  }

  export type VocabItemMinAggregateOutputType = {
    id: string | null
    courseId: string | null
    word: string | null
    translation: string | null
    pronunciation: string | null
    audioUrl: string | null
    example: string | null
    exampleAudio: string | null
    difficulty: number | null
    createdAt: Date | null
  }

  export type VocabItemMaxAggregateOutputType = {
    id: string | null
    courseId: string | null
    word: string | null
    translation: string | null
    pronunciation: string | null
    audioUrl: string | null
    example: string | null
    exampleAudio: string | null
    difficulty: number | null
    createdAt: Date | null
  }

  export type VocabItemCountAggregateOutputType = {
    id: number
    courseId: number
    word: number
    translation: number
    pronunciation: number
    audioUrl: number
    example: number
    exampleAudio: number
    difficulty: number
    createdAt: number
    _all: number
  }


  export type VocabItemAvgAggregateInputType = {
    difficulty?: true
  }

  export type VocabItemSumAggregateInputType = {
    difficulty?: true
  }

  export type VocabItemMinAggregateInputType = {
    id?: true
    courseId?: true
    word?: true
    translation?: true
    pronunciation?: true
    audioUrl?: true
    example?: true
    exampleAudio?: true
    difficulty?: true
    createdAt?: true
  }

  export type VocabItemMaxAggregateInputType = {
    id?: true
    courseId?: true
    word?: true
    translation?: true
    pronunciation?: true
    audioUrl?: true
    example?: true
    exampleAudio?: true
    difficulty?: true
    createdAt?: true
  }

  export type VocabItemCountAggregateInputType = {
    id?: true
    courseId?: true
    word?: true
    translation?: true
    pronunciation?: true
    audioUrl?: true
    example?: true
    exampleAudio?: true
    difficulty?: true
    createdAt?: true
    _all?: true
  }

  export type VocabItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VocabItem to aggregate.
     */
    where?: VocabItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VocabItems to fetch.
     */
    orderBy?: VocabItemOrderByWithRelationInput | VocabItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VocabItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VocabItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VocabItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VocabItems
    **/
    _count?: true | VocabItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VocabItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VocabItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VocabItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VocabItemMaxAggregateInputType
  }

  export type GetVocabItemAggregateType<T extends VocabItemAggregateArgs> = {
        [P in keyof T & keyof AggregateVocabItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVocabItem[P]>
      : GetScalarType<T[P], AggregateVocabItem[P]>
  }




  export type VocabItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VocabItemWhereInput
    orderBy?: VocabItemOrderByWithAggregationInput | VocabItemOrderByWithAggregationInput[]
    by: VocabItemScalarFieldEnum[] | VocabItemScalarFieldEnum
    having?: VocabItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VocabItemCountAggregateInputType | true
    _avg?: VocabItemAvgAggregateInputType
    _sum?: VocabItemSumAggregateInputType
    _min?: VocabItemMinAggregateInputType
    _max?: VocabItemMaxAggregateInputType
  }

  export type VocabItemGroupByOutputType = {
    id: string
    courseId: string
    word: string
    translation: string
    pronunciation: string | null
    audioUrl: string | null
    example: string | null
    exampleAudio: string | null
    difficulty: number
    createdAt: Date
    _count: VocabItemCountAggregateOutputType | null
    _avg: VocabItemAvgAggregateOutputType | null
    _sum: VocabItemSumAggregateOutputType | null
    _min: VocabItemMinAggregateOutputType | null
    _max: VocabItemMaxAggregateOutputType | null
  }

  type GetVocabItemGroupByPayload<T extends VocabItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VocabItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VocabItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VocabItemGroupByOutputType[P]>
            : GetScalarType<T[P], VocabItemGroupByOutputType[P]>
        }
      >
    >


  export type VocabItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    courseId?: boolean
    word?: boolean
    translation?: boolean
    pronunciation?: boolean
    audioUrl?: boolean
    example?: boolean
    exampleAudio?: boolean
    difficulty?: boolean
    createdAt?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
    userProgress?: boolean | VocabItem$userProgressArgs<ExtArgs>
    _count?: boolean | VocabItemCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vocabItem"]>

  export type VocabItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    courseId?: boolean
    word?: boolean
    translation?: boolean
    pronunciation?: boolean
    audioUrl?: boolean
    example?: boolean
    exampleAudio?: boolean
    difficulty?: boolean
    createdAt?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vocabItem"]>

  export type VocabItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    courseId?: boolean
    word?: boolean
    translation?: boolean
    pronunciation?: boolean
    audioUrl?: boolean
    example?: boolean
    exampleAudio?: boolean
    difficulty?: boolean
    createdAt?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vocabItem"]>

  export type VocabItemSelectScalar = {
    id?: boolean
    courseId?: boolean
    word?: boolean
    translation?: boolean
    pronunciation?: boolean
    audioUrl?: boolean
    example?: boolean
    exampleAudio?: boolean
    difficulty?: boolean
    createdAt?: boolean
  }

  export type VocabItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "courseId" | "word" | "translation" | "pronunciation" | "audioUrl" | "example" | "exampleAudio" | "difficulty" | "createdAt", ExtArgs["result"]["vocabItem"]>
  export type VocabItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
    userProgress?: boolean | VocabItem$userProgressArgs<ExtArgs>
    _count?: boolean | VocabItemCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VocabItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }
  export type VocabItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }

  export type $VocabItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VocabItem"
    objects: {
      course: Prisma.$CoursePayload<ExtArgs>
      userProgress: Prisma.$UserVocabProgressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      courseId: string
      word: string
      translation: string
      pronunciation: string | null
      audioUrl: string | null
      example: string | null
      exampleAudio: string | null
      difficulty: number
      createdAt: Date
    }, ExtArgs["result"]["vocabItem"]>
    composites: {}
  }

  type VocabItemGetPayload<S extends boolean | null | undefined | VocabItemDefaultArgs> = $Result.GetResult<Prisma.$VocabItemPayload, S>

  type VocabItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VocabItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VocabItemCountAggregateInputType | true
    }

  export interface VocabItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VocabItem'], meta: { name: 'VocabItem' } }
    /**
     * Find zero or one VocabItem that matches the filter.
     * @param {VocabItemFindUniqueArgs} args - Arguments to find a VocabItem
     * @example
     * // Get one VocabItem
     * const vocabItem = await prisma.vocabItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VocabItemFindUniqueArgs>(args: SelectSubset<T, VocabItemFindUniqueArgs<ExtArgs>>): Prisma__VocabItemClient<$Result.GetResult<Prisma.$VocabItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VocabItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VocabItemFindUniqueOrThrowArgs} args - Arguments to find a VocabItem
     * @example
     * // Get one VocabItem
     * const vocabItem = await prisma.vocabItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VocabItemFindUniqueOrThrowArgs>(args: SelectSubset<T, VocabItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VocabItemClient<$Result.GetResult<Prisma.$VocabItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VocabItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabItemFindFirstArgs} args - Arguments to find a VocabItem
     * @example
     * // Get one VocabItem
     * const vocabItem = await prisma.vocabItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VocabItemFindFirstArgs>(args?: SelectSubset<T, VocabItemFindFirstArgs<ExtArgs>>): Prisma__VocabItemClient<$Result.GetResult<Prisma.$VocabItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VocabItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabItemFindFirstOrThrowArgs} args - Arguments to find a VocabItem
     * @example
     * // Get one VocabItem
     * const vocabItem = await prisma.vocabItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VocabItemFindFirstOrThrowArgs>(args?: SelectSubset<T, VocabItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__VocabItemClient<$Result.GetResult<Prisma.$VocabItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VocabItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VocabItems
     * const vocabItems = await prisma.vocabItem.findMany()
     * 
     * // Get first 10 VocabItems
     * const vocabItems = await prisma.vocabItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vocabItemWithIdOnly = await prisma.vocabItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VocabItemFindManyArgs>(args?: SelectSubset<T, VocabItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VocabItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VocabItem.
     * @param {VocabItemCreateArgs} args - Arguments to create a VocabItem.
     * @example
     * // Create one VocabItem
     * const VocabItem = await prisma.vocabItem.create({
     *   data: {
     *     // ... data to create a VocabItem
     *   }
     * })
     * 
     */
    create<T extends VocabItemCreateArgs>(args: SelectSubset<T, VocabItemCreateArgs<ExtArgs>>): Prisma__VocabItemClient<$Result.GetResult<Prisma.$VocabItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VocabItems.
     * @param {VocabItemCreateManyArgs} args - Arguments to create many VocabItems.
     * @example
     * // Create many VocabItems
     * const vocabItem = await prisma.vocabItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VocabItemCreateManyArgs>(args?: SelectSubset<T, VocabItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VocabItems and returns the data saved in the database.
     * @param {VocabItemCreateManyAndReturnArgs} args - Arguments to create many VocabItems.
     * @example
     * // Create many VocabItems
     * const vocabItem = await prisma.vocabItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VocabItems and only return the `id`
     * const vocabItemWithIdOnly = await prisma.vocabItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VocabItemCreateManyAndReturnArgs>(args?: SelectSubset<T, VocabItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VocabItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VocabItem.
     * @param {VocabItemDeleteArgs} args - Arguments to delete one VocabItem.
     * @example
     * // Delete one VocabItem
     * const VocabItem = await prisma.vocabItem.delete({
     *   where: {
     *     // ... filter to delete one VocabItem
     *   }
     * })
     * 
     */
    delete<T extends VocabItemDeleteArgs>(args: SelectSubset<T, VocabItemDeleteArgs<ExtArgs>>): Prisma__VocabItemClient<$Result.GetResult<Prisma.$VocabItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VocabItem.
     * @param {VocabItemUpdateArgs} args - Arguments to update one VocabItem.
     * @example
     * // Update one VocabItem
     * const vocabItem = await prisma.vocabItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VocabItemUpdateArgs>(args: SelectSubset<T, VocabItemUpdateArgs<ExtArgs>>): Prisma__VocabItemClient<$Result.GetResult<Prisma.$VocabItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VocabItems.
     * @param {VocabItemDeleteManyArgs} args - Arguments to filter VocabItems to delete.
     * @example
     * // Delete a few VocabItems
     * const { count } = await prisma.vocabItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VocabItemDeleteManyArgs>(args?: SelectSubset<T, VocabItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VocabItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VocabItems
     * const vocabItem = await prisma.vocabItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VocabItemUpdateManyArgs>(args: SelectSubset<T, VocabItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VocabItems and returns the data updated in the database.
     * @param {VocabItemUpdateManyAndReturnArgs} args - Arguments to update many VocabItems.
     * @example
     * // Update many VocabItems
     * const vocabItem = await prisma.vocabItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VocabItems and only return the `id`
     * const vocabItemWithIdOnly = await prisma.vocabItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VocabItemUpdateManyAndReturnArgs>(args: SelectSubset<T, VocabItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VocabItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VocabItem.
     * @param {VocabItemUpsertArgs} args - Arguments to update or create a VocabItem.
     * @example
     * // Update or create a VocabItem
     * const vocabItem = await prisma.vocabItem.upsert({
     *   create: {
     *     // ... data to create a VocabItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VocabItem we want to update
     *   }
     * })
     */
    upsert<T extends VocabItemUpsertArgs>(args: SelectSubset<T, VocabItemUpsertArgs<ExtArgs>>): Prisma__VocabItemClient<$Result.GetResult<Prisma.$VocabItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VocabItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabItemCountArgs} args - Arguments to filter VocabItems to count.
     * @example
     * // Count the number of VocabItems
     * const count = await prisma.vocabItem.count({
     *   where: {
     *     // ... the filter for the VocabItems we want to count
     *   }
     * })
    **/
    count<T extends VocabItemCountArgs>(
      args?: Subset<T, VocabItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VocabItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VocabItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VocabItemAggregateArgs>(args: Subset<T, VocabItemAggregateArgs>): Prisma.PrismaPromise<GetVocabItemAggregateType<T>>

    /**
     * Group by VocabItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VocabItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VocabItemGroupByArgs['orderBy'] }
        : { orderBy?: VocabItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VocabItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVocabItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VocabItem model
   */
  readonly fields: VocabItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VocabItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VocabItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    userProgress<T extends VocabItem$userProgressArgs<ExtArgs> = {}>(args?: Subset<T, VocabItem$userProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserVocabProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VocabItem model
   */
  interface VocabItemFieldRefs {
    readonly id: FieldRef<"VocabItem", 'String'>
    readonly courseId: FieldRef<"VocabItem", 'String'>
    readonly word: FieldRef<"VocabItem", 'String'>
    readonly translation: FieldRef<"VocabItem", 'String'>
    readonly pronunciation: FieldRef<"VocabItem", 'String'>
    readonly audioUrl: FieldRef<"VocabItem", 'String'>
    readonly example: FieldRef<"VocabItem", 'String'>
    readonly exampleAudio: FieldRef<"VocabItem", 'String'>
    readonly difficulty: FieldRef<"VocabItem", 'Int'>
    readonly createdAt: FieldRef<"VocabItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VocabItem findUnique
   */
  export type VocabItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabItem
     */
    select?: VocabItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocabItem
     */
    omit?: VocabItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabItemInclude<ExtArgs> | null
    /**
     * Filter, which VocabItem to fetch.
     */
    where: VocabItemWhereUniqueInput
  }

  /**
   * VocabItem findUniqueOrThrow
   */
  export type VocabItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabItem
     */
    select?: VocabItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocabItem
     */
    omit?: VocabItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabItemInclude<ExtArgs> | null
    /**
     * Filter, which VocabItem to fetch.
     */
    where: VocabItemWhereUniqueInput
  }

  /**
   * VocabItem findFirst
   */
  export type VocabItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabItem
     */
    select?: VocabItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocabItem
     */
    omit?: VocabItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabItemInclude<ExtArgs> | null
    /**
     * Filter, which VocabItem to fetch.
     */
    where?: VocabItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VocabItems to fetch.
     */
    orderBy?: VocabItemOrderByWithRelationInput | VocabItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VocabItems.
     */
    cursor?: VocabItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VocabItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VocabItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VocabItems.
     */
    distinct?: VocabItemScalarFieldEnum | VocabItemScalarFieldEnum[]
  }

  /**
   * VocabItem findFirstOrThrow
   */
  export type VocabItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabItem
     */
    select?: VocabItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocabItem
     */
    omit?: VocabItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabItemInclude<ExtArgs> | null
    /**
     * Filter, which VocabItem to fetch.
     */
    where?: VocabItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VocabItems to fetch.
     */
    orderBy?: VocabItemOrderByWithRelationInput | VocabItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VocabItems.
     */
    cursor?: VocabItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VocabItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VocabItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VocabItems.
     */
    distinct?: VocabItemScalarFieldEnum | VocabItemScalarFieldEnum[]
  }

  /**
   * VocabItem findMany
   */
  export type VocabItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabItem
     */
    select?: VocabItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocabItem
     */
    omit?: VocabItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabItemInclude<ExtArgs> | null
    /**
     * Filter, which VocabItems to fetch.
     */
    where?: VocabItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VocabItems to fetch.
     */
    orderBy?: VocabItemOrderByWithRelationInput | VocabItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VocabItems.
     */
    cursor?: VocabItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VocabItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VocabItems.
     */
    skip?: number
    distinct?: VocabItemScalarFieldEnum | VocabItemScalarFieldEnum[]
  }

  /**
   * VocabItem create
   */
  export type VocabItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabItem
     */
    select?: VocabItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocabItem
     */
    omit?: VocabItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabItemInclude<ExtArgs> | null
    /**
     * The data needed to create a VocabItem.
     */
    data: XOR<VocabItemCreateInput, VocabItemUncheckedCreateInput>
  }

  /**
   * VocabItem createMany
   */
  export type VocabItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VocabItems.
     */
    data: VocabItemCreateManyInput | VocabItemCreateManyInput[]
  }

  /**
   * VocabItem createManyAndReturn
   */
  export type VocabItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabItem
     */
    select?: VocabItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VocabItem
     */
    omit?: VocabItemOmit<ExtArgs> | null
    /**
     * The data used to create many VocabItems.
     */
    data: VocabItemCreateManyInput | VocabItemCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VocabItem update
   */
  export type VocabItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabItem
     */
    select?: VocabItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocabItem
     */
    omit?: VocabItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabItemInclude<ExtArgs> | null
    /**
     * The data needed to update a VocabItem.
     */
    data: XOR<VocabItemUpdateInput, VocabItemUncheckedUpdateInput>
    /**
     * Choose, which VocabItem to update.
     */
    where: VocabItemWhereUniqueInput
  }

  /**
   * VocabItem updateMany
   */
  export type VocabItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VocabItems.
     */
    data: XOR<VocabItemUpdateManyMutationInput, VocabItemUncheckedUpdateManyInput>
    /**
     * Filter which VocabItems to update
     */
    where?: VocabItemWhereInput
    /**
     * Limit how many VocabItems to update.
     */
    limit?: number
  }

  /**
   * VocabItem updateManyAndReturn
   */
  export type VocabItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabItem
     */
    select?: VocabItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VocabItem
     */
    omit?: VocabItemOmit<ExtArgs> | null
    /**
     * The data used to update VocabItems.
     */
    data: XOR<VocabItemUpdateManyMutationInput, VocabItemUncheckedUpdateManyInput>
    /**
     * Filter which VocabItems to update
     */
    where?: VocabItemWhereInput
    /**
     * Limit how many VocabItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VocabItem upsert
   */
  export type VocabItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabItem
     */
    select?: VocabItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocabItem
     */
    omit?: VocabItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabItemInclude<ExtArgs> | null
    /**
     * The filter to search for the VocabItem to update in case it exists.
     */
    where: VocabItemWhereUniqueInput
    /**
     * In case the VocabItem found by the `where` argument doesn't exist, create a new VocabItem with this data.
     */
    create: XOR<VocabItemCreateInput, VocabItemUncheckedCreateInput>
    /**
     * In case the VocabItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VocabItemUpdateInput, VocabItemUncheckedUpdateInput>
  }

  /**
   * VocabItem delete
   */
  export type VocabItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabItem
     */
    select?: VocabItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocabItem
     */
    omit?: VocabItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabItemInclude<ExtArgs> | null
    /**
     * Filter which VocabItem to delete.
     */
    where: VocabItemWhereUniqueInput
  }

  /**
   * VocabItem deleteMany
   */
  export type VocabItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VocabItems to delete
     */
    where?: VocabItemWhereInput
    /**
     * Limit how many VocabItems to delete.
     */
    limit?: number
  }

  /**
   * VocabItem.userProgress
   */
  export type VocabItem$userProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVocabProgress
     */
    select?: UserVocabProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVocabProgress
     */
    omit?: UserVocabProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVocabProgressInclude<ExtArgs> | null
    where?: UserVocabProgressWhereInput
    orderBy?: UserVocabProgressOrderByWithRelationInput | UserVocabProgressOrderByWithRelationInput[]
    cursor?: UserVocabProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserVocabProgressScalarFieldEnum | UserVocabProgressScalarFieldEnum[]
  }

  /**
   * VocabItem without action
   */
  export type VocabItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabItem
     */
    select?: VocabItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocabItem
     */
    omit?: VocabItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabItemInclude<ExtArgs> | null
  }


  /**
   * Model UserVocabProgress
   */

  export type AggregateUserVocabProgress = {
    _count: UserVocabProgressCountAggregateOutputType | null
    _avg: UserVocabProgressAvgAggregateOutputType | null
    _sum: UserVocabProgressSumAggregateOutputType | null
    _min: UserVocabProgressMinAggregateOutputType | null
    _max: UserVocabProgressMaxAggregateOutputType | null
  }

  export type UserVocabProgressAvgAggregateOutputType = {
    masteryLevel: number | null
    correctCount: number | null
    wrongCount: number | null
  }

  export type UserVocabProgressSumAggregateOutputType = {
    masteryLevel: number | null
    correctCount: number | null
    wrongCount: number | null
  }

  export type UserVocabProgressMinAggregateOutputType = {
    id: string | null
    userId: string | null
    vocabId: string | null
    masteryLevel: number | null
    correctCount: number | null
    wrongCount: number | null
    lastReviewed: Date | null
    nextReview: Date | null
  }

  export type UserVocabProgressMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    vocabId: string | null
    masteryLevel: number | null
    correctCount: number | null
    wrongCount: number | null
    lastReviewed: Date | null
    nextReview: Date | null
  }

  export type UserVocabProgressCountAggregateOutputType = {
    id: number
    userId: number
    vocabId: number
    masteryLevel: number
    correctCount: number
    wrongCount: number
    lastReviewed: number
    nextReview: number
    _all: number
  }


  export type UserVocabProgressAvgAggregateInputType = {
    masteryLevel?: true
    correctCount?: true
    wrongCount?: true
  }

  export type UserVocabProgressSumAggregateInputType = {
    masteryLevel?: true
    correctCount?: true
    wrongCount?: true
  }

  export type UserVocabProgressMinAggregateInputType = {
    id?: true
    userId?: true
    vocabId?: true
    masteryLevel?: true
    correctCount?: true
    wrongCount?: true
    lastReviewed?: true
    nextReview?: true
  }

  export type UserVocabProgressMaxAggregateInputType = {
    id?: true
    userId?: true
    vocabId?: true
    masteryLevel?: true
    correctCount?: true
    wrongCount?: true
    lastReviewed?: true
    nextReview?: true
  }

  export type UserVocabProgressCountAggregateInputType = {
    id?: true
    userId?: true
    vocabId?: true
    masteryLevel?: true
    correctCount?: true
    wrongCount?: true
    lastReviewed?: true
    nextReview?: true
    _all?: true
  }

  export type UserVocabProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserVocabProgress to aggregate.
     */
    where?: UserVocabProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserVocabProgresses to fetch.
     */
    orderBy?: UserVocabProgressOrderByWithRelationInput | UserVocabProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserVocabProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserVocabProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserVocabProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserVocabProgresses
    **/
    _count?: true | UserVocabProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserVocabProgressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserVocabProgressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserVocabProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserVocabProgressMaxAggregateInputType
  }

  export type GetUserVocabProgressAggregateType<T extends UserVocabProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateUserVocabProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserVocabProgress[P]>
      : GetScalarType<T[P], AggregateUserVocabProgress[P]>
  }




  export type UserVocabProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserVocabProgressWhereInput
    orderBy?: UserVocabProgressOrderByWithAggregationInput | UserVocabProgressOrderByWithAggregationInput[]
    by: UserVocabProgressScalarFieldEnum[] | UserVocabProgressScalarFieldEnum
    having?: UserVocabProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserVocabProgressCountAggregateInputType | true
    _avg?: UserVocabProgressAvgAggregateInputType
    _sum?: UserVocabProgressSumAggregateInputType
    _min?: UserVocabProgressMinAggregateInputType
    _max?: UserVocabProgressMaxAggregateInputType
  }

  export type UserVocabProgressGroupByOutputType = {
    id: string
    userId: string
    vocabId: string
    masteryLevel: number
    correctCount: number
    wrongCount: number
    lastReviewed: Date | null
    nextReview: Date | null
    _count: UserVocabProgressCountAggregateOutputType | null
    _avg: UserVocabProgressAvgAggregateOutputType | null
    _sum: UserVocabProgressSumAggregateOutputType | null
    _min: UserVocabProgressMinAggregateOutputType | null
    _max: UserVocabProgressMaxAggregateOutputType | null
  }

  type GetUserVocabProgressGroupByPayload<T extends UserVocabProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserVocabProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserVocabProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserVocabProgressGroupByOutputType[P]>
            : GetScalarType<T[P], UserVocabProgressGroupByOutputType[P]>
        }
      >
    >


  export type UserVocabProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    vocabId?: boolean
    masteryLevel?: boolean
    correctCount?: boolean
    wrongCount?: boolean
    lastReviewed?: boolean
    nextReview?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    vocab?: boolean | VocabItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userVocabProgress"]>

  export type UserVocabProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    vocabId?: boolean
    masteryLevel?: boolean
    correctCount?: boolean
    wrongCount?: boolean
    lastReviewed?: boolean
    nextReview?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    vocab?: boolean | VocabItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userVocabProgress"]>

  export type UserVocabProgressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    vocabId?: boolean
    masteryLevel?: boolean
    correctCount?: boolean
    wrongCount?: boolean
    lastReviewed?: boolean
    nextReview?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    vocab?: boolean | VocabItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userVocabProgress"]>

  export type UserVocabProgressSelectScalar = {
    id?: boolean
    userId?: boolean
    vocabId?: boolean
    masteryLevel?: boolean
    correctCount?: boolean
    wrongCount?: boolean
    lastReviewed?: boolean
    nextReview?: boolean
  }

  export type UserVocabProgressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "vocabId" | "masteryLevel" | "correctCount" | "wrongCount" | "lastReviewed" | "nextReview", ExtArgs["result"]["userVocabProgress"]>
  export type UserVocabProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    vocab?: boolean | VocabItemDefaultArgs<ExtArgs>
  }
  export type UserVocabProgressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    vocab?: boolean | VocabItemDefaultArgs<ExtArgs>
  }
  export type UserVocabProgressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    vocab?: boolean | VocabItemDefaultArgs<ExtArgs>
  }

  export type $UserVocabProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserVocabProgress"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      vocab: Prisma.$VocabItemPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      vocabId: string
      masteryLevel: number
      correctCount: number
      wrongCount: number
      lastReviewed: Date | null
      nextReview: Date | null
    }, ExtArgs["result"]["userVocabProgress"]>
    composites: {}
  }

  type UserVocabProgressGetPayload<S extends boolean | null | undefined | UserVocabProgressDefaultArgs> = $Result.GetResult<Prisma.$UserVocabProgressPayload, S>

  type UserVocabProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserVocabProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserVocabProgressCountAggregateInputType | true
    }

  export interface UserVocabProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserVocabProgress'], meta: { name: 'UserVocabProgress' } }
    /**
     * Find zero or one UserVocabProgress that matches the filter.
     * @param {UserVocabProgressFindUniqueArgs} args - Arguments to find a UserVocabProgress
     * @example
     * // Get one UserVocabProgress
     * const userVocabProgress = await prisma.userVocabProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserVocabProgressFindUniqueArgs>(args: SelectSubset<T, UserVocabProgressFindUniqueArgs<ExtArgs>>): Prisma__UserVocabProgressClient<$Result.GetResult<Prisma.$UserVocabProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserVocabProgress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserVocabProgressFindUniqueOrThrowArgs} args - Arguments to find a UserVocabProgress
     * @example
     * // Get one UserVocabProgress
     * const userVocabProgress = await prisma.userVocabProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserVocabProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, UserVocabProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserVocabProgressClient<$Result.GetResult<Prisma.$UserVocabProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserVocabProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserVocabProgressFindFirstArgs} args - Arguments to find a UserVocabProgress
     * @example
     * // Get one UserVocabProgress
     * const userVocabProgress = await prisma.userVocabProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserVocabProgressFindFirstArgs>(args?: SelectSubset<T, UserVocabProgressFindFirstArgs<ExtArgs>>): Prisma__UserVocabProgressClient<$Result.GetResult<Prisma.$UserVocabProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserVocabProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserVocabProgressFindFirstOrThrowArgs} args - Arguments to find a UserVocabProgress
     * @example
     * // Get one UserVocabProgress
     * const userVocabProgress = await prisma.userVocabProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserVocabProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, UserVocabProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserVocabProgressClient<$Result.GetResult<Prisma.$UserVocabProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserVocabProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserVocabProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserVocabProgresses
     * const userVocabProgresses = await prisma.userVocabProgress.findMany()
     * 
     * // Get first 10 UserVocabProgresses
     * const userVocabProgresses = await prisma.userVocabProgress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userVocabProgressWithIdOnly = await prisma.userVocabProgress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserVocabProgressFindManyArgs>(args?: SelectSubset<T, UserVocabProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserVocabProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserVocabProgress.
     * @param {UserVocabProgressCreateArgs} args - Arguments to create a UserVocabProgress.
     * @example
     * // Create one UserVocabProgress
     * const UserVocabProgress = await prisma.userVocabProgress.create({
     *   data: {
     *     // ... data to create a UserVocabProgress
     *   }
     * })
     * 
     */
    create<T extends UserVocabProgressCreateArgs>(args: SelectSubset<T, UserVocabProgressCreateArgs<ExtArgs>>): Prisma__UserVocabProgressClient<$Result.GetResult<Prisma.$UserVocabProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserVocabProgresses.
     * @param {UserVocabProgressCreateManyArgs} args - Arguments to create many UserVocabProgresses.
     * @example
     * // Create many UserVocabProgresses
     * const userVocabProgress = await prisma.userVocabProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserVocabProgressCreateManyArgs>(args?: SelectSubset<T, UserVocabProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserVocabProgresses and returns the data saved in the database.
     * @param {UserVocabProgressCreateManyAndReturnArgs} args - Arguments to create many UserVocabProgresses.
     * @example
     * // Create many UserVocabProgresses
     * const userVocabProgress = await prisma.userVocabProgress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserVocabProgresses and only return the `id`
     * const userVocabProgressWithIdOnly = await prisma.userVocabProgress.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserVocabProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, UserVocabProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserVocabProgressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserVocabProgress.
     * @param {UserVocabProgressDeleteArgs} args - Arguments to delete one UserVocabProgress.
     * @example
     * // Delete one UserVocabProgress
     * const UserVocabProgress = await prisma.userVocabProgress.delete({
     *   where: {
     *     // ... filter to delete one UserVocabProgress
     *   }
     * })
     * 
     */
    delete<T extends UserVocabProgressDeleteArgs>(args: SelectSubset<T, UserVocabProgressDeleteArgs<ExtArgs>>): Prisma__UserVocabProgressClient<$Result.GetResult<Prisma.$UserVocabProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserVocabProgress.
     * @param {UserVocabProgressUpdateArgs} args - Arguments to update one UserVocabProgress.
     * @example
     * // Update one UserVocabProgress
     * const userVocabProgress = await prisma.userVocabProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserVocabProgressUpdateArgs>(args: SelectSubset<T, UserVocabProgressUpdateArgs<ExtArgs>>): Prisma__UserVocabProgressClient<$Result.GetResult<Prisma.$UserVocabProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserVocabProgresses.
     * @param {UserVocabProgressDeleteManyArgs} args - Arguments to filter UserVocabProgresses to delete.
     * @example
     * // Delete a few UserVocabProgresses
     * const { count } = await prisma.userVocabProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserVocabProgressDeleteManyArgs>(args?: SelectSubset<T, UserVocabProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserVocabProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserVocabProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserVocabProgresses
     * const userVocabProgress = await prisma.userVocabProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserVocabProgressUpdateManyArgs>(args: SelectSubset<T, UserVocabProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserVocabProgresses and returns the data updated in the database.
     * @param {UserVocabProgressUpdateManyAndReturnArgs} args - Arguments to update many UserVocabProgresses.
     * @example
     * // Update many UserVocabProgresses
     * const userVocabProgress = await prisma.userVocabProgress.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserVocabProgresses and only return the `id`
     * const userVocabProgressWithIdOnly = await prisma.userVocabProgress.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserVocabProgressUpdateManyAndReturnArgs>(args: SelectSubset<T, UserVocabProgressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserVocabProgressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserVocabProgress.
     * @param {UserVocabProgressUpsertArgs} args - Arguments to update or create a UserVocabProgress.
     * @example
     * // Update or create a UserVocabProgress
     * const userVocabProgress = await prisma.userVocabProgress.upsert({
     *   create: {
     *     // ... data to create a UserVocabProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserVocabProgress we want to update
     *   }
     * })
     */
    upsert<T extends UserVocabProgressUpsertArgs>(args: SelectSubset<T, UserVocabProgressUpsertArgs<ExtArgs>>): Prisma__UserVocabProgressClient<$Result.GetResult<Prisma.$UserVocabProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserVocabProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserVocabProgressCountArgs} args - Arguments to filter UserVocabProgresses to count.
     * @example
     * // Count the number of UserVocabProgresses
     * const count = await prisma.userVocabProgress.count({
     *   where: {
     *     // ... the filter for the UserVocabProgresses we want to count
     *   }
     * })
    **/
    count<T extends UserVocabProgressCountArgs>(
      args?: Subset<T, UserVocabProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserVocabProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserVocabProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserVocabProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserVocabProgressAggregateArgs>(args: Subset<T, UserVocabProgressAggregateArgs>): Prisma.PrismaPromise<GetUserVocabProgressAggregateType<T>>

    /**
     * Group by UserVocabProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserVocabProgressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserVocabProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserVocabProgressGroupByArgs['orderBy'] }
        : { orderBy?: UserVocabProgressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserVocabProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserVocabProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserVocabProgress model
   */
  readonly fields: UserVocabProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserVocabProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserVocabProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    vocab<T extends VocabItemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VocabItemDefaultArgs<ExtArgs>>): Prisma__VocabItemClient<$Result.GetResult<Prisma.$VocabItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserVocabProgress model
   */
  interface UserVocabProgressFieldRefs {
    readonly id: FieldRef<"UserVocabProgress", 'String'>
    readonly userId: FieldRef<"UserVocabProgress", 'String'>
    readonly vocabId: FieldRef<"UserVocabProgress", 'String'>
    readonly masteryLevel: FieldRef<"UserVocabProgress", 'Int'>
    readonly correctCount: FieldRef<"UserVocabProgress", 'Int'>
    readonly wrongCount: FieldRef<"UserVocabProgress", 'Int'>
    readonly lastReviewed: FieldRef<"UserVocabProgress", 'DateTime'>
    readonly nextReview: FieldRef<"UserVocabProgress", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserVocabProgress findUnique
   */
  export type UserVocabProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVocabProgress
     */
    select?: UserVocabProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVocabProgress
     */
    omit?: UserVocabProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVocabProgressInclude<ExtArgs> | null
    /**
     * Filter, which UserVocabProgress to fetch.
     */
    where: UserVocabProgressWhereUniqueInput
  }

  /**
   * UserVocabProgress findUniqueOrThrow
   */
  export type UserVocabProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVocabProgress
     */
    select?: UserVocabProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVocabProgress
     */
    omit?: UserVocabProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVocabProgressInclude<ExtArgs> | null
    /**
     * Filter, which UserVocabProgress to fetch.
     */
    where: UserVocabProgressWhereUniqueInput
  }

  /**
   * UserVocabProgress findFirst
   */
  export type UserVocabProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVocabProgress
     */
    select?: UserVocabProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVocabProgress
     */
    omit?: UserVocabProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVocabProgressInclude<ExtArgs> | null
    /**
     * Filter, which UserVocabProgress to fetch.
     */
    where?: UserVocabProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserVocabProgresses to fetch.
     */
    orderBy?: UserVocabProgressOrderByWithRelationInput | UserVocabProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserVocabProgresses.
     */
    cursor?: UserVocabProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserVocabProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserVocabProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserVocabProgresses.
     */
    distinct?: UserVocabProgressScalarFieldEnum | UserVocabProgressScalarFieldEnum[]
  }

  /**
   * UserVocabProgress findFirstOrThrow
   */
  export type UserVocabProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVocabProgress
     */
    select?: UserVocabProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVocabProgress
     */
    omit?: UserVocabProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVocabProgressInclude<ExtArgs> | null
    /**
     * Filter, which UserVocabProgress to fetch.
     */
    where?: UserVocabProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserVocabProgresses to fetch.
     */
    orderBy?: UserVocabProgressOrderByWithRelationInput | UserVocabProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserVocabProgresses.
     */
    cursor?: UserVocabProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserVocabProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserVocabProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserVocabProgresses.
     */
    distinct?: UserVocabProgressScalarFieldEnum | UserVocabProgressScalarFieldEnum[]
  }

  /**
   * UserVocabProgress findMany
   */
  export type UserVocabProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVocabProgress
     */
    select?: UserVocabProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVocabProgress
     */
    omit?: UserVocabProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVocabProgressInclude<ExtArgs> | null
    /**
     * Filter, which UserVocabProgresses to fetch.
     */
    where?: UserVocabProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserVocabProgresses to fetch.
     */
    orderBy?: UserVocabProgressOrderByWithRelationInput | UserVocabProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserVocabProgresses.
     */
    cursor?: UserVocabProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserVocabProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserVocabProgresses.
     */
    skip?: number
    distinct?: UserVocabProgressScalarFieldEnum | UserVocabProgressScalarFieldEnum[]
  }

  /**
   * UserVocabProgress create
   */
  export type UserVocabProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVocabProgress
     */
    select?: UserVocabProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVocabProgress
     */
    omit?: UserVocabProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVocabProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a UserVocabProgress.
     */
    data: XOR<UserVocabProgressCreateInput, UserVocabProgressUncheckedCreateInput>
  }

  /**
   * UserVocabProgress createMany
   */
  export type UserVocabProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserVocabProgresses.
     */
    data: UserVocabProgressCreateManyInput | UserVocabProgressCreateManyInput[]
  }

  /**
   * UserVocabProgress createManyAndReturn
   */
  export type UserVocabProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVocabProgress
     */
    select?: UserVocabProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserVocabProgress
     */
    omit?: UserVocabProgressOmit<ExtArgs> | null
    /**
     * The data used to create many UserVocabProgresses.
     */
    data: UserVocabProgressCreateManyInput | UserVocabProgressCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVocabProgressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserVocabProgress update
   */
  export type UserVocabProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVocabProgress
     */
    select?: UserVocabProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVocabProgress
     */
    omit?: UserVocabProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVocabProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a UserVocabProgress.
     */
    data: XOR<UserVocabProgressUpdateInput, UserVocabProgressUncheckedUpdateInput>
    /**
     * Choose, which UserVocabProgress to update.
     */
    where: UserVocabProgressWhereUniqueInput
  }

  /**
   * UserVocabProgress updateMany
   */
  export type UserVocabProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserVocabProgresses.
     */
    data: XOR<UserVocabProgressUpdateManyMutationInput, UserVocabProgressUncheckedUpdateManyInput>
    /**
     * Filter which UserVocabProgresses to update
     */
    where?: UserVocabProgressWhereInput
    /**
     * Limit how many UserVocabProgresses to update.
     */
    limit?: number
  }

  /**
   * UserVocabProgress updateManyAndReturn
   */
  export type UserVocabProgressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVocabProgress
     */
    select?: UserVocabProgressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserVocabProgress
     */
    omit?: UserVocabProgressOmit<ExtArgs> | null
    /**
     * The data used to update UserVocabProgresses.
     */
    data: XOR<UserVocabProgressUpdateManyMutationInput, UserVocabProgressUncheckedUpdateManyInput>
    /**
     * Filter which UserVocabProgresses to update
     */
    where?: UserVocabProgressWhereInput
    /**
     * Limit how many UserVocabProgresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVocabProgressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserVocabProgress upsert
   */
  export type UserVocabProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVocabProgress
     */
    select?: UserVocabProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVocabProgress
     */
    omit?: UserVocabProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVocabProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the UserVocabProgress to update in case it exists.
     */
    where: UserVocabProgressWhereUniqueInput
    /**
     * In case the UserVocabProgress found by the `where` argument doesn't exist, create a new UserVocabProgress with this data.
     */
    create: XOR<UserVocabProgressCreateInput, UserVocabProgressUncheckedCreateInput>
    /**
     * In case the UserVocabProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserVocabProgressUpdateInput, UserVocabProgressUncheckedUpdateInput>
  }

  /**
   * UserVocabProgress delete
   */
  export type UserVocabProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVocabProgress
     */
    select?: UserVocabProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVocabProgress
     */
    omit?: UserVocabProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVocabProgressInclude<ExtArgs> | null
    /**
     * Filter which UserVocabProgress to delete.
     */
    where: UserVocabProgressWhereUniqueInput
  }

  /**
   * UserVocabProgress deleteMany
   */
  export type UserVocabProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserVocabProgresses to delete
     */
    where?: UserVocabProgressWhereInput
    /**
     * Limit how many UserVocabProgresses to delete.
     */
    limit?: number
  }

  /**
   * UserVocabProgress without action
   */
  export type UserVocabProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVocabProgress
     */
    select?: UserVocabProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVocabProgress
     */
    omit?: UserVocabProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVocabProgressInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    passwordHash: 'passwordHash',
    displayName: 'displayName',
    avatarUrl: 'avatarUrl',
    role: 'role',
    language: 'language',
    preferredLangs: 'preferredLangs',
    settings: 'settings',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CourseScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    language: 'language',
    level: 'level',
    category: 'category',
    coverUrl: 'coverUrl',
    isPublished: 'isPublished',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdBy: 'createdBy',
    metadata: 'metadata'
  };

  export type CourseScalarFieldEnum = (typeof CourseScalarFieldEnum)[keyof typeof CourseScalarFieldEnum]


  export const UnitScalarFieldEnum: {
    id: 'id',
    courseId: 'courseId',
    title: 'title',
    description: 'description',
    orderIndex: 'orderIndex',
    createdAt: 'createdAt'
  };

  export type UnitScalarFieldEnum = (typeof UnitScalarFieldEnum)[keyof typeof UnitScalarFieldEnum]


  export const LessonScalarFieldEnum: {
    id: 'id',
    unitId: 'unitId',
    title: 'title',
    content: 'content',
    lessonType: 'lessonType',
    orderIndex: 'orderIndex',
    duration: 'duration',
    createdAt: 'createdAt'
  };

  export type LessonScalarFieldEnum = (typeof LessonScalarFieldEnum)[keyof typeof LessonScalarFieldEnum]


  export const ConversationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    courseId: 'courseId',
    lessonId: 'lessonId',
    title: 'title',
    status: 'status',
    context: 'context',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ConversationScalarFieldEnum = (typeof ConversationScalarFieldEnum)[keyof typeof ConversationScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    conversationId: 'conversationId',
    role: 'role',
    content: 'content',
    audioUrl: 'audioUrl',
    audioDuration: 'audioDuration',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const UserProgressScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    lessonId: 'lessonId',
    completed: 'completed',
    score: 'score',
    timeSpent: 'timeSpent',
    attempts: 'attempts',
    lastAccessed: 'lastAccessed',
    completedAt: 'completedAt'
  };

  export type UserProgressScalarFieldEnum = (typeof UserProgressScalarFieldEnum)[keyof typeof UserProgressScalarFieldEnum]


  export const VocabItemScalarFieldEnum: {
    id: 'id',
    courseId: 'courseId',
    word: 'word',
    translation: 'translation',
    pronunciation: 'pronunciation',
    audioUrl: 'audioUrl',
    example: 'example',
    exampleAudio: 'exampleAudio',
    difficulty: 'difficulty',
    createdAt: 'createdAt'
  };

  export type VocabItemScalarFieldEnum = (typeof VocabItemScalarFieldEnum)[keyof typeof VocabItemScalarFieldEnum]


  export const UserVocabProgressScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    vocabId: 'vocabId',
    masteryLevel: 'masteryLevel',
    correctCount: 'correctCount',
    wrongCount: 'wrongCount',
    lastReviewed: 'lastReviewed',
    nextReview: 'nextReview'
  };

  export type UserVocabProgressScalarFieldEnum = (typeof UserVocabProgressScalarFieldEnum)[keyof typeof UserVocabProgressScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringNullableFilter<"User"> | string | null
    displayName?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    language?: StringFilter<"User"> | string
    preferredLangs?: StringNullableFilter<"User"> | string | null
    settings?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    conversations?: ConversationListRelationFilter
    progress?: UserProgressListRelationFilter
    vocabProgress?: UserVocabProgressListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    displayName?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    role?: SortOrder
    language?: SortOrder
    preferredLangs?: SortOrderInput | SortOrder
    settings?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    conversations?: ConversationOrderByRelationAggregateInput
    progress?: UserProgressOrderByRelationAggregateInput
    vocabProgress?: UserVocabProgressOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringNullableFilter<"User"> | string | null
    displayName?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    language?: StringFilter<"User"> | string
    preferredLangs?: StringNullableFilter<"User"> | string | null
    settings?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    conversations?: ConversationListRelationFilter
    progress?: UserProgressListRelationFilter
    vocabProgress?: UserVocabProgressListRelationFilter
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    displayName?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    role?: SortOrder
    language?: SortOrder
    preferredLangs?: SortOrderInput | SortOrder
    settings?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordHash?: StringNullableWithAggregatesFilter<"User"> | string | null
    displayName?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringWithAggregatesFilter<"User"> | string
    language?: StringWithAggregatesFilter<"User"> | string
    preferredLangs?: StringNullableWithAggregatesFilter<"User"> | string | null
    settings?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type CourseWhereInput = {
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    id?: StringFilter<"Course"> | string
    title?: StringFilter<"Course"> | string
    description?: StringNullableFilter<"Course"> | string | null
    language?: StringFilter<"Course"> | string
    level?: StringFilter<"Course"> | string
    category?: StringNullableFilter<"Course"> | string | null
    coverUrl?: StringNullableFilter<"Course"> | string | null
    isPublished?: BoolFilter<"Course"> | boolean
    createdAt?: DateTimeFilter<"Course"> | Date | string
    updatedAt?: DateTimeFilter<"Course"> | Date | string
    createdBy?: StringNullableFilter<"Course"> | string | null
    metadata?: StringNullableFilter<"Course"> | string | null
    units?: UnitListRelationFilter
    vocabs?: VocabItemListRelationFilter
    conversations?: ConversationListRelationFilter
  }

  export type CourseOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    language?: SortOrder
    level?: SortOrder
    category?: SortOrderInput | SortOrder
    coverUrl?: SortOrderInput | SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    units?: UnitOrderByRelationAggregateInput
    vocabs?: VocabItemOrderByRelationAggregateInput
    conversations?: ConversationOrderByRelationAggregateInput
  }

  export type CourseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    title?: StringFilter<"Course"> | string
    description?: StringNullableFilter<"Course"> | string | null
    language?: StringFilter<"Course"> | string
    level?: StringFilter<"Course"> | string
    category?: StringNullableFilter<"Course"> | string | null
    coverUrl?: StringNullableFilter<"Course"> | string | null
    isPublished?: BoolFilter<"Course"> | boolean
    createdAt?: DateTimeFilter<"Course"> | Date | string
    updatedAt?: DateTimeFilter<"Course"> | Date | string
    createdBy?: StringNullableFilter<"Course"> | string | null
    metadata?: StringNullableFilter<"Course"> | string | null
    units?: UnitListRelationFilter
    vocabs?: VocabItemListRelationFilter
    conversations?: ConversationListRelationFilter
  }, "id">

  export type CourseOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    language?: SortOrder
    level?: SortOrder
    category?: SortOrderInput | SortOrder
    coverUrl?: SortOrderInput | SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    _count?: CourseCountOrderByAggregateInput
    _max?: CourseMaxOrderByAggregateInput
    _min?: CourseMinOrderByAggregateInput
  }

  export type CourseScalarWhereWithAggregatesInput = {
    AND?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    OR?: CourseScalarWhereWithAggregatesInput[]
    NOT?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Course"> | string
    title?: StringWithAggregatesFilter<"Course"> | string
    description?: StringNullableWithAggregatesFilter<"Course"> | string | null
    language?: StringWithAggregatesFilter<"Course"> | string
    level?: StringWithAggregatesFilter<"Course"> | string
    category?: StringNullableWithAggregatesFilter<"Course"> | string | null
    coverUrl?: StringNullableWithAggregatesFilter<"Course"> | string | null
    isPublished?: BoolWithAggregatesFilter<"Course"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Course"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Course"> | Date | string
    createdBy?: StringNullableWithAggregatesFilter<"Course"> | string | null
    metadata?: StringNullableWithAggregatesFilter<"Course"> | string | null
  }

  export type UnitWhereInput = {
    AND?: UnitWhereInput | UnitWhereInput[]
    OR?: UnitWhereInput[]
    NOT?: UnitWhereInput | UnitWhereInput[]
    id?: StringFilter<"Unit"> | string
    courseId?: StringFilter<"Unit"> | string
    title?: StringFilter<"Unit"> | string
    description?: StringNullableFilter<"Unit"> | string | null
    orderIndex?: IntFilter<"Unit"> | number
    createdAt?: DateTimeFilter<"Unit"> | Date | string
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    lessons?: LessonListRelationFilter
  }

  export type UnitOrderByWithRelationInput = {
    id?: SortOrder
    courseId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    course?: CourseOrderByWithRelationInput
    lessons?: LessonOrderByRelationAggregateInput
  }

  export type UnitWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UnitWhereInput | UnitWhereInput[]
    OR?: UnitWhereInput[]
    NOT?: UnitWhereInput | UnitWhereInput[]
    courseId?: StringFilter<"Unit"> | string
    title?: StringFilter<"Unit"> | string
    description?: StringNullableFilter<"Unit"> | string | null
    orderIndex?: IntFilter<"Unit"> | number
    createdAt?: DateTimeFilter<"Unit"> | Date | string
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    lessons?: LessonListRelationFilter
  }, "id">

  export type UnitOrderByWithAggregationInput = {
    id?: SortOrder
    courseId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    _count?: UnitCountOrderByAggregateInput
    _avg?: UnitAvgOrderByAggregateInput
    _max?: UnitMaxOrderByAggregateInput
    _min?: UnitMinOrderByAggregateInput
    _sum?: UnitSumOrderByAggregateInput
  }

  export type UnitScalarWhereWithAggregatesInput = {
    AND?: UnitScalarWhereWithAggregatesInput | UnitScalarWhereWithAggregatesInput[]
    OR?: UnitScalarWhereWithAggregatesInput[]
    NOT?: UnitScalarWhereWithAggregatesInput | UnitScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Unit"> | string
    courseId?: StringWithAggregatesFilter<"Unit"> | string
    title?: StringWithAggregatesFilter<"Unit"> | string
    description?: StringNullableWithAggregatesFilter<"Unit"> | string | null
    orderIndex?: IntWithAggregatesFilter<"Unit"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Unit"> | Date | string
  }

  export type LessonWhereInput = {
    AND?: LessonWhereInput | LessonWhereInput[]
    OR?: LessonWhereInput[]
    NOT?: LessonWhereInput | LessonWhereInput[]
    id?: StringFilter<"Lesson"> | string
    unitId?: StringFilter<"Lesson"> | string
    title?: StringFilter<"Lesson"> | string
    content?: StringNullableFilter<"Lesson"> | string | null
    lessonType?: StringFilter<"Lesson"> | string
    orderIndex?: IntFilter<"Lesson"> | number
    duration?: IntNullableFilter<"Lesson"> | number | null
    createdAt?: DateTimeFilter<"Lesson"> | Date | string
    unit?: XOR<UnitScalarRelationFilter, UnitWhereInput>
    progress?: UserProgressListRelationFilter
    conversations?: ConversationListRelationFilter
  }

  export type LessonOrderByWithRelationInput = {
    id?: SortOrder
    unitId?: SortOrder
    title?: SortOrder
    content?: SortOrderInput | SortOrder
    lessonType?: SortOrder
    orderIndex?: SortOrder
    duration?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    unit?: UnitOrderByWithRelationInput
    progress?: UserProgressOrderByRelationAggregateInput
    conversations?: ConversationOrderByRelationAggregateInput
  }

  export type LessonWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LessonWhereInput | LessonWhereInput[]
    OR?: LessonWhereInput[]
    NOT?: LessonWhereInput | LessonWhereInput[]
    unitId?: StringFilter<"Lesson"> | string
    title?: StringFilter<"Lesson"> | string
    content?: StringNullableFilter<"Lesson"> | string | null
    lessonType?: StringFilter<"Lesson"> | string
    orderIndex?: IntFilter<"Lesson"> | number
    duration?: IntNullableFilter<"Lesson"> | number | null
    createdAt?: DateTimeFilter<"Lesson"> | Date | string
    unit?: XOR<UnitScalarRelationFilter, UnitWhereInput>
    progress?: UserProgressListRelationFilter
    conversations?: ConversationListRelationFilter
  }, "id">

  export type LessonOrderByWithAggregationInput = {
    id?: SortOrder
    unitId?: SortOrder
    title?: SortOrder
    content?: SortOrderInput | SortOrder
    lessonType?: SortOrder
    orderIndex?: SortOrder
    duration?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: LessonCountOrderByAggregateInput
    _avg?: LessonAvgOrderByAggregateInput
    _max?: LessonMaxOrderByAggregateInput
    _min?: LessonMinOrderByAggregateInput
    _sum?: LessonSumOrderByAggregateInput
  }

  export type LessonScalarWhereWithAggregatesInput = {
    AND?: LessonScalarWhereWithAggregatesInput | LessonScalarWhereWithAggregatesInput[]
    OR?: LessonScalarWhereWithAggregatesInput[]
    NOT?: LessonScalarWhereWithAggregatesInput | LessonScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Lesson"> | string
    unitId?: StringWithAggregatesFilter<"Lesson"> | string
    title?: StringWithAggregatesFilter<"Lesson"> | string
    content?: StringNullableWithAggregatesFilter<"Lesson"> | string | null
    lessonType?: StringWithAggregatesFilter<"Lesson"> | string
    orderIndex?: IntWithAggregatesFilter<"Lesson"> | number
    duration?: IntNullableWithAggregatesFilter<"Lesson"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Lesson"> | Date | string
  }

  export type ConversationWhereInput = {
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    id?: StringFilter<"Conversation"> | string
    userId?: StringFilter<"Conversation"> | string
    courseId?: StringNullableFilter<"Conversation"> | string | null
    lessonId?: StringNullableFilter<"Conversation"> | string | null
    title?: StringNullableFilter<"Conversation"> | string | null
    status?: StringFilter<"Conversation"> | string
    context?: StringNullableFilter<"Conversation"> | string | null
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    course?: XOR<CourseNullableScalarRelationFilter, CourseWhereInput> | null
    lesson?: XOR<LessonNullableScalarRelationFilter, LessonWhereInput> | null
    messages?: MessageListRelationFilter
  }

  export type ConversationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    courseId?: SortOrderInput | SortOrder
    lessonId?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    status?: SortOrder
    context?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    course?: CourseOrderByWithRelationInput
    lesson?: LessonOrderByWithRelationInput
    messages?: MessageOrderByRelationAggregateInput
  }

  export type ConversationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    userId?: StringFilter<"Conversation"> | string
    courseId?: StringNullableFilter<"Conversation"> | string | null
    lessonId?: StringNullableFilter<"Conversation"> | string | null
    title?: StringNullableFilter<"Conversation"> | string | null
    status?: StringFilter<"Conversation"> | string
    context?: StringNullableFilter<"Conversation"> | string | null
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    course?: XOR<CourseNullableScalarRelationFilter, CourseWhereInput> | null
    lesson?: XOR<LessonNullableScalarRelationFilter, LessonWhereInput> | null
    messages?: MessageListRelationFilter
  }, "id">

  export type ConversationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    courseId?: SortOrderInput | SortOrder
    lessonId?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    status?: SortOrder
    context?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ConversationCountOrderByAggregateInput
    _max?: ConversationMaxOrderByAggregateInput
    _min?: ConversationMinOrderByAggregateInput
  }

  export type ConversationScalarWhereWithAggregatesInput = {
    AND?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    OR?: ConversationScalarWhereWithAggregatesInput[]
    NOT?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Conversation"> | string
    userId?: StringWithAggregatesFilter<"Conversation"> | string
    courseId?: StringNullableWithAggregatesFilter<"Conversation"> | string | null
    lessonId?: StringNullableWithAggregatesFilter<"Conversation"> | string | null
    title?: StringNullableWithAggregatesFilter<"Conversation"> | string | null
    status?: StringWithAggregatesFilter<"Conversation"> | string
    context?: StringNullableWithAggregatesFilter<"Conversation"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    conversationId?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    audioUrl?: StringNullableFilter<"Message"> | string | null
    audioDuration?: FloatNullableFilter<"Message"> | number | null
    metadata?: StringNullableFilter<"Message"> | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    audioUrl?: SortOrderInput | SortOrder
    audioDuration?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    conversation?: ConversationOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    conversationId?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    audioUrl?: StringNullableFilter<"Message"> | string | null
    audioDuration?: FloatNullableFilter<"Message"> | number | null
    metadata?: StringNullableFilter<"Message"> | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    audioUrl?: SortOrderInput | SortOrder
    audioDuration?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _avg?: MessageAvgOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
    _sum?: MessageSumOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    conversationId?: StringWithAggregatesFilter<"Message"> | string
    role?: StringWithAggregatesFilter<"Message"> | string
    content?: StringWithAggregatesFilter<"Message"> | string
    audioUrl?: StringNullableWithAggregatesFilter<"Message"> | string | null
    audioDuration?: FloatNullableWithAggregatesFilter<"Message"> | number | null
    metadata?: StringNullableWithAggregatesFilter<"Message"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
  }

  export type UserProgressWhereInput = {
    AND?: UserProgressWhereInput | UserProgressWhereInput[]
    OR?: UserProgressWhereInput[]
    NOT?: UserProgressWhereInput | UserProgressWhereInput[]
    id?: StringFilter<"UserProgress"> | string
    userId?: StringFilter<"UserProgress"> | string
    lessonId?: StringFilter<"UserProgress"> | string
    completed?: BoolFilter<"UserProgress"> | boolean
    score?: IntNullableFilter<"UserProgress"> | number | null
    timeSpent?: IntNullableFilter<"UserProgress"> | number | null
    attempts?: IntFilter<"UserProgress"> | number
    lastAccessed?: DateTimeFilter<"UserProgress"> | Date | string
    completedAt?: DateTimeNullableFilter<"UserProgress"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    lesson?: XOR<LessonScalarRelationFilter, LessonWhereInput>
  }

  export type UserProgressOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    lessonId?: SortOrder
    completed?: SortOrder
    score?: SortOrderInput | SortOrder
    timeSpent?: SortOrderInput | SortOrder
    attempts?: SortOrder
    lastAccessed?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    lesson?: LessonOrderByWithRelationInput
  }

  export type UserProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_lessonId?: UserProgressUserIdLessonIdCompoundUniqueInput
    AND?: UserProgressWhereInput | UserProgressWhereInput[]
    OR?: UserProgressWhereInput[]
    NOT?: UserProgressWhereInput | UserProgressWhereInput[]
    userId?: StringFilter<"UserProgress"> | string
    lessonId?: StringFilter<"UserProgress"> | string
    completed?: BoolFilter<"UserProgress"> | boolean
    score?: IntNullableFilter<"UserProgress"> | number | null
    timeSpent?: IntNullableFilter<"UserProgress"> | number | null
    attempts?: IntFilter<"UserProgress"> | number
    lastAccessed?: DateTimeFilter<"UserProgress"> | Date | string
    completedAt?: DateTimeNullableFilter<"UserProgress"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    lesson?: XOR<LessonScalarRelationFilter, LessonWhereInput>
  }, "id" | "userId_lessonId">

  export type UserProgressOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    lessonId?: SortOrder
    completed?: SortOrder
    score?: SortOrderInput | SortOrder
    timeSpent?: SortOrderInput | SortOrder
    attempts?: SortOrder
    lastAccessed?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    _count?: UserProgressCountOrderByAggregateInput
    _avg?: UserProgressAvgOrderByAggregateInput
    _max?: UserProgressMaxOrderByAggregateInput
    _min?: UserProgressMinOrderByAggregateInput
    _sum?: UserProgressSumOrderByAggregateInput
  }

  export type UserProgressScalarWhereWithAggregatesInput = {
    AND?: UserProgressScalarWhereWithAggregatesInput | UserProgressScalarWhereWithAggregatesInput[]
    OR?: UserProgressScalarWhereWithAggregatesInput[]
    NOT?: UserProgressScalarWhereWithAggregatesInput | UserProgressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserProgress"> | string
    userId?: StringWithAggregatesFilter<"UserProgress"> | string
    lessonId?: StringWithAggregatesFilter<"UserProgress"> | string
    completed?: BoolWithAggregatesFilter<"UserProgress"> | boolean
    score?: IntNullableWithAggregatesFilter<"UserProgress"> | number | null
    timeSpent?: IntNullableWithAggregatesFilter<"UserProgress"> | number | null
    attempts?: IntWithAggregatesFilter<"UserProgress"> | number
    lastAccessed?: DateTimeWithAggregatesFilter<"UserProgress"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"UserProgress"> | Date | string | null
  }

  export type VocabItemWhereInput = {
    AND?: VocabItemWhereInput | VocabItemWhereInput[]
    OR?: VocabItemWhereInput[]
    NOT?: VocabItemWhereInput | VocabItemWhereInput[]
    id?: StringFilter<"VocabItem"> | string
    courseId?: StringFilter<"VocabItem"> | string
    word?: StringFilter<"VocabItem"> | string
    translation?: StringFilter<"VocabItem"> | string
    pronunciation?: StringNullableFilter<"VocabItem"> | string | null
    audioUrl?: StringNullableFilter<"VocabItem"> | string | null
    example?: StringNullableFilter<"VocabItem"> | string | null
    exampleAudio?: StringNullableFilter<"VocabItem"> | string | null
    difficulty?: IntFilter<"VocabItem"> | number
    createdAt?: DateTimeFilter<"VocabItem"> | Date | string
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    userProgress?: UserVocabProgressListRelationFilter
  }

  export type VocabItemOrderByWithRelationInput = {
    id?: SortOrder
    courseId?: SortOrder
    word?: SortOrder
    translation?: SortOrder
    pronunciation?: SortOrderInput | SortOrder
    audioUrl?: SortOrderInput | SortOrder
    example?: SortOrderInput | SortOrder
    exampleAudio?: SortOrderInput | SortOrder
    difficulty?: SortOrder
    createdAt?: SortOrder
    course?: CourseOrderByWithRelationInput
    userProgress?: UserVocabProgressOrderByRelationAggregateInput
  }

  export type VocabItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VocabItemWhereInput | VocabItemWhereInput[]
    OR?: VocabItemWhereInput[]
    NOT?: VocabItemWhereInput | VocabItemWhereInput[]
    courseId?: StringFilter<"VocabItem"> | string
    word?: StringFilter<"VocabItem"> | string
    translation?: StringFilter<"VocabItem"> | string
    pronunciation?: StringNullableFilter<"VocabItem"> | string | null
    audioUrl?: StringNullableFilter<"VocabItem"> | string | null
    example?: StringNullableFilter<"VocabItem"> | string | null
    exampleAudio?: StringNullableFilter<"VocabItem"> | string | null
    difficulty?: IntFilter<"VocabItem"> | number
    createdAt?: DateTimeFilter<"VocabItem"> | Date | string
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    userProgress?: UserVocabProgressListRelationFilter
  }, "id">

  export type VocabItemOrderByWithAggregationInput = {
    id?: SortOrder
    courseId?: SortOrder
    word?: SortOrder
    translation?: SortOrder
    pronunciation?: SortOrderInput | SortOrder
    audioUrl?: SortOrderInput | SortOrder
    example?: SortOrderInput | SortOrder
    exampleAudio?: SortOrderInput | SortOrder
    difficulty?: SortOrder
    createdAt?: SortOrder
    _count?: VocabItemCountOrderByAggregateInput
    _avg?: VocabItemAvgOrderByAggregateInput
    _max?: VocabItemMaxOrderByAggregateInput
    _min?: VocabItemMinOrderByAggregateInput
    _sum?: VocabItemSumOrderByAggregateInput
  }

  export type VocabItemScalarWhereWithAggregatesInput = {
    AND?: VocabItemScalarWhereWithAggregatesInput | VocabItemScalarWhereWithAggregatesInput[]
    OR?: VocabItemScalarWhereWithAggregatesInput[]
    NOT?: VocabItemScalarWhereWithAggregatesInput | VocabItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VocabItem"> | string
    courseId?: StringWithAggregatesFilter<"VocabItem"> | string
    word?: StringWithAggregatesFilter<"VocabItem"> | string
    translation?: StringWithAggregatesFilter<"VocabItem"> | string
    pronunciation?: StringNullableWithAggregatesFilter<"VocabItem"> | string | null
    audioUrl?: StringNullableWithAggregatesFilter<"VocabItem"> | string | null
    example?: StringNullableWithAggregatesFilter<"VocabItem"> | string | null
    exampleAudio?: StringNullableWithAggregatesFilter<"VocabItem"> | string | null
    difficulty?: IntWithAggregatesFilter<"VocabItem"> | number
    createdAt?: DateTimeWithAggregatesFilter<"VocabItem"> | Date | string
  }

  export type UserVocabProgressWhereInput = {
    AND?: UserVocabProgressWhereInput | UserVocabProgressWhereInput[]
    OR?: UserVocabProgressWhereInput[]
    NOT?: UserVocabProgressWhereInput | UserVocabProgressWhereInput[]
    id?: StringFilter<"UserVocabProgress"> | string
    userId?: StringFilter<"UserVocabProgress"> | string
    vocabId?: StringFilter<"UserVocabProgress"> | string
    masteryLevel?: IntFilter<"UserVocabProgress"> | number
    correctCount?: IntFilter<"UserVocabProgress"> | number
    wrongCount?: IntFilter<"UserVocabProgress"> | number
    lastReviewed?: DateTimeNullableFilter<"UserVocabProgress"> | Date | string | null
    nextReview?: DateTimeNullableFilter<"UserVocabProgress"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    vocab?: XOR<VocabItemScalarRelationFilter, VocabItemWhereInput>
  }

  export type UserVocabProgressOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    vocabId?: SortOrder
    masteryLevel?: SortOrder
    correctCount?: SortOrder
    wrongCount?: SortOrder
    lastReviewed?: SortOrderInput | SortOrder
    nextReview?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    vocab?: VocabItemOrderByWithRelationInput
  }

  export type UserVocabProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_vocabId?: UserVocabProgressUserIdVocabIdCompoundUniqueInput
    AND?: UserVocabProgressWhereInput | UserVocabProgressWhereInput[]
    OR?: UserVocabProgressWhereInput[]
    NOT?: UserVocabProgressWhereInput | UserVocabProgressWhereInput[]
    userId?: StringFilter<"UserVocabProgress"> | string
    vocabId?: StringFilter<"UserVocabProgress"> | string
    masteryLevel?: IntFilter<"UserVocabProgress"> | number
    correctCount?: IntFilter<"UserVocabProgress"> | number
    wrongCount?: IntFilter<"UserVocabProgress"> | number
    lastReviewed?: DateTimeNullableFilter<"UserVocabProgress"> | Date | string | null
    nextReview?: DateTimeNullableFilter<"UserVocabProgress"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    vocab?: XOR<VocabItemScalarRelationFilter, VocabItemWhereInput>
  }, "id" | "userId_vocabId">

  export type UserVocabProgressOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    vocabId?: SortOrder
    masteryLevel?: SortOrder
    correctCount?: SortOrder
    wrongCount?: SortOrder
    lastReviewed?: SortOrderInput | SortOrder
    nextReview?: SortOrderInput | SortOrder
    _count?: UserVocabProgressCountOrderByAggregateInput
    _avg?: UserVocabProgressAvgOrderByAggregateInput
    _max?: UserVocabProgressMaxOrderByAggregateInput
    _min?: UserVocabProgressMinOrderByAggregateInput
    _sum?: UserVocabProgressSumOrderByAggregateInput
  }

  export type UserVocabProgressScalarWhereWithAggregatesInput = {
    AND?: UserVocabProgressScalarWhereWithAggregatesInput | UserVocabProgressScalarWhereWithAggregatesInput[]
    OR?: UserVocabProgressScalarWhereWithAggregatesInput[]
    NOT?: UserVocabProgressScalarWhereWithAggregatesInput | UserVocabProgressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserVocabProgress"> | string
    userId?: StringWithAggregatesFilter<"UserVocabProgress"> | string
    vocabId?: StringWithAggregatesFilter<"UserVocabProgress"> | string
    masteryLevel?: IntWithAggregatesFilter<"UserVocabProgress"> | number
    correctCount?: IntWithAggregatesFilter<"UserVocabProgress"> | number
    wrongCount?: IntWithAggregatesFilter<"UserVocabProgress"> | number
    lastReviewed?: DateTimeNullableWithAggregatesFilter<"UserVocabProgress"> | Date | string | null
    nextReview?: DateTimeNullableWithAggregatesFilter<"UserVocabProgress"> | Date | string | null
  }

  export type UserCreateInput = {
    id?: string
    username: string
    email?: string | null
    passwordHash?: string | null
    displayName?: string | null
    avatarUrl?: string | null
    role?: string
    language?: string
    preferredLangs?: string | null
    settings?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    conversations?: ConversationCreateNestedManyWithoutUserInput
    progress?: UserProgressCreateNestedManyWithoutUserInput
    vocabProgress?: UserVocabProgressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    email?: string | null
    passwordHash?: string | null
    displayName?: string | null
    avatarUrl?: string | null
    role?: string
    language?: string
    preferredLangs?: string | null
    settings?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    conversations?: ConversationUncheckedCreateNestedManyWithoutUserInput
    progress?: UserProgressUncheckedCreateNestedManyWithoutUserInput
    vocabProgress?: UserVocabProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    preferredLangs?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    conversations?: ConversationUpdateManyWithoutUserNestedInput
    progress?: UserProgressUpdateManyWithoutUserNestedInput
    vocabProgress?: UserVocabProgressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    preferredLangs?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    conversations?: ConversationUncheckedUpdateManyWithoutUserNestedInput
    progress?: UserProgressUncheckedUpdateManyWithoutUserNestedInput
    vocabProgress?: UserVocabProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    email?: string | null
    passwordHash?: string | null
    displayName?: string | null
    avatarUrl?: string | null
    role?: string
    language?: string
    preferredLangs?: string | null
    settings?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    preferredLangs?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    preferredLangs?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CourseCreateInput = {
    id?: string
    title: string
    description?: string | null
    language: string
    level?: string
    category?: string | null
    coverUrl?: string | null
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    metadata?: string | null
    units?: UnitCreateNestedManyWithoutCourseInput
    vocabs?: VocabItemCreateNestedManyWithoutCourseInput
    conversations?: ConversationCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    language: string
    level?: string
    category?: string | null
    coverUrl?: string | null
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    metadata?: string | null
    units?: UnitUncheckedCreateNestedManyWithoutCourseInput
    vocabs?: VocabItemUncheckedCreateNestedManyWithoutCourseInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    units?: UnitUpdateManyWithoutCourseNestedInput
    vocabs?: VocabItemUpdateManyWithoutCourseNestedInput
    conversations?: ConversationUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    units?: UnitUncheckedUpdateManyWithoutCourseNestedInput
    vocabs?: VocabItemUncheckedUpdateManyWithoutCourseNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    language: string
    level?: string
    category?: string | null
    coverUrl?: string | null
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    metadata?: string | null
  }

  export type CourseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CourseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UnitCreateInput = {
    id?: string
    title: string
    description?: string | null
    orderIndex: number
    createdAt?: Date | string
    course: CourseCreateNestedOneWithoutUnitsInput
    lessons?: LessonCreateNestedManyWithoutUnitInput
  }

  export type UnitUncheckedCreateInput = {
    id?: string
    courseId: string
    title: string
    description?: string | null
    orderIndex: number
    createdAt?: Date | string
    lessons?: LessonUncheckedCreateNestedManyWithoutUnitInput
  }

  export type UnitUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    course?: CourseUpdateOneRequiredWithoutUnitsNestedInput
    lessons?: LessonUpdateManyWithoutUnitNestedInput
  }

  export type UnitUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lessons?: LessonUncheckedUpdateManyWithoutUnitNestedInput
  }

  export type UnitCreateManyInput = {
    id?: string
    courseId: string
    title: string
    description?: string | null
    orderIndex: number
    createdAt?: Date | string
  }

  export type UnitUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UnitUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LessonCreateInput = {
    id?: string
    title: string
    content?: string | null
    lessonType?: string
    orderIndex: number
    duration?: number | null
    createdAt?: Date | string
    unit: UnitCreateNestedOneWithoutLessonsInput
    progress?: UserProgressCreateNestedManyWithoutLessonInput
    conversations?: ConversationCreateNestedManyWithoutLessonInput
  }

  export type LessonUncheckedCreateInput = {
    id?: string
    unitId: string
    title: string
    content?: string | null
    lessonType?: string
    orderIndex: number
    duration?: number | null
    createdAt?: Date | string
    progress?: UserProgressUncheckedCreateNestedManyWithoutLessonInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutLessonInput
  }

  export type LessonUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    lessonType?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unit?: UnitUpdateOneRequiredWithoutLessonsNestedInput
    progress?: UserProgressUpdateManyWithoutLessonNestedInput
    conversations?: ConversationUpdateManyWithoutLessonNestedInput
  }

  export type LessonUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    unitId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    lessonType?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    progress?: UserProgressUncheckedUpdateManyWithoutLessonNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutLessonNestedInput
  }

  export type LessonCreateManyInput = {
    id?: string
    unitId: string
    title: string
    content?: string | null
    lessonType?: string
    orderIndex: number
    duration?: number | null
    createdAt?: Date | string
  }

  export type LessonUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    lessonType?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LessonUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    unitId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    lessonType?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationCreateInput = {
    id?: string
    title?: string | null
    status?: string
    context?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutConversationsInput
    course?: CourseCreateNestedOneWithoutConversationsInput
    lesson?: LessonCreateNestedOneWithoutConversationsInput
    messages?: MessageCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateInput = {
    id?: string
    userId: string
    courseId?: string | null
    lessonId?: string | null
    title?: string | null
    status?: string
    context?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutConversationsNestedInput
    course?: CourseUpdateOneWithoutConversationsNestedInput
    lesson?: LessonUpdateOneWithoutConversationsNestedInput
    messages?: MessageUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    courseId?: NullableStringFieldUpdateOperationsInput | string | null
    lessonId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationCreateManyInput = {
    id?: string
    userId: string
    courseId?: string | null
    lessonId?: string | null
    title?: string | null
    status?: string
    context?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    courseId?: NullableStringFieldUpdateOperationsInput | string | null
    lessonId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateInput = {
    id?: string
    role: string
    content: string
    audioUrl?: string | null
    audioDuration?: number | null
    metadata?: string | null
    createdAt?: Date | string
    conversation: ConversationCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    conversationId: string
    role: string
    content: string
    audioUrl?: string | null
    audioDuration?: number | null
    metadata?: string | null
    createdAt?: Date | string
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    audioDuration?: NullableFloatFieldUpdateOperationsInput | number | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    audioDuration?: NullableFloatFieldUpdateOperationsInput | number | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyInput = {
    id?: string
    conversationId: string
    role: string
    content: string
    audioUrl?: string | null
    audioDuration?: number | null
    metadata?: string | null
    createdAt?: Date | string
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    audioDuration?: NullableFloatFieldUpdateOperationsInput | number | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    audioDuration?: NullableFloatFieldUpdateOperationsInput | number | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProgressCreateInput = {
    id?: string
    completed?: boolean
    score?: number | null
    timeSpent?: number | null
    attempts?: number
    lastAccessed?: Date | string
    completedAt?: Date | string | null
    user: UserCreateNestedOneWithoutProgressInput
    lesson: LessonCreateNestedOneWithoutProgressInput
  }

  export type UserProgressUncheckedCreateInput = {
    id?: string
    userId: string
    lessonId: string
    completed?: boolean
    score?: number | null
    timeSpent?: number | null
    attempts?: number
    lastAccessed?: Date | string
    completedAt?: Date | string | null
  }

  export type UserProgressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    score?: NullableIntFieldUpdateOperationsInput | number | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    attempts?: IntFieldUpdateOperationsInput | number
    lastAccessed?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutProgressNestedInput
    lesson?: LessonUpdateOneRequiredWithoutProgressNestedInput
  }

  export type UserProgressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    lessonId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    score?: NullableIntFieldUpdateOperationsInput | number | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    attempts?: IntFieldUpdateOperationsInput | number
    lastAccessed?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserProgressCreateManyInput = {
    id?: string
    userId: string
    lessonId: string
    completed?: boolean
    score?: number | null
    timeSpent?: number | null
    attempts?: number
    lastAccessed?: Date | string
    completedAt?: Date | string | null
  }

  export type UserProgressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    score?: NullableIntFieldUpdateOperationsInput | number | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    attempts?: IntFieldUpdateOperationsInput | number
    lastAccessed?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserProgressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    lessonId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    score?: NullableIntFieldUpdateOperationsInput | number | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    attempts?: IntFieldUpdateOperationsInput | number
    lastAccessed?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VocabItemCreateInput = {
    id?: string
    word: string
    translation: string
    pronunciation?: string | null
    audioUrl?: string | null
    example?: string | null
    exampleAudio?: string | null
    difficulty?: number
    createdAt?: Date | string
    course: CourseCreateNestedOneWithoutVocabsInput
    userProgress?: UserVocabProgressCreateNestedManyWithoutVocabInput
  }

  export type VocabItemUncheckedCreateInput = {
    id?: string
    courseId: string
    word: string
    translation: string
    pronunciation?: string | null
    audioUrl?: string | null
    example?: string | null
    exampleAudio?: string | null
    difficulty?: number
    createdAt?: Date | string
    userProgress?: UserVocabProgressUncheckedCreateNestedManyWithoutVocabInput
  }

  export type VocabItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    word?: StringFieldUpdateOperationsInput | string
    translation?: StringFieldUpdateOperationsInput | string
    pronunciation?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    exampleAudio?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    course?: CourseUpdateOneRequiredWithoutVocabsNestedInput
    userProgress?: UserVocabProgressUpdateManyWithoutVocabNestedInput
  }

  export type VocabItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    word?: StringFieldUpdateOperationsInput | string
    translation?: StringFieldUpdateOperationsInput | string
    pronunciation?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    exampleAudio?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userProgress?: UserVocabProgressUncheckedUpdateManyWithoutVocabNestedInput
  }

  export type VocabItemCreateManyInput = {
    id?: string
    courseId: string
    word: string
    translation: string
    pronunciation?: string | null
    audioUrl?: string | null
    example?: string | null
    exampleAudio?: string | null
    difficulty?: number
    createdAt?: Date | string
  }

  export type VocabItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    word?: StringFieldUpdateOperationsInput | string
    translation?: StringFieldUpdateOperationsInput | string
    pronunciation?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    exampleAudio?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VocabItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    word?: StringFieldUpdateOperationsInput | string
    translation?: StringFieldUpdateOperationsInput | string
    pronunciation?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    exampleAudio?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserVocabProgressCreateInput = {
    id?: string
    masteryLevel?: number
    correctCount?: number
    wrongCount?: number
    lastReviewed?: Date | string | null
    nextReview?: Date | string | null
    user: UserCreateNestedOneWithoutVocabProgressInput
    vocab: VocabItemCreateNestedOneWithoutUserProgressInput
  }

  export type UserVocabProgressUncheckedCreateInput = {
    id?: string
    userId: string
    vocabId: string
    masteryLevel?: number
    correctCount?: number
    wrongCount?: number
    lastReviewed?: Date | string | null
    nextReview?: Date | string | null
  }

  export type UserVocabProgressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    masteryLevel?: IntFieldUpdateOperationsInput | number
    correctCount?: IntFieldUpdateOperationsInput | number
    wrongCount?: IntFieldUpdateOperationsInput | number
    lastReviewed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextReview?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutVocabProgressNestedInput
    vocab?: VocabItemUpdateOneRequiredWithoutUserProgressNestedInput
  }

  export type UserVocabProgressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    vocabId?: StringFieldUpdateOperationsInput | string
    masteryLevel?: IntFieldUpdateOperationsInput | number
    correctCount?: IntFieldUpdateOperationsInput | number
    wrongCount?: IntFieldUpdateOperationsInput | number
    lastReviewed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextReview?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserVocabProgressCreateManyInput = {
    id?: string
    userId: string
    vocabId: string
    masteryLevel?: number
    correctCount?: number
    wrongCount?: number
    lastReviewed?: Date | string | null
    nextReview?: Date | string | null
  }

  export type UserVocabProgressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    masteryLevel?: IntFieldUpdateOperationsInput | number
    correctCount?: IntFieldUpdateOperationsInput | number
    wrongCount?: IntFieldUpdateOperationsInput | number
    lastReviewed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextReview?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserVocabProgressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    vocabId?: StringFieldUpdateOperationsInput | string
    masteryLevel?: IntFieldUpdateOperationsInput | number
    correctCount?: IntFieldUpdateOperationsInput | number
    wrongCount?: IntFieldUpdateOperationsInput | number
    lastReviewed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextReview?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ConversationListRelationFilter = {
    every?: ConversationWhereInput
    some?: ConversationWhereInput
    none?: ConversationWhereInput
  }

  export type UserProgressListRelationFilter = {
    every?: UserProgressWhereInput
    some?: UserProgressWhereInput
    none?: UserProgressWhereInput
  }

  export type UserVocabProgressListRelationFilter = {
    every?: UserVocabProgressWhereInput
    some?: UserVocabProgressWhereInput
    none?: UserVocabProgressWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ConversationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserProgressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserVocabProgressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    displayName?: SortOrder
    avatarUrl?: SortOrder
    role?: SortOrder
    language?: SortOrder
    preferredLangs?: SortOrder
    settings?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    displayName?: SortOrder
    avatarUrl?: SortOrder
    role?: SortOrder
    language?: SortOrder
    preferredLangs?: SortOrder
    settings?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    displayName?: SortOrder
    avatarUrl?: SortOrder
    role?: SortOrder
    language?: SortOrder
    preferredLangs?: SortOrder
    settings?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UnitListRelationFilter = {
    every?: UnitWhereInput
    some?: UnitWhereInput
    none?: UnitWhereInput
  }

  export type VocabItemListRelationFilter = {
    every?: VocabItemWhereInput
    some?: VocabItemWhereInput
    none?: VocabItemWhereInput
  }

  export type UnitOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VocabItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CourseCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    language?: SortOrder
    level?: SortOrder
    category?: SortOrder
    coverUrl?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    metadata?: SortOrder
  }

  export type CourseMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    language?: SortOrder
    level?: SortOrder
    category?: SortOrder
    coverUrl?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    metadata?: SortOrder
  }

  export type CourseMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    language?: SortOrder
    level?: SortOrder
    category?: SortOrder
    coverUrl?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    metadata?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type CourseScalarRelationFilter = {
    is?: CourseWhereInput
    isNot?: CourseWhereInput
  }

  export type LessonListRelationFilter = {
    every?: LessonWhereInput
    some?: LessonWhereInput
    none?: LessonWhereInput
  }

  export type LessonOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UnitCountOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
  }

  export type UnitAvgOrderByAggregateInput = {
    orderIndex?: SortOrder
  }

  export type UnitMaxOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
  }

  export type UnitMinOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
  }

  export type UnitSumOrderByAggregateInput = {
    orderIndex?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UnitScalarRelationFilter = {
    is?: UnitWhereInput
    isNot?: UnitWhereInput
  }

  export type LessonCountOrderByAggregateInput = {
    id?: SortOrder
    unitId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    lessonType?: SortOrder
    orderIndex?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
  }

  export type LessonAvgOrderByAggregateInput = {
    orderIndex?: SortOrder
    duration?: SortOrder
  }

  export type LessonMaxOrderByAggregateInput = {
    id?: SortOrder
    unitId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    lessonType?: SortOrder
    orderIndex?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
  }

  export type LessonMinOrderByAggregateInput = {
    id?: SortOrder
    unitId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    lessonType?: SortOrder
    orderIndex?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
  }

  export type LessonSumOrderByAggregateInput = {
    orderIndex?: SortOrder
    duration?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CourseNullableScalarRelationFilter = {
    is?: CourseWhereInput | null
    isNot?: CourseWhereInput | null
  }

  export type LessonNullableScalarRelationFilter = {
    is?: LessonWhereInput | null
    isNot?: LessonWhereInput | null
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConversationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    courseId?: SortOrder
    lessonId?: SortOrder
    title?: SortOrder
    status?: SortOrder
    context?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConversationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    courseId?: SortOrder
    lessonId?: SortOrder
    title?: SortOrder
    status?: SortOrder
    context?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConversationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    courseId?: SortOrder
    lessonId?: SortOrder
    title?: SortOrder
    status?: SortOrder
    context?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ConversationScalarRelationFilter = {
    is?: ConversationWhereInput
    isNot?: ConversationWhereInput
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    audioUrl?: SortOrder
    audioDuration?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageAvgOrderByAggregateInput = {
    audioDuration?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    audioUrl?: SortOrder
    audioDuration?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    audioUrl?: SortOrder
    audioDuration?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageSumOrderByAggregateInput = {
    audioDuration?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type LessonScalarRelationFilter = {
    is?: LessonWhereInput
    isNot?: LessonWhereInput
  }

  export type UserProgressUserIdLessonIdCompoundUniqueInput = {
    userId: string
    lessonId: string
  }

  export type UserProgressCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    lessonId?: SortOrder
    completed?: SortOrder
    score?: SortOrder
    timeSpent?: SortOrder
    attempts?: SortOrder
    lastAccessed?: SortOrder
    completedAt?: SortOrder
  }

  export type UserProgressAvgOrderByAggregateInput = {
    score?: SortOrder
    timeSpent?: SortOrder
    attempts?: SortOrder
  }

  export type UserProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    lessonId?: SortOrder
    completed?: SortOrder
    score?: SortOrder
    timeSpent?: SortOrder
    attempts?: SortOrder
    lastAccessed?: SortOrder
    completedAt?: SortOrder
  }

  export type UserProgressMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    lessonId?: SortOrder
    completed?: SortOrder
    score?: SortOrder
    timeSpent?: SortOrder
    attempts?: SortOrder
    lastAccessed?: SortOrder
    completedAt?: SortOrder
  }

  export type UserProgressSumOrderByAggregateInput = {
    score?: SortOrder
    timeSpent?: SortOrder
    attempts?: SortOrder
  }

  export type VocabItemCountOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
    word?: SortOrder
    translation?: SortOrder
    pronunciation?: SortOrder
    audioUrl?: SortOrder
    example?: SortOrder
    exampleAudio?: SortOrder
    difficulty?: SortOrder
    createdAt?: SortOrder
  }

  export type VocabItemAvgOrderByAggregateInput = {
    difficulty?: SortOrder
  }

  export type VocabItemMaxOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
    word?: SortOrder
    translation?: SortOrder
    pronunciation?: SortOrder
    audioUrl?: SortOrder
    example?: SortOrder
    exampleAudio?: SortOrder
    difficulty?: SortOrder
    createdAt?: SortOrder
  }

  export type VocabItemMinOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
    word?: SortOrder
    translation?: SortOrder
    pronunciation?: SortOrder
    audioUrl?: SortOrder
    example?: SortOrder
    exampleAudio?: SortOrder
    difficulty?: SortOrder
    createdAt?: SortOrder
  }

  export type VocabItemSumOrderByAggregateInput = {
    difficulty?: SortOrder
  }

  export type VocabItemScalarRelationFilter = {
    is?: VocabItemWhereInput
    isNot?: VocabItemWhereInput
  }

  export type UserVocabProgressUserIdVocabIdCompoundUniqueInput = {
    userId: string
    vocabId: string
  }

  export type UserVocabProgressCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    vocabId?: SortOrder
    masteryLevel?: SortOrder
    correctCount?: SortOrder
    wrongCount?: SortOrder
    lastReviewed?: SortOrder
    nextReview?: SortOrder
  }

  export type UserVocabProgressAvgOrderByAggregateInput = {
    masteryLevel?: SortOrder
    correctCount?: SortOrder
    wrongCount?: SortOrder
  }

  export type UserVocabProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    vocabId?: SortOrder
    masteryLevel?: SortOrder
    correctCount?: SortOrder
    wrongCount?: SortOrder
    lastReviewed?: SortOrder
    nextReview?: SortOrder
  }

  export type UserVocabProgressMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    vocabId?: SortOrder
    masteryLevel?: SortOrder
    correctCount?: SortOrder
    wrongCount?: SortOrder
    lastReviewed?: SortOrder
    nextReview?: SortOrder
  }

  export type UserVocabProgressSumOrderByAggregateInput = {
    masteryLevel?: SortOrder
    correctCount?: SortOrder
    wrongCount?: SortOrder
  }

  export type ConversationCreateNestedManyWithoutUserInput = {
    create?: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput> | ConversationCreateWithoutUserInput[] | ConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutUserInput | ConversationCreateOrConnectWithoutUserInput[]
    createMany?: ConversationCreateManyUserInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type UserProgressCreateNestedManyWithoutUserInput = {
    create?: XOR<UserProgressCreateWithoutUserInput, UserProgressUncheckedCreateWithoutUserInput> | UserProgressCreateWithoutUserInput[] | UserProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserProgressCreateOrConnectWithoutUserInput | UserProgressCreateOrConnectWithoutUserInput[]
    createMany?: UserProgressCreateManyUserInputEnvelope
    connect?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
  }

  export type UserVocabProgressCreateNestedManyWithoutUserInput = {
    create?: XOR<UserVocabProgressCreateWithoutUserInput, UserVocabProgressUncheckedCreateWithoutUserInput> | UserVocabProgressCreateWithoutUserInput[] | UserVocabProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserVocabProgressCreateOrConnectWithoutUserInput | UserVocabProgressCreateOrConnectWithoutUserInput[]
    createMany?: UserVocabProgressCreateManyUserInputEnvelope
    connect?: UserVocabProgressWhereUniqueInput | UserVocabProgressWhereUniqueInput[]
  }

  export type ConversationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput> | ConversationCreateWithoutUserInput[] | ConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutUserInput | ConversationCreateOrConnectWithoutUserInput[]
    createMany?: ConversationCreateManyUserInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type UserProgressUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserProgressCreateWithoutUserInput, UserProgressUncheckedCreateWithoutUserInput> | UserProgressCreateWithoutUserInput[] | UserProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserProgressCreateOrConnectWithoutUserInput | UserProgressCreateOrConnectWithoutUserInput[]
    createMany?: UserProgressCreateManyUserInputEnvelope
    connect?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
  }

  export type UserVocabProgressUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserVocabProgressCreateWithoutUserInput, UserVocabProgressUncheckedCreateWithoutUserInput> | UserVocabProgressCreateWithoutUserInput[] | UserVocabProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserVocabProgressCreateOrConnectWithoutUserInput | UserVocabProgressCreateOrConnectWithoutUserInput[]
    createMany?: UserVocabProgressCreateManyUserInputEnvelope
    connect?: UserVocabProgressWhereUniqueInput | UserVocabProgressWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ConversationUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput> | ConversationCreateWithoutUserInput[] | ConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutUserInput | ConversationCreateOrConnectWithoutUserInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutUserInput | ConversationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConversationCreateManyUserInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutUserInput | ConversationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutUserInput | ConversationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type UserProgressUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserProgressCreateWithoutUserInput, UserProgressUncheckedCreateWithoutUserInput> | UserProgressCreateWithoutUserInput[] | UserProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserProgressCreateOrConnectWithoutUserInput | UserProgressCreateOrConnectWithoutUserInput[]
    upsert?: UserProgressUpsertWithWhereUniqueWithoutUserInput | UserProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserProgressCreateManyUserInputEnvelope
    set?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    disconnect?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    delete?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    connect?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    update?: UserProgressUpdateWithWhereUniqueWithoutUserInput | UserProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserProgressUpdateManyWithWhereWithoutUserInput | UserProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserProgressScalarWhereInput | UserProgressScalarWhereInput[]
  }

  export type UserVocabProgressUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserVocabProgressCreateWithoutUserInput, UserVocabProgressUncheckedCreateWithoutUserInput> | UserVocabProgressCreateWithoutUserInput[] | UserVocabProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserVocabProgressCreateOrConnectWithoutUserInput | UserVocabProgressCreateOrConnectWithoutUserInput[]
    upsert?: UserVocabProgressUpsertWithWhereUniqueWithoutUserInput | UserVocabProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserVocabProgressCreateManyUserInputEnvelope
    set?: UserVocabProgressWhereUniqueInput | UserVocabProgressWhereUniqueInput[]
    disconnect?: UserVocabProgressWhereUniqueInput | UserVocabProgressWhereUniqueInput[]
    delete?: UserVocabProgressWhereUniqueInput | UserVocabProgressWhereUniqueInput[]
    connect?: UserVocabProgressWhereUniqueInput | UserVocabProgressWhereUniqueInput[]
    update?: UserVocabProgressUpdateWithWhereUniqueWithoutUserInput | UserVocabProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserVocabProgressUpdateManyWithWhereWithoutUserInput | UserVocabProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserVocabProgressScalarWhereInput | UserVocabProgressScalarWhereInput[]
  }

  export type ConversationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput> | ConversationCreateWithoutUserInput[] | ConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutUserInput | ConversationCreateOrConnectWithoutUserInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutUserInput | ConversationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConversationCreateManyUserInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutUserInput | ConversationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutUserInput | ConversationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type UserProgressUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserProgressCreateWithoutUserInput, UserProgressUncheckedCreateWithoutUserInput> | UserProgressCreateWithoutUserInput[] | UserProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserProgressCreateOrConnectWithoutUserInput | UserProgressCreateOrConnectWithoutUserInput[]
    upsert?: UserProgressUpsertWithWhereUniqueWithoutUserInput | UserProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserProgressCreateManyUserInputEnvelope
    set?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    disconnect?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    delete?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    connect?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    update?: UserProgressUpdateWithWhereUniqueWithoutUserInput | UserProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserProgressUpdateManyWithWhereWithoutUserInput | UserProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserProgressScalarWhereInput | UserProgressScalarWhereInput[]
  }

  export type UserVocabProgressUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserVocabProgressCreateWithoutUserInput, UserVocabProgressUncheckedCreateWithoutUserInput> | UserVocabProgressCreateWithoutUserInput[] | UserVocabProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserVocabProgressCreateOrConnectWithoutUserInput | UserVocabProgressCreateOrConnectWithoutUserInput[]
    upsert?: UserVocabProgressUpsertWithWhereUniqueWithoutUserInput | UserVocabProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserVocabProgressCreateManyUserInputEnvelope
    set?: UserVocabProgressWhereUniqueInput | UserVocabProgressWhereUniqueInput[]
    disconnect?: UserVocabProgressWhereUniqueInput | UserVocabProgressWhereUniqueInput[]
    delete?: UserVocabProgressWhereUniqueInput | UserVocabProgressWhereUniqueInput[]
    connect?: UserVocabProgressWhereUniqueInput | UserVocabProgressWhereUniqueInput[]
    update?: UserVocabProgressUpdateWithWhereUniqueWithoutUserInput | UserVocabProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserVocabProgressUpdateManyWithWhereWithoutUserInput | UserVocabProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserVocabProgressScalarWhereInput | UserVocabProgressScalarWhereInput[]
  }

  export type UnitCreateNestedManyWithoutCourseInput = {
    create?: XOR<UnitCreateWithoutCourseInput, UnitUncheckedCreateWithoutCourseInput> | UnitCreateWithoutCourseInput[] | UnitUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: UnitCreateOrConnectWithoutCourseInput | UnitCreateOrConnectWithoutCourseInput[]
    createMany?: UnitCreateManyCourseInputEnvelope
    connect?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
  }

  export type VocabItemCreateNestedManyWithoutCourseInput = {
    create?: XOR<VocabItemCreateWithoutCourseInput, VocabItemUncheckedCreateWithoutCourseInput> | VocabItemCreateWithoutCourseInput[] | VocabItemUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: VocabItemCreateOrConnectWithoutCourseInput | VocabItemCreateOrConnectWithoutCourseInput[]
    createMany?: VocabItemCreateManyCourseInputEnvelope
    connect?: VocabItemWhereUniqueInput | VocabItemWhereUniqueInput[]
  }

  export type ConversationCreateNestedManyWithoutCourseInput = {
    create?: XOR<ConversationCreateWithoutCourseInput, ConversationUncheckedCreateWithoutCourseInput> | ConversationCreateWithoutCourseInput[] | ConversationUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutCourseInput | ConversationCreateOrConnectWithoutCourseInput[]
    createMany?: ConversationCreateManyCourseInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type UnitUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<UnitCreateWithoutCourseInput, UnitUncheckedCreateWithoutCourseInput> | UnitCreateWithoutCourseInput[] | UnitUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: UnitCreateOrConnectWithoutCourseInput | UnitCreateOrConnectWithoutCourseInput[]
    createMany?: UnitCreateManyCourseInputEnvelope
    connect?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
  }

  export type VocabItemUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<VocabItemCreateWithoutCourseInput, VocabItemUncheckedCreateWithoutCourseInput> | VocabItemCreateWithoutCourseInput[] | VocabItemUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: VocabItemCreateOrConnectWithoutCourseInput | VocabItemCreateOrConnectWithoutCourseInput[]
    createMany?: VocabItemCreateManyCourseInputEnvelope
    connect?: VocabItemWhereUniqueInput | VocabItemWhereUniqueInput[]
  }

  export type ConversationUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<ConversationCreateWithoutCourseInput, ConversationUncheckedCreateWithoutCourseInput> | ConversationCreateWithoutCourseInput[] | ConversationUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutCourseInput | ConversationCreateOrConnectWithoutCourseInput[]
    createMany?: ConversationCreateManyCourseInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UnitUpdateManyWithoutCourseNestedInput = {
    create?: XOR<UnitCreateWithoutCourseInput, UnitUncheckedCreateWithoutCourseInput> | UnitCreateWithoutCourseInput[] | UnitUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: UnitCreateOrConnectWithoutCourseInput | UnitCreateOrConnectWithoutCourseInput[]
    upsert?: UnitUpsertWithWhereUniqueWithoutCourseInput | UnitUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: UnitCreateManyCourseInputEnvelope
    set?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    disconnect?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    delete?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    connect?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    update?: UnitUpdateWithWhereUniqueWithoutCourseInput | UnitUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: UnitUpdateManyWithWhereWithoutCourseInput | UnitUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: UnitScalarWhereInput | UnitScalarWhereInput[]
  }

  export type VocabItemUpdateManyWithoutCourseNestedInput = {
    create?: XOR<VocabItemCreateWithoutCourseInput, VocabItemUncheckedCreateWithoutCourseInput> | VocabItemCreateWithoutCourseInput[] | VocabItemUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: VocabItemCreateOrConnectWithoutCourseInput | VocabItemCreateOrConnectWithoutCourseInput[]
    upsert?: VocabItemUpsertWithWhereUniqueWithoutCourseInput | VocabItemUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: VocabItemCreateManyCourseInputEnvelope
    set?: VocabItemWhereUniqueInput | VocabItemWhereUniqueInput[]
    disconnect?: VocabItemWhereUniqueInput | VocabItemWhereUniqueInput[]
    delete?: VocabItemWhereUniqueInput | VocabItemWhereUniqueInput[]
    connect?: VocabItemWhereUniqueInput | VocabItemWhereUniqueInput[]
    update?: VocabItemUpdateWithWhereUniqueWithoutCourseInput | VocabItemUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: VocabItemUpdateManyWithWhereWithoutCourseInput | VocabItemUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: VocabItemScalarWhereInput | VocabItemScalarWhereInput[]
  }

  export type ConversationUpdateManyWithoutCourseNestedInput = {
    create?: XOR<ConversationCreateWithoutCourseInput, ConversationUncheckedCreateWithoutCourseInput> | ConversationCreateWithoutCourseInput[] | ConversationUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutCourseInput | ConversationCreateOrConnectWithoutCourseInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutCourseInput | ConversationUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: ConversationCreateManyCourseInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutCourseInput | ConversationUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutCourseInput | ConversationUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type UnitUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<UnitCreateWithoutCourseInput, UnitUncheckedCreateWithoutCourseInput> | UnitCreateWithoutCourseInput[] | UnitUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: UnitCreateOrConnectWithoutCourseInput | UnitCreateOrConnectWithoutCourseInput[]
    upsert?: UnitUpsertWithWhereUniqueWithoutCourseInput | UnitUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: UnitCreateManyCourseInputEnvelope
    set?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    disconnect?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    delete?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    connect?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    update?: UnitUpdateWithWhereUniqueWithoutCourseInput | UnitUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: UnitUpdateManyWithWhereWithoutCourseInput | UnitUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: UnitScalarWhereInput | UnitScalarWhereInput[]
  }

  export type VocabItemUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<VocabItemCreateWithoutCourseInput, VocabItemUncheckedCreateWithoutCourseInput> | VocabItemCreateWithoutCourseInput[] | VocabItemUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: VocabItemCreateOrConnectWithoutCourseInput | VocabItemCreateOrConnectWithoutCourseInput[]
    upsert?: VocabItemUpsertWithWhereUniqueWithoutCourseInput | VocabItemUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: VocabItemCreateManyCourseInputEnvelope
    set?: VocabItemWhereUniqueInput | VocabItemWhereUniqueInput[]
    disconnect?: VocabItemWhereUniqueInput | VocabItemWhereUniqueInput[]
    delete?: VocabItemWhereUniqueInput | VocabItemWhereUniqueInput[]
    connect?: VocabItemWhereUniqueInput | VocabItemWhereUniqueInput[]
    update?: VocabItemUpdateWithWhereUniqueWithoutCourseInput | VocabItemUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: VocabItemUpdateManyWithWhereWithoutCourseInput | VocabItemUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: VocabItemScalarWhereInput | VocabItemScalarWhereInput[]
  }

  export type ConversationUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<ConversationCreateWithoutCourseInput, ConversationUncheckedCreateWithoutCourseInput> | ConversationCreateWithoutCourseInput[] | ConversationUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutCourseInput | ConversationCreateOrConnectWithoutCourseInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutCourseInput | ConversationUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: ConversationCreateManyCourseInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutCourseInput | ConversationUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutCourseInput | ConversationUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type CourseCreateNestedOneWithoutUnitsInput = {
    create?: XOR<CourseCreateWithoutUnitsInput, CourseUncheckedCreateWithoutUnitsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutUnitsInput
    connect?: CourseWhereUniqueInput
  }

  export type LessonCreateNestedManyWithoutUnitInput = {
    create?: XOR<LessonCreateWithoutUnitInput, LessonUncheckedCreateWithoutUnitInput> | LessonCreateWithoutUnitInput[] | LessonUncheckedCreateWithoutUnitInput[]
    connectOrCreate?: LessonCreateOrConnectWithoutUnitInput | LessonCreateOrConnectWithoutUnitInput[]
    createMany?: LessonCreateManyUnitInputEnvelope
    connect?: LessonWhereUniqueInput | LessonWhereUniqueInput[]
  }

  export type LessonUncheckedCreateNestedManyWithoutUnitInput = {
    create?: XOR<LessonCreateWithoutUnitInput, LessonUncheckedCreateWithoutUnitInput> | LessonCreateWithoutUnitInput[] | LessonUncheckedCreateWithoutUnitInput[]
    connectOrCreate?: LessonCreateOrConnectWithoutUnitInput | LessonCreateOrConnectWithoutUnitInput[]
    createMany?: LessonCreateManyUnitInputEnvelope
    connect?: LessonWhereUniqueInput | LessonWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CourseUpdateOneRequiredWithoutUnitsNestedInput = {
    create?: XOR<CourseCreateWithoutUnitsInput, CourseUncheckedCreateWithoutUnitsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutUnitsInput
    upsert?: CourseUpsertWithoutUnitsInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutUnitsInput, CourseUpdateWithoutUnitsInput>, CourseUncheckedUpdateWithoutUnitsInput>
  }

  export type LessonUpdateManyWithoutUnitNestedInput = {
    create?: XOR<LessonCreateWithoutUnitInput, LessonUncheckedCreateWithoutUnitInput> | LessonCreateWithoutUnitInput[] | LessonUncheckedCreateWithoutUnitInput[]
    connectOrCreate?: LessonCreateOrConnectWithoutUnitInput | LessonCreateOrConnectWithoutUnitInput[]
    upsert?: LessonUpsertWithWhereUniqueWithoutUnitInput | LessonUpsertWithWhereUniqueWithoutUnitInput[]
    createMany?: LessonCreateManyUnitInputEnvelope
    set?: LessonWhereUniqueInput | LessonWhereUniqueInput[]
    disconnect?: LessonWhereUniqueInput | LessonWhereUniqueInput[]
    delete?: LessonWhereUniqueInput | LessonWhereUniqueInput[]
    connect?: LessonWhereUniqueInput | LessonWhereUniqueInput[]
    update?: LessonUpdateWithWhereUniqueWithoutUnitInput | LessonUpdateWithWhereUniqueWithoutUnitInput[]
    updateMany?: LessonUpdateManyWithWhereWithoutUnitInput | LessonUpdateManyWithWhereWithoutUnitInput[]
    deleteMany?: LessonScalarWhereInput | LessonScalarWhereInput[]
  }

  export type LessonUncheckedUpdateManyWithoutUnitNestedInput = {
    create?: XOR<LessonCreateWithoutUnitInput, LessonUncheckedCreateWithoutUnitInput> | LessonCreateWithoutUnitInput[] | LessonUncheckedCreateWithoutUnitInput[]
    connectOrCreate?: LessonCreateOrConnectWithoutUnitInput | LessonCreateOrConnectWithoutUnitInput[]
    upsert?: LessonUpsertWithWhereUniqueWithoutUnitInput | LessonUpsertWithWhereUniqueWithoutUnitInput[]
    createMany?: LessonCreateManyUnitInputEnvelope
    set?: LessonWhereUniqueInput | LessonWhereUniqueInput[]
    disconnect?: LessonWhereUniqueInput | LessonWhereUniqueInput[]
    delete?: LessonWhereUniqueInput | LessonWhereUniqueInput[]
    connect?: LessonWhereUniqueInput | LessonWhereUniqueInput[]
    update?: LessonUpdateWithWhereUniqueWithoutUnitInput | LessonUpdateWithWhereUniqueWithoutUnitInput[]
    updateMany?: LessonUpdateManyWithWhereWithoutUnitInput | LessonUpdateManyWithWhereWithoutUnitInput[]
    deleteMany?: LessonScalarWhereInput | LessonScalarWhereInput[]
  }

  export type UnitCreateNestedOneWithoutLessonsInput = {
    create?: XOR<UnitCreateWithoutLessonsInput, UnitUncheckedCreateWithoutLessonsInput>
    connectOrCreate?: UnitCreateOrConnectWithoutLessonsInput
    connect?: UnitWhereUniqueInput
  }

  export type UserProgressCreateNestedManyWithoutLessonInput = {
    create?: XOR<UserProgressCreateWithoutLessonInput, UserProgressUncheckedCreateWithoutLessonInput> | UserProgressCreateWithoutLessonInput[] | UserProgressUncheckedCreateWithoutLessonInput[]
    connectOrCreate?: UserProgressCreateOrConnectWithoutLessonInput | UserProgressCreateOrConnectWithoutLessonInput[]
    createMany?: UserProgressCreateManyLessonInputEnvelope
    connect?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
  }

  export type ConversationCreateNestedManyWithoutLessonInput = {
    create?: XOR<ConversationCreateWithoutLessonInput, ConversationUncheckedCreateWithoutLessonInput> | ConversationCreateWithoutLessonInput[] | ConversationUncheckedCreateWithoutLessonInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutLessonInput | ConversationCreateOrConnectWithoutLessonInput[]
    createMany?: ConversationCreateManyLessonInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type UserProgressUncheckedCreateNestedManyWithoutLessonInput = {
    create?: XOR<UserProgressCreateWithoutLessonInput, UserProgressUncheckedCreateWithoutLessonInput> | UserProgressCreateWithoutLessonInput[] | UserProgressUncheckedCreateWithoutLessonInput[]
    connectOrCreate?: UserProgressCreateOrConnectWithoutLessonInput | UserProgressCreateOrConnectWithoutLessonInput[]
    createMany?: UserProgressCreateManyLessonInputEnvelope
    connect?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
  }

  export type ConversationUncheckedCreateNestedManyWithoutLessonInput = {
    create?: XOR<ConversationCreateWithoutLessonInput, ConversationUncheckedCreateWithoutLessonInput> | ConversationCreateWithoutLessonInput[] | ConversationUncheckedCreateWithoutLessonInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutLessonInput | ConversationCreateOrConnectWithoutLessonInput[]
    createMany?: ConversationCreateManyLessonInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UnitUpdateOneRequiredWithoutLessonsNestedInput = {
    create?: XOR<UnitCreateWithoutLessonsInput, UnitUncheckedCreateWithoutLessonsInput>
    connectOrCreate?: UnitCreateOrConnectWithoutLessonsInput
    upsert?: UnitUpsertWithoutLessonsInput
    connect?: UnitWhereUniqueInput
    update?: XOR<XOR<UnitUpdateToOneWithWhereWithoutLessonsInput, UnitUpdateWithoutLessonsInput>, UnitUncheckedUpdateWithoutLessonsInput>
  }

  export type UserProgressUpdateManyWithoutLessonNestedInput = {
    create?: XOR<UserProgressCreateWithoutLessonInput, UserProgressUncheckedCreateWithoutLessonInput> | UserProgressCreateWithoutLessonInput[] | UserProgressUncheckedCreateWithoutLessonInput[]
    connectOrCreate?: UserProgressCreateOrConnectWithoutLessonInput | UserProgressCreateOrConnectWithoutLessonInput[]
    upsert?: UserProgressUpsertWithWhereUniqueWithoutLessonInput | UserProgressUpsertWithWhereUniqueWithoutLessonInput[]
    createMany?: UserProgressCreateManyLessonInputEnvelope
    set?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    disconnect?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    delete?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    connect?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    update?: UserProgressUpdateWithWhereUniqueWithoutLessonInput | UserProgressUpdateWithWhereUniqueWithoutLessonInput[]
    updateMany?: UserProgressUpdateManyWithWhereWithoutLessonInput | UserProgressUpdateManyWithWhereWithoutLessonInput[]
    deleteMany?: UserProgressScalarWhereInput | UserProgressScalarWhereInput[]
  }

  export type ConversationUpdateManyWithoutLessonNestedInput = {
    create?: XOR<ConversationCreateWithoutLessonInput, ConversationUncheckedCreateWithoutLessonInput> | ConversationCreateWithoutLessonInput[] | ConversationUncheckedCreateWithoutLessonInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutLessonInput | ConversationCreateOrConnectWithoutLessonInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutLessonInput | ConversationUpsertWithWhereUniqueWithoutLessonInput[]
    createMany?: ConversationCreateManyLessonInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutLessonInput | ConversationUpdateWithWhereUniqueWithoutLessonInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutLessonInput | ConversationUpdateManyWithWhereWithoutLessonInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type UserProgressUncheckedUpdateManyWithoutLessonNestedInput = {
    create?: XOR<UserProgressCreateWithoutLessonInput, UserProgressUncheckedCreateWithoutLessonInput> | UserProgressCreateWithoutLessonInput[] | UserProgressUncheckedCreateWithoutLessonInput[]
    connectOrCreate?: UserProgressCreateOrConnectWithoutLessonInput | UserProgressCreateOrConnectWithoutLessonInput[]
    upsert?: UserProgressUpsertWithWhereUniqueWithoutLessonInput | UserProgressUpsertWithWhereUniqueWithoutLessonInput[]
    createMany?: UserProgressCreateManyLessonInputEnvelope
    set?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    disconnect?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    delete?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    connect?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    update?: UserProgressUpdateWithWhereUniqueWithoutLessonInput | UserProgressUpdateWithWhereUniqueWithoutLessonInput[]
    updateMany?: UserProgressUpdateManyWithWhereWithoutLessonInput | UserProgressUpdateManyWithWhereWithoutLessonInput[]
    deleteMany?: UserProgressScalarWhereInput | UserProgressScalarWhereInput[]
  }

  export type ConversationUncheckedUpdateManyWithoutLessonNestedInput = {
    create?: XOR<ConversationCreateWithoutLessonInput, ConversationUncheckedCreateWithoutLessonInput> | ConversationCreateWithoutLessonInput[] | ConversationUncheckedCreateWithoutLessonInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutLessonInput | ConversationCreateOrConnectWithoutLessonInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutLessonInput | ConversationUpsertWithWhereUniqueWithoutLessonInput[]
    createMany?: ConversationCreateManyLessonInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutLessonInput | ConversationUpdateWithWhereUniqueWithoutLessonInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutLessonInput | ConversationUpdateManyWithWhereWithoutLessonInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutConversationsInput = {
    create?: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConversationsInput
    connect?: UserWhereUniqueInput
  }

  export type CourseCreateNestedOneWithoutConversationsInput = {
    create?: XOR<CourseCreateWithoutConversationsInput, CourseUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutConversationsInput
    connect?: CourseWhereUniqueInput
  }

  export type LessonCreateNestedOneWithoutConversationsInput = {
    create?: XOR<LessonCreateWithoutConversationsInput, LessonUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: LessonCreateOrConnectWithoutConversationsInput
    connect?: LessonWhereUniqueInput
  }

  export type MessageCreateNestedManyWithoutConversationInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutConversationInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutConversationsNestedInput = {
    create?: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConversationsInput
    upsert?: UserUpsertWithoutConversationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutConversationsInput, UserUpdateWithoutConversationsInput>, UserUncheckedUpdateWithoutConversationsInput>
  }

  export type CourseUpdateOneWithoutConversationsNestedInput = {
    create?: XOR<CourseCreateWithoutConversationsInput, CourseUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutConversationsInput
    upsert?: CourseUpsertWithoutConversationsInput
    disconnect?: CourseWhereInput | boolean
    delete?: CourseWhereInput | boolean
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutConversationsInput, CourseUpdateWithoutConversationsInput>, CourseUncheckedUpdateWithoutConversationsInput>
  }

  export type LessonUpdateOneWithoutConversationsNestedInput = {
    create?: XOR<LessonCreateWithoutConversationsInput, LessonUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: LessonCreateOrConnectWithoutConversationsInput
    upsert?: LessonUpsertWithoutConversationsInput
    disconnect?: LessonWhereInput | boolean
    delete?: LessonWhereInput | boolean
    connect?: LessonWhereUniqueInput
    update?: XOR<XOR<LessonUpdateToOneWithWhereWithoutConversationsInput, LessonUpdateWithoutConversationsInput>, LessonUncheckedUpdateWithoutConversationsInput>
  }

  export type MessageUpdateManyWithoutConversationNestedInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutConversationInput | MessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutConversationInput | MessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutConversationInput | MessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutConversationInput | MessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutConversationInput | MessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutConversationInput | MessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type ConversationCreateNestedOneWithoutMessagesInput = {
    create?: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput
    connect?: ConversationWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ConversationUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput
    upsert?: ConversationUpsertWithoutMessagesInput
    connect?: ConversationWhereUniqueInput
    update?: XOR<XOR<ConversationUpdateToOneWithWhereWithoutMessagesInput, ConversationUpdateWithoutMessagesInput>, ConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type UserCreateNestedOneWithoutProgressInput = {
    create?: XOR<UserCreateWithoutProgressInput, UserUncheckedCreateWithoutProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutProgressInput
    connect?: UserWhereUniqueInput
  }

  export type LessonCreateNestedOneWithoutProgressInput = {
    create?: XOR<LessonCreateWithoutProgressInput, LessonUncheckedCreateWithoutProgressInput>
    connectOrCreate?: LessonCreateOrConnectWithoutProgressInput
    connect?: LessonWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutProgressNestedInput = {
    create?: XOR<UserCreateWithoutProgressInput, UserUncheckedCreateWithoutProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutProgressInput
    upsert?: UserUpsertWithoutProgressInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProgressInput, UserUpdateWithoutProgressInput>, UserUncheckedUpdateWithoutProgressInput>
  }

  export type LessonUpdateOneRequiredWithoutProgressNestedInput = {
    create?: XOR<LessonCreateWithoutProgressInput, LessonUncheckedCreateWithoutProgressInput>
    connectOrCreate?: LessonCreateOrConnectWithoutProgressInput
    upsert?: LessonUpsertWithoutProgressInput
    connect?: LessonWhereUniqueInput
    update?: XOR<XOR<LessonUpdateToOneWithWhereWithoutProgressInput, LessonUpdateWithoutProgressInput>, LessonUncheckedUpdateWithoutProgressInput>
  }

  export type CourseCreateNestedOneWithoutVocabsInput = {
    create?: XOR<CourseCreateWithoutVocabsInput, CourseUncheckedCreateWithoutVocabsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutVocabsInput
    connect?: CourseWhereUniqueInput
  }

  export type UserVocabProgressCreateNestedManyWithoutVocabInput = {
    create?: XOR<UserVocabProgressCreateWithoutVocabInput, UserVocabProgressUncheckedCreateWithoutVocabInput> | UserVocabProgressCreateWithoutVocabInput[] | UserVocabProgressUncheckedCreateWithoutVocabInput[]
    connectOrCreate?: UserVocabProgressCreateOrConnectWithoutVocabInput | UserVocabProgressCreateOrConnectWithoutVocabInput[]
    createMany?: UserVocabProgressCreateManyVocabInputEnvelope
    connect?: UserVocabProgressWhereUniqueInput | UserVocabProgressWhereUniqueInput[]
  }

  export type UserVocabProgressUncheckedCreateNestedManyWithoutVocabInput = {
    create?: XOR<UserVocabProgressCreateWithoutVocabInput, UserVocabProgressUncheckedCreateWithoutVocabInput> | UserVocabProgressCreateWithoutVocabInput[] | UserVocabProgressUncheckedCreateWithoutVocabInput[]
    connectOrCreate?: UserVocabProgressCreateOrConnectWithoutVocabInput | UserVocabProgressCreateOrConnectWithoutVocabInput[]
    createMany?: UserVocabProgressCreateManyVocabInputEnvelope
    connect?: UserVocabProgressWhereUniqueInput | UserVocabProgressWhereUniqueInput[]
  }

  export type CourseUpdateOneRequiredWithoutVocabsNestedInput = {
    create?: XOR<CourseCreateWithoutVocabsInput, CourseUncheckedCreateWithoutVocabsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutVocabsInput
    upsert?: CourseUpsertWithoutVocabsInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutVocabsInput, CourseUpdateWithoutVocabsInput>, CourseUncheckedUpdateWithoutVocabsInput>
  }

  export type UserVocabProgressUpdateManyWithoutVocabNestedInput = {
    create?: XOR<UserVocabProgressCreateWithoutVocabInput, UserVocabProgressUncheckedCreateWithoutVocabInput> | UserVocabProgressCreateWithoutVocabInput[] | UserVocabProgressUncheckedCreateWithoutVocabInput[]
    connectOrCreate?: UserVocabProgressCreateOrConnectWithoutVocabInput | UserVocabProgressCreateOrConnectWithoutVocabInput[]
    upsert?: UserVocabProgressUpsertWithWhereUniqueWithoutVocabInput | UserVocabProgressUpsertWithWhereUniqueWithoutVocabInput[]
    createMany?: UserVocabProgressCreateManyVocabInputEnvelope
    set?: UserVocabProgressWhereUniqueInput | UserVocabProgressWhereUniqueInput[]
    disconnect?: UserVocabProgressWhereUniqueInput | UserVocabProgressWhereUniqueInput[]
    delete?: UserVocabProgressWhereUniqueInput | UserVocabProgressWhereUniqueInput[]
    connect?: UserVocabProgressWhereUniqueInput | UserVocabProgressWhereUniqueInput[]
    update?: UserVocabProgressUpdateWithWhereUniqueWithoutVocabInput | UserVocabProgressUpdateWithWhereUniqueWithoutVocabInput[]
    updateMany?: UserVocabProgressUpdateManyWithWhereWithoutVocabInput | UserVocabProgressUpdateManyWithWhereWithoutVocabInput[]
    deleteMany?: UserVocabProgressScalarWhereInput | UserVocabProgressScalarWhereInput[]
  }

  export type UserVocabProgressUncheckedUpdateManyWithoutVocabNestedInput = {
    create?: XOR<UserVocabProgressCreateWithoutVocabInput, UserVocabProgressUncheckedCreateWithoutVocabInput> | UserVocabProgressCreateWithoutVocabInput[] | UserVocabProgressUncheckedCreateWithoutVocabInput[]
    connectOrCreate?: UserVocabProgressCreateOrConnectWithoutVocabInput | UserVocabProgressCreateOrConnectWithoutVocabInput[]
    upsert?: UserVocabProgressUpsertWithWhereUniqueWithoutVocabInput | UserVocabProgressUpsertWithWhereUniqueWithoutVocabInput[]
    createMany?: UserVocabProgressCreateManyVocabInputEnvelope
    set?: UserVocabProgressWhereUniqueInput | UserVocabProgressWhereUniqueInput[]
    disconnect?: UserVocabProgressWhereUniqueInput | UserVocabProgressWhereUniqueInput[]
    delete?: UserVocabProgressWhereUniqueInput | UserVocabProgressWhereUniqueInput[]
    connect?: UserVocabProgressWhereUniqueInput | UserVocabProgressWhereUniqueInput[]
    update?: UserVocabProgressUpdateWithWhereUniqueWithoutVocabInput | UserVocabProgressUpdateWithWhereUniqueWithoutVocabInput[]
    updateMany?: UserVocabProgressUpdateManyWithWhereWithoutVocabInput | UserVocabProgressUpdateManyWithWhereWithoutVocabInput[]
    deleteMany?: UserVocabProgressScalarWhereInput | UserVocabProgressScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutVocabProgressInput = {
    create?: XOR<UserCreateWithoutVocabProgressInput, UserUncheckedCreateWithoutVocabProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutVocabProgressInput
    connect?: UserWhereUniqueInput
  }

  export type VocabItemCreateNestedOneWithoutUserProgressInput = {
    create?: XOR<VocabItemCreateWithoutUserProgressInput, VocabItemUncheckedCreateWithoutUserProgressInput>
    connectOrCreate?: VocabItemCreateOrConnectWithoutUserProgressInput
    connect?: VocabItemWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutVocabProgressNestedInput = {
    create?: XOR<UserCreateWithoutVocabProgressInput, UserUncheckedCreateWithoutVocabProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutVocabProgressInput
    upsert?: UserUpsertWithoutVocabProgressInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutVocabProgressInput, UserUpdateWithoutVocabProgressInput>, UserUncheckedUpdateWithoutVocabProgressInput>
  }

  export type VocabItemUpdateOneRequiredWithoutUserProgressNestedInput = {
    create?: XOR<VocabItemCreateWithoutUserProgressInput, VocabItemUncheckedCreateWithoutUserProgressInput>
    connectOrCreate?: VocabItemCreateOrConnectWithoutUserProgressInput
    upsert?: VocabItemUpsertWithoutUserProgressInput
    connect?: VocabItemWhereUniqueInput
    update?: XOR<XOR<VocabItemUpdateToOneWithWhereWithoutUserProgressInput, VocabItemUpdateWithoutUserProgressInput>, VocabItemUncheckedUpdateWithoutUserProgressInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type ConversationCreateWithoutUserInput = {
    id?: string
    title?: string | null
    status?: string
    context?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    course?: CourseCreateNestedOneWithoutConversationsInput
    lesson?: LessonCreateNestedOneWithoutConversationsInput
    messages?: MessageCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutUserInput = {
    id?: string
    courseId?: string | null
    lessonId?: string | null
    title?: string | null
    status?: string
    context?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutUserInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput>
  }

  export type ConversationCreateManyUserInputEnvelope = {
    data: ConversationCreateManyUserInput | ConversationCreateManyUserInput[]
  }

  export type UserProgressCreateWithoutUserInput = {
    id?: string
    completed?: boolean
    score?: number | null
    timeSpent?: number | null
    attempts?: number
    lastAccessed?: Date | string
    completedAt?: Date | string | null
    lesson: LessonCreateNestedOneWithoutProgressInput
  }

  export type UserProgressUncheckedCreateWithoutUserInput = {
    id?: string
    lessonId: string
    completed?: boolean
    score?: number | null
    timeSpent?: number | null
    attempts?: number
    lastAccessed?: Date | string
    completedAt?: Date | string | null
  }

  export type UserProgressCreateOrConnectWithoutUserInput = {
    where: UserProgressWhereUniqueInput
    create: XOR<UserProgressCreateWithoutUserInput, UserProgressUncheckedCreateWithoutUserInput>
  }

  export type UserProgressCreateManyUserInputEnvelope = {
    data: UserProgressCreateManyUserInput | UserProgressCreateManyUserInput[]
  }

  export type UserVocabProgressCreateWithoutUserInput = {
    id?: string
    masteryLevel?: number
    correctCount?: number
    wrongCount?: number
    lastReviewed?: Date | string | null
    nextReview?: Date | string | null
    vocab: VocabItemCreateNestedOneWithoutUserProgressInput
  }

  export type UserVocabProgressUncheckedCreateWithoutUserInput = {
    id?: string
    vocabId: string
    masteryLevel?: number
    correctCount?: number
    wrongCount?: number
    lastReviewed?: Date | string | null
    nextReview?: Date | string | null
  }

  export type UserVocabProgressCreateOrConnectWithoutUserInput = {
    where: UserVocabProgressWhereUniqueInput
    create: XOR<UserVocabProgressCreateWithoutUserInput, UserVocabProgressUncheckedCreateWithoutUserInput>
  }

  export type UserVocabProgressCreateManyUserInputEnvelope = {
    data: UserVocabProgressCreateManyUserInput | UserVocabProgressCreateManyUserInput[]
  }

  export type ConversationUpsertWithWhereUniqueWithoutUserInput = {
    where: ConversationWhereUniqueInput
    update: XOR<ConversationUpdateWithoutUserInput, ConversationUncheckedUpdateWithoutUserInput>
    create: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput>
  }

  export type ConversationUpdateWithWhereUniqueWithoutUserInput = {
    where: ConversationWhereUniqueInput
    data: XOR<ConversationUpdateWithoutUserInput, ConversationUncheckedUpdateWithoutUserInput>
  }

  export type ConversationUpdateManyWithWhereWithoutUserInput = {
    where: ConversationScalarWhereInput
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyWithoutUserInput>
  }

  export type ConversationScalarWhereInput = {
    AND?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
    OR?: ConversationScalarWhereInput[]
    NOT?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
    id?: StringFilter<"Conversation"> | string
    userId?: StringFilter<"Conversation"> | string
    courseId?: StringNullableFilter<"Conversation"> | string | null
    lessonId?: StringNullableFilter<"Conversation"> | string | null
    title?: StringNullableFilter<"Conversation"> | string | null
    status?: StringFilter<"Conversation"> | string
    context?: StringNullableFilter<"Conversation"> | string | null
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
  }

  export type UserProgressUpsertWithWhereUniqueWithoutUserInput = {
    where: UserProgressWhereUniqueInput
    update: XOR<UserProgressUpdateWithoutUserInput, UserProgressUncheckedUpdateWithoutUserInput>
    create: XOR<UserProgressCreateWithoutUserInput, UserProgressUncheckedCreateWithoutUserInput>
  }

  export type UserProgressUpdateWithWhereUniqueWithoutUserInput = {
    where: UserProgressWhereUniqueInput
    data: XOR<UserProgressUpdateWithoutUserInput, UserProgressUncheckedUpdateWithoutUserInput>
  }

  export type UserProgressUpdateManyWithWhereWithoutUserInput = {
    where: UserProgressScalarWhereInput
    data: XOR<UserProgressUpdateManyMutationInput, UserProgressUncheckedUpdateManyWithoutUserInput>
  }

  export type UserProgressScalarWhereInput = {
    AND?: UserProgressScalarWhereInput | UserProgressScalarWhereInput[]
    OR?: UserProgressScalarWhereInput[]
    NOT?: UserProgressScalarWhereInput | UserProgressScalarWhereInput[]
    id?: StringFilter<"UserProgress"> | string
    userId?: StringFilter<"UserProgress"> | string
    lessonId?: StringFilter<"UserProgress"> | string
    completed?: BoolFilter<"UserProgress"> | boolean
    score?: IntNullableFilter<"UserProgress"> | number | null
    timeSpent?: IntNullableFilter<"UserProgress"> | number | null
    attempts?: IntFilter<"UserProgress"> | number
    lastAccessed?: DateTimeFilter<"UserProgress"> | Date | string
    completedAt?: DateTimeNullableFilter<"UserProgress"> | Date | string | null
  }

  export type UserVocabProgressUpsertWithWhereUniqueWithoutUserInput = {
    where: UserVocabProgressWhereUniqueInput
    update: XOR<UserVocabProgressUpdateWithoutUserInput, UserVocabProgressUncheckedUpdateWithoutUserInput>
    create: XOR<UserVocabProgressCreateWithoutUserInput, UserVocabProgressUncheckedCreateWithoutUserInput>
  }

  export type UserVocabProgressUpdateWithWhereUniqueWithoutUserInput = {
    where: UserVocabProgressWhereUniqueInput
    data: XOR<UserVocabProgressUpdateWithoutUserInput, UserVocabProgressUncheckedUpdateWithoutUserInput>
  }

  export type UserVocabProgressUpdateManyWithWhereWithoutUserInput = {
    where: UserVocabProgressScalarWhereInput
    data: XOR<UserVocabProgressUpdateManyMutationInput, UserVocabProgressUncheckedUpdateManyWithoutUserInput>
  }

  export type UserVocabProgressScalarWhereInput = {
    AND?: UserVocabProgressScalarWhereInput | UserVocabProgressScalarWhereInput[]
    OR?: UserVocabProgressScalarWhereInput[]
    NOT?: UserVocabProgressScalarWhereInput | UserVocabProgressScalarWhereInput[]
    id?: StringFilter<"UserVocabProgress"> | string
    userId?: StringFilter<"UserVocabProgress"> | string
    vocabId?: StringFilter<"UserVocabProgress"> | string
    masteryLevel?: IntFilter<"UserVocabProgress"> | number
    correctCount?: IntFilter<"UserVocabProgress"> | number
    wrongCount?: IntFilter<"UserVocabProgress"> | number
    lastReviewed?: DateTimeNullableFilter<"UserVocabProgress"> | Date | string | null
    nextReview?: DateTimeNullableFilter<"UserVocabProgress"> | Date | string | null
  }

  export type UnitCreateWithoutCourseInput = {
    id?: string
    title: string
    description?: string | null
    orderIndex: number
    createdAt?: Date | string
    lessons?: LessonCreateNestedManyWithoutUnitInput
  }

  export type UnitUncheckedCreateWithoutCourseInput = {
    id?: string
    title: string
    description?: string | null
    orderIndex: number
    createdAt?: Date | string
    lessons?: LessonUncheckedCreateNestedManyWithoutUnitInput
  }

  export type UnitCreateOrConnectWithoutCourseInput = {
    where: UnitWhereUniqueInput
    create: XOR<UnitCreateWithoutCourseInput, UnitUncheckedCreateWithoutCourseInput>
  }

  export type UnitCreateManyCourseInputEnvelope = {
    data: UnitCreateManyCourseInput | UnitCreateManyCourseInput[]
  }

  export type VocabItemCreateWithoutCourseInput = {
    id?: string
    word: string
    translation: string
    pronunciation?: string | null
    audioUrl?: string | null
    example?: string | null
    exampleAudio?: string | null
    difficulty?: number
    createdAt?: Date | string
    userProgress?: UserVocabProgressCreateNestedManyWithoutVocabInput
  }

  export type VocabItemUncheckedCreateWithoutCourseInput = {
    id?: string
    word: string
    translation: string
    pronunciation?: string | null
    audioUrl?: string | null
    example?: string | null
    exampleAudio?: string | null
    difficulty?: number
    createdAt?: Date | string
    userProgress?: UserVocabProgressUncheckedCreateNestedManyWithoutVocabInput
  }

  export type VocabItemCreateOrConnectWithoutCourseInput = {
    where: VocabItemWhereUniqueInput
    create: XOR<VocabItemCreateWithoutCourseInput, VocabItemUncheckedCreateWithoutCourseInput>
  }

  export type VocabItemCreateManyCourseInputEnvelope = {
    data: VocabItemCreateManyCourseInput | VocabItemCreateManyCourseInput[]
  }

  export type ConversationCreateWithoutCourseInput = {
    id?: string
    title?: string | null
    status?: string
    context?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutConversationsInput
    lesson?: LessonCreateNestedOneWithoutConversationsInput
    messages?: MessageCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutCourseInput = {
    id?: string
    userId: string
    lessonId?: string | null
    title?: string | null
    status?: string
    context?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutCourseInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutCourseInput, ConversationUncheckedCreateWithoutCourseInput>
  }

  export type ConversationCreateManyCourseInputEnvelope = {
    data: ConversationCreateManyCourseInput | ConversationCreateManyCourseInput[]
  }

  export type UnitUpsertWithWhereUniqueWithoutCourseInput = {
    where: UnitWhereUniqueInput
    update: XOR<UnitUpdateWithoutCourseInput, UnitUncheckedUpdateWithoutCourseInput>
    create: XOR<UnitCreateWithoutCourseInput, UnitUncheckedCreateWithoutCourseInput>
  }

  export type UnitUpdateWithWhereUniqueWithoutCourseInput = {
    where: UnitWhereUniqueInput
    data: XOR<UnitUpdateWithoutCourseInput, UnitUncheckedUpdateWithoutCourseInput>
  }

  export type UnitUpdateManyWithWhereWithoutCourseInput = {
    where: UnitScalarWhereInput
    data: XOR<UnitUpdateManyMutationInput, UnitUncheckedUpdateManyWithoutCourseInput>
  }

  export type UnitScalarWhereInput = {
    AND?: UnitScalarWhereInput | UnitScalarWhereInput[]
    OR?: UnitScalarWhereInput[]
    NOT?: UnitScalarWhereInput | UnitScalarWhereInput[]
    id?: StringFilter<"Unit"> | string
    courseId?: StringFilter<"Unit"> | string
    title?: StringFilter<"Unit"> | string
    description?: StringNullableFilter<"Unit"> | string | null
    orderIndex?: IntFilter<"Unit"> | number
    createdAt?: DateTimeFilter<"Unit"> | Date | string
  }

  export type VocabItemUpsertWithWhereUniqueWithoutCourseInput = {
    where: VocabItemWhereUniqueInput
    update: XOR<VocabItemUpdateWithoutCourseInput, VocabItemUncheckedUpdateWithoutCourseInput>
    create: XOR<VocabItemCreateWithoutCourseInput, VocabItemUncheckedCreateWithoutCourseInput>
  }

  export type VocabItemUpdateWithWhereUniqueWithoutCourseInput = {
    where: VocabItemWhereUniqueInput
    data: XOR<VocabItemUpdateWithoutCourseInput, VocabItemUncheckedUpdateWithoutCourseInput>
  }

  export type VocabItemUpdateManyWithWhereWithoutCourseInput = {
    where: VocabItemScalarWhereInput
    data: XOR<VocabItemUpdateManyMutationInput, VocabItemUncheckedUpdateManyWithoutCourseInput>
  }

  export type VocabItemScalarWhereInput = {
    AND?: VocabItemScalarWhereInput | VocabItemScalarWhereInput[]
    OR?: VocabItemScalarWhereInput[]
    NOT?: VocabItemScalarWhereInput | VocabItemScalarWhereInput[]
    id?: StringFilter<"VocabItem"> | string
    courseId?: StringFilter<"VocabItem"> | string
    word?: StringFilter<"VocabItem"> | string
    translation?: StringFilter<"VocabItem"> | string
    pronunciation?: StringNullableFilter<"VocabItem"> | string | null
    audioUrl?: StringNullableFilter<"VocabItem"> | string | null
    example?: StringNullableFilter<"VocabItem"> | string | null
    exampleAudio?: StringNullableFilter<"VocabItem"> | string | null
    difficulty?: IntFilter<"VocabItem"> | number
    createdAt?: DateTimeFilter<"VocabItem"> | Date | string
  }

  export type ConversationUpsertWithWhereUniqueWithoutCourseInput = {
    where: ConversationWhereUniqueInput
    update: XOR<ConversationUpdateWithoutCourseInput, ConversationUncheckedUpdateWithoutCourseInput>
    create: XOR<ConversationCreateWithoutCourseInput, ConversationUncheckedCreateWithoutCourseInput>
  }

  export type ConversationUpdateWithWhereUniqueWithoutCourseInput = {
    where: ConversationWhereUniqueInput
    data: XOR<ConversationUpdateWithoutCourseInput, ConversationUncheckedUpdateWithoutCourseInput>
  }

  export type ConversationUpdateManyWithWhereWithoutCourseInput = {
    where: ConversationScalarWhereInput
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyWithoutCourseInput>
  }

  export type CourseCreateWithoutUnitsInput = {
    id?: string
    title: string
    description?: string | null
    language: string
    level?: string
    category?: string | null
    coverUrl?: string | null
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    metadata?: string | null
    vocabs?: VocabItemCreateNestedManyWithoutCourseInput
    conversations?: ConversationCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutUnitsInput = {
    id?: string
    title: string
    description?: string | null
    language: string
    level?: string
    category?: string | null
    coverUrl?: string | null
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    metadata?: string | null
    vocabs?: VocabItemUncheckedCreateNestedManyWithoutCourseInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutUnitsInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutUnitsInput, CourseUncheckedCreateWithoutUnitsInput>
  }

  export type LessonCreateWithoutUnitInput = {
    id?: string
    title: string
    content?: string | null
    lessonType?: string
    orderIndex: number
    duration?: number | null
    createdAt?: Date | string
    progress?: UserProgressCreateNestedManyWithoutLessonInput
    conversations?: ConversationCreateNestedManyWithoutLessonInput
  }

  export type LessonUncheckedCreateWithoutUnitInput = {
    id?: string
    title: string
    content?: string | null
    lessonType?: string
    orderIndex: number
    duration?: number | null
    createdAt?: Date | string
    progress?: UserProgressUncheckedCreateNestedManyWithoutLessonInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutLessonInput
  }

  export type LessonCreateOrConnectWithoutUnitInput = {
    where: LessonWhereUniqueInput
    create: XOR<LessonCreateWithoutUnitInput, LessonUncheckedCreateWithoutUnitInput>
  }

  export type LessonCreateManyUnitInputEnvelope = {
    data: LessonCreateManyUnitInput | LessonCreateManyUnitInput[]
  }

  export type CourseUpsertWithoutUnitsInput = {
    update: XOR<CourseUpdateWithoutUnitsInput, CourseUncheckedUpdateWithoutUnitsInput>
    create: XOR<CourseCreateWithoutUnitsInput, CourseUncheckedCreateWithoutUnitsInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutUnitsInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutUnitsInput, CourseUncheckedUpdateWithoutUnitsInput>
  }

  export type CourseUpdateWithoutUnitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    vocabs?: VocabItemUpdateManyWithoutCourseNestedInput
    conversations?: ConversationUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutUnitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    vocabs?: VocabItemUncheckedUpdateManyWithoutCourseNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type LessonUpsertWithWhereUniqueWithoutUnitInput = {
    where: LessonWhereUniqueInput
    update: XOR<LessonUpdateWithoutUnitInput, LessonUncheckedUpdateWithoutUnitInput>
    create: XOR<LessonCreateWithoutUnitInput, LessonUncheckedCreateWithoutUnitInput>
  }

  export type LessonUpdateWithWhereUniqueWithoutUnitInput = {
    where: LessonWhereUniqueInput
    data: XOR<LessonUpdateWithoutUnitInput, LessonUncheckedUpdateWithoutUnitInput>
  }

  export type LessonUpdateManyWithWhereWithoutUnitInput = {
    where: LessonScalarWhereInput
    data: XOR<LessonUpdateManyMutationInput, LessonUncheckedUpdateManyWithoutUnitInput>
  }

  export type LessonScalarWhereInput = {
    AND?: LessonScalarWhereInput | LessonScalarWhereInput[]
    OR?: LessonScalarWhereInput[]
    NOT?: LessonScalarWhereInput | LessonScalarWhereInput[]
    id?: StringFilter<"Lesson"> | string
    unitId?: StringFilter<"Lesson"> | string
    title?: StringFilter<"Lesson"> | string
    content?: StringNullableFilter<"Lesson"> | string | null
    lessonType?: StringFilter<"Lesson"> | string
    orderIndex?: IntFilter<"Lesson"> | number
    duration?: IntNullableFilter<"Lesson"> | number | null
    createdAt?: DateTimeFilter<"Lesson"> | Date | string
  }

  export type UnitCreateWithoutLessonsInput = {
    id?: string
    title: string
    description?: string | null
    orderIndex: number
    createdAt?: Date | string
    course: CourseCreateNestedOneWithoutUnitsInput
  }

  export type UnitUncheckedCreateWithoutLessonsInput = {
    id?: string
    courseId: string
    title: string
    description?: string | null
    orderIndex: number
    createdAt?: Date | string
  }

  export type UnitCreateOrConnectWithoutLessonsInput = {
    where: UnitWhereUniqueInput
    create: XOR<UnitCreateWithoutLessonsInput, UnitUncheckedCreateWithoutLessonsInput>
  }

  export type UserProgressCreateWithoutLessonInput = {
    id?: string
    completed?: boolean
    score?: number | null
    timeSpent?: number | null
    attempts?: number
    lastAccessed?: Date | string
    completedAt?: Date | string | null
    user: UserCreateNestedOneWithoutProgressInput
  }

  export type UserProgressUncheckedCreateWithoutLessonInput = {
    id?: string
    userId: string
    completed?: boolean
    score?: number | null
    timeSpent?: number | null
    attempts?: number
    lastAccessed?: Date | string
    completedAt?: Date | string | null
  }

  export type UserProgressCreateOrConnectWithoutLessonInput = {
    where: UserProgressWhereUniqueInput
    create: XOR<UserProgressCreateWithoutLessonInput, UserProgressUncheckedCreateWithoutLessonInput>
  }

  export type UserProgressCreateManyLessonInputEnvelope = {
    data: UserProgressCreateManyLessonInput | UserProgressCreateManyLessonInput[]
  }

  export type ConversationCreateWithoutLessonInput = {
    id?: string
    title?: string | null
    status?: string
    context?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutConversationsInput
    course?: CourseCreateNestedOneWithoutConversationsInput
    messages?: MessageCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutLessonInput = {
    id?: string
    userId: string
    courseId?: string | null
    title?: string | null
    status?: string
    context?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutLessonInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutLessonInput, ConversationUncheckedCreateWithoutLessonInput>
  }

  export type ConversationCreateManyLessonInputEnvelope = {
    data: ConversationCreateManyLessonInput | ConversationCreateManyLessonInput[]
  }

  export type UnitUpsertWithoutLessonsInput = {
    update: XOR<UnitUpdateWithoutLessonsInput, UnitUncheckedUpdateWithoutLessonsInput>
    create: XOR<UnitCreateWithoutLessonsInput, UnitUncheckedCreateWithoutLessonsInput>
    where?: UnitWhereInput
  }

  export type UnitUpdateToOneWithWhereWithoutLessonsInput = {
    where?: UnitWhereInput
    data: XOR<UnitUpdateWithoutLessonsInput, UnitUncheckedUpdateWithoutLessonsInput>
  }

  export type UnitUpdateWithoutLessonsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    course?: CourseUpdateOneRequiredWithoutUnitsNestedInput
  }

  export type UnitUncheckedUpdateWithoutLessonsInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProgressUpsertWithWhereUniqueWithoutLessonInput = {
    where: UserProgressWhereUniqueInput
    update: XOR<UserProgressUpdateWithoutLessonInput, UserProgressUncheckedUpdateWithoutLessonInput>
    create: XOR<UserProgressCreateWithoutLessonInput, UserProgressUncheckedCreateWithoutLessonInput>
  }

  export type UserProgressUpdateWithWhereUniqueWithoutLessonInput = {
    where: UserProgressWhereUniqueInput
    data: XOR<UserProgressUpdateWithoutLessonInput, UserProgressUncheckedUpdateWithoutLessonInput>
  }

  export type UserProgressUpdateManyWithWhereWithoutLessonInput = {
    where: UserProgressScalarWhereInput
    data: XOR<UserProgressUpdateManyMutationInput, UserProgressUncheckedUpdateManyWithoutLessonInput>
  }

  export type ConversationUpsertWithWhereUniqueWithoutLessonInput = {
    where: ConversationWhereUniqueInput
    update: XOR<ConversationUpdateWithoutLessonInput, ConversationUncheckedUpdateWithoutLessonInput>
    create: XOR<ConversationCreateWithoutLessonInput, ConversationUncheckedCreateWithoutLessonInput>
  }

  export type ConversationUpdateWithWhereUniqueWithoutLessonInput = {
    where: ConversationWhereUniqueInput
    data: XOR<ConversationUpdateWithoutLessonInput, ConversationUncheckedUpdateWithoutLessonInput>
  }

  export type ConversationUpdateManyWithWhereWithoutLessonInput = {
    where: ConversationScalarWhereInput
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyWithoutLessonInput>
  }

  export type UserCreateWithoutConversationsInput = {
    id?: string
    username: string
    email?: string | null
    passwordHash?: string | null
    displayName?: string | null
    avatarUrl?: string | null
    role?: string
    language?: string
    preferredLangs?: string | null
    settings?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    progress?: UserProgressCreateNestedManyWithoutUserInput
    vocabProgress?: UserVocabProgressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutConversationsInput = {
    id?: string
    username: string
    email?: string | null
    passwordHash?: string | null
    displayName?: string | null
    avatarUrl?: string | null
    role?: string
    language?: string
    preferredLangs?: string | null
    settings?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    progress?: UserProgressUncheckedCreateNestedManyWithoutUserInput
    vocabProgress?: UserVocabProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutConversationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
  }

  export type CourseCreateWithoutConversationsInput = {
    id?: string
    title: string
    description?: string | null
    language: string
    level?: string
    category?: string | null
    coverUrl?: string | null
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    metadata?: string | null
    units?: UnitCreateNestedManyWithoutCourseInput
    vocabs?: VocabItemCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutConversationsInput = {
    id?: string
    title: string
    description?: string | null
    language: string
    level?: string
    category?: string | null
    coverUrl?: string | null
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    metadata?: string | null
    units?: UnitUncheckedCreateNestedManyWithoutCourseInput
    vocabs?: VocabItemUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutConversationsInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutConversationsInput, CourseUncheckedCreateWithoutConversationsInput>
  }

  export type LessonCreateWithoutConversationsInput = {
    id?: string
    title: string
    content?: string | null
    lessonType?: string
    orderIndex: number
    duration?: number | null
    createdAt?: Date | string
    unit: UnitCreateNestedOneWithoutLessonsInput
    progress?: UserProgressCreateNestedManyWithoutLessonInput
  }

  export type LessonUncheckedCreateWithoutConversationsInput = {
    id?: string
    unitId: string
    title: string
    content?: string | null
    lessonType?: string
    orderIndex: number
    duration?: number | null
    createdAt?: Date | string
    progress?: UserProgressUncheckedCreateNestedManyWithoutLessonInput
  }

  export type LessonCreateOrConnectWithoutConversationsInput = {
    where: LessonWhereUniqueInput
    create: XOR<LessonCreateWithoutConversationsInput, LessonUncheckedCreateWithoutConversationsInput>
  }

  export type MessageCreateWithoutConversationInput = {
    id?: string
    role: string
    content: string
    audioUrl?: string | null
    audioDuration?: number | null
    metadata?: string | null
    createdAt?: Date | string
  }

  export type MessageUncheckedCreateWithoutConversationInput = {
    id?: string
    role: string
    content: string
    audioUrl?: string | null
    audioDuration?: number | null
    metadata?: string | null
    createdAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutConversationInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput>
  }

  export type MessageCreateManyConversationInputEnvelope = {
    data: MessageCreateManyConversationInput | MessageCreateManyConversationInput[]
  }

  export type UserUpsertWithoutConversationsInput = {
    update: XOR<UserUpdateWithoutConversationsInput, UserUncheckedUpdateWithoutConversationsInput>
    create: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutConversationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutConversationsInput, UserUncheckedUpdateWithoutConversationsInput>
  }

  export type UserUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    preferredLangs?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    progress?: UserProgressUpdateManyWithoutUserNestedInput
    vocabProgress?: UserVocabProgressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    preferredLangs?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    progress?: UserProgressUncheckedUpdateManyWithoutUserNestedInput
    vocabProgress?: UserVocabProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CourseUpsertWithoutConversationsInput = {
    update: XOR<CourseUpdateWithoutConversationsInput, CourseUncheckedUpdateWithoutConversationsInput>
    create: XOR<CourseCreateWithoutConversationsInput, CourseUncheckedCreateWithoutConversationsInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutConversationsInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutConversationsInput, CourseUncheckedUpdateWithoutConversationsInput>
  }

  export type CourseUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    units?: UnitUpdateManyWithoutCourseNestedInput
    vocabs?: VocabItemUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    units?: UnitUncheckedUpdateManyWithoutCourseNestedInput
    vocabs?: VocabItemUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type LessonUpsertWithoutConversationsInput = {
    update: XOR<LessonUpdateWithoutConversationsInput, LessonUncheckedUpdateWithoutConversationsInput>
    create: XOR<LessonCreateWithoutConversationsInput, LessonUncheckedCreateWithoutConversationsInput>
    where?: LessonWhereInput
  }

  export type LessonUpdateToOneWithWhereWithoutConversationsInput = {
    where?: LessonWhereInput
    data: XOR<LessonUpdateWithoutConversationsInput, LessonUncheckedUpdateWithoutConversationsInput>
  }

  export type LessonUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    lessonType?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unit?: UnitUpdateOneRequiredWithoutLessonsNestedInput
    progress?: UserProgressUpdateManyWithoutLessonNestedInput
  }

  export type LessonUncheckedUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    unitId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    lessonType?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    progress?: UserProgressUncheckedUpdateManyWithoutLessonNestedInput
  }

  export type MessageUpsertWithWhereUniqueWithoutConversationInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutConversationInput, MessageUncheckedUpdateWithoutConversationInput>
    create: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutConversationInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutConversationInput, MessageUncheckedUpdateWithoutConversationInput>
  }

  export type MessageUpdateManyWithWhereWithoutConversationInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutConversationInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    conversationId?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    audioUrl?: StringNullableFilter<"Message"> | string | null
    audioDuration?: FloatNullableFilter<"Message"> | number | null
    metadata?: StringNullableFilter<"Message"> | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
  }

  export type ConversationCreateWithoutMessagesInput = {
    id?: string
    title?: string | null
    status?: string
    context?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutConversationsInput
    course?: CourseCreateNestedOneWithoutConversationsInput
    lesson?: LessonCreateNestedOneWithoutConversationsInput
  }

  export type ConversationUncheckedCreateWithoutMessagesInput = {
    id?: string
    userId: string
    courseId?: string | null
    lessonId?: string | null
    title?: string | null
    status?: string
    context?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationCreateOrConnectWithoutMessagesInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
  }

  export type ConversationUpsertWithoutMessagesInput = {
    update: XOR<ConversationUpdateWithoutMessagesInput, ConversationUncheckedUpdateWithoutMessagesInput>
    create: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    where?: ConversationWhereInput
  }

  export type ConversationUpdateToOneWithWhereWithoutMessagesInput = {
    where?: ConversationWhereInput
    data: XOR<ConversationUpdateWithoutMessagesInput, ConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type ConversationUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutConversationsNestedInput
    course?: CourseUpdateOneWithoutConversationsNestedInput
    lesson?: LessonUpdateOneWithoutConversationsNestedInput
  }

  export type ConversationUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    courseId?: NullableStringFieldUpdateOperationsInput | string | null
    lessonId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutProgressInput = {
    id?: string
    username: string
    email?: string | null
    passwordHash?: string | null
    displayName?: string | null
    avatarUrl?: string | null
    role?: string
    language?: string
    preferredLangs?: string | null
    settings?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    conversations?: ConversationCreateNestedManyWithoutUserInput
    vocabProgress?: UserVocabProgressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProgressInput = {
    id?: string
    username: string
    email?: string | null
    passwordHash?: string | null
    displayName?: string | null
    avatarUrl?: string | null
    role?: string
    language?: string
    preferredLangs?: string | null
    settings?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    conversations?: ConversationUncheckedCreateNestedManyWithoutUserInput
    vocabProgress?: UserVocabProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProgressInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProgressInput, UserUncheckedCreateWithoutProgressInput>
  }

  export type LessonCreateWithoutProgressInput = {
    id?: string
    title: string
    content?: string | null
    lessonType?: string
    orderIndex: number
    duration?: number | null
    createdAt?: Date | string
    unit: UnitCreateNestedOneWithoutLessonsInput
    conversations?: ConversationCreateNestedManyWithoutLessonInput
  }

  export type LessonUncheckedCreateWithoutProgressInput = {
    id?: string
    unitId: string
    title: string
    content?: string | null
    lessonType?: string
    orderIndex: number
    duration?: number | null
    createdAt?: Date | string
    conversations?: ConversationUncheckedCreateNestedManyWithoutLessonInput
  }

  export type LessonCreateOrConnectWithoutProgressInput = {
    where: LessonWhereUniqueInput
    create: XOR<LessonCreateWithoutProgressInput, LessonUncheckedCreateWithoutProgressInput>
  }

  export type UserUpsertWithoutProgressInput = {
    update: XOR<UserUpdateWithoutProgressInput, UserUncheckedUpdateWithoutProgressInput>
    create: XOR<UserCreateWithoutProgressInput, UserUncheckedCreateWithoutProgressInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProgressInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProgressInput, UserUncheckedUpdateWithoutProgressInput>
  }

  export type UserUpdateWithoutProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    preferredLangs?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    conversations?: ConversationUpdateManyWithoutUserNestedInput
    vocabProgress?: UserVocabProgressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    preferredLangs?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    conversations?: ConversationUncheckedUpdateManyWithoutUserNestedInput
    vocabProgress?: UserVocabProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type LessonUpsertWithoutProgressInput = {
    update: XOR<LessonUpdateWithoutProgressInput, LessonUncheckedUpdateWithoutProgressInput>
    create: XOR<LessonCreateWithoutProgressInput, LessonUncheckedCreateWithoutProgressInput>
    where?: LessonWhereInput
  }

  export type LessonUpdateToOneWithWhereWithoutProgressInput = {
    where?: LessonWhereInput
    data: XOR<LessonUpdateWithoutProgressInput, LessonUncheckedUpdateWithoutProgressInput>
  }

  export type LessonUpdateWithoutProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    lessonType?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unit?: UnitUpdateOneRequiredWithoutLessonsNestedInput
    conversations?: ConversationUpdateManyWithoutLessonNestedInput
  }

  export type LessonUncheckedUpdateWithoutProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    unitId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    lessonType?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUncheckedUpdateManyWithoutLessonNestedInput
  }

  export type CourseCreateWithoutVocabsInput = {
    id?: string
    title: string
    description?: string | null
    language: string
    level?: string
    category?: string | null
    coverUrl?: string | null
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    metadata?: string | null
    units?: UnitCreateNestedManyWithoutCourseInput
    conversations?: ConversationCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutVocabsInput = {
    id?: string
    title: string
    description?: string | null
    language: string
    level?: string
    category?: string | null
    coverUrl?: string | null
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    metadata?: string | null
    units?: UnitUncheckedCreateNestedManyWithoutCourseInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutVocabsInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutVocabsInput, CourseUncheckedCreateWithoutVocabsInput>
  }

  export type UserVocabProgressCreateWithoutVocabInput = {
    id?: string
    masteryLevel?: number
    correctCount?: number
    wrongCount?: number
    lastReviewed?: Date | string | null
    nextReview?: Date | string | null
    user: UserCreateNestedOneWithoutVocabProgressInput
  }

  export type UserVocabProgressUncheckedCreateWithoutVocabInput = {
    id?: string
    userId: string
    masteryLevel?: number
    correctCount?: number
    wrongCount?: number
    lastReviewed?: Date | string | null
    nextReview?: Date | string | null
  }

  export type UserVocabProgressCreateOrConnectWithoutVocabInput = {
    where: UserVocabProgressWhereUniqueInput
    create: XOR<UserVocabProgressCreateWithoutVocabInput, UserVocabProgressUncheckedCreateWithoutVocabInput>
  }

  export type UserVocabProgressCreateManyVocabInputEnvelope = {
    data: UserVocabProgressCreateManyVocabInput | UserVocabProgressCreateManyVocabInput[]
  }

  export type CourseUpsertWithoutVocabsInput = {
    update: XOR<CourseUpdateWithoutVocabsInput, CourseUncheckedUpdateWithoutVocabsInput>
    create: XOR<CourseCreateWithoutVocabsInput, CourseUncheckedCreateWithoutVocabsInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutVocabsInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutVocabsInput, CourseUncheckedUpdateWithoutVocabsInput>
  }

  export type CourseUpdateWithoutVocabsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    units?: UnitUpdateManyWithoutCourseNestedInput
    conversations?: ConversationUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutVocabsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    units?: UnitUncheckedUpdateManyWithoutCourseNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type UserVocabProgressUpsertWithWhereUniqueWithoutVocabInput = {
    where: UserVocabProgressWhereUniqueInput
    update: XOR<UserVocabProgressUpdateWithoutVocabInput, UserVocabProgressUncheckedUpdateWithoutVocabInput>
    create: XOR<UserVocabProgressCreateWithoutVocabInput, UserVocabProgressUncheckedCreateWithoutVocabInput>
  }

  export type UserVocabProgressUpdateWithWhereUniqueWithoutVocabInput = {
    where: UserVocabProgressWhereUniqueInput
    data: XOR<UserVocabProgressUpdateWithoutVocabInput, UserVocabProgressUncheckedUpdateWithoutVocabInput>
  }

  export type UserVocabProgressUpdateManyWithWhereWithoutVocabInput = {
    where: UserVocabProgressScalarWhereInput
    data: XOR<UserVocabProgressUpdateManyMutationInput, UserVocabProgressUncheckedUpdateManyWithoutVocabInput>
  }

  export type UserCreateWithoutVocabProgressInput = {
    id?: string
    username: string
    email?: string | null
    passwordHash?: string | null
    displayName?: string | null
    avatarUrl?: string | null
    role?: string
    language?: string
    preferredLangs?: string | null
    settings?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    conversations?: ConversationCreateNestedManyWithoutUserInput
    progress?: UserProgressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutVocabProgressInput = {
    id?: string
    username: string
    email?: string | null
    passwordHash?: string | null
    displayName?: string | null
    avatarUrl?: string | null
    role?: string
    language?: string
    preferredLangs?: string | null
    settings?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    conversations?: ConversationUncheckedCreateNestedManyWithoutUserInput
    progress?: UserProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutVocabProgressInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutVocabProgressInput, UserUncheckedCreateWithoutVocabProgressInput>
  }

  export type VocabItemCreateWithoutUserProgressInput = {
    id?: string
    word: string
    translation: string
    pronunciation?: string | null
    audioUrl?: string | null
    example?: string | null
    exampleAudio?: string | null
    difficulty?: number
    createdAt?: Date | string
    course: CourseCreateNestedOneWithoutVocabsInput
  }

  export type VocabItemUncheckedCreateWithoutUserProgressInput = {
    id?: string
    courseId: string
    word: string
    translation: string
    pronunciation?: string | null
    audioUrl?: string | null
    example?: string | null
    exampleAudio?: string | null
    difficulty?: number
    createdAt?: Date | string
  }

  export type VocabItemCreateOrConnectWithoutUserProgressInput = {
    where: VocabItemWhereUniqueInput
    create: XOR<VocabItemCreateWithoutUserProgressInput, VocabItemUncheckedCreateWithoutUserProgressInput>
  }

  export type UserUpsertWithoutVocabProgressInput = {
    update: XOR<UserUpdateWithoutVocabProgressInput, UserUncheckedUpdateWithoutVocabProgressInput>
    create: XOR<UserCreateWithoutVocabProgressInput, UserUncheckedCreateWithoutVocabProgressInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutVocabProgressInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutVocabProgressInput, UserUncheckedUpdateWithoutVocabProgressInput>
  }

  export type UserUpdateWithoutVocabProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    preferredLangs?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    conversations?: ConversationUpdateManyWithoutUserNestedInput
    progress?: UserProgressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutVocabProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    preferredLangs?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    conversations?: ConversationUncheckedUpdateManyWithoutUserNestedInput
    progress?: UserProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type VocabItemUpsertWithoutUserProgressInput = {
    update: XOR<VocabItemUpdateWithoutUserProgressInput, VocabItemUncheckedUpdateWithoutUserProgressInput>
    create: XOR<VocabItemCreateWithoutUserProgressInput, VocabItemUncheckedCreateWithoutUserProgressInput>
    where?: VocabItemWhereInput
  }

  export type VocabItemUpdateToOneWithWhereWithoutUserProgressInput = {
    where?: VocabItemWhereInput
    data: XOR<VocabItemUpdateWithoutUserProgressInput, VocabItemUncheckedUpdateWithoutUserProgressInput>
  }

  export type VocabItemUpdateWithoutUserProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    word?: StringFieldUpdateOperationsInput | string
    translation?: StringFieldUpdateOperationsInput | string
    pronunciation?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    exampleAudio?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    course?: CourseUpdateOneRequiredWithoutVocabsNestedInput
  }

  export type VocabItemUncheckedUpdateWithoutUserProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    word?: StringFieldUpdateOperationsInput | string
    translation?: StringFieldUpdateOperationsInput | string
    pronunciation?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    exampleAudio?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationCreateManyUserInput = {
    id?: string
    courseId?: string | null
    lessonId?: string | null
    title?: string | null
    status?: string
    context?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserProgressCreateManyUserInput = {
    id?: string
    lessonId: string
    completed?: boolean
    score?: number | null
    timeSpent?: number | null
    attempts?: number
    lastAccessed?: Date | string
    completedAt?: Date | string | null
  }

  export type UserVocabProgressCreateManyUserInput = {
    id?: string
    vocabId: string
    masteryLevel?: number
    correctCount?: number
    wrongCount?: number
    lastReviewed?: Date | string | null
    nextReview?: Date | string | null
  }

  export type ConversationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    course?: CourseUpdateOneWithoutConversationsNestedInput
    lesson?: LessonUpdateOneWithoutConversationsNestedInput
    messages?: MessageUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseId?: NullableStringFieldUpdateOperationsInput | string | null
    lessonId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseId?: NullableStringFieldUpdateOperationsInput | string | null
    lessonId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProgressUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    score?: NullableIntFieldUpdateOperationsInput | number | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    attempts?: IntFieldUpdateOperationsInput | number
    lastAccessed?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lesson?: LessonUpdateOneRequiredWithoutProgressNestedInput
  }

  export type UserProgressUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    lessonId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    score?: NullableIntFieldUpdateOperationsInput | number | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    attempts?: IntFieldUpdateOperationsInput | number
    lastAccessed?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserProgressUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    lessonId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    score?: NullableIntFieldUpdateOperationsInput | number | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    attempts?: IntFieldUpdateOperationsInput | number
    lastAccessed?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserVocabProgressUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    masteryLevel?: IntFieldUpdateOperationsInput | number
    correctCount?: IntFieldUpdateOperationsInput | number
    wrongCount?: IntFieldUpdateOperationsInput | number
    lastReviewed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextReview?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vocab?: VocabItemUpdateOneRequiredWithoutUserProgressNestedInput
  }

  export type UserVocabProgressUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    vocabId?: StringFieldUpdateOperationsInput | string
    masteryLevel?: IntFieldUpdateOperationsInput | number
    correctCount?: IntFieldUpdateOperationsInput | number
    wrongCount?: IntFieldUpdateOperationsInput | number
    lastReviewed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextReview?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserVocabProgressUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    vocabId?: StringFieldUpdateOperationsInput | string
    masteryLevel?: IntFieldUpdateOperationsInput | number
    correctCount?: IntFieldUpdateOperationsInput | number
    wrongCount?: IntFieldUpdateOperationsInput | number
    lastReviewed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextReview?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UnitCreateManyCourseInput = {
    id?: string
    title: string
    description?: string | null
    orderIndex: number
    createdAt?: Date | string
  }

  export type VocabItemCreateManyCourseInput = {
    id?: string
    word: string
    translation: string
    pronunciation?: string | null
    audioUrl?: string | null
    example?: string | null
    exampleAudio?: string | null
    difficulty?: number
    createdAt?: Date | string
  }

  export type ConversationCreateManyCourseInput = {
    id?: string
    userId: string
    lessonId?: string | null
    title?: string | null
    status?: string
    context?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UnitUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lessons?: LessonUpdateManyWithoutUnitNestedInput
  }

  export type UnitUncheckedUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lessons?: LessonUncheckedUpdateManyWithoutUnitNestedInput
  }

  export type UnitUncheckedUpdateManyWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VocabItemUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    word?: StringFieldUpdateOperationsInput | string
    translation?: StringFieldUpdateOperationsInput | string
    pronunciation?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    exampleAudio?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userProgress?: UserVocabProgressUpdateManyWithoutVocabNestedInput
  }

  export type VocabItemUncheckedUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    word?: StringFieldUpdateOperationsInput | string
    translation?: StringFieldUpdateOperationsInput | string
    pronunciation?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    exampleAudio?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userProgress?: UserVocabProgressUncheckedUpdateManyWithoutVocabNestedInput
  }

  export type VocabItemUncheckedUpdateManyWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    word?: StringFieldUpdateOperationsInput | string
    translation?: StringFieldUpdateOperationsInput | string
    pronunciation?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    exampleAudio?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutConversationsNestedInput
    lesson?: LessonUpdateOneWithoutConversationsNestedInput
    messages?: MessageUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    lessonId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateManyWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    lessonId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LessonCreateManyUnitInput = {
    id?: string
    title: string
    content?: string | null
    lessonType?: string
    orderIndex: number
    duration?: number | null
    createdAt?: Date | string
  }

  export type LessonUpdateWithoutUnitInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    lessonType?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    progress?: UserProgressUpdateManyWithoutLessonNestedInput
    conversations?: ConversationUpdateManyWithoutLessonNestedInput
  }

  export type LessonUncheckedUpdateWithoutUnitInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    lessonType?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    progress?: UserProgressUncheckedUpdateManyWithoutLessonNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutLessonNestedInput
  }

  export type LessonUncheckedUpdateManyWithoutUnitInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    lessonType?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProgressCreateManyLessonInput = {
    id?: string
    userId: string
    completed?: boolean
    score?: number | null
    timeSpent?: number | null
    attempts?: number
    lastAccessed?: Date | string
    completedAt?: Date | string | null
  }

  export type ConversationCreateManyLessonInput = {
    id?: string
    userId: string
    courseId?: string | null
    title?: string | null
    status?: string
    context?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserProgressUpdateWithoutLessonInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    score?: NullableIntFieldUpdateOperationsInput | number | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    attempts?: IntFieldUpdateOperationsInput | number
    lastAccessed?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutProgressNestedInput
  }

  export type UserProgressUncheckedUpdateWithoutLessonInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    score?: NullableIntFieldUpdateOperationsInput | number | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    attempts?: IntFieldUpdateOperationsInput | number
    lastAccessed?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserProgressUncheckedUpdateManyWithoutLessonInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    score?: NullableIntFieldUpdateOperationsInput | number | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    attempts?: IntFieldUpdateOperationsInput | number
    lastAccessed?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ConversationUpdateWithoutLessonInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutConversationsNestedInput
    course?: CourseUpdateOneWithoutConversationsNestedInput
    messages?: MessageUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutLessonInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    courseId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateManyWithoutLessonInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    courseId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyConversationInput = {
    id?: string
    role: string
    content: string
    audioUrl?: string | null
    audioDuration?: number | null
    metadata?: string | null
    createdAt?: Date | string
  }

  export type MessageUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    audioDuration?: NullableFloatFieldUpdateOperationsInput | number | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    audioDuration?: NullableFloatFieldUpdateOperationsInput | number | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    audioDuration?: NullableFloatFieldUpdateOperationsInput | number | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserVocabProgressCreateManyVocabInput = {
    id?: string
    userId: string
    masteryLevel?: number
    correctCount?: number
    wrongCount?: number
    lastReviewed?: Date | string | null
    nextReview?: Date | string | null
  }

  export type UserVocabProgressUpdateWithoutVocabInput = {
    id?: StringFieldUpdateOperationsInput | string
    masteryLevel?: IntFieldUpdateOperationsInput | number
    correctCount?: IntFieldUpdateOperationsInput | number
    wrongCount?: IntFieldUpdateOperationsInput | number
    lastReviewed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextReview?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutVocabProgressNestedInput
  }

  export type UserVocabProgressUncheckedUpdateWithoutVocabInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    masteryLevel?: IntFieldUpdateOperationsInput | number
    correctCount?: IntFieldUpdateOperationsInput | number
    wrongCount?: IntFieldUpdateOperationsInput | number
    lastReviewed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextReview?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserVocabProgressUncheckedUpdateManyWithoutVocabInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    masteryLevel?: IntFieldUpdateOperationsInput | number
    correctCount?: IntFieldUpdateOperationsInput | number
    wrongCount?: IntFieldUpdateOperationsInput | number
    lastReviewed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextReview?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}