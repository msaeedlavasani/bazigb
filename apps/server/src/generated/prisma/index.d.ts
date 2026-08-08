
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model Room
 * 
 */
export type Room = $Result.DefaultSelection<Prisma.$RoomPayload>
/**
 * Model GameHistory
 * 
 */
export type GameHistory = $Result.DefaultSelection<Prisma.$GameHistoryPayload>
/**
 * Model Tournament
 * 
 */
export type Tournament = $Result.DefaultSelection<Prisma.$TournamentPayload>
/**
 * Model TournamentPlayer
 * 
 */
export type TournamentPlayer = $Result.DefaultSelection<Prisma.$TournamentPlayerPayload>
/**
 * Model TournamentMatch
 * 
 */
export type TournamentMatch = $Result.DefaultSelection<Prisma.$TournamentMatchPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs>;

  /**
   * `prisma.room`: Exposes CRUD operations for the **Room** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rooms
    * const rooms = await prisma.room.findMany()
    * ```
    */
  get room(): Prisma.RoomDelegate<ExtArgs>;

  /**
   * `prisma.gameHistory`: Exposes CRUD operations for the **GameHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GameHistories
    * const gameHistories = await prisma.gameHistory.findMany()
    * ```
    */
  get gameHistory(): Prisma.GameHistoryDelegate<ExtArgs>;

  /**
   * `prisma.tournament`: Exposes CRUD operations for the **Tournament** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tournaments
    * const tournaments = await prisma.tournament.findMany()
    * ```
    */
  get tournament(): Prisma.TournamentDelegate<ExtArgs>;

  /**
   * `prisma.tournamentPlayer`: Exposes CRUD operations for the **TournamentPlayer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TournamentPlayers
    * const tournamentPlayers = await prisma.tournamentPlayer.findMany()
    * ```
    */
  get tournamentPlayer(): Prisma.TournamentPlayerDelegate<ExtArgs>;

  /**
   * `prisma.tournamentMatch`: Exposes CRUD operations for the **TournamentMatch** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TournamentMatches
    * const tournamentMatches = await prisma.tournamentMatch.findMany()
    * ```
    */
  get tournamentMatch(): Prisma.TournamentMatchDelegate<ExtArgs>;
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
  export import NotFoundError = runtime.NotFoundError

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
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
    Notification: 'Notification',
    Room: 'Room',
    GameHistory: 'GameHistory',
    Tournament: 'Tournament',
    TournamentPlayer: 'TournamentPlayer',
    TournamentMatch: 'TournamentMatch'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "notification" | "room" | "gameHistory" | "tournament" | "tournamentPlayer" | "tournamentMatch"
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
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      Room: {
        payload: Prisma.$RoomPayload<ExtArgs>
        fields: Prisma.RoomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findFirst: {
            args: Prisma.RoomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findMany: {
            args: Prisma.RoomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          create: {
            args: Prisma.RoomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          createMany: {
            args: Prisma.RoomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          delete: {
            args: Prisma.RoomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          update: {
            args: Prisma.RoomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          deleteMany: {
            args: Prisma.RoomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RoomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          aggregate: {
            args: Prisma.RoomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoom>
          }
          groupBy: {
            args: Prisma.RoomGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomCountArgs<ExtArgs>
            result: $Utils.Optional<RoomCountAggregateOutputType> | number
          }
        }
      }
      GameHistory: {
        payload: Prisma.$GameHistoryPayload<ExtArgs>
        fields: Prisma.GameHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameHistoryPayload>
          }
          findFirst: {
            args: Prisma.GameHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameHistoryPayload>
          }
          findMany: {
            args: Prisma.GameHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameHistoryPayload>[]
          }
          create: {
            args: Prisma.GameHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameHistoryPayload>
          }
          createMany: {
            args: Prisma.GameHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameHistoryPayload>[]
          }
          delete: {
            args: Prisma.GameHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameHistoryPayload>
          }
          update: {
            args: Prisma.GameHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameHistoryPayload>
          }
          deleteMany: {
            args: Prisma.GameHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GameHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameHistoryPayload>
          }
          aggregate: {
            args: Prisma.GameHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGameHistory>
          }
          groupBy: {
            args: Prisma.GameHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<GameHistoryCountAggregateOutputType> | number
          }
        }
      }
      Tournament: {
        payload: Prisma.$TournamentPayload<ExtArgs>
        fields: Prisma.TournamentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TournamentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TournamentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>
          }
          findFirst: {
            args: Prisma.TournamentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TournamentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>
          }
          findMany: {
            args: Prisma.TournamentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>[]
          }
          create: {
            args: Prisma.TournamentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>
          }
          createMany: {
            args: Prisma.TournamentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TournamentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>[]
          }
          delete: {
            args: Prisma.TournamentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>
          }
          update: {
            args: Prisma.TournamentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>
          }
          deleteMany: {
            args: Prisma.TournamentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TournamentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TournamentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>
          }
          aggregate: {
            args: Prisma.TournamentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTournament>
          }
          groupBy: {
            args: Prisma.TournamentGroupByArgs<ExtArgs>
            result: $Utils.Optional<TournamentGroupByOutputType>[]
          }
          count: {
            args: Prisma.TournamentCountArgs<ExtArgs>
            result: $Utils.Optional<TournamentCountAggregateOutputType> | number
          }
        }
      }
      TournamentPlayer: {
        payload: Prisma.$TournamentPlayerPayload<ExtArgs>
        fields: Prisma.TournamentPlayerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TournamentPlayerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPlayerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TournamentPlayerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPlayerPayload>
          }
          findFirst: {
            args: Prisma.TournamentPlayerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPlayerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TournamentPlayerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPlayerPayload>
          }
          findMany: {
            args: Prisma.TournamentPlayerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPlayerPayload>[]
          }
          create: {
            args: Prisma.TournamentPlayerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPlayerPayload>
          }
          createMany: {
            args: Prisma.TournamentPlayerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TournamentPlayerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPlayerPayload>[]
          }
          delete: {
            args: Prisma.TournamentPlayerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPlayerPayload>
          }
          update: {
            args: Prisma.TournamentPlayerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPlayerPayload>
          }
          deleteMany: {
            args: Prisma.TournamentPlayerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TournamentPlayerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TournamentPlayerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPlayerPayload>
          }
          aggregate: {
            args: Prisma.TournamentPlayerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTournamentPlayer>
          }
          groupBy: {
            args: Prisma.TournamentPlayerGroupByArgs<ExtArgs>
            result: $Utils.Optional<TournamentPlayerGroupByOutputType>[]
          }
          count: {
            args: Prisma.TournamentPlayerCountArgs<ExtArgs>
            result: $Utils.Optional<TournamentPlayerCountAggregateOutputType> | number
          }
        }
      }
      TournamentMatch: {
        payload: Prisma.$TournamentMatchPayload<ExtArgs>
        fields: Prisma.TournamentMatchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TournamentMatchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentMatchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TournamentMatchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentMatchPayload>
          }
          findFirst: {
            args: Prisma.TournamentMatchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentMatchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TournamentMatchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentMatchPayload>
          }
          findMany: {
            args: Prisma.TournamentMatchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentMatchPayload>[]
          }
          create: {
            args: Prisma.TournamentMatchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentMatchPayload>
          }
          createMany: {
            args: Prisma.TournamentMatchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TournamentMatchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentMatchPayload>[]
          }
          delete: {
            args: Prisma.TournamentMatchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentMatchPayload>
          }
          update: {
            args: Prisma.TournamentMatchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentMatchPayload>
          }
          deleteMany: {
            args: Prisma.TournamentMatchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TournamentMatchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TournamentMatchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentMatchPayload>
          }
          aggregate: {
            args: Prisma.TournamentMatchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTournamentMatch>
          }
          groupBy: {
            args: Prisma.TournamentMatchGroupByArgs<ExtArgs>
            result: $Utils.Optional<TournamentMatchGroupByOutputType>[]
          }
          count: {
            args: Prisma.TournamentMatchCountArgs<ExtArgs>
            result: $Utils.Optional<TournamentMatchCountAggregateOutputType> | number
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
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
    gameHistoryWins: number
    tournamentsWon: number
    tournamentSlots: number
    matchAsPlayerA: number
    matchAsPlayerB: number
    matchWins: number
    notifications: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gameHistoryWins?: boolean | UserCountOutputTypeCountGameHistoryWinsArgs
    tournamentsWon?: boolean | UserCountOutputTypeCountTournamentsWonArgs
    tournamentSlots?: boolean | UserCountOutputTypeCountTournamentSlotsArgs
    matchAsPlayerA?: boolean | UserCountOutputTypeCountMatchAsPlayerAArgs
    matchAsPlayerB?: boolean | UserCountOutputTypeCountMatchAsPlayerBArgs
    matchWins?: boolean | UserCountOutputTypeCountMatchWinsArgs
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
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
  export type UserCountOutputTypeCountGameHistoryWinsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameHistoryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTournamentsWonArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TournamentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTournamentSlotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TournamentPlayerWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMatchAsPlayerAArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TournamentMatchWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMatchAsPlayerBArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TournamentMatchWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMatchWinsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TournamentMatchWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }


  /**
   * Count Type RoomCountOutputType
   */

  export type RoomCountOutputType = {
    games: number
  }

  export type RoomCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    games?: boolean | RoomCountOutputTypeCountGamesArgs
  }

  // Custom InputTypes
  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomCountOutputType
     */
    select?: RoomCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeCountGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameHistoryWhereInput
  }


  /**
   * Count Type TournamentCountOutputType
   */

  export type TournamentCountOutputType = {
    players: number
    matches: number
  }

  export type TournamentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    players?: boolean | TournamentCountOutputTypeCountPlayersArgs
    matches?: boolean | TournamentCountOutputTypeCountMatchesArgs
  }

  // Custom InputTypes
  /**
   * TournamentCountOutputType without action
   */
  export type TournamentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentCountOutputType
     */
    select?: TournamentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TournamentCountOutputType without action
   */
  export type TournamentCountOutputTypeCountPlayersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TournamentPlayerWhereInput
  }

  /**
   * TournamentCountOutputType without action
   */
  export type TournamentCountOutputTypeCountMatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TournamentMatchWhereInput
  }


  /**
   * Count Type TournamentMatchCountOutputType
   */

  export type TournamentMatchCountOutputType = {
    previousMatches: number
  }

  export type TournamentMatchCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    previousMatches?: boolean | TournamentMatchCountOutputTypeCountPreviousMatchesArgs
  }

  // Custom InputTypes
  /**
   * TournamentMatchCountOutputType without action
   */
  export type TournamentMatchCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatchCountOutputType
     */
    select?: TournamentMatchCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TournamentMatchCountOutputType without action
   */
  export type TournamentMatchCountOutputTypeCountPreviousMatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TournamentMatchWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    wins: number | null
    losses: number | null
    rating: number | null
  }

  export type UserSumAggregateOutputType = {
    wins: number | null
    losses: number | null
    rating: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    username: string | null
    wins: number | null
    losses: number | null
    rating: number | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    username: string | null
    wins: number | null
    losses: number | null
    rating: number | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    username: number
    wins: number
    losses: number
    rating: number
    createdAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    wins?: true
    losses?: true
    rating?: true
  }

  export type UserSumAggregateInputType = {
    wins?: true
    losses?: true
    rating?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    username?: true
    wins?: true
    losses?: true
    rating?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    username?: true
    wins?: true
    losses?: true
    rating?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    username?: true
    wins?: true
    losses?: true
    rating?: true
    createdAt?: true
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
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
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
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    username: string
    wins: number
    losses: number
    rating: number
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
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
    email?: boolean
    password?: boolean
    username?: boolean
    wins?: boolean
    losses?: boolean
    rating?: boolean
    createdAt?: boolean
    gameHistoryWins?: boolean | User$gameHistoryWinsArgs<ExtArgs>
    tournamentsWon?: boolean | User$tournamentsWonArgs<ExtArgs>
    tournamentSlots?: boolean | User$tournamentSlotsArgs<ExtArgs>
    matchAsPlayerA?: boolean | User$matchAsPlayerAArgs<ExtArgs>
    matchAsPlayerB?: boolean | User$matchAsPlayerBArgs<ExtArgs>
    matchWins?: boolean | User$matchWinsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    username?: boolean
    wins?: boolean
    losses?: boolean
    rating?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    username?: boolean
    wins?: boolean
    losses?: boolean
    rating?: boolean
    createdAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gameHistoryWins?: boolean | User$gameHistoryWinsArgs<ExtArgs>
    tournamentsWon?: boolean | User$tournamentsWonArgs<ExtArgs>
    tournamentSlots?: boolean | User$tournamentSlotsArgs<ExtArgs>
    matchAsPlayerA?: boolean | User$matchAsPlayerAArgs<ExtArgs>
    matchAsPlayerB?: boolean | User$matchAsPlayerBArgs<ExtArgs>
    matchWins?: boolean | User$matchWinsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      gameHistoryWins: Prisma.$GameHistoryPayload<ExtArgs>[]
      tournamentsWon: Prisma.$TournamentPayload<ExtArgs>[]
      tournamentSlots: Prisma.$TournamentPlayerPayload<ExtArgs>[]
      matchAsPlayerA: Prisma.$TournamentMatchPayload<ExtArgs>[]
      matchAsPlayerB: Prisma.$TournamentMatchPayload<ExtArgs>[]
      matchWins: Prisma.$TournamentMatchPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      username: string
      wins: number
      losses: number
      rating: number
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
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
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

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
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

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
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

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
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

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
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

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
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

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
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

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
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

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
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

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
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


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
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    gameHistoryWins<T extends User$gameHistoryWinsArgs<ExtArgs> = {}>(args?: Subset<T, User$gameHistoryWinsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameHistoryPayload<ExtArgs>, T, "findMany"> | Null>
    tournamentsWon<T extends User$tournamentsWonArgs<ExtArgs> = {}>(args?: Subset<T, User$tournamentsWonArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findMany"> | Null>
    tournamentSlots<T extends User$tournamentSlotsArgs<ExtArgs> = {}>(args?: Subset<T, User$tournamentSlotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentPlayerPayload<ExtArgs>, T, "findMany"> | Null>
    matchAsPlayerA<T extends User$matchAsPlayerAArgs<ExtArgs> = {}>(args?: Subset<T, User$matchAsPlayerAArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentMatchPayload<ExtArgs>, T, "findMany"> | Null>
    matchAsPlayerB<T extends User$matchAsPlayerBArgs<ExtArgs> = {}>(args?: Subset<T, User$matchAsPlayerBArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentMatchPayload<ExtArgs>, T, "findMany"> | Null>
    matchWins<T extends User$matchWinsArgs<ExtArgs> = {}>(args?: Subset<T, User$matchWinsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentMatchPayload<ExtArgs>, T, "findMany"> | Null>
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany"> | Null>
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
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly wins: FieldRef<"User", 'Int'>
    readonly losses: FieldRef<"User", 'Int'>
    readonly rating: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
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
    skipDuplicates?: boolean
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
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
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
  }

  /**
   * User.gameHistoryWins
   */
  export type User$gameHistoryWinsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameHistory
     */
    select?: GameHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameHistoryInclude<ExtArgs> | null
    where?: GameHistoryWhereInput
    orderBy?: GameHistoryOrderByWithRelationInput | GameHistoryOrderByWithRelationInput[]
    cursor?: GameHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameHistoryScalarFieldEnum | GameHistoryScalarFieldEnum[]
  }

  /**
   * User.tournamentsWon
   */
  export type User$tournamentsWonArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    where?: TournamentWhereInput
    orderBy?: TournamentOrderByWithRelationInput | TournamentOrderByWithRelationInput[]
    cursor?: TournamentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TournamentScalarFieldEnum | TournamentScalarFieldEnum[]
  }

  /**
   * User.tournamentSlots
   */
  export type User$tournamentSlotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentPlayer
     */
    select?: TournamentPlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentPlayerInclude<ExtArgs> | null
    where?: TournamentPlayerWhereInput
    orderBy?: TournamentPlayerOrderByWithRelationInput | TournamentPlayerOrderByWithRelationInput[]
    cursor?: TournamentPlayerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TournamentPlayerScalarFieldEnum | TournamentPlayerScalarFieldEnum[]
  }

  /**
   * User.matchAsPlayerA
   */
  export type User$matchAsPlayerAArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchInclude<ExtArgs> | null
    where?: TournamentMatchWhereInput
    orderBy?: TournamentMatchOrderByWithRelationInput | TournamentMatchOrderByWithRelationInput[]
    cursor?: TournamentMatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TournamentMatchScalarFieldEnum | TournamentMatchScalarFieldEnum[]
  }

  /**
   * User.matchAsPlayerB
   */
  export type User$matchAsPlayerBArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchInclude<ExtArgs> | null
    where?: TournamentMatchWhereInput
    orderBy?: TournamentMatchOrderByWithRelationInput | TournamentMatchOrderByWithRelationInput[]
    cursor?: TournamentMatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TournamentMatchScalarFieldEnum | TournamentMatchScalarFieldEnum[]
  }

  /**
   * User.matchWins
   */
  export type User$matchWinsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchInclude<ExtArgs> | null
    where?: TournamentMatchWhereInput
    orderBy?: TournamentMatchOrderByWithRelationInput | TournamentMatchOrderByWithRelationInput[]
    cursor?: TournamentMatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TournamentMatchScalarFieldEnum | TournamentMatchScalarFieldEnum[]
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    title: string | null
    body: string | null
    read: boolean | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    title: string | null
    body: string | null
    read: boolean | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    title: number
    body: number
    read: number
    createdAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    title?: true
    body?: true
    read?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    title?: true
    body?: true
    read?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    title?: true
    body?: true
    read?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    userId: string
    type: string
    title: string
    body: string | null
    read: boolean
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    body?: boolean
    read?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    body?: boolean
    read?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    body?: boolean
    read?: boolean
    createdAt?: boolean
  }

  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      title: string
      body: string | null
      read: boolean
      createdAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
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
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Notification model
   */ 
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly userId: FieldRef<"Notification", 'String'>
    readonly type: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly body: FieldRef<"Notification", 'String'>
    readonly read: FieldRef<"Notification", 'Boolean'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Model Room
   */

  export type AggregateRoom = {
    _count: RoomCountAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  export type RoomMinAggregateOutputType = {
    id: string | null
    code: string | null
    status: string | null
    gameType: string | null
    players: string | null
    currentState: string | null
    winnerId: string | null
    ownerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomMaxAggregateOutputType = {
    id: string | null
    code: string | null
    status: string | null
    gameType: string | null
    players: string | null
    currentState: string | null
    winnerId: string | null
    ownerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomCountAggregateOutputType = {
    id: number
    code: number
    status: number
    gameType: number
    players: number
    currentState: number
    winnerId: number
    ownerId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoomMinAggregateInputType = {
    id?: true
    code?: true
    status?: true
    gameType?: true
    players?: true
    currentState?: true
    winnerId?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomMaxAggregateInputType = {
    id?: true
    code?: true
    status?: true
    gameType?: true
    players?: true
    currentState?: true
    winnerId?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomCountAggregateInputType = {
    id?: true
    code?: true
    status?: true
    gameType?: true
    players?: true
    currentState?: true
    winnerId?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Room to aggregate.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rooms
    **/
    _count?: true | RoomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomMaxAggregateInputType
  }

  export type GetRoomAggregateType<T extends RoomAggregateArgs> = {
        [P in keyof T & keyof AggregateRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoom[P]>
      : GetScalarType<T[P], AggregateRoom[P]>
  }




  export type RoomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithAggregationInput | RoomOrderByWithAggregationInput[]
    by: RoomScalarFieldEnum[] | RoomScalarFieldEnum
    having?: RoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomCountAggregateInputType | true
    _min?: RoomMinAggregateInputType
    _max?: RoomMaxAggregateInputType
  }

  export type RoomGroupByOutputType = {
    id: string
    code: string
    status: string
    gameType: string
    players: string
    currentState: string | null
    winnerId: string | null
    ownerId: string | null
    createdAt: Date
    updatedAt: Date
    _count: RoomCountAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  type GetRoomGroupByPayload<T extends RoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomGroupByOutputType[P]>
            : GetScalarType<T[P], RoomGroupByOutputType[P]>
        }
      >
    >


  export type RoomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    status?: boolean
    gameType?: boolean
    players?: boolean
    currentState?: boolean
    winnerId?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    games?: boolean | Room$gamesArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room"]>

  export type RoomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    status?: boolean
    gameType?: boolean
    players?: boolean
    currentState?: boolean
    winnerId?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["room"]>

  export type RoomSelectScalar = {
    id?: boolean
    code?: boolean
    status?: boolean
    gameType?: boolean
    players?: boolean
    currentState?: boolean
    winnerId?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    games?: boolean | Room$gamesArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RoomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Room"
    objects: {
      games: Prisma.$GameHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      status: string
      gameType: string
      players: string
      currentState: string | null
      winnerId: string | null
      ownerId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["room"]>
    composites: {}
  }

  type RoomGetPayload<S extends boolean | null | undefined | RoomDefaultArgs> = $Result.GetResult<Prisma.$RoomPayload, S>

  type RoomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RoomFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RoomCountAggregateInputType | true
    }

  export interface RoomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Room'], meta: { name: 'Room' } }
    /**
     * Find zero or one Room that matches the filter.
     * @param {RoomFindUniqueArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomFindUniqueArgs>(args: SelectSubset<T, RoomFindUniqueArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Room that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RoomFindUniqueOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Room that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomFindFirstArgs>(args?: SelectSubset<T, RoomFindFirstArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Room that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Rooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rooms
     * const rooms = await prisma.room.findMany()
     * 
     * // Get first 10 Rooms
     * const rooms = await prisma.room.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomWithIdOnly = await prisma.room.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomFindManyArgs>(args?: SelectSubset<T, RoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Room.
     * @param {RoomCreateArgs} args - Arguments to create a Room.
     * @example
     * // Create one Room
     * const Room = await prisma.room.create({
     *   data: {
     *     // ... data to create a Room
     *   }
     * })
     * 
     */
    create<T extends RoomCreateArgs>(args: SelectSubset<T, RoomCreateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Rooms.
     * @param {RoomCreateManyArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomCreateManyArgs>(args?: SelectSubset<T, RoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rooms and returns the data saved in the database.
     * @param {RoomCreateManyAndReturnArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rooms and only return the `id`
     * const roomWithIdOnly = await prisma.room.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Room.
     * @param {RoomDeleteArgs} args - Arguments to delete one Room.
     * @example
     * // Delete one Room
     * const Room = await prisma.room.delete({
     *   where: {
     *     // ... filter to delete one Room
     *   }
     * })
     * 
     */
    delete<T extends RoomDeleteArgs>(args: SelectSubset<T, RoomDeleteArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Room.
     * @param {RoomUpdateArgs} args - Arguments to update one Room.
     * @example
     * // Update one Room
     * const room = await prisma.room.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomUpdateArgs>(args: SelectSubset<T, RoomUpdateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Rooms.
     * @param {RoomDeleteManyArgs} args - Arguments to filter Rooms to delete.
     * @example
     * // Delete a few Rooms
     * const { count } = await prisma.room.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomDeleteManyArgs>(args?: SelectSubset<T, RoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomUpdateManyArgs>(args: SelectSubset<T, RoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Room.
     * @param {RoomUpsertArgs} args - Arguments to update or create a Room.
     * @example
     * // Update or create a Room
     * const room = await prisma.room.upsert({
     *   create: {
     *     // ... data to create a Room
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Room we want to update
     *   }
     * })
     */
    upsert<T extends RoomUpsertArgs>(args: SelectSubset<T, RoomUpsertArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomCountArgs} args - Arguments to filter Rooms to count.
     * @example
     * // Count the number of Rooms
     * const count = await prisma.room.count({
     *   where: {
     *     // ... the filter for the Rooms we want to count
     *   }
     * })
    **/
    count<T extends RoomCountArgs>(
      args?: Subset<T, RoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RoomAggregateArgs>(args: Subset<T, RoomAggregateArgs>): Prisma.PrismaPromise<GetRoomAggregateType<T>>

    /**
     * Group by Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomGroupByArgs} args - Group by arguments.
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
      T extends RoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomGroupByArgs['orderBy'] }
        : { orderBy?: RoomGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Room model
   */
  readonly fields: RoomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Room.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    games<T extends Room$gamesArgs<ExtArgs> = {}>(args?: Subset<T, Room$gamesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameHistoryPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Room model
   */ 
  interface RoomFieldRefs {
    readonly id: FieldRef<"Room", 'String'>
    readonly code: FieldRef<"Room", 'String'>
    readonly status: FieldRef<"Room", 'String'>
    readonly gameType: FieldRef<"Room", 'String'>
    readonly players: FieldRef<"Room", 'String'>
    readonly currentState: FieldRef<"Room", 'String'>
    readonly winnerId: FieldRef<"Room", 'String'>
    readonly ownerId: FieldRef<"Room", 'String'>
    readonly createdAt: FieldRef<"Room", 'DateTime'>
    readonly updatedAt: FieldRef<"Room", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Room findUnique
   */
  export type RoomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findUniqueOrThrow
   */
  export type RoomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findFirst
   */
  export type RoomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findFirstOrThrow
   */
  export type RoomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findMany
   */
  export type RoomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Rooms to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room create
   */
  export type RoomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to create a Room.
     */
    data: XOR<RoomCreateInput, RoomUncheckedCreateInput>
  }

  /**
   * Room createMany
   */
  export type RoomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Room createManyAndReturn
   */
  export type RoomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Room update
   */
  export type RoomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to update a Room.
     */
    data: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
    /**
     * Choose, which Room to update.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room updateMany
   */
  export type RoomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>
    /**
     * Filter which Rooms to update
     */
    where?: RoomWhereInput
  }

  /**
   * Room upsert
   */
  export type RoomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The filter to search for the Room to update in case it exists.
     */
    where: RoomWhereUniqueInput
    /**
     * In case the Room found by the `where` argument doesn't exist, create a new Room with this data.
     */
    create: XOR<RoomCreateInput, RoomUncheckedCreateInput>
    /**
     * In case the Room was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
  }

  /**
   * Room delete
   */
  export type RoomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter which Room to delete.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room deleteMany
   */
  export type RoomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rooms to delete
     */
    where?: RoomWhereInput
  }

  /**
   * Room.games
   */
  export type Room$gamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameHistory
     */
    select?: GameHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameHistoryInclude<ExtArgs> | null
    where?: GameHistoryWhereInput
    orderBy?: GameHistoryOrderByWithRelationInput | GameHistoryOrderByWithRelationInput[]
    cursor?: GameHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameHistoryScalarFieldEnum | GameHistoryScalarFieldEnum[]
  }

  /**
   * Room without action
   */
  export type RoomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
  }


  /**
   * Model GameHistory
   */

  export type AggregateGameHistory = {
    _count: GameHistoryCountAggregateOutputType | null
    _min: GameHistoryMinAggregateOutputType | null
    _max: GameHistoryMaxAggregateOutputType | null
  }

  export type GameHistoryMinAggregateOutputType = {
    id: string | null
    winnerId: string | null
    roomId: string | null
    gameName: string | null
    players: string | null
    data: string | null
    createdAt: Date | null
  }

  export type GameHistoryMaxAggregateOutputType = {
    id: string | null
    winnerId: string | null
    roomId: string | null
    gameName: string | null
    players: string | null
    data: string | null
    createdAt: Date | null
  }

  export type GameHistoryCountAggregateOutputType = {
    id: number
    winnerId: number
    roomId: number
    gameName: number
    players: number
    data: number
    createdAt: number
    _all: number
  }


  export type GameHistoryMinAggregateInputType = {
    id?: true
    winnerId?: true
    roomId?: true
    gameName?: true
    players?: true
    data?: true
    createdAt?: true
  }

  export type GameHistoryMaxAggregateInputType = {
    id?: true
    winnerId?: true
    roomId?: true
    gameName?: true
    players?: true
    data?: true
    createdAt?: true
  }

  export type GameHistoryCountAggregateInputType = {
    id?: true
    winnerId?: true
    roomId?: true
    gameName?: true
    players?: true
    data?: true
    createdAt?: true
    _all?: true
  }

  export type GameHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameHistory to aggregate.
     */
    where?: GameHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameHistories to fetch.
     */
    orderBy?: GameHistoryOrderByWithRelationInput | GameHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GameHistories
    **/
    _count?: true | GameHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameHistoryMaxAggregateInputType
  }

  export type GetGameHistoryAggregateType<T extends GameHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateGameHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGameHistory[P]>
      : GetScalarType<T[P], AggregateGameHistory[P]>
  }




  export type GameHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameHistoryWhereInput
    orderBy?: GameHistoryOrderByWithAggregationInput | GameHistoryOrderByWithAggregationInput[]
    by: GameHistoryScalarFieldEnum[] | GameHistoryScalarFieldEnum
    having?: GameHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameHistoryCountAggregateInputType | true
    _min?: GameHistoryMinAggregateInputType
    _max?: GameHistoryMaxAggregateInputType
  }

  export type GameHistoryGroupByOutputType = {
    id: string
    winnerId: string | null
    roomId: string
    gameName: string
    players: string
    data: string
    createdAt: Date
    _count: GameHistoryCountAggregateOutputType | null
    _min: GameHistoryMinAggregateOutputType | null
    _max: GameHistoryMaxAggregateOutputType | null
  }

  type GetGameHistoryGroupByPayload<T extends GameHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], GameHistoryGroupByOutputType[P]>
        }
      >
    >


  export type GameHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    winnerId?: boolean
    roomId?: boolean
    gameName?: boolean
    players?: boolean
    data?: boolean
    createdAt?: boolean
    winner?: boolean | GameHistory$winnerArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameHistory"]>

  export type GameHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    winnerId?: boolean
    roomId?: boolean
    gameName?: boolean
    players?: boolean
    data?: boolean
    createdAt?: boolean
    winner?: boolean | GameHistory$winnerArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameHistory"]>

  export type GameHistorySelectScalar = {
    id?: boolean
    winnerId?: boolean
    roomId?: boolean
    gameName?: boolean
    players?: boolean
    data?: boolean
    createdAt?: boolean
  }

  export type GameHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    winner?: boolean | GameHistory$winnerArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }
  export type GameHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    winner?: boolean | GameHistory$winnerArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }

  export type $GameHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GameHistory"
    objects: {
      winner: Prisma.$UserPayload<ExtArgs> | null
      room: Prisma.$RoomPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      winnerId: string | null
      roomId: string
      gameName: string
      players: string
      data: string
      createdAt: Date
    }, ExtArgs["result"]["gameHistory"]>
    composites: {}
  }

  type GameHistoryGetPayload<S extends boolean | null | undefined | GameHistoryDefaultArgs> = $Result.GetResult<Prisma.$GameHistoryPayload, S>

  type GameHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GameHistoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GameHistoryCountAggregateInputType | true
    }

  export interface GameHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GameHistory'], meta: { name: 'GameHistory' } }
    /**
     * Find zero or one GameHistory that matches the filter.
     * @param {GameHistoryFindUniqueArgs} args - Arguments to find a GameHistory
     * @example
     * // Get one GameHistory
     * const gameHistory = await prisma.gameHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameHistoryFindUniqueArgs>(args: SelectSubset<T, GameHistoryFindUniqueArgs<ExtArgs>>): Prisma__GameHistoryClient<$Result.GetResult<Prisma.$GameHistoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GameHistory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GameHistoryFindUniqueOrThrowArgs} args - Arguments to find a GameHistory
     * @example
     * // Get one GameHistory
     * const gameHistory = await prisma.gameHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, GameHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameHistoryClient<$Result.GetResult<Prisma.$GameHistoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GameHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameHistoryFindFirstArgs} args - Arguments to find a GameHistory
     * @example
     * // Get one GameHistory
     * const gameHistory = await prisma.gameHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameHistoryFindFirstArgs>(args?: SelectSubset<T, GameHistoryFindFirstArgs<ExtArgs>>): Prisma__GameHistoryClient<$Result.GetResult<Prisma.$GameHistoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GameHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameHistoryFindFirstOrThrowArgs} args - Arguments to find a GameHistory
     * @example
     * // Get one GameHistory
     * const gameHistory = await prisma.gameHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, GameHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameHistoryClient<$Result.GetResult<Prisma.$GameHistoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GameHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GameHistories
     * const gameHistories = await prisma.gameHistory.findMany()
     * 
     * // Get first 10 GameHistories
     * const gameHistories = await prisma.gameHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameHistoryWithIdOnly = await prisma.gameHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameHistoryFindManyArgs>(args?: SelectSubset<T, GameHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameHistoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GameHistory.
     * @param {GameHistoryCreateArgs} args - Arguments to create a GameHistory.
     * @example
     * // Create one GameHistory
     * const GameHistory = await prisma.gameHistory.create({
     *   data: {
     *     // ... data to create a GameHistory
     *   }
     * })
     * 
     */
    create<T extends GameHistoryCreateArgs>(args: SelectSubset<T, GameHistoryCreateArgs<ExtArgs>>): Prisma__GameHistoryClient<$Result.GetResult<Prisma.$GameHistoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GameHistories.
     * @param {GameHistoryCreateManyArgs} args - Arguments to create many GameHistories.
     * @example
     * // Create many GameHistories
     * const gameHistory = await prisma.gameHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameHistoryCreateManyArgs>(args?: SelectSubset<T, GameHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GameHistories and returns the data saved in the database.
     * @param {GameHistoryCreateManyAndReturnArgs} args - Arguments to create many GameHistories.
     * @example
     * // Create many GameHistories
     * const gameHistory = await prisma.gameHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GameHistories and only return the `id`
     * const gameHistoryWithIdOnly = await prisma.gameHistory.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, GameHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameHistoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a GameHistory.
     * @param {GameHistoryDeleteArgs} args - Arguments to delete one GameHistory.
     * @example
     * // Delete one GameHistory
     * const GameHistory = await prisma.gameHistory.delete({
     *   where: {
     *     // ... filter to delete one GameHistory
     *   }
     * })
     * 
     */
    delete<T extends GameHistoryDeleteArgs>(args: SelectSubset<T, GameHistoryDeleteArgs<ExtArgs>>): Prisma__GameHistoryClient<$Result.GetResult<Prisma.$GameHistoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GameHistory.
     * @param {GameHistoryUpdateArgs} args - Arguments to update one GameHistory.
     * @example
     * // Update one GameHistory
     * const gameHistory = await prisma.gameHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameHistoryUpdateArgs>(args: SelectSubset<T, GameHistoryUpdateArgs<ExtArgs>>): Prisma__GameHistoryClient<$Result.GetResult<Prisma.$GameHistoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GameHistories.
     * @param {GameHistoryDeleteManyArgs} args - Arguments to filter GameHistories to delete.
     * @example
     * // Delete a few GameHistories
     * const { count } = await prisma.gameHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameHistoryDeleteManyArgs>(args?: SelectSubset<T, GameHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GameHistories
     * const gameHistory = await prisma.gameHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameHistoryUpdateManyArgs>(args: SelectSubset<T, GameHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GameHistory.
     * @param {GameHistoryUpsertArgs} args - Arguments to update or create a GameHistory.
     * @example
     * // Update or create a GameHistory
     * const gameHistory = await prisma.gameHistory.upsert({
     *   create: {
     *     // ... data to create a GameHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GameHistory we want to update
     *   }
     * })
     */
    upsert<T extends GameHistoryUpsertArgs>(args: SelectSubset<T, GameHistoryUpsertArgs<ExtArgs>>): Prisma__GameHistoryClient<$Result.GetResult<Prisma.$GameHistoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of GameHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameHistoryCountArgs} args - Arguments to filter GameHistories to count.
     * @example
     * // Count the number of GameHistories
     * const count = await prisma.gameHistory.count({
     *   where: {
     *     // ... the filter for the GameHistories we want to count
     *   }
     * })
    **/
    count<T extends GameHistoryCountArgs>(
      args?: Subset<T, GameHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GameHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GameHistoryAggregateArgs>(args: Subset<T, GameHistoryAggregateArgs>): Prisma.PrismaPromise<GetGameHistoryAggregateType<T>>

    /**
     * Group by GameHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameHistoryGroupByArgs} args - Group by arguments.
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
      T extends GameHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameHistoryGroupByArgs['orderBy'] }
        : { orderBy?: GameHistoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GameHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GameHistory model
   */
  readonly fields: GameHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GameHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    winner<T extends GameHistory$winnerArgs<ExtArgs> = {}>(args?: Subset<T, GameHistory$winnerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    room<T extends RoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoomDefaultArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the GameHistory model
   */ 
  interface GameHistoryFieldRefs {
    readonly id: FieldRef<"GameHistory", 'String'>
    readonly winnerId: FieldRef<"GameHistory", 'String'>
    readonly roomId: FieldRef<"GameHistory", 'String'>
    readonly gameName: FieldRef<"GameHistory", 'String'>
    readonly players: FieldRef<"GameHistory", 'String'>
    readonly data: FieldRef<"GameHistory", 'String'>
    readonly createdAt: FieldRef<"GameHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GameHistory findUnique
   */
  export type GameHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameHistory
     */
    select?: GameHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameHistoryInclude<ExtArgs> | null
    /**
     * Filter, which GameHistory to fetch.
     */
    where: GameHistoryWhereUniqueInput
  }

  /**
   * GameHistory findUniqueOrThrow
   */
  export type GameHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameHistory
     */
    select?: GameHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameHistoryInclude<ExtArgs> | null
    /**
     * Filter, which GameHistory to fetch.
     */
    where: GameHistoryWhereUniqueInput
  }

  /**
   * GameHistory findFirst
   */
  export type GameHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameHistory
     */
    select?: GameHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameHistoryInclude<ExtArgs> | null
    /**
     * Filter, which GameHistory to fetch.
     */
    where?: GameHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameHistories to fetch.
     */
    orderBy?: GameHistoryOrderByWithRelationInput | GameHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameHistories.
     */
    cursor?: GameHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameHistories.
     */
    distinct?: GameHistoryScalarFieldEnum | GameHistoryScalarFieldEnum[]
  }

  /**
   * GameHistory findFirstOrThrow
   */
  export type GameHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameHistory
     */
    select?: GameHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameHistoryInclude<ExtArgs> | null
    /**
     * Filter, which GameHistory to fetch.
     */
    where?: GameHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameHistories to fetch.
     */
    orderBy?: GameHistoryOrderByWithRelationInput | GameHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameHistories.
     */
    cursor?: GameHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameHistories.
     */
    distinct?: GameHistoryScalarFieldEnum | GameHistoryScalarFieldEnum[]
  }

  /**
   * GameHistory findMany
   */
  export type GameHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameHistory
     */
    select?: GameHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameHistoryInclude<ExtArgs> | null
    /**
     * Filter, which GameHistories to fetch.
     */
    where?: GameHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameHistories to fetch.
     */
    orderBy?: GameHistoryOrderByWithRelationInput | GameHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GameHistories.
     */
    cursor?: GameHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameHistories.
     */
    skip?: number
    distinct?: GameHistoryScalarFieldEnum | GameHistoryScalarFieldEnum[]
  }

  /**
   * GameHistory create
   */
  export type GameHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameHistory
     */
    select?: GameHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a GameHistory.
     */
    data: XOR<GameHistoryCreateInput, GameHistoryUncheckedCreateInput>
  }

  /**
   * GameHistory createMany
   */
  export type GameHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GameHistories.
     */
    data: GameHistoryCreateManyInput | GameHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GameHistory createManyAndReturn
   */
  export type GameHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameHistory
     */
    select?: GameHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many GameHistories.
     */
    data: GameHistoryCreateManyInput | GameHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GameHistory update
   */
  export type GameHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameHistory
     */
    select?: GameHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a GameHistory.
     */
    data: XOR<GameHistoryUpdateInput, GameHistoryUncheckedUpdateInput>
    /**
     * Choose, which GameHistory to update.
     */
    where: GameHistoryWhereUniqueInput
  }

  /**
   * GameHistory updateMany
   */
  export type GameHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GameHistories.
     */
    data: XOR<GameHistoryUpdateManyMutationInput, GameHistoryUncheckedUpdateManyInput>
    /**
     * Filter which GameHistories to update
     */
    where?: GameHistoryWhereInput
  }

  /**
   * GameHistory upsert
   */
  export type GameHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameHistory
     */
    select?: GameHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the GameHistory to update in case it exists.
     */
    where: GameHistoryWhereUniqueInput
    /**
     * In case the GameHistory found by the `where` argument doesn't exist, create a new GameHistory with this data.
     */
    create: XOR<GameHistoryCreateInput, GameHistoryUncheckedCreateInput>
    /**
     * In case the GameHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameHistoryUpdateInput, GameHistoryUncheckedUpdateInput>
  }

  /**
   * GameHistory delete
   */
  export type GameHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameHistory
     */
    select?: GameHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameHistoryInclude<ExtArgs> | null
    /**
     * Filter which GameHistory to delete.
     */
    where: GameHistoryWhereUniqueInput
  }

  /**
   * GameHistory deleteMany
   */
  export type GameHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameHistories to delete
     */
    where?: GameHistoryWhereInput
  }

  /**
   * GameHistory.winner
   */
  export type GameHistory$winnerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * GameHistory without action
   */
  export type GameHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameHistory
     */
    select?: GameHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameHistoryInclude<ExtArgs> | null
  }


  /**
   * Model Tournament
   */

  export type AggregateTournament = {
    _count: TournamentCountAggregateOutputType | null
    _avg: TournamentAvgAggregateOutputType | null
    _sum: TournamentSumAggregateOutputType | null
    _min: TournamentMinAggregateOutputType | null
    _max: TournamentMaxAggregateOutputType | null
  }

  export type TournamentAvgAggregateOutputType = {
    maxPlayers: number | null
  }

  export type TournamentSumAggregateOutputType = {
    maxPlayers: number | null
  }

  export type TournamentMinAggregateOutputType = {
    id: string | null
    name: string | null
    gameType: string | null
    status: string | null
    maxPlayers: number | null
    bracket: string | null
    winnerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TournamentMaxAggregateOutputType = {
    id: string | null
    name: string | null
    gameType: string | null
    status: string | null
    maxPlayers: number | null
    bracket: string | null
    winnerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TournamentCountAggregateOutputType = {
    id: number
    name: number
    gameType: number
    status: number
    maxPlayers: number
    bracket: number
    winnerId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TournamentAvgAggregateInputType = {
    maxPlayers?: true
  }

  export type TournamentSumAggregateInputType = {
    maxPlayers?: true
  }

  export type TournamentMinAggregateInputType = {
    id?: true
    name?: true
    gameType?: true
    status?: true
    maxPlayers?: true
    bracket?: true
    winnerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TournamentMaxAggregateInputType = {
    id?: true
    name?: true
    gameType?: true
    status?: true
    maxPlayers?: true
    bracket?: true
    winnerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TournamentCountAggregateInputType = {
    id?: true
    name?: true
    gameType?: true
    status?: true
    maxPlayers?: true
    bracket?: true
    winnerId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TournamentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tournament to aggregate.
     */
    where?: TournamentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tournaments to fetch.
     */
    orderBy?: TournamentOrderByWithRelationInput | TournamentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TournamentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tournaments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tournaments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tournaments
    **/
    _count?: true | TournamentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TournamentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TournamentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TournamentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TournamentMaxAggregateInputType
  }

  export type GetTournamentAggregateType<T extends TournamentAggregateArgs> = {
        [P in keyof T & keyof AggregateTournament]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTournament[P]>
      : GetScalarType<T[P], AggregateTournament[P]>
  }




  export type TournamentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TournamentWhereInput
    orderBy?: TournamentOrderByWithAggregationInput | TournamentOrderByWithAggregationInput[]
    by: TournamentScalarFieldEnum[] | TournamentScalarFieldEnum
    having?: TournamentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TournamentCountAggregateInputType | true
    _avg?: TournamentAvgAggregateInputType
    _sum?: TournamentSumAggregateInputType
    _min?: TournamentMinAggregateInputType
    _max?: TournamentMaxAggregateInputType
  }

  export type TournamentGroupByOutputType = {
    id: string
    name: string
    gameType: string
    status: string
    maxPlayers: number
    bracket: string | null
    winnerId: string | null
    createdAt: Date
    updatedAt: Date
    _count: TournamentCountAggregateOutputType | null
    _avg: TournamentAvgAggregateOutputType | null
    _sum: TournamentSumAggregateOutputType | null
    _min: TournamentMinAggregateOutputType | null
    _max: TournamentMaxAggregateOutputType | null
  }

  type GetTournamentGroupByPayload<T extends TournamentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TournamentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TournamentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TournamentGroupByOutputType[P]>
            : GetScalarType<T[P], TournamentGroupByOutputType[P]>
        }
      >
    >


  export type TournamentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    gameType?: boolean
    status?: boolean
    maxPlayers?: boolean
    bracket?: boolean
    winnerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    winner?: boolean | Tournament$winnerArgs<ExtArgs>
    players?: boolean | Tournament$playersArgs<ExtArgs>
    matches?: boolean | Tournament$matchesArgs<ExtArgs>
    _count?: boolean | TournamentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tournament"]>

  export type TournamentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    gameType?: boolean
    status?: boolean
    maxPlayers?: boolean
    bracket?: boolean
    winnerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    winner?: boolean | Tournament$winnerArgs<ExtArgs>
  }, ExtArgs["result"]["tournament"]>

  export type TournamentSelectScalar = {
    id?: boolean
    name?: boolean
    gameType?: boolean
    status?: boolean
    maxPlayers?: boolean
    bracket?: boolean
    winnerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TournamentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    winner?: boolean | Tournament$winnerArgs<ExtArgs>
    players?: boolean | Tournament$playersArgs<ExtArgs>
    matches?: boolean | Tournament$matchesArgs<ExtArgs>
    _count?: boolean | TournamentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TournamentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    winner?: boolean | Tournament$winnerArgs<ExtArgs>
  }

  export type $TournamentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tournament"
    objects: {
      winner: Prisma.$UserPayload<ExtArgs> | null
      players: Prisma.$TournamentPlayerPayload<ExtArgs>[]
      matches: Prisma.$TournamentMatchPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      gameType: string
      status: string
      maxPlayers: number
      bracket: string | null
      winnerId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tournament"]>
    composites: {}
  }

  type TournamentGetPayload<S extends boolean | null | undefined | TournamentDefaultArgs> = $Result.GetResult<Prisma.$TournamentPayload, S>

  type TournamentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TournamentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TournamentCountAggregateInputType | true
    }

  export interface TournamentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tournament'], meta: { name: 'Tournament' } }
    /**
     * Find zero or one Tournament that matches the filter.
     * @param {TournamentFindUniqueArgs} args - Arguments to find a Tournament
     * @example
     * // Get one Tournament
     * const tournament = await prisma.tournament.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TournamentFindUniqueArgs>(args: SelectSubset<T, TournamentFindUniqueArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Tournament that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TournamentFindUniqueOrThrowArgs} args - Arguments to find a Tournament
     * @example
     * // Get one Tournament
     * const tournament = await prisma.tournament.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TournamentFindUniqueOrThrowArgs>(args: SelectSubset<T, TournamentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Tournament that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentFindFirstArgs} args - Arguments to find a Tournament
     * @example
     * // Get one Tournament
     * const tournament = await prisma.tournament.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TournamentFindFirstArgs>(args?: SelectSubset<T, TournamentFindFirstArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Tournament that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentFindFirstOrThrowArgs} args - Arguments to find a Tournament
     * @example
     * // Get one Tournament
     * const tournament = await prisma.tournament.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TournamentFindFirstOrThrowArgs>(args?: SelectSubset<T, TournamentFindFirstOrThrowArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Tournaments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tournaments
     * const tournaments = await prisma.tournament.findMany()
     * 
     * // Get first 10 Tournaments
     * const tournaments = await prisma.tournament.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tournamentWithIdOnly = await prisma.tournament.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TournamentFindManyArgs>(args?: SelectSubset<T, TournamentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Tournament.
     * @param {TournamentCreateArgs} args - Arguments to create a Tournament.
     * @example
     * // Create one Tournament
     * const Tournament = await prisma.tournament.create({
     *   data: {
     *     // ... data to create a Tournament
     *   }
     * })
     * 
     */
    create<T extends TournamentCreateArgs>(args: SelectSubset<T, TournamentCreateArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Tournaments.
     * @param {TournamentCreateManyArgs} args - Arguments to create many Tournaments.
     * @example
     * // Create many Tournaments
     * const tournament = await prisma.tournament.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TournamentCreateManyArgs>(args?: SelectSubset<T, TournamentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tournaments and returns the data saved in the database.
     * @param {TournamentCreateManyAndReturnArgs} args - Arguments to create many Tournaments.
     * @example
     * // Create many Tournaments
     * const tournament = await prisma.tournament.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tournaments and only return the `id`
     * const tournamentWithIdOnly = await prisma.tournament.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TournamentCreateManyAndReturnArgs>(args?: SelectSubset<T, TournamentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Tournament.
     * @param {TournamentDeleteArgs} args - Arguments to delete one Tournament.
     * @example
     * // Delete one Tournament
     * const Tournament = await prisma.tournament.delete({
     *   where: {
     *     // ... filter to delete one Tournament
     *   }
     * })
     * 
     */
    delete<T extends TournamentDeleteArgs>(args: SelectSubset<T, TournamentDeleteArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Tournament.
     * @param {TournamentUpdateArgs} args - Arguments to update one Tournament.
     * @example
     * // Update one Tournament
     * const tournament = await prisma.tournament.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TournamentUpdateArgs>(args: SelectSubset<T, TournamentUpdateArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Tournaments.
     * @param {TournamentDeleteManyArgs} args - Arguments to filter Tournaments to delete.
     * @example
     * // Delete a few Tournaments
     * const { count } = await prisma.tournament.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TournamentDeleteManyArgs>(args?: SelectSubset<T, TournamentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tournaments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tournaments
     * const tournament = await prisma.tournament.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TournamentUpdateManyArgs>(args: SelectSubset<T, TournamentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tournament.
     * @param {TournamentUpsertArgs} args - Arguments to update or create a Tournament.
     * @example
     * // Update or create a Tournament
     * const tournament = await prisma.tournament.upsert({
     *   create: {
     *     // ... data to create a Tournament
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tournament we want to update
     *   }
     * })
     */
    upsert<T extends TournamentUpsertArgs>(args: SelectSubset<T, TournamentUpsertArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Tournaments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentCountArgs} args - Arguments to filter Tournaments to count.
     * @example
     * // Count the number of Tournaments
     * const count = await prisma.tournament.count({
     *   where: {
     *     // ... the filter for the Tournaments we want to count
     *   }
     * })
    **/
    count<T extends TournamentCountArgs>(
      args?: Subset<T, TournamentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TournamentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tournament.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TournamentAggregateArgs>(args: Subset<T, TournamentAggregateArgs>): Prisma.PrismaPromise<GetTournamentAggregateType<T>>

    /**
     * Group by Tournament.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentGroupByArgs} args - Group by arguments.
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
      T extends TournamentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TournamentGroupByArgs['orderBy'] }
        : { orderBy?: TournamentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TournamentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTournamentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tournament model
   */
  readonly fields: TournamentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tournament.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TournamentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    winner<T extends Tournament$winnerArgs<ExtArgs> = {}>(args?: Subset<T, Tournament$winnerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    players<T extends Tournament$playersArgs<ExtArgs> = {}>(args?: Subset<T, Tournament$playersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentPlayerPayload<ExtArgs>, T, "findMany"> | Null>
    matches<T extends Tournament$matchesArgs<ExtArgs> = {}>(args?: Subset<T, Tournament$matchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentMatchPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Tournament model
   */ 
  interface TournamentFieldRefs {
    readonly id: FieldRef<"Tournament", 'String'>
    readonly name: FieldRef<"Tournament", 'String'>
    readonly gameType: FieldRef<"Tournament", 'String'>
    readonly status: FieldRef<"Tournament", 'String'>
    readonly maxPlayers: FieldRef<"Tournament", 'Int'>
    readonly bracket: FieldRef<"Tournament", 'String'>
    readonly winnerId: FieldRef<"Tournament", 'String'>
    readonly createdAt: FieldRef<"Tournament", 'DateTime'>
    readonly updatedAt: FieldRef<"Tournament", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tournament findUnique
   */
  export type TournamentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * Filter, which Tournament to fetch.
     */
    where: TournamentWhereUniqueInput
  }

  /**
   * Tournament findUniqueOrThrow
   */
  export type TournamentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * Filter, which Tournament to fetch.
     */
    where: TournamentWhereUniqueInput
  }

  /**
   * Tournament findFirst
   */
  export type TournamentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * Filter, which Tournament to fetch.
     */
    where?: TournamentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tournaments to fetch.
     */
    orderBy?: TournamentOrderByWithRelationInput | TournamentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tournaments.
     */
    cursor?: TournamentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tournaments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tournaments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tournaments.
     */
    distinct?: TournamentScalarFieldEnum | TournamentScalarFieldEnum[]
  }

  /**
   * Tournament findFirstOrThrow
   */
  export type TournamentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * Filter, which Tournament to fetch.
     */
    where?: TournamentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tournaments to fetch.
     */
    orderBy?: TournamentOrderByWithRelationInput | TournamentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tournaments.
     */
    cursor?: TournamentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tournaments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tournaments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tournaments.
     */
    distinct?: TournamentScalarFieldEnum | TournamentScalarFieldEnum[]
  }

  /**
   * Tournament findMany
   */
  export type TournamentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * Filter, which Tournaments to fetch.
     */
    where?: TournamentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tournaments to fetch.
     */
    orderBy?: TournamentOrderByWithRelationInput | TournamentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tournaments.
     */
    cursor?: TournamentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tournaments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tournaments.
     */
    skip?: number
    distinct?: TournamentScalarFieldEnum | TournamentScalarFieldEnum[]
  }

  /**
   * Tournament create
   */
  export type TournamentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * The data needed to create a Tournament.
     */
    data: XOR<TournamentCreateInput, TournamentUncheckedCreateInput>
  }

  /**
   * Tournament createMany
   */
  export type TournamentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tournaments.
     */
    data: TournamentCreateManyInput | TournamentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tournament createManyAndReturn
   */
  export type TournamentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Tournaments.
     */
    data: TournamentCreateManyInput | TournamentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tournament update
   */
  export type TournamentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * The data needed to update a Tournament.
     */
    data: XOR<TournamentUpdateInput, TournamentUncheckedUpdateInput>
    /**
     * Choose, which Tournament to update.
     */
    where: TournamentWhereUniqueInput
  }

  /**
   * Tournament updateMany
   */
  export type TournamentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tournaments.
     */
    data: XOR<TournamentUpdateManyMutationInput, TournamentUncheckedUpdateManyInput>
    /**
     * Filter which Tournaments to update
     */
    where?: TournamentWhereInput
  }

  /**
   * Tournament upsert
   */
  export type TournamentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * The filter to search for the Tournament to update in case it exists.
     */
    where: TournamentWhereUniqueInput
    /**
     * In case the Tournament found by the `where` argument doesn't exist, create a new Tournament with this data.
     */
    create: XOR<TournamentCreateInput, TournamentUncheckedCreateInput>
    /**
     * In case the Tournament was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TournamentUpdateInput, TournamentUncheckedUpdateInput>
  }

  /**
   * Tournament delete
   */
  export type TournamentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * Filter which Tournament to delete.
     */
    where: TournamentWhereUniqueInput
  }

  /**
   * Tournament deleteMany
   */
  export type TournamentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tournaments to delete
     */
    where?: TournamentWhereInput
  }

  /**
   * Tournament.winner
   */
  export type Tournament$winnerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Tournament.players
   */
  export type Tournament$playersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentPlayer
     */
    select?: TournamentPlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentPlayerInclude<ExtArgs> | null
    where?: TournamentPlayerWhereInput
    orderBy?: TournamentPlayerOrderByWithRelationInput | TournamentPlayerOrderByWithRelationInput[]
    cursor?: TournamentPlayerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TournamentPlayerScalarFieldEnum | TournamentPlayerScalarFieldEnum[]
  }

  /**
   * Tournament.matches
   */
  export type Tournament$matchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchInclude<ExtArgs> | null
    where?: TournamentMatchWhereInput
    orderBy?: TournamentMatchOrderByWithRelationInput | TournamentMatchOrderByWithRelationInput[]
    cursor?: TournamentMatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TournamentMatchScalarFieldEnum | TournamentMatchScalarFieldEnum[]
  }

  /**
   * Tournament without action
   */
  export type TournamentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
  }


  /**
   * Model TournamentPlayer
   */

  export type AggregateTournamentPlayer = {
    _count: TournamentPlayerCountAggregateOutputType | null
    _avg: TournamentPlayerAvgAggregateOutputType | null
    _sum: TournamentPlayerSumAggregateOutputType | null
    _min: TournamentPlayerMinAggregateOutputType | null
    _max: TournamentPlayerMaxAggregateOutputType | null
  }

  export type TournamentPlayerAvgAggregateOutputType = {
    seed: number | null
  }

  export type TournamentPlayerSumAggregateOutputType = {
    seed: number | null
  }

  export type TournamentPlayerMinAggregateOutputType = {
    id: string | null
    tournamentId: string | null
    userId: string | null
    seed: number | null
    joinedAt: Date | null
  }

  export type TournamentPlayerMaxAggregateOutputType = {
    id: string | null
    tournamentId: string | null
    userId: string | null
    seed: number | null
    joinedAt: Date | null
  }

  export type TournamentPlayerCountAggregateOutputType = {
    id: number
    tournamentId: number
    userId: number
    seed: number
    joinedAt: number
    _all: number
  }


  export type TournamentPlayerAvgAggregateInputType = {
    seed?: true
  }

  export type TournamentPlayerSumAggregateInputType = {
    seed?: true
  }

  export type TournamentPlayerMinAggregateInputType = {
    id?: true
    tournamentId?: true
    userId?: true
    seed?: true
    joinedAt?: true
  }

  export type TournamentPlayerMaxAggregateInputType = {
    id?: true
    tournamentId?: true
    userId?: true
    seed?: true
    joinedAt?: true
  }

  export type TournamentPlayerCountAggregateInputType = {
    id?: true
    tournamentId?: true
    userId?: true
    seed?: true
    joinedAt?: true
    _all?: true
  }

  export type TournamentPlayerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TournamentPlayer to aggregate.
     */
    where?: TournamentPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TournamentPlayers to fetch.
     */
    orderBy?: TournamentPlayerOrderByWithRelationInput | TournamentPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TournamentPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TournamentPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TournamentPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TournamentPlayers
    **/
    _count?: true | TournamentPlayerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TournamentPlayerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TournamentPlayerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TournamentPlayerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TournamentPlayerMaxAggregateInputType
  }

  export type GetTournamentPlayerAggregateType<T extends TournamentPlayerAggregateArgs> = {
        [P in keyof T & keyof AggregateTournamentPlayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTournamentPlayer[P]>
      : GetScalarType<T[P], AggregateTournamentPlayer[P]>
  }




  export type TournamentPlayerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TournamentPlayerWhereInput
    orderBy?: TournamentPlayerOrderByWithAggregationInput | TournamentPlayerOrderByWithAggregationInput[]
    by: TournamentPlayerScalarFieldEnum[] | TournamentPlayerScalarFieldEnum
    having?: TournamentPlayerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TournamentPlayerCountAggregateInputType | true
    _avg?: TournamentPlayerAvgAggregateInputType
    _sum?: TournamentPlayerSumAggregateInputType
    _min?: TournamentPlayerMinAggregateInputType
    _max?: TournamentPlayerMaxAggregateInputType
  }

  export type TournamentPlayerGroupByOutputType = {
    id: string
    tournamentId: string
    userId: string
    seed: number
    joinedAt: Date
    _count: TournamentPlayerCountAggregateOutputType | null
    _avg: TournamentPlayerAvgAggregateOutputType | null
    _sum: TournamentPlayerSumAggregateOutputType | null
    _min: TournamentPlayerMinAggregateOutputType | null
    _max: TournamentPlayerMaxAggregateOutputType | null
  }

  type GetTournamentPlayerGroupByPayload<T extends TournamentPlayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TournamentPlayerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TournamentPlayerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TournamentPlayerGroupByOutputType[P]>
            : GetScalarType<T[P], TournamentPlayerGroupByOutputType[P]>
        }
      >
    >


  export type TournamentPlayerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tournamentId?: boolean
    userId?: boolean
    seed?: boolean
    joinedAt?: boolean
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tournamentPlayer"]>

  export type TournamentPlayerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tournamentId?: boolean
    userId?: boolean
    seed?: boolean
    joinedAt?: boolean
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tournamentPlayer"]>

  export type TournamentPlayerSelectScalar = {
    id?: boolean
    tournamentId?: boolean
    userId?: boolean
    seed?: boolean
    joinedAt?: boolean
  }

  export type TournamentPlayerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TournamentPlayerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TournamentPlayerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TournamentPlayer"
    objects: {
      tournament: Prisma.$TournamentPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tournamentId: string
      userId: string
      seed: number
      joinedAt: Date
    }, ExtArgs["result"]["tournamentPlayer"]>
    composites: {}
  }

  type TournamentPlayerGetPayload<S extends boolean | null | undefined | TournamentPlayerDefaultArgs> = $Result.GetResult<Prisma.$TournamentPlayerPayload, S>

  type TournamentPlayerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TournamentPlayerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TournamentPlayerCountAggregateInputType | true
    }

  export interface TournamentPlayerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TournamentPlayer'], meta: { name: 'TournamentPlayer' } }
    /**
     * Find zero or one TournamentPlayer that matches the filter.
     * @param {TournamentPlayerFindUniqueArgs} args - Arguments to find a TournamentPlayer
     * @example
     * // Get one TournamentPlayer
     * const tournamentPlayer = await prisma.tournamentPlayer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TournamentPlayerFindUniqueArgs>(args: SelectSubset<T, TournamentPlayerFindUniqueArgs<ExtArgs>>): Prisma__TournamentPlayerClient<$Result.GetResult<Prisma.$TournamentPlayerPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TournamentPlayer that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TournamentPlayerFindUniqueOrThrowArgs} args - Arguments to find a TournamentPlayer
     * @example
     * // Get one TournamentPlayer
     * const tournamentPlayer = await prisma.tournamentPlayer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TournamentPlayerFindUniqueOrThrowArgs>(args: SelectSubset<T, TournamentPlayerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TournamentPlayerClient<$Result.GetResult<Prisma.$TournamentPlayerPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TournamentPlayer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentPlayerFindFirstArgs} args - Arguments to find a TournamentPlayer
     * @example
     * // Get one TournamentPlayer
     * const tournamentPlayer = await prisma.tournamentPlayer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TournamentPlayerFindFirstArgs>(args?: SelectSubset<T, TournamentPlayerFindFirstArgs<ExtArgs>>): Prisma__TournamentPlayerClient<$Result.GetResult<Prisma.$TournamentPlayerPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TournamentPlayer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentPlayerFindFirstOrThrowArgs} args - Arguments to find a TournamentPlayer
     * @example
     * // Get one TournamentPlayer
     * const tournamentPlayer = await prisma.tournamentPlayer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TournamentPlayerFindFirstOrThrowArgs>(args?: SelectSubset<T, TournamentPlayerFindFirstOrThrowArgs<ExtArgs>>): Prisma__TournamentPlayerClient<$Result.GetResult<Prisma.$TournamentPlayerPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TournamentPlayers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentPlayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TournamentPlayers
     * const tournamentPlayers = await prisma.tournamentPlayer.findMany()
     * 
     * // Get first 10 TournamentPlayers
     * const tournamentPlayers = await prisma.tournamentPlayer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tournamentPlayerWithIdOnly = await prisma.tournamentPlayer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TournamentPlayerFindManyArgs>(args?: SelectSubset<T, TournamentPlayerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentPlayerPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TournamentPlayer.
     * @param {TournamentPlayerCreateArgs} args - Arguments to create a TournamentPlayer.
     * @example
     * // Create one TournamentPlayer
     * const TournamentPlayer = await prisma.tournamentPlayer.create({
     *   data: {
     *     // ... data to create a TournamentPlayer
     *   }
     * })
     * 
     */
    create<T extends TournamentPlayerCreateArgs>(args: SelectSubset<T, TournamentPlayerCreateArgs<ExtArgs>>): Prisma__TournamentPlayerClient<$Result.GetResult<Prisma.$TournamentPlayerPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TournamentPlayers.
     * @param {TournamentPlayerCreateManyArgs} args - Arguments to create many TournamentPlayers.
     * @example
     * // Create many TournamentPlayers
     * const tournamentPlayer = await prisma.tournamentPlayer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TournamentPlayerCreateManyArgs>(args?: SelectSubset<T, TournamentPlayerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TournamentPlayers and returns the data saved in the database.
     * @param {TournamentPlayerCreateManyAndReturnArgs} args - Arguments to create many TournamentPlayers.
     * @example
     * // Create many TournamentPlayers
     * const tournamentPlayer = await prisma.tournamentPlayer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TournamentPlayers and only return the `id`
     * const tournamentPlayerWithIdOnly = await prisma.tournamentPlayer.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TournamentPlayerCreateManyAndReturnArgs>(args?: SelectSubset<T, TournamentPlayerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentPlayerPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TournamentPlayer.
     * @param {TournamentPlayerDeleteArgs} args - Arguments to delete one TournamentPlayer.
     * @example
     * // Delete one TournamentPlayer
     * const TournamentPlayer = await prisma.tournamentPlayer.delete({
     *   where: {
     *     // ... filter to delete one TournamentPlayer
     *   }
     * })
     * 
     */
    delete<T extends TournamentPlayerDeleteArgs>(args: SelectSubset<T, TournamentPlayerDeleteArgs<ExtArgs>>): Prisma__TournamentPlayerClient<$Result.GetResult<Prisma.$TournamentPlayerPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TournamentPlayer.
     * @param {TournamentPlayerUpdateArgs} args - Arguments to update one TournamentPlayer.
     * @example
     * // Update one TournamentPlayer
     * const tournamentPlayer = await prisma.tournamentPlayer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TournamentPlayerUpdateArgs>(args: SelectSubset<T, TournamentPlayerUpdateArgs<ExtArgs>>): Prisma__TournamentPlayerClient<$Result.GetResult<Prisma.$TournamentPlayerPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TournamentPlayers.
     * @param {TournamentPlayerDeleteManyArgs} args - Arguments to filter TournamentPlayers to delete.
     * @example
     * // Delete a few TournamentPlayers
     * const { count } = await prisma.tournamentPlayer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TournamentPlayerDeleteManyArgs>(args?: SelectSubset<T, TournamentPlayerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TournamentPlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentPlayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TournamentPlayers
     * const tournamentPlayer = await prisma.tournamentPlayer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TournamentPlayerUpdateManyArgs>(args: SelectSubset<T, TournamentPlayerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TournamentPlayer.
     * @param {TournamentPlayerUpsertArgs} args - Arguments to update or create a TournamentPlayer.
     * @example
     * // Update or create a TournamentPlayer
     * const tournamentPlayer = await prisma.tournamentPlayer.upsert({
     *   create: {
     *     // ... data to create a TournamentPlayer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TournamentPlayer we want to update
     *   }
     * })
     */
    upsert<T extends TournamentPlayerUpsertArgs>(args: SelectSubset<T, TournamentPlayerUpsertArgs<ExtArgs>>): Prisma__TournamentPlayerClient<$Result.GetResult<Prisma.$TournamentPlayerPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TournamentPlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentPlayerCountArgs} args - Arguments to filter TournamentPlayers to count.
     * @example
     * // Count the number of TournamentPlayers
     * const count = await prisma.tournamentPlayer.count({
     *   where: {
     *     // ... the filter for the TournamentPlayers we want to count
     *   }
     * })
    **/
    count<T extends TournamentPlayerCountArgs>(
      args?: Subset<T, TournamentPlayerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TournamentPlayerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TournamentPlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentPlayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TournamentPlayerAggregateArgs>(args: Subset<T, TournamentPlayerAggregateArgs>): Prisma.PrismaPromise<GetTournamentPlayerAggregateType<T>>

    /**
     * Group by TournamentPlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentPlayerGroupByArgs} args - Group by arguments.
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
      T extends TournamentPlayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TournamentPlayerGroupByArgs['orderBy'] }
        : { orderBy?: TournamentPlayerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TournamentPlayerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTournamentPlayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TournamentPlayer model
   */
  readonly fields: TournamentPlayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TournamentPlayer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TournamentPlayerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tournament<T extends TournamentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TournamentDefaultArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the TournamentPlayer model
   */ 
  interface TournamentPlayerFieldRefs {
    readonly id: FieldRef<"TournamentPlayer", 'String'>
    readonly tournamentId: FieldRef<"TournamentPlayer", 'String'>
    readonly userId: FieldRef<"TournamentPlayer", 'String'>
    readonly seed: FieldRef<"TournamentPlayer", 'Int'>
    readonly joinedAt: FieldRef<"TournamentPlayer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TournamentPlayer findUnique
   */
  export type TournamentPlayerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentPlayer
     */
    select?: TournamentPlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentPlayerInclude<ExtArgs> | null
    /**
     * Filter, which TournamentPlayer to fetch.
     */
    where: TournamentPlayerWhereUniqueInput
  }

  /**
   * TournamentPlayer findUniqueOrThrow
   */
  export type TournamentPlayerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentPlayer
     */
    select?: TournamentPlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentPlayerInclude<ExtArgs> | null
    /**
     * Filter, which TournamentPlayer to fetch.
     */
    where: TournamentPlayerWhereUniqueInput
  }

  /**
   * TournamentPlayer findFirst
   */
  export type TournamentPlayerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentPlayer
     */
    select?: TournamentPlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentPlayerInclude<ExtArgs> | null
    /**
     * Filter, which TournamentPlayer to fetch.
     */
    where?: TournamentPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TournamentPlayers to fetch.
     */
    orderBy?: TournamentPlayerOrderByWithRelationInput | TournamentPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TournamentPlayers.
     */
    cursor?: TournamentPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TournamentPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TournamentPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TournamentPlayers.
     */
    distinct?: TournamentPlayerScalarFieldEnum | TournamentPlayerScalarFieldEnum[]
  }

  /**
   * TournamentPlayer findFirstOrThrow
   */
  export type TournamentPlayerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentPlayer
     */
    select?: TournamentPlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentPlayerInclude<ExtArgs> | null
    /**
     * Filter, which TournamentPlayer to fetch.
     */
    where?: TournamentPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TournamentPlayers to fetch.
     */
    orderBy?: TournamentPlayerOrderByWithRelationInput | TournamentPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TournamentPlayers.
     */
    cursor?: TournamentPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TournamentPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TournamentPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TournamentPlayers.
     */
    distinct?: TournamentPlayerScalarFieldEnum | TournamentPlayerScalarFieldEnum[]
  }

  /**
   * TournamentPlayer findMany
   */
  export type TournamentPlayerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentPlayer
     */
    select?: TournamentPlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentPlayerInclude<ExtArgs> | null
    /**
     * Filter, which TournamentPlayers to fetch.
     */
    where?: TournamentPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TournamentPlayers to fetch.
     */
    orderBy?: TournamentPlayerOrderByWithRelationInput | TournamentPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TournamentPlayers.
     */
    cursor?: TournamentPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TournamentPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TournamentPlayers.
     */
    skip?: number
    distinct?: TournamentPlayerScalarFieldEnum | TournamentPlayerScalarFieldEnum[]
  }

  /**
   * TournamentPlayer create
   */
  export type TournamentPlayerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentPlayer
     */
    select?: TournamentPlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentPlayerInclude<ExtArgs> | null
    /**
     * The data needed to create a TournamentPlayer.
     */
    data: XOR<TournamentPlayerCreateInput, TournamentPlayerUncheckedCreateInput>
  }

  /**
   * TournamentPlayer createMany
   */
  export type TournamentPlayerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TournamentPlayers.
     */
    data: TournamentPlayerCreateManyInput | TournamentPlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TournamentPlayer createManyAndReturn
   */
  export type TournamentPlayerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentPlayer
     */
    select?: TournamentPlayerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TournamentPlayers.
     */
    data: TournamentPlayerCreateManyInput | TournamentPlayerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentPlayerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TournamentPlayer update
   */
  export type TournamentPlayerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentPlayer
     */
    select?: TournamentPlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentPlayerInclude<ExtArgs> | null
    /**
     * The data needed to update a TournamentPlayer.
     */
    data: XOR<TournamentPlayerUpdateInput, TournamentPlayerUncheckedUpdateInput>
    /**
     * Choose, which TournamentPlayer to update.
     */
    where: TournamentPlayerWhereUniqueInput
  }

  /**
   * TournamentPlayer updateMany
   */
  export type TournamentPlayerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TournamentPlayers.
     */
    data: XOR<TournamentPlayerUpdateManyMutationInput, TournamentPlayerUncheckedUpdateManyInput>
    /**
     * Filter which TournamentPlayers to update
     */
    where?: TournamentPlayerWhereInput
  }

  /**
   * TournamentPlayer upsert
   */
  export type TournamentPlayerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentPlayer
     */
    select?: TournamentPlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentPlayerInclude<ExtArgs> | null
    /**
     * The filter to search for the TournamentPlayer to update in case it exists.
     */
    where: TournamentPlayerWhereUniqueInput
    /**
     * In case the TournamentPlayer found by the `where` argument doesn't exist, create a new TournamentPlayer with this data.
     */
    create: XOR<TournamentPlayerCreateInput, TournamentPlayerUncheckedCreateInput>
    /**
     * In case the TournamentPlayer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TournamentPlayerUpdateInput, TournamentPlayerUncheckedUpdateInput>
  }

  /**
   * TournamentPlayer delete
   */
  export type TournamentPlayerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentPlayer
     */
    select?: TournamentPlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentPlayerInclude<ExtArgs> | null
    /**
     * Filter which TournamentPlayer to delete.
     */
    where: TournamentPlayerWhereUniqueInput
  }

  /**
   * TournamentPlayer deleteMany
   */
  export type TournamentPlayerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TournamentPlayers to delete
     */
    where?: TournamentPlayerWhereInput
  }

  /**
   * TournamentPlayer without action
   */
  export type TournamentPlayerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentPlayer
     */
    select?: TournamentPlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentPlayerInclude<ExtArgs> | null
  }


  /**
   * Model TournamentMatch
   */

  export type AggregateTournamentMatch = {
    _count: TournamentMatchCountAggregateOutputType | null
    _avg: TournamentMatchAvgAggregateOutputType | null
    _sum: TournamentMatchSumAggregateOutputType | null
    _min: TournamentMatchMinAggregateOutputType | null
    _max: TournamentMatchMaxAggregateOutputType | null
  }

  export type TournamentMatchAvgAggregateOutputType = {
    round: number | null
    bracketIndex: number | null
  }

  export type TournamentMatchSumAggregateOutputType = {
    round: number | null
    bracketIndex: number | null
  }

  export type TournamentMatchMinAggregateOutputType = {
    id: string | null
    tournamentId: string | null
    round: number | null
    bracketIndex: number | null
    playerAId: string | null
    playerBId: string | null
    winnerId: string | null
    nextMatchId: string | null
    status: string | null
    playedAt: Date | null
  }

  export type TournamentMatchMaxAggregateOutputType = {
    id: string | null
    tournamentId: string | null
    round: number | null
    bracketIndex: number | null
    playerAId: string | null
    playerBId: string | null
    winnerId: string | null
    nextMatchId: string | null
    status: string | null
    playedAt: Date | null
  }

  export type TournamentMatchCountAggregateOutputType = {
    id: number
    tournamentId: number
    round: number
    bracketIndex: number
    playerAId: number
    playerBId: number
    winnerId: number
    nextMatchId: number
    status: number
    playedAt: number
    _all: number
  }


  export type TournamentMatchAvgAggregateInputType = {
    round?: true
    bracketIndex?: true
  }

  export type TournamentMatchSumAggregateInputType = {
    round?: true
    bracketIndex?: true
  }

  export type TournamentMatchMinAggregateInputType = {
    id?: true
    tournamentId?: true
    round?: true
    bracketIndex?: true
    playerAId?: true
    playerBId?: true
    winnerId?: true
    nextMatchId?: true
    status?: true
    playedAt?: true
  }

  export type TournamentMatchMaxAggregateInputType = {
    id?: true
    tournamentId?: true
    round?: true
    bracketIndex?: true
    playerAId?: true
    playerBId?: true
    winnerId?: true
    nextMatchId?: true
    status?: true
    playedAt?: true
  }

  export type TournamentMatchCountAggregateInputType = {
    id?: true
    tournamentId?: true
    round?: true
    bracketIndex?: true
    playerAId?: true
    playerBId?: true
    winnerId?: true
    nextMatchId?: true
    status?: true
    playedAt?: true
    _all?: true
  }

  export type TournamentMatchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TournamentMatch to aggregate.
     */
    where?: TournamentMatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TournamentMatches to fetch.
     */
    orderBy?: TournamentMatchOrderByWithRelationInput | TournamentMatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TournamentMatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TournamentMatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TournamentMatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TournamentMatches
    **/
    _count?: true | TournamentMatchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TournamentMatchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TournamentMatchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TournamentMatchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TournamentMatchMaxAggregateInputType
  }

  export type GetTournamentMatchAggregateType<T extends TournamentMatchAggregateArgs> = {
        [P in keyof T & keyof AggregateTournamentMatch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTournamentMatch[P]>
      : GetScalarType<T[P], AggregateTournamentMatch[P]>
  }




  export type TournamentMatchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TournamentMatchWhereInput
    orderBy?: TournamentMatchOrderByWithAggregationInput | TournamentMatchOrderByWithAggregationInput[]
    by: TournamentMatchScalarFieldEnum[] | TournamentMatchScalarFieldEnum
    having?: TournamentMatchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TournamentMatchCountAggregateInputType | true
    _avg?: TournamentMatchAvgAggregateInputType
    _sum?: TournamentMatchSumAggregateInputType
    _min?: TournamentMatchMinAggregateInputType
    _max?: TournamentMatchMaxAggregateInputType
  }

  export type TournamentMatchGroupByOutputType = {
    id: string
    tournamentId: string
    round: number
    bracketIndex: number
    playerAId: string | null
    playerBId: string | null
    winnerId: string | null
    nextMatchId: string | null
    status: string
    playedAt: Date | null
    _count: TournamentMatchCountAggregateOutputType | null
    _avg: TournamentMatchAvgAggregateOutputType | null
    _sum: TournamentMatchSumAggregateOutputType | null
    _min: TournamentMatchMinAggregateOutputType | null
    _max: TournamentMatchMaxAggregateOutputType | null
  }

  type GetTournamentMatchGroupByPayload<T extends TournamentMatchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TournamentMatchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TournamentMatchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TournamentMatchGroupByOutputType[P]>
            : GetScalarType<T[P], TournamentMatchGroupByOutputType[P]>
        }
      >
    >


  export type TournamentMatchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tournamentId?: boolean
    round?: boolean
    bracketIndex?: boolean
    playerAId?: boolean
    playerBId?: boolean
    winnerId?: boolean
    nextMatchId?: boolean
    status?: boolean
    playedAt?: boolean
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
    playerA?: boolean | TournamentMatch$playerAArgs<ExtArgs>
    playerB?: boolean | TournamentMatch$playerBArgs<ExtArgs>
    winner?: boolean | TournamentMatch$winnerArgs<ExtArgs>
    nextMatch?: boolean | TournamentMatch$nextMatchArgs<ExtArgs>
    previousMatches?: boolean | TournamentMatch$previousMatchesArgs<ExtArgs>
    _count?: boolean | TournamentMatchCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tournamentMatch"]>

  export type TournamentMatchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tournamentId?: boolean
    round?: boolean
    bracketIndex?: boolean
    playerAId?: boolean
    playerBId?: boolean
    winnerId?: boolean
    nextMatchId?: boolean
    status?: boolean
    playedAt?: boolean
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
    playerA?: boolean | TournamentMatch$playerAArgs<ExtArgs>
    playerB?: boolean | TournamentMatch$playerBArgs<ExtArgs>
    winner?: boolean | TournamentMatch$winnerArgs<ExtArgs>
    nextMatch?: boolean | TournamentMatch$nextMatchArgs<ExtArgs>
  }, ExtArgs["result"]["tournamentMatch"]>

  export type TournamentMatchSelectScalar = {
    id?: boolean
    tournamentId?: boolean
    round?: boolean
    bracketIndex?: boolean
    playerAId?: boolean
    playerBId?: boolean
    winnerId?: boolean
    nextMatchId?: boolean
    status?: boolean
    playedAt?: boolean
  }

  export type TournamentMatchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
    playerA?: boolean | TournamentMatch$playerAArgs<ExtArgs>
    playerB?: boolean | TournamentMatch$playerBArgs<ExtArgs>
    winner?: boolean | TournamentMatch$winnerArgs<ExtArgs>
    nextMatch?: boolean | TournamentMatch$nextMatchArgs<ExtArgs>
    previousMatches?: boolean | TournamentMatch$previousMatchesArgs<ExtArgs>
    _count?: boolean | TournamentMatchCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TournamentMatchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
    playerA?: boolean | TournamentMatch$playerAArgs<ExtArgs>
    playerB?: boolean | TournamentMatch$playerBArgs<ExtArgs>
    winner?: boolean | TournamentMatch$winnerArgs<ExtArgs>
    nextMatch?: boolean | TournamentMatch$nextMatchArgs<ExtArgs>
  }

  export type $TournamentMatchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TournamentMatch"
    objects: {
      tournament: Prisma.$TournamentPayload<ExtArgs>
      playerA: Prisma.$UserPayload<ExtArgs> | null
      playerB: Prisma.$UserPayload<ExtArgs> | null
      winner: Prisma.$UserPayload<ExtArgs> | null
      nextMatch: Prisma.$TournamentMatchPayload<ExtArgs> | null
      previousMatches: Prisma.$TournamentMatchPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tournamentId: string
      round: number
      bracketIndex: number
      playerAId: string | null
      playerBId: string | null
      winnerId: string | null
      nextMatchId: string | null
      status: string
      playedAt: Date | null
    }, ExtArgs["result"]["tournamentMatch"]>
    composites: {}
  }

  type TournamentMatchGetPayload<S extends boolean | null | undefined | TournamentMatchDefaultArgs> = $Result.GetResult<Prisma.$TournamentMatchPayload, S>

  type TournamentMatchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TournamentMatchFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TournamentMatchCountAggregateInputType | true
    }

  export interface TournamentMatchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TournamentMatch'], meta: { name: 'TournamentMatch' } }
    /**
     * Find zero or one TournamentMatch that matches the filter.
     * @param {TournamentMatchFindUniqueArgs} args - Arguments to find a TournamentMatch
     * @example
     * // Get one TournamentMatch
     * const tournamentMatch = await prisma.tournamentMatch.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TournamentMatchFindUniqueArgs>(args: SelectSubset<T, TournamentMatchFindUniqueArgs<ExtArgs>>): Prisma__TournamentMatchClient<$Result.GetResult<Prisma.$TournamentMatchPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TournamentMatch that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TournamentMatchFindUniqueOrThrowArgs} args - Arguments to find a TournamentMatch
     * @example
     * // Get one TournamentMatch
     * const tournamentMatch = await prisma.tournamentMatch.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TournamentMatchFindUniqueOrThrowArgs>(args: SelectSubset<T, TournamentMatchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TournamentMatchClient<$Result.GetResult<Prisma.$TournamentMatchPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TournamentMatch that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentMatchFindFirstArgs} args - Arguments to find a TournamentMatch
     * @example
     * // Get one TournamentMatch
     * const tournamentMatch = await prisma.tournamentMatch.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TournamentMatchFindFirstArgs>(args?: SelectSubset<T, TournamentMatchFindFirstArgs<ExtArgs>>): Prisma__TournamentMatchClient<$Result.GetResult<Prisma.$TournamentMatchPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TournamentMatch that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentMatchFindFirstOrThrowArgs} args - Arguments to find a TournamentMatch
     * @example
     * // Get one TournamentMatch
     * const tournamentMatch = await prisma.tournamentMatch.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TournamentMatchFindFirstOrThrowArgs>(args?: SelectSubset<T, TournamentMatchFindFirstOrThrowArgs<ExtArgs>>): Prisma__TournamentMatchClient<$Result.GetResult<Prisma.$TournamentMatchPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TournamentMatches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentMatchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TournamentMatches
     * const tournamentMatches = await prisma.tournamentMatch.findMany()
     * 
     * // Get first 10 TournamentMatches
     * const tournamentMatches = await prisma.tournamentMatch.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tournamentMatchWithIdOnly = await prisma.tournamentMatch.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TournamentMatchFindManyArgs>(args?: SelectSubset<T, TournamentMatchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentMatchPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TournamentMatch.
     * @param {TournamentMatchCreateArgs} args - Arguments to create a TournamentMatch.
     * @example
     * // Create one TournamentMatch
     * const TournamentMatch = await prisma.tournamentMatch.create({
     *   data: {
     *     // ... data to create a TournamentMatch
     *   }
     * })
     * 
     */
    create<T extends TournamentMatchCreateArgs>(args: SelectSubset<T, TournamentMatchCreateArgs<ExtArgs>>): Prisma__TournamentMatchClient<$Result.GetResult<Prisma.$TournamentMatchPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TournamentMatches.
     * @param {TournamentMatchCreateManyArgs} args - Arguments to create many TournamentMatches.
     * @example
     * // Create many TournamentMatches
     * const tournamentMatch = await prisma.tournamentMatch.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TournamentMatchCreateManyArgs>(args?: SelectSubset<T, TournamentMatchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TournamentMatches and returns the data saved in the database.
     * @param {TournamentMatchCreateManyAndReturnArgs} args - Arguments to create many TournamentMatches.
     * @example
     * // Create many TournamentMatches
     * const tournamentMatch = await prisma.tournamentMatch.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TournamentMatches and only return the `id`
     * const tournamentMatchWithIdOnly = await prisma.tournamentMatch.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TournamentMatchCreateManyAndReturnArgs>(args?: SelectSubset<T, TournamentMatchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentMatchPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TournamentMatch.
     * @param {TournamentMatchDeleteArgs} args - Arguments to delete one TournamentMatch.
     * @example
     * // Delete one TournamentMatch
     * const TournamentMatch = await prisma.tournamentMatch.delete({
     *   where: {
     *     // ... filter to delete one TournamentMatch
     *   }
     * })
     * 
     */
    delete<T extends TournamentMatchDeleteArgs>(args: SelectSubset<T, TournamentMatchDeleteArgs<ExtArgs>>): Prisma__TournamentMatchClient<$Result.GetResult<Prisma.$TournamentMatchPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TournamentMatch.
     * @param {TournamentMatchUpdateArgs} args - Arguments to update one TournamentMatch.
     * @example
     * // Update one TournamentMatch
     * const tournamentMatch = await prisma.tournamentMatch.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TournamentMatchUpdateArgs>(args: SelectSubset<T, TournamentMatchUpdateArgs<ExtArgs>>): Prisma__TournamentMatchClient<$Result.GetResult<Prisma.$TournamentMatchPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TournamentMatches.
     * @param {TournamentMatchDeleteManyArgs} args - Arguments to filter TournamentMatches to delete.
     * @example
     * // Delete a few TournamentMatches
     * const { count } = await prisma.tournamentMatch.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TournamentMatchDeleteManyArgs>(args?: SelectSubset<T, TournamentMatchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TournamentMatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentMatchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TournamentMatches
     * const tournamentMatch = await prisma.tournamentMatch.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TournamentMatchUpdateManyArgs>(args: SelectSubset<T, TournamentMatchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TournamentMatch.
     * @param {TournamentMatchUpsertArgs} args - Arguments to update or create a TournamentMatch.
     * @example
     * // Update or create a TournamentMatch
     * const tournamentMatch = await prisma.tournamentMatch.upsert({
     *   create: {
     *     // ... data to create a TournamentMatch
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TournamentMatch we want to update
     *   }
     * })
     */
    upsert<T extends TournamentMatchUpsertArgs>(args: SelectSubset<T, TournamentMatchUpsertArgs<ExtArgs>>): Prisma__TournamentMatchClient<$Result.GetResult<Prisma.$TournamentMatchPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TournamentMatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentMatchCountArgs} args - Arguments to filter TournamentMatches to count.
     * @example
     * // Count the number of TournamentMatches
     * const count = await prisma.tournamentMatch.count({
     *   where: {
     *     // ... the filter for the TournamentMatches we want to count
     *   }
     * })
    **/
    count<T extends TournamentMatchCountArgs>(
      args?: Subset<T, TournamentMatchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TournamentMatchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TournamentMatch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentMatchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TournamentMatchAggregateArgs>(args: Subset<T, TournamentMatchAggregateArgs>): Prisma.PrismaPromise<GetTournamentMatchAggregateType<T>>

    /**
     * Group by TournamentMatch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentMatchGroupByArgs} args - Group by arguments.
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
      T extends TournamentMatchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TournamentMatchGroupByArgs['orderBy'] }
        : { orderBy?: TournamentMatchGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TournamentMatchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTournamentMatchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TournamentMatch model
   */
  readonly fields: TournamentMatchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TournamentMatch.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TournamentMatchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tournament<T extends TournamentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TournamentDefaultArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    playerA<T extends TournamentMatch$playerAArgs<ExtArgs> = {}>(args?: Subset<T, TournamentMatch$playerAArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    playerB<T extends TournamentMatch$playerBArgs<ExtArgs> = {}>(args?: Subset<T, TournamentMatch$playerBArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    winner<T extends TournamentMatch$winnerArgs<ExtArgs> = {}>(args?: Subset<T, TournamentMatch$winnerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    nextMatch<T extends TournamentMatch$nextMatchArgs<ExtArgs> = {}>(args?: Subset<T, TournamentMatch$nextMatchArgs<ExtArgs>>): Prisma__TournamentMatchClient<$Result.GetResult<Prisma.$TournamentMatchPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    previousMatches<T extends TournamentMatch$previousMatchesArgs<ExtArgs> = {}>(args?: Subset<T, TournamentMatch$previousMatchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentMatchPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the TournamentMatch model
   */ 
  interface TournamentMatchFieldRefs {
    readonly id: FieldRef<"TournamentMatch", 'String'>
    readonly tournamentId: FieldRef<"TournamentMatch", 'String'>
    readonly round: FieldRef<"TournamentMatch", 'Int'>
    readonly bracketIndex: FieldRef<"TournamentMatch", 'Int'>
    readonly playerAId: FieldRef<"TournamentMatch", 'String'>
    readonly playerBId: FieldRef<"TournamentMatch", 'String'>
    readonly winnerId: FieldRef<"TournamentMatch", 'String'>
    readonly nextMatchId: FieldRef<"TournamentMatch", 'String'>
    readonly status: FieldRef<"TournamentMatch", 'String'>
    readonly playedAt: FieldRef<"TournamentMatch", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TournamentMatch findUnique
   */
  export type TournamentMatchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchInclude<ExtArgs> | null
    /**
     * Filter, which TournamentMatch to fetch.
     */
    where: TournamentMatchWhereUniqueInput
  }

  /**
   * TournamentMatch findUniqueOrThrow
   */
  export type TournamentMatchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchInclude<ExtArgs> | null
    /**
     * Filter, which TournamentMatch to fetch.
     */
    where: TournamentMatchWhereUniqueInput
  }

  /**
   * TournamentMatch findFirst
   */
  export type TournamentMatchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchInclude<ExtArgs> | null
    /**
     * Filter, which TournamentMatch to fetch.
     */
    where?: TournamentMatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TournamentMatches to fetch.
     */
    orderBy?: TournamentMatchOrderByWithRelationInput | TournamentMatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TournamentMatches.
     */
    cursor?: TournamentMatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TournamentMatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TournamentMatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TournamentMatches.
     */
    distinct?: TournamentMatchScalarFieldEnum | TournamentMatchScalarFieldEnum[]
  }

  /**
   * TournamentMatch findFirstOrThrow
   */
  export type TournamentMatchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchInclude<ExtArgs> | null
    /**
     * Filter, which TournamentMatch to fetch.
     */
    where?: TournamentMatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TournamentMatches to fetch.
     */
    orderBy?: TournamentMatchOrderByWithRelationInput | TournamentMatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TournamentMatches.
     */
    cursor?: TournamentMatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TournamentMatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TournamentMatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TournamentMatches.
     */
    distinct?: TournamentMatchScalarFieldEnum | TournamentMatchScalarFieldEnum[]
  }

  /**
   * TournamentMatch findMany
   */
  export type TournamentMatchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchInclude<ExtArgs> | null
    /**
     * Filter, which TournamentMatches to fetch.
     */
    where?: TournamentMatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TournamentMatches to fetch.
     */
    orderBy?: TournamentMatchOrderByWithRelationInput | TournamentMatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TournamentMatches.
     */
    cursor?: TournamentMatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TournamentMatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TournamentMatches.
     */
    skip?: number
    distinct?: TournamentMatchScalarFieldEnum | TournamentMatchScalarFieldEnum[]
  }

  /**
   * TournamentMatch create
   */
  export type TournamentMatchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchInclude<ExtArgs> | null
    /**
     * The data needed to create a TournamentMatch.
     */
    data: XOR<TournamentMatchCreateInput, TournamentMatchUncheckedCreateInput>
  }

  /**
   * TournamentMatch createMany
   */
  export type TournamentMatchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TournamentMatches.
     */
    data: TournamentMatchCreateManyInput | TournamentMatchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TournamentMatch createManyAndReturn
   */
  export type TournamentMatchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TournamentMatches.
     */
    data: TournamentMatchCreateManyInput | TournamentMatchCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TournamentMatch update
   */
  export type TournamentMatchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchInclude<ExtArgs> | null
    /**
     * The data needed to update a TournamentMatch.
     */
    data: XOR<TournamentMatchUpdateInput, TournamentMatchUncheckedUpdateInput>
    /**
     * Choose, which TournamentMatch to update.
     */
    where: TournamentMatchWhereUniqueInput
  }

  /**
   * TournamentMatch updateMany
   */
  export type TournamentMatchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TournamentMatches.
     */
    data: XOR<TournamentMatchUpdateManyMutationInput, TournamentMatchUncheckedUpdateManyInput>
    /**
     * Filter which TournamentMatches to update
     */
    where?: TournamentMatchWhereInput
  }

  /**
   * TournamentMatch upsert
   */
  export type TournamentMatchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchInclude<ExtArgs> | null
    /**
     * The filter to search for the TournamentMatch to update in case it exists.
     */
    where: TournamentMatchWhereUniqueInput
    /**
     * In case the TournamentMatch found by the `where` argument doesn't exist, create a new TournamentMatch with this data.
     */
    create: XOR<TournamentMatchCreateInput, TournamentMatchUncheckedCreateInput>
    /**
     * In case the TournamentMatch was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TournamentMatchUpdateInput, TournamentMatchUncheckedUpdateInput>
  }

  /**
   * TournamentMatch delete
   */
  export type TournamentMatchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchInclude<ExtArgs> | null
    /**
     * Filter which TournamentMatch to delete.
     */
    where: TournamentMatchWhereUniqueInput
  }

  /**
   * TournamentMatch deleteMany
   */
  export type TournamentMatchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TournamentMatches to delete
     */
    where?: TournamentMatchWhereInput
  }

  /**
   * TournamentMatch.playerA
   */
  export type TournamentMatch$playerAArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * TournamentMatch.playerB
   */
  export type TournamentMatch$playerBArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * TournamentMatch.winner
   */
  export type TournamentMatch$winnerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * TournamentMatch.nextMatch
   */
  export type TournamentMatch$nextMatchArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchInclude<ExtArgs> | null
    where?: TournamentMatchWhereInput
  }

  /**
   * TournamentMatch.previousMatches
   */
  export type TournamentMatch$previousMatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchInclude<ExtArgs> | null
    where?: TournamentMatchWhereInput
    orderBy?: TournamentMatchOrderByWithRelationInput | TournamentMatchOrderByWithRelationInput[]
    cursor?: TournamentMatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TournamentMatchScalarFieldEnum | TournamentMatchScalarFieldEnum[]
  }

  /**
   * TournamentMatch without action
   */
  export type TournamentMatchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    username: 'username',
    wins: 'wins',
    losses: 'losses',
    rating: 'rating',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    title: 'title',
    body: 'body',
    read: 'read',
    createdAt: 'createdAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const RoomScalarFieldEnum: {
    id: 'id',
    code: 'code',
    status: 'status',
    gameType: 'gameType',
    players: 'players',
    currentState: 'currentState',
    winnerId: 'winnerId',
    ownerId: 'ownerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoomScalarFieldEnum = (typeof RoomScalarFieldEnum)[keyof typeof RoomScalarFieldEnum]


  export const GameHistoryScalarFieldEnum: {
    id: 'id',
    winnerId: 'winnerId',
    roomId: 'roomId',
    gameName: 'gameName',
    players: 'players',
    data: 'data',
    createdAt: 'createdAt'
  };

  export type GameHistoryScalarFieldEnum = (typeof GameHistoryScalarFieldEnum)[keyof typeof GameHistoryScalarFieldEnum]


  export const TournamentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    gameType: 'gameType',
    status: 'status',
    maxPlayers: 'maxPlayers',
    bracket: 'bracket',
    winnerId: 'winnerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TournamentScalarFieldEnum = (typeof TournamentScalarFieldEnum)[keyof typeof TournamentScalarFieldEnum]


  export const TournamentPlayerScalarFieldEnum: {
    id: 'id',
    tournamentId: 'tournamentId',
    userId: 'userId',
    seed: 'seed',
    joinedAt: 'joinedAt'
  };

  export type TournamentPlayerScalarFieldEnum = (typeof TournamentPlayerScalarFieldEnum)[keyof typeof TournamentPlayerScalarFieldEnum]


  export const TournamentMatchScalarFieldEnum: {
    id: 'id',
    tournamentId: 'tournamentId',
    round: 'round',
    bracketIndex: 'bracketIndex',
    playerAId: 'playerAId',
    playerBId: 'playerBId',
    winnerId: 'winnerId',
    nextMatchId: 'nextMatchId',
    status: 'status',
    playedAt: 'playedAt'
  };

  export type TournamentMatchScalarFieldEnum = (typeof TournamentMatchScalarFieldEnum)[keyof typeof TournamentMatchScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


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
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    wins?: IntFilter<"User"> | number
    losses?: IntFilter<"User"> | number
    rating?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    gameHistoryWins?: GameHistoryListRelationFilter
    tournamentsWon?: TournamentListRelationFilter
    tournamentSlots?: TournamentPlayerListRelationFilter
    matchAsPlayerA?: TournamentMatchListRelationFilter
    matchAsPlayerB?: TournamentMatchListRelationFilter
    matchWins?: TournamentMatchListRelationFilter
    notifications?: NotificationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    username?: SortOrder
    wins?: SortOrder
    losses?: SortOrder
    rating?: SortOrder
    createdAt?: SortOrder
    gameHistoryWins?: GameHistoryOrderByRelationAggregateInput
    tournamentsWon?: TournamentOrderByRelationAggregateInput
    tournamentSlots?: TournamentPlayerOrderByRelationAggregateInput
    matchAsPlayerA?: TournamentMatchOrderByRelationAggregateInput
    matchAsPlayerB?: TournamentMatchOrderByRelationAggregateInput
    matchWins?: TournamentMatchOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    wins?: IntFilter<"User"> | number
    losses?: IntFilter<"User"> | number
    rating?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    gameHistoryWins?: GameHistoryListRelationFilter
    tournamentsWon?: TournamentListRelationFilter
    tournamentSlots?: TournamentPlayerListRelationFilter
    matchAsPlayerA?: TournamentMatchListRelationFilter
    matchAsPlayerB?: TournamentMatchListRelationFilter
    matchWins?: TournamentMatchListRelationFilter
    notifications?: NotificationListRelationFilter
  }, "id" | "email" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    username?: SortOrder
    wins?: SortOrder
    losses?: SortOrder
    rating?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    wins?: IntWithAggregatesFilter<"User"> | number
    losses?: IntWithAggregatesFilter<"User"> | number
    rating?: IntWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    body?: StringNullableFilter<"Notification"> | string | null
    read?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrderInput | SortOrder
    read?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    body?: StringNullableFilter<"Notification"> | string | null
    read?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrderInput | SortOrder
    read?: SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    userId?: StringWithAggregatesFilter<"Notification"> | string
    type?: StringWithAggregatesFilter<"Notification"> | string
    title?: StringWithAggregatesFilter<"Notification"> | string
    body?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    read?: BoolWithAggregatesFilter<"Notification"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type RoomWhereInput = {
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    id?: StringFilter<"Room"> | string
    code?: StringFilter<"Room"> | string
    status?: StringFilter<"Room"> | string
    gameType?: StringFilter<"Room"> | string
    players?: StringFilter<"Room"> | string
    currentState?: StringNullableFilter<"Room"> | string | null
    winnerId?: StringNullableFilter<"Room"> | string | null
    ownerId?: StringNullableFilter<"Room"> | string | null
    createdAt?: DateTimeFilter<"Room"> | Date | string
    updatedAt?: DateTimeFilter<"Room"> | Date | string
    games?: GameHistoryListRelationFilter
  }

  export type RoomOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    status?: SortOrder
    gameType?: SortOrder
    players?: SortOrder
    currentState?: SortOrderInput | SortOrder
    winnerId?: SortOrderInput | SortOrder
    ownerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    games?: GameHistoryOrderByRelationAggregateInput
  }

  export type RoomWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    status?: StringFilter<"Room"> | string
    gameType?: StringFilter<"Room"> | string
    players?: StringFilter<"Room"> | string
    currentState?: StringNullableFilter<"Room"> | string | null
    winnerId?: StringNullableFilter<"Room"> | string | null
    ownerId?: StringNullableFilter<"Room"> | string | null
    createdAt?: DateTimeFilter<"Room"> | Date | string
    updatedAt?: DateTimeFilter<"Room"> | Date | string
    games?: GameHistoryListRelationFilter
  }, "id" | "code">

  export type RoomOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    status?: SortOrder
    gameType?: SortOrder
    players?: SortOrder
    currentState?: SortOrderInput | SortOrder
    winnerId?: SortOrderInput | SortOrder
    ownerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoomCountOrderByAggregateInput
    _max?: RoomMaxOrderByAggregateInput
    _min?: RoomMinOrderByAggregateInput
  }

  export type RoomScalarWhereWithAggregatesInput = {
    AND?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    OR?: RoomScalarWhereWithAggregatesInput[]
    NOT?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Room"> | string
    code?: StringWithAggregatesFilter<"Room"> | string
    status?: StringWithAggregatesFilter<"Room"> | string
    gameType?: StringWithAggregatesFilter<"Room"> | string
    players?: StringWithAggregatesFilter<"Room"> | string
    currentState?: StringNullableWithAggregatesFilter<"Room"> | string | null
    winnerId?: StringNullableWithAggregatesFilter<"Room"> | string | null
    ownerId?: StringNullableWithAggregatesFilter<"Room"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Room"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Room"> | Date | string
  }

  export type GameHistoryWhereInput = {
    AND?: GameHistoryWhereInput | GameHistoryWhereInput[]
    OR?: GameHistoryWhereInput[]
    NOT?: GameHistoryWhereInput | GameHistoryWhereInput[]
    id?: StringFilter<"GameHistory"> | string
    winnerId?: StringNullableFilter<"GameHistory"> | string | null
    roomId?: StringFilter<"GameHistory"> | string
    gameName?: StringFilter<"GameHistory"> | string
    players?: StringFilter<"GameHistory"> | string
    data?: StringFilter<"GameHistory"> | string
    createdAt?: DateTimeFilter<"GameHistory"> | Date | string
    winner?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    room?: XOR<RoomRelationFilter, RoomWhereInput>
  }

  export type GameHistoryOrderByWithRelationInput = {
    id?: SortOrder
    winnerId?: SortOrderInput | SortOrder
    roomId?: SortOrder
    gameName?: SortOrder
    players?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
    winner?: UserOrderByWithRelationInput
    room?: RoomOrderByWithRelationInput
  }

  export type GameHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GameHistoryWhereInput | GameHistoryWhereInput[]
    OR?: GameHistoryWhereInput[]
    NOT?: GameHistoryWhereInput | GameHistoryWhereInput[]
    winnerId?: StringNullableFilter<"GameHistory"> | string | null
    roomId?: StringFilter<"GameHistory"> | string
    gameName?: StringFilter<"GameHistory"> | string
    players?: StringFilter<"GameHistory"> | string
    data?: StringFilter<"GameHistory"> | string
    createdAt?: DateTimeFilter<"GameHistory"> | Date | string
    winner?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    room?: XOR<RoomRelationFilter, RoomWhereInput>
  }, "id">

  export type GameHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    winnerId?: SortOrderInput | SortOrder
    roomId?: SortOrder
    gameName?: SortOrder
    players?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
    _count?: GameHistoryCountOrderByAggregateInput
    _max?: GameHistoryMaxOrderByAggregateInput
    _min?: GameHistoryMinOrderByAggregateInput
  }

  export type GameHistoryScalarWhereWithAggregatesInput = {
    AND?: GameHistoryScalarWhereWithAggregatesInput | GameHistoryScalarWhereWithAggregatesInput[]
    OR?: GameHistoryScalarWhereWithAggregatesInput[]
    NOT?: GameHistoryScalarWhereWithAggregatesInput | GameHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GameHistory"> | string
    winnerId?: StringNullableWithAggregatesFilter<"GameHistory"> | string | null
    roomId?: StringWithAggregatesFilter<"GameHistory"> | string
    gameName?: StringWithAggregatesFilter<"GameHistory"> | string
    players?: StringWithAggregatesFilter<"GameHistory"> | string
    data?: StringWithAggregatesFilter<"GameHistory"> | string
    createdAt?: DateTimeWithAggregatesFilter<"GameHistory"> | Date | string
  }

  export type TournamentWhereInput = {
    AND?: TournamentWhereInput | TournamentWhereInput[]
    OR?: TournamentWhereInput[]
    NOT?: TournamentWhereInput | TournamentWhereInput[]
    id?: StringFilter<"Tournament"> | string
    name?: StringFilter<"Tournament"> | string
    gameType?: StringFilter<"Tournament"> | string
    status?: StringFilter<"Tournament"> | string
    maxPlayers?: IntFilter<"Tournament"> | number
    bracket?: StringNullableFilter<"Tournament"> | string | null
    winnerId?: StringNullableFilter<"Tournament"> | string | null
    createdAt?: DateTimeFilter<"Tournament"> | Date | string
    updatedAt?: DateTimeFilter<"Tournament"> | Date | string
    winner?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    players?: TournamentPlayerListRelationFilter
    matches?: TournamentMatchListRelationFilter
  }

  export type TournamentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    gameType?: SortOrder
    status?: SortOrder
    maxPlayers?: SortOrder
    bracket?: SortOrderInput | SortOrder
    winnerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    winner?: UserOrderByWithRelationInput
    players?: TournamentPlayerOrderByRelationAggregateInput
    matches?: TournamentMatchOrderByRelationAggregateInput
  }

  export type TournamentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TournamentWhereInput | TournamentWhereInput[]
    OR?: TournamentWhereInput[]
    NOT?: TournamentWhereInput | TournamentWhereInput[]
    name?: StringFilter<"Tournament"> | string
    gameType?: StringFilter<"Tournament"> | string
    status?: StringFilter<"Tournament"> | string
    maxPlayers?: IntFilter<"Tournament"> | number
    bracket?: StringNullableFilter<"Tournament"> | string | null
    winnerId?: StringNullableFilter<"Tournament"> | string | null
    createdAt?: DateTimeFilter<"Tournament"> | Date | string
    updatedAt?: DateTimeFilter<"Tournament"> | Date | string
    winner?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    players?: TournamentPlayerListRelationFilter
    matches?: TournamentMatchListRelationFilter
  }, "id">

  export type TournamentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    gameType?: SortOrder
    status?: SortOrder
    maxPlayers?: SortOrder
    bracket?: SortOrderInput | SortOrder
    winnerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TournamentCountOrderByAggregateInput
    _avg?: TournamentAvgOrderByAggregateInput
    _max?: TournamentMaxOrderByAggregateInput
    _min?: TournamentMinOrderByAggregateInput
    _sum?: TournamentSumOrderByAggregateInput
  }

  export type TournamentScalarWhereWithAggregatesInput = {
    AND?: TournamentScalarWhereWithAggregatesInput | TournamentScalarWhereWithAggregatesInput[]
    OR?: TournamentScalarWhereWithAggregatesInput[]
    NOT?: TournamentScalarWhereWithAggregatesInput | TournamentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tournament"> | string
    name?: StringWithAggregatesFilter<"Tournament"> | string
    gameType?: StringWithAggregatesFilter<"Tournament"> | string
    status?: StringWithAggregatesFilter<"Tournament"> | string
    maxPlayers?: IntWithAggregatesFilter<"Tournament"> | number
    bracket?: StringNullableWithAggregatesFilter<"Tournament"> | string | null
    winnerId?: StringNullableWithAggregatesFilter<"Tournament"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Tournament"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Tournament"> | Date | string
  }

  export type TournamentPlayerWhereInput = {
    AND?: TournamentPlayerWhereInput | TournamentPlayerWhereInput[]
    OR?: TournamentPlayerWhereInput[]
    NOT?: TournamentPlayerWhereInput | TournamentPlayerWhereInput[]
    id?: StringFilter<"TournamentPlayer"> | string
    tournamentId?: StringFilter<"TournamentPlayer"> | string
    userId?: StringFilter<"TournamentPlayer"> | string
    seed?: IntFilter<"TournamentPlayer"> | number
    joinedAt?: DateTimeFilter<"TournamentPlayer"> | Date | string
    tournament?: XOR<TournamentRelationFilter, TournamentWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type TournamentPlayerOrderByWithRelationInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    userId?: SortOrder
    seed?: SortOrder
    joinedAt?: SortOrder
    tournament?: TournamentOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type TournamentPlayerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tournamentId_userId?: TournamentPlayerTournamentIdUserIdCompoundUniqueInput
    AND?: TournamentPlayerWhereInput | TournamentPlayerWhereInput[]
    OR?: TournamentPlayerWhereInput[]
    NOT?: TournamentPlayerWhereInput | TournamentPlayerWhereInput[]
    tournamentId?: StringFilter<"TournamentPlayer"> | string
    userId?: StringFilter<"TournamentPlayer"> | string
    seed?: IntFilter<"TournamentPlayer"> | number
    joinedAt?: DateTimeFilter<"TournamentPlayer"> | Date | string
    tournament?: XOR<TournamentRelationFilter, TournamentWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "tournamentId_userId">

  export type TournamentPlayerOrderByWithAggregationInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    userId?: SortOrder
    seed?: SortOrder
    joinedAt?: SortOrder
    _count?: TournamentPlayerCountOrderByAggregateInput
    _avg?: TournamentPlayerAvgOrderByAggregateInput
    _max?: TournamentPlayerMaxOrderByAggregateInput
    _min?: TournamentPlayerMinOrderByAggregateInput
    _sum?: TournamentPlayerSumOrderByAggregateInput
  }

  export type TournamentPlayerScalarWhereWithAggregatesInput = {
    AND?: TournamentPlayerScalarWhereWithAggregatesInput | TournamentPlayerScalarWhereWithAggregatesInput[]
    OR?: TournamentPlayerScalarWhereWithAggregatesInput[]
    NOT?: TournamentPlayerScalarWhereWithAggregatesInput | TournamentPlayerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TournamentPlayer"> | string
    tournamentId?: StringWithAggregatesFilter<"TournamentPlayer"> | string
    userId?: StringWithAggregatesFilter<"TournamentPlayer"> | string
    seed?: IntWithAggregatesFilter<"TournamentPlayer"> | number
    joinedAt?: DateTimeWithAggregatesFilter<"TournamentPlayer"> | Date | string
  }

  export type TournamentMatchWhereInput = {
    AND?: TournamentMatchWhereInput | TournamentMatchWhereInput[]
    OR?: TournamentMatchWhereInput[]
    NOT?: TournamentMatchWhereInput | TournamentMatchWhereInput[]
    id?: StringFilter<"TournamentMatch"> | string
    tournamentId?: StringFilter<"TournamentMatch"> | string
    round?: IntFilter<"TournamentMatch"> | number
    bracketIndex?: IntFilter<"TournamentMatch"> | number
    playerAId?: StringNullableFilter<"TournamentMatch"> | string | null
    playerBId?: StringNullableFilter<"TournamentMatch"> | string | null
    winnerId?: StringNullableFilter<"TournamentMatch"> | string | null
    nextMatchId?: StringNullableFilter<"TournamentMatch"> | string | null
    status?: StringFilter<"TournamentMatch"> | string
    playedAt?: DateTimeNullableFilter<"TournamentMatch"> | Date | string | null
    tournament?: XOR<TournamentRelationFilter, TournamentWhereInput>
    playerA?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    playerB?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    winner?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    nextMatch?: XOR<TournamentMatchNullableRelationFilter, TournamentMatchWhereInput> | null
    previousMatches?: TournamentMatchListRelationFilter
  }

  export type TournamentMatchOrderByWithRelationInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    round?: SortOrder
    bracketIndex?: SortOrder
    playerAId?: SortOrderInput | SortOrder
    playerBId?: SortOrderInput | SortOrder
    winnerId?: SortOrderInput | SortOrder
    nextMatchId?: SortOrderInput | SortOrder
    status?: SortOrder
    playedAt?: SortOrderInput | SortOrder
    tournament?: TournamentOrderByWithRelationInput
    playerA?: UserOrderByWithRelationInput
    playerB?: UserOrderByWithRelationInput
    winner?: UserOrderByWithRelationInput
    nextMatch?: TournamentMatchOrderByWithRelationInput
    previousMatches?: TournamentMatchOrderByRelationAggregateInput
  }

  export type TournamentMatchWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tournamentId_round_bracketIndex?: TournamentMatchTournamentIdRoundBracketIndexCompoundUniqueInput
    AND?: TournamentMatchWhereInput | TournamentMatchWhereInput[]
    OR?: TournamentMatchWhereInput[]
    NOT?: TournamentMatchWhereInput | TournamentMatchWhereInput[]
    tournamentId?: StringFilter<"TournamentMatch"> | string
    round?: IntFilter<"TournamentMatch"> | number
    bracketIndex?: IntFilter<"TournamentMatch"> | number
    playerAId?: StringNullableFilter<"TournamentMatch"> | string | null
    playerBId?: StringNullableFilter<"TournamentMatch"> | string | null
    winnerId?: StringNullableFilter<"TournamentMatch"> | string | null
    nextMatchId?: StringNullableFilter<"TournamentMatch"> | string | null
    status?: StringFilter<"TournamentMatch"> | string
    playedAt?: DateTimeNullableFilter<"TournamentMatch"> | Date | string | null
    tournament?: XOR<TournamentRelationFilter, TournamentWhereInput>
    playerA?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    playerB?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    winner?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    nextMatch?: XOR<TournamentMatchNullableRelationFilter, TournamentMatchWhereInput> | null
    previousMatches?: TournamentMatchListRelationFilter
  }, "id" | "tournamentId_round_bracketIndex">

  export type TournamentMatchOrderByWithAggregationInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    round?: SortOrder
    bracketIndex?: SortOrder
    playerAId?: SortOrderInput | SortOrder
    playerBId?: SortOrderInput | SortOrder
    winnerId?: SortOrderInput | SortOrder
    nextMatchId?: SortOrderInput | SortOrder
    status?: SortOrder
    playedAt?: SortOrderInput | SortOrder
    _count?: TournamentMatchCountOrderByAggregateInput
    _avg?: TournamentMatchAvgOrderByAggregateInput
    _max?: TournamentMatchMaxOrderByAggregateInput
    _min?: TournamentMatchMinOrderByAggregateInput
    _sum?: TournamentMatchSumOrderByAggregateInput
  }

  export type TournamentMatchScalarWhereWithAggregatesInput = {
    AND?: TournamentMatchScalarWhereWithAggregatesInput | TournamentMatchScalarWhereWithAggregatesInput[]
    OR?: TournamentMatchScalarWhereWithAggregatesInput[]
    NOT?: TournamentMatchScalarWhereWithAggregatesInput | TournamentMatchScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TournamentMatch"> | string
    tournamentId?: StringWithAggregatesFilter<"TournamentMatch"> | string
    round?: IntWithAggregatesFilter<"TournamentMatch"> | number
    bracketIndex?: IntWithAggregatesFilter<"TournamentMatch"> | number
    playerAId?: StringNullableWithAggregatesFilter<"TournamentMatch"> | string | null
    playerBId?: StringNullableWithAggregatesFilter<"TournamentMatch"> | string | null
    winnerId?: StringNullableWithAggregatesFilter<"TournamentMatch"> | string | null
    nextMatchId?: StringNullableWithAggregatesFilter<"TournamentMatch"> | string | null
    status?: StringWithAggregatesFilter<"TournamentMatch"> | string
    playedAt?: DateTimeNullableWithAggregatesFilter<"TournamentMatch"> | Date | string | null
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    username: string
    wins?: number
    losses?: number
    rating?: number
    createdAt?: Date | string
    gameHistoryWins?: GameHistoryCreateNestedManyWithoutWinnerInput
    tournamentsWon?: TournamentCreateNestedManyWithoutWinnerInput
    tournamentSlots?: TournamentPlayerCreateNestedManyWithoutUserInput
    matchAsPlayerA?: TournamentMatchCreateNestedManyWithoutPlayerAInput
    matchAsPlayerB?: TournamentMatchCreateNestedManyWithoutPlayerBInput
    matchWins?: TournamentMatchCreateNestedManyWithoutWinnerInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    username: string
    wins?: number
    losses?: number
    rating?: number
    createdAt?: Date | string
    gameHistoryWins?: GameHistoryUncheckedCreateNestedManyWithoutWinnerInput
    tournamentsWon?: TournamentUncheckedCreateNestedManyWithoutWinnerInput
    tournamentSlots?: TournamentPlayerUncheckedCreateNestedManyWithoutUserInput
    matchAsPlayerA?: TournamentMatchUncheckedCreateNestedManyWithoutPlayerAInput
    matchAsPlayerB?: TournamentMatchUncheckedCreateNestedManyWithoutPlayerBInput
    matchWins?: TournamentMatchUncheckedCreateNestedManyWithoutWinnerInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameHistoryWins?: GameHistoryUpdateManyWithoutWinnerNestedInput
    tournamentsWon?: TournamentUpdateManyWithoutWinnerNestedInput
    tournamentSlots?: TournamentPlayerUpdateManyWithoutUserNestedInput
    matchAsPlayerA?: TournamentMatchUpdateManyWithoutPlayerANestedInput
    matchAsPlayerB?: TournamentMatchUpdateManyWithoutPlayerBNestedInput
    matchWins?: TournamentMatchUpdateManyWithoutWinnerNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameHistoryWins?: GameHistoryUncheckedUpdateManyWithoutWinnerNestedInput
    tournamentsWon?: TournamentUncheckedUpdateManyWithoutWinnerNestedInput
    tournamentSlots?: TournamentPlayerUncheckedUpdateManyWithoutUserNestedInput
    matchAsPlayerA?: TournamentMatchUncheckedUpdateManyWithoutPlayerANestedInput
    matchAsPlayerB?: TournamentMatchUncheckedUpdateManyWithoutPlayerBNestedInput
    matchWins?: TournamentMatchUncheckedUpdateManyWithoutWinnerNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    username: string
    wins?: number
    losses?: number
    rating?: number
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    type?: string
    title: string
    body?: string | null
    read?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    userId: string
    type?: string
    title: string
    body?: string | null
    read?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    userId: string
    type?: string
    title: string
    body?: string | null
    read?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomCreateInput = {
    id?: string
    code: string
    status?: string
    gameType: string
    players?: string
    currentState?: string | null
    winnerId?: string | null
    ownerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    games?: GameHistoryCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateInput = {
    id?: string
    code: string
    status?: string
    gameType: string
    players?: string
    currentState?: string | null
    winnerId?: string | null
    ownerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    games?: GameHistoryUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    gameType?: StringFieldUpdateOperationsInput | string
    players?: StringFieldUpdateOperationsInput | string
    currentState?: NullableStringFieldUpdateOperationsInput | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    games?: GameHistoryUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    gameType?: StringFieldUpdateOperationsInput | string
    players?: StringFieldUpdateOperationsInput | string
    currentState?: NullableStringFieldUpdateOperationsInput | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    games?: GameHistoryUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type RoomCreateManyInput = {
    id?: string
    code: string
    status?: string
    gameType: string
    players?: string
    currentState?: string | null
    winnerId?: string | null
    ownerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    gameType?: StringFieldUpdateOperationsInput | string
    players?: StringFieldUpdateOperationsInput | string
    currentState?: NullableStringFieldUpdateOperationsInput | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    gameType?: StringFieldUpdateOperationsInput | string
    players?: StringFieldUpdateOperationsInput | string
    currentState?: NullableStringFieldUpdateOperationsInput | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameHistoryCreateInput = {
    id?: string
    gameName?: string
    players?: string
    data?: string
    createdAt?: Date | string
    winner?: UserCreateNestedOneWithoutGameHistoryWinsInput
    room: RoomCreateNestedOneWithoutGamesInput
  }

  export type GameHistoryUncheckedCreateInput = {
    id?: string
    winnerId?: string | null
    roomId: string
    gameName?: string
    players?: string
    data?: string
    createdAt?: Date | string
  }

  export type GameHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameName?: StringFieldUpdateOperationsInput | string
    players?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    winner?: UserUpdateOneWithoutGameHistoryWinsNestedInput
    room?: RoomUpdateOneRequiredWithoutGamesNestedInput
  }

  export type GameHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: StringFieldUpdateOperationsInput | string
    gameName?: StringFieldUpdateOperationsInput | string
    players?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameHistoryCreateManyInput = {
    id?: string
    winnerId?: string | null
    roomId: string
    gameName?: string
    players?: string
    data?: string
    createdAt?: Date | string
  }

  export type GameHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameName?: StringFieldUpdateOperationsInput | string
    players?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: StringFieldUpdateOperationsInput | string
    gameName?: StringFieldUpdateOperationsInput | string
    players?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TournamentCreateInput = {
    id?: string
    name: string
    gameType?: string
    status?: string
    maxPlayers?: number
    bracket?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    winner?: UserCreateNestedOneWithoutTournamentsWonInput
    players?: TournamentPlayerCreateNestedManyWithoutTournamentInput
    matches?: TournamentMatchCreateNestedManyWithoutTournamentInput
  }

  export type TournamentUncheckedCreateInput = {
    id?: string
    name: string
    gameType?: string
    status?: string
    maxPlayers?: number
    bracket?: string | null
    winnerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    players?: TournamentPlayerUncheckedCreateNestedManyWithoutTournamentInput
    matches?: TournamentMatchUncheckedCreateNestedManyWithoutTournamentInput
  }

  export type TournamentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gameType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    maxPlayers?: IntFieldUpdateOperationsInput | number
    bracket?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    winner?: UserUpdateOneWithoutTournamentsWonNestedInput
    players?: TournamentPlayerUpdateManyWithoutTournamentNestedInput
    matches?: TournamentMatchUpdateManyWithoutTournamentNestedInput
  }

  export type TournamentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gameType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    maxPlayers?: IntFieldUpdateOperationsInput | number
    bracket?: NullableStringFieldUpdateOperationsInput | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    players?: TournamentPlayerUncheckedUpdateManyWithoutTournamentNestedInput
    matches?: TournamentMatchUncheckedUpdateManyWithoutTournamentNestedInput
  }

  export type TournamentCreateManyInput = {
    id?: string
    name: string
    gameType?: string
    status?: string
    maxPlayers?: number
    bracket?: string | null
    winnerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TournamentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gameType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    maxPlayers?: IntFieldUpdateOperationsInput | number
    bracket?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TournamentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gameType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    maxPlayers?: IntFieldUpdateOperationsInput | number
    bracket?: NullableStringFieldUpdateOperationsInput | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TournamentPlayerCreateInput = {
    id?: string
    seed?: number
    joinedAt?: Date | string
    tournament: TournamentCreateNestedOneWithoutPlayersInput
    user: UserCreateNestedOneWithoutTournamentSlotsInput
  }

  export type TournamentPlayerUncheckedCreateInput = {
    id?: string
    tournamentId: string
    userId: string
    seed?: number
    joinedAt?: Date | string
  }

  export type TournamentPlayerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    seed?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tournament?: TournamentUpdateOneRequiredWithoutPlayersNestedInput
    user?: UserUpdateOneRequiredWithoutTournamentSlotsNestedInput
  }

  export type TournamentPlayerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tournamentId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    seed?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TournamentPlayerCreateManyInput = {
    id?: string
    tournamentId: string
    userId: string
    seed?: number
    joinedAt?: Date | string
  }

  export type TournamentPlayerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    seed?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TournamentPlayerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tournamentId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    seed?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TournamentMatchCreateInput = {
    id?: string
    round?: number
    bracketIndex?: number
    status?: string
    playedAt?: Date | string | null
    tournament: TournamentCreateNestedOneWithoutMatchesInput
    playerA?: UserCreateNestedOneWithoutMatchAsPlayerAInput
    playerB?: UserCreateNestedOneWithoutMatchAsPlayerBInput
    winner?: UserCreateNestedOneWithoutMatchWinsInput
    nextMatch?: TournamentMatchCreateNestedOneWithoutPreviousMatchesInput
    previousMatches?: TournamentMatchCreateNestedManyWithoutNextMatchInput
  }

  export type TournamentMatchUncheckedCreateInput = {
    id?: string
    tournamentId: string
    round?: number
    bracketIndex?: number
    playerAId?: string | null
    playerBId?: string | null
    winnerId?: string | null
    nextMatchId?: string | null
    status?: string
    playedAt?: Date | string | null
    previousMatches?: TournamentMatchUncheckedCreateNestedManyWithoutNextMatchInput
  }

  export type TournamentMatchUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    round?: IntFieldUpdateOperationsInput | number
    bracketIndex?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tournament?: TournamentUpdateOneRequiredWithoutMatchesNestedInput
    playerA?: UserUpdateOneWithoutMatchAsPlayerANestedInput
    playerB?: UserUpdateOneWithoutMatchAsPlayerBNestedInput
    winner?: UserUpdateOneWithoutMatchWinsNestedInput
    nextMatch?: TournamentMatchUpdateOneWithoutPreviousMatchesNestedInput
    previousMatches?: TournamentMatchUpdateManyWithoutNextMatchNestedInput
  }

  export type TournamentMatchUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tournamentId?: StringFieldUpdateOperationsInput | string
    round?: IntFieldUpdateOperationsInput | number
    bracketIndex?: IntFieldUpdateOperationsInput | number
    playerAId?: NullableStringFieldUpdateOperationsInput | string | null
    playerBId?: NullableStringFieldUpdateOperationsInput | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    nextMatchId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    previousMatches?: TournamentMatchUncheckedUpdateManyWithoutNextMatchNestedInput
  }

  export type TournamentMatchCreateManyInput = {
    id?: string
    tournamentId: string
    round?: number
    bracketIndex?: number
    playerAId?: string | null
    playerBId?: string | null
    winnerId?: string | null
    nextMatchId?: string | null
    status?: string
    playedAt?: Date | string | null
  }

  export type TournamentMatchUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    round?: IntFieldUpdateOperationsInput | number
    bracketIndex?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TournamentMatchUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tournamentId?: StringFieldUpdateOperationsInput | string
    round?: IntFieldUpdateOperationsInput | number
    bracketIndex?: IntFieldUpdateOperationsInput | number
    playerAId?: NullableStringFieldUpdateOperationsInput | string | null
    playerBId?: NullableStringFieldUpdateOperationsInput | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    nextMatchId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type GameHistoryListRelationFilter = {
    every?: GameHistoryWhereInput
    some?: GameHistoryWhereInput
    none?: GameHistoryWhereInput
  }

  export type TournamentListRelationFilter = {
    every?: TournamentWhereInput
    some?: TournamentWhereInput
    none?: TournamentWhereInput
  }

  export type TournamentPlayerListRelationFilter = {
    every?: TournamentPlayerWhereInput
    some?: TournamentPlayerWhereInput
    none?: TournamentPlayerWhereInput
  }

  export type TournamentMatchListRelationFilter = {
    every?: TournamentMatchWhereInput
    some?: TournamentMatchWhereInput
    none?: TournamentMatchWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type GameHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TournamentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TournamentPlayerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TournamentMatchOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    username?: SortOrder
    wins?: SortOrder
    losses?: SortOrder
    rating?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    wins?: SortOrder
    losses?: SortOrder
    rating?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    username?: SortOrder
    wins?: SortOrder
    losses?: SortOrder
    rating?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    username?: SortOrder
    wins?: SortOrder
    losses?: SortOrder
    rating?: SortOrder
    createdAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    wins?: SortOrder
    losses?: SortOrder
    rating?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type RoomCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    status?: SortOrder
    gameType?: SortOrder
    players?: SortOrder
    currentState?: SortOrder
    winnerId?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    status?: SortOrder
    gameType?: SortOrder
    players?: SortOrder
    currentState?: SortOrder
    winnerId?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    status?: SortOrder
    gameType?: SortOrder
    players?: SortOrder
    currentState?: SortOrder
    winnerId?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type RoomRelationFilter = {
    is?: RoomWhereInput
    isNot?: RoomWhereInput
  }

  export type GameHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    winnerId?: SortOrder
    roomId?: SortOrder
    gameName?: SortOrder
    players?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
  }

  export type GameHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    winnerId?: SortOrder
    roomId?: SortOrder
    gameName?: SortOrder
    players?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
  }

  export type GameHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    winnerId?: SortOrder
    roomId?: SortOrder
    gameName?: SortOrder
    players?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
  }

  export type TournamentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    gameType?: SortOrder
    status?: SortOrder
    maxPlayers?: SortOrder
    bracket?: SortOrder
    winnerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TournamentAvgOrderByAggregateInput = {
    maxPlayers?: SortOrder
  }

  export type TournamentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    gameType?: SortOrder
    status?: SortOrder
    maxPlayers?: SortOrder
    bracket?: SortOrder
    winnerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TournamentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    gameType?: SortOrder
    status?: SortOrder
    maxPlayers?: SortOrder
    bracket?: SortOrder
    winnerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TournamentSumOrderByAggregateInput = {
    maxPlayers?: SortOrder
  }

  export type TournamentRelationFilter = {
    is?: TournamentWhereInput
    isNot?: TournamentWhereInput
  }

  export type TournamentPlayerTournamentIdUserIdCompoundUniqueInput = {
    tournamentId: string
    userId: string
  }

  export type TournamentPlayerCountOrderByAggregateInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    userId?: SortOrder
    seed?: SortOrder
    joinedAt?: SortOrder
  }

  export type TournamentPlayerAvgOrderByAggregateInput = {
    seed?: SortOrder
  }

  export type TournamentPlayerMaxOrderByAggregateInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    userId?: SortOrder
    seed?: SortOrder
    joinedAt?: SortOrder
  }

  export type TournamentPlayerMinOrderByAggregateInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    userId?: SortOrder
    seed?: SortOrder
    joinedAt?: SortOrder
  }

  export type TournamentPlayerSumOrderByAggregateInput = {
    seed?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type TournamentMatchNullableRelationFilter = {
    is?: TournamentMatchWhereInput | null
    isNot?: TournamentMatchWhereInput | null
  }

  export type TournamentMatchTournamentIdRoundBracketIndexCompoundUniqueInput = {
    tournamentId: string
    round: number
    bracketIndex: number
  }

  export type TournamentMatchCountOrderByAggregateInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    round?: SortOrder
    bracketIndex?: SortOrder
    playerAId?: SortOrder
    playerBId?: SortOrder
    winnerId?: SortOrder
    nextMatchId?: SortOrder
    status?: SortOrder
    playedAt?: SortOrder
  }

  export type TournamentMatchAvgOrderByAggregateInput = {
    round?: SortOrder
    bracketIndex?: SortOrder
  }

  export type TournamentMatchMaxOrderByAggregateInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    round?: SortOrder
    bracketIndex?: SortOrder
    playerAId?: SortOrder
    playerBId?: SortOrder
    winnerId?: SortOrder
    nextMatchId?: SortOrder
    status?: SortOrder
    playedAt?: SortOrder
  }

  export type TournamentMatchMinOrderByAggregateInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    round?: SortOrder
    bracketIndex?: SortOrder
    playerAId?: SortOrder
    playerBId?: SortOrder
    winnerId?: SortOrder
    nextMatchId?: SortOrder
    status?: SortOrder
    playedAt?: SortOrder
  }

  export type TournamentMatchSumOrderByAggregateInput = {
    round?: SortOrder
    bracketIndex?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type GameHistoryCreateNestedManyWithoutWinnerInput = {
    create?: XOR<GameHistoryCreateWithoutWinnerInput, GameHistoryUncheckedCreateWithoutWinnerInput> | GameHistoryCreateWithoutWinnerInput[] | GameHistoryUncheckedCreateWithoutWinnerInput[]
    connectOrCreate?: GameHistoryCreateOrConnectWithoutWinnerInput | GameHistoryCreateOrConnectWithoutWinnerInput[]
    createMany?: GameHistoryCreateManyWinnerInputEnvelope
    connect?: GameHistoryWhereUniqueInput | GameHistoryWhereUniqueInput[]
  }

  export type TournamentCreateNestedManyWithoutWinnerInput = {
    create?: XOR<TournamentCreateWithoutWinnerInput, TournamentUncheckedCreateWithoutWinnerInput> | TournamentCreateWithoutWinnerInput[] | TournamentUncheckedCreateWithoutWinnerInput[]
    connectOrCreate?: TournamentCreateOrConnectWithoutWinnerInput | TournamentCreateOrConnectWithoutWinnerInput[]
    createMany?: TournamentCreateManyWinnerInputEnvelope
    connect?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
  }

  export type TournamentPlayerCreateNestedManyWithoutUserInput = {
    create?: XOR<TournamentPlayerCreateWithoutUserInput, TournamentPlayerUncheckedCreateWithoutUserInput> | TournamentPlayerCreateWithoutUserInput[] | TournamentPlayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TournamentPlayerCreateOrConnectWithoutUserInput | TournamentPlayerCreateOrConnectWithoutUserInput[]
    createMany?: TournamentPlayerCreateManyUserInputEnvelope
    connect?: TournamentPlayerWhereUniqueInput | TournamentPlayerWhereUniqueInput[]
  }

  export type TournamentMatchCreateNestedManyWithoutPlayerAInput = {
    create?: XOR<TournamentMatchCreateWithoutPlayerAInput, TournamentMatchUncheckedCreateWithoutPlayerAInput> | TournamentMatchCreateWithoutPlayerAInput[] | TournamentMatchUncheckedCreateWithoutPlayerAInput[]
    connectOrCreate?: TournamentMatchCreateOrConnectWithoutPlayerAInput | TournamentMatchCreateOrConnectWithoutPlayerAInput[]
    createMany?: TournamentMatchCreateManyPlayerAInputEnvelope
    connect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
  }

  export type TournamentMatchCreateNestedManyWithoutPlayerBInput = {
    create?: XOR<TournamentMatchCreateWithoutPlayerBInput, TournamentMatchUncheckedCreateWithoutPlayerBInput> | TournamentMatchCreateWithoutPlayerBInput[] | TournamentMatchUncheckedCreateWithoutPlayerBInput[]
    connectOrCreate?: TournamentMatchCreateOrConnectWithoutPlayerBInput | TournamentMatchCreateOrConnectWithoutPlayerBInput[]
    createMany?: TournamentMatchCreateManyPlayerBInputEnvelope
    connect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
  }

  export type TournamentMatchCreateNestedManyWithoutWinnerInput = {
    create?: XOR<TournamentMatchCreateWithoutWinnerInput, TournamentMatchUncheckedCreateWithoutWinnerInput> | TournamentMatchCreateWithoutWinnerInput[] | TournamentMatchUncheckedCreateWithoutWinnerInput[]
    connectOrCreate?: TournamentMatchCreateOrConnectWithoutWinnerInput | TournamentMatchCreateOrConnectWithoutWinnerInput[]
    createMany?: TournamentMatchCreateManyWinnerInputEnvelope
    connect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type GameHistoryUncheckedCreateNestedManyWithoutWinnerInput = {
    create?: XOR<GameHistoryCreateWithoutWinnerInput, GameHistoryUncheckedCreateWithoutWinnerInput> | GameHistoryCreateWithoutWinnerInput[] | GameHistoryUncheckedCreateWithoutWinnerInput[]
    connectOrCreate?: GameHistoryCreateOrConnectWithoutWinnerInput | GameHistoryCreateOrConnectWithoutWinnerInput[]
    createMany?: GameHistoryCreateManyWinnerInputEnvelope
    connect?: GameHistoryWhereUniqueInput | GameHistoryWhereUniqueInput[]
  }

  export type TournamentUncheckedCreateNestedManyWithoutWinnerInput = {
    create?: XOR<TournamentCreateWithoutWinnerInput, TournamentUncheckedCreateWithoutWinnerInput> | TournamentCreateWithoutWinnerInput[] | TournamentUncheckedCreateWithoutWinnerInput[]
    connectOrCreate?: TournamentCreateOrConnectWithoutWinnerInput | TournamentCreateOrConnectWithoutWinnerInput[]
    createMany?: TournamentCreateManyWinnerInputEnvelope
    connect?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
  }

  export type TournamentPlayerUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TournamentPlayerCreateWithoutUserInput, TournamentPlayerUncheckedCreateWithoutUserInput> | TournamentPlayerCreateWithoutUserInput[] | TournamentPlayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TournamentPlayerCreateOrConnectWithoutUserInput | TournamentPlayerCreateOrConnectWithoutUserInput[]
    createMany?: TournamentPlayerCreateManyUserInputEnvelope
    connect?: TournamentPlayerWhereUniqueInput | TournamentPlayerWhereUniqueInput[]
  }

  export type TournamentMatchUncheckedCreateNestedManyWithoutPlayerAInput = {
    create?: XOR<TournamentMatchCreateWithoutPlayerAInput, TournamentMatchUncheckedCreateWithoutPlayerAInput> | TournamentMatchCreateWithoutPlayerAInput[] | TournamentMatchUncheckedCreateWithoutPlayerAInput[]
    connectOrCreate?: TournamentMatchCreateOrConnectWithoutPlayerAInput | TournamentMatchCreateOrConnectWithoutPlayerAInput[]
    createMany?: TournamentMatchCreateManyPlayerAInputEnvelope
    connect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
  }

  export type TournamentMatchUncheckedCreateNestedManyWithoutPlayerBInput = {
    create?: XOR<TournamentMatchCreateWithoutPlayerBInput, TournamentMatchUncheckedCreateWithoutPlayerBInput> | TournamentMatchCreateWithoutPlayerBInput[] | TournamentMatchUncheckedCreateWithoutPlayerBInput[]
    connectOrCreate?: TournamentMatchCreateOrConnectWithoutPlayerBInput | TournamentMatchCreateOrConnectWithoutPlayerBInput[]
    createMany?: TournamentMatchCreateManyPlayerBInputEnvelope
    connect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
  }

  export type TournamentMatchUncheckedCreateNestedManyWithoutWinnerInput = {
    create?: XOR<TournamentMatchCreateWithoutWinnerInput, TournamentMatchUncheckedCreateWithoutWinnerInput> | TournamentMatchCreateWithoutWinnerInput[] | TournamentMatchUncheckedCreateWithoutWinnerInput[]
    connectOrCreate?: TournamentMatchCreateOrConnectWithoutWinnerInput | TournamentMatchCreateOrConnectWithoutWinnerInput[]
    createMany?: TournamentMatchCreateManyWinnerInputEnvelope
    connect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type GameHistoryUpdateManyWithoutWinnerNestedInput = {
    create?: XOR<GameHistoryCreateWithoutWinnerInput, GameHistoryUncheckedCreateWithoutWinnerInput> | GameHistoryCreateWithoutWinnerInput[] | GameHistoryUncheckedCreateWithoutWinnerInput[]
    connectOrCreate?: GameHistoryCreateOrConnectWithoutWinnerInput | GameHistoryCreateOrConnectWithoutWinnerInput[]
    upsert?: GameHistoryUpsertWithWhereUniqueWithoutWinnerInput | GameHistoryUpsertWithWhereUniqueWithoutWinnerInput[]
    createMany?: GameHistoryCreateManyWinnerInputEnvelope
    set?: GameHistoryWhereUniqueInput | GameHistoryWhereUniqueInput[]
    disconnect?: GameHistoryWhereUniqueInput | GameHistoryWhereUniqueInput[]
    delete?: GameHistoryWhereUniqueInput | GameHistoryWhereUniqueInput[]
    connect?: GameHistoryWhereUniqueInput | GameHistoryWhereUniqueInput[]
    update?: GameHistoryUpdateWithWhereUniqueWithoutWinnerInput | GameHistoryUpdateWithWhereUniqueWithoutWinnerInput[]
    updateMany?: GameHistoryUpdateManyWithWhereWithoutWinnerInput | GameHistoryUpdateManyWithWhereWithoutWinnerInput[]
    deleteMany?: GameHistoryScalarWhereInput | GameHistoryScalarWhereInput[]
  }

  export type TournamentUpdateManyWithoutWinnerNestedInput = {
    create?: XOR<TournamentCreateWithoutWinnerInput, TournamentUncheckedCreateWithoutWinnerInput> | TournamentCreateWithoutWinnerInput[] | TournamentUncheckedCreateWithoutWinnerInput[]
    connectOrCreate?: TournamentCreateOrConnectWithoutWinnerInput | TournamentCreateOrConnectWithoutWinnerInput[]
    upsert?: TournamentUpsertWithWhereUniqueWithoutWinnerInput | TournamentUpsertWithWhereUniqueWithoutWinnerInput[]
    createMany?: TournamentCreateManyWinnerInputEnvelope
    set?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    disconnect?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    delete?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    connect?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    update?: TournamentUpdateWithWhereUniqueWithoutWinnerInput | TournamentUpdateWithWhereUniqueWithoutWinnerInput[]
    updateMany?: TournamentUpdateManyWithWhereWithoutWinnerInput | TournamentUpdateManyWithWhereWithoutWinnerInput[]
    deleteMany?: TournamentScalarWhereInput | TournamentScalarWhereInput[]
  }

  export type TournamentPlayerUpdateManyWithoutUserNestedInput = {
    create?: XOR<TournamentPlayerCreateWithoutUserInput, TournamentPlayerUncheckedCreateWithoutUserInput> | TournamentPlayerCreateWithoutUserInput[] | TournamentPlayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TournamentPlayerCreateOrConnectWithoutUserInput | TournamentPlayerCreateOrConnectWithoutUserInput[]
    upsert?: TournamentPlayerUpsertWithWhereUniqueWithoutUserInput | TournamentPlayerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TournamentPlayerCreateManyUserInputEnvelope
    set?: TournamentPlayerWhereUniqueInput | TournamentPlayerWhereUniqueInput[]
    disconnect?: TournamentPlayerWhereUniqueInput | TournamentPlayerWhereUniqueInput[]
    delete?: TournamentPlayerWhereUniqueInput | TournamentPlayerWhereUniqueInput[]
    connect?: TournamentPlayerWhereUniqueInput | TournamentPlayerWhereUniqueInput[]
    update?: TournamentPlayerUpdateWithWhereUniqueWithoutUserInput | TournamentPlayerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TournamentPlayerUpdateManyWithWhereWithoutUserInput | TournamentPlayerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TournamentPlayerScalarWhereInput | TournamentPlayerScalarWhereInput[]
  }

  export type TournamentMatchUpdateManyWithoutPlayerANestedInput = {
    create?: XOR<TournamentMatchCreateWithoutPlayerAInput, TournamentMatchUncheckedCreateWithoutPlayerAInput> | TournamentMatchCreateWithoutPlayerAInput[] | TournamentMatchUncheckedCreateWithoutPlayerAInput[]
    connectOrCreate?: TournamentMatchCreateOrConnectWithoutPlayerAInput | TournamentMatchCreateOrConnectWithoutPlayerAInput[]
    upsert?: TournamentMatchUpsertWithWhereUniqueWithoutPlayerAInput | TournamentMatchUpsertWithWhereUniqueWithoutPlayerAInput[]
    createMany?: TournamentMatchCreateManyPlayerAInputEnvelope
    set?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    disconnect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    delete?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    connect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    update?: TournamentMatchUpdateWithWhereUniqueWithoutPlayerAInput | TournamentMatchUpdateWithWhereUniqueWithoutPlayerAInput[]
    updateMany?: TournamentMatchUpdateManyWithWhereWithoutPlayerAInput | TournamentMatchUpdateManyWithWhereWithoutPlayerAInput[]
    deleteMany?: TournamentMatchScalarWhereInput | TournamentMatchScalarWhereInput[]
  }

  export type TournamentMatchUpdateManyWithoutPlayerBNestedInput = {
    create?: XOR<TournamentMatchCreateWithoutPlayerBInput, TournamentMatchUncheckedCreateWithoutPlayerBInput> | TournamentMatchCreateWithoutPlayerBInput[] | TournamentMatchUncheckedCreateWithoutPlayerBInput[]
    connectOrCreate?: TournamentMatchCreateOrConnectWithoutPlayerBInput | TournamentMatchCreateOrConnectWithoutPlayerBInput[]
    upsert?: TournamentMatchUpsertWithWhereUniqueWithoutPlayerBInput | TournamentMatchUpsertWithWhereUniqueWithoutPlayerBInput[]
    createMany?: TournamentMatchCreateManyPlayerBInputEnvelope
    set?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    disconnect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    delete?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    connect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    update?: TournamentMatchUpdateWithWhereUniqueWithoutPlayerBInput | TournamentMatchUpdateWithWhereUniqueWithoutPlayerBInput[]
    updateMany?: TournamentMatchUpdateManyWithWhereWithoutPlayerBInput | TournamentMatchUpdateManyWithWhereWithoutPlayerBInput[]
    deleteMany?: TournamentMatchScalarWhereInput | TournamentMatchScalarWhereInput[]
  }

  export type TournamentMatchUpdateManyWithoutWinnerNestedInput = {
    create?: XOR<TournamentMatchCreateWithoutWinnerInput, TournamentMatchUncheckedCreateWithoutWinnerInput> | TournamentMatchCreateWithoutWinnerInput[] | TournamentMatchUncheckedCreateWithoutWinnerInput[]
    connectOrCreate?: TournamentMatchCreateOrConnectWithoutWinnerInput | TournamentMatchCreateOrConnectWithoutWinnerInput[]
    upsert?: TournamentMatchUpsertWithWhereUniqueWithoutWinnerInput | TournamentMatchUpsertWithWhereUniqueWithoutWinnerInput[]
    createMany?: TournamentMatchCreateManyWinnerInputEnvelope
    set?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    disconnect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    delete?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    connect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    update?: TournamentMatchUpdateWithWhereUniqueWithoutWinnerInput | TournamentMatchUpdateWithWhereUniqueWithoutWinnerInput[]
    updateMany?: TournamentMatchUpdateManyWithWhereWithoutWinnerInput | TournamentMatchUpdateManyWithWhereWithoutWinnerInput[]
    deleteMany?: TournamentMatchScalarWhereInput | TournamentMatchScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type GameHistoryUncheckedUpdateManyWithoutWinnerNestedInput = {
    create?: XOR<GameHistoryCreateWithoutWinnerInput, GameHistoryUncheckedCreateWithoutWinnerInput> | GameHistoryCreateWithoutWinnerInput[] | GameHistoryUncheckedCreateWithoutWinnerInput[]
    connectOrCreate?: GameHistoryCreateOrConnectWithoutWinnerInput | GameHistoryCreateOrConnectWithoutWinnerInput[]
    upsert?: GameHistoryUpsertWithWhereUniqueWithoutWinnerInput | GameHistoryUpsertWithWhereUniqueWithoutWinnerInput[]
    createMany?: GameHistoryCreateManyWinnerInputEnvelope
    set?: GameHistoryWhereUniqueInput | GameHistoryWhereUniqueInput[]
    disconnect?: GameHistoryWhereUniqueInput | GameHistoryWhereUniqueInput[]
    delete?: GameHistoryWhereUniqueInput | GameHistoryWhereUniqueInput[]
    connect?: GameHistoryWhereUniqueInput | GameHistoryWhereUniqueInput[]
    update?: GameHistoryUpdateWithWhereUniqueWithoutWinnerInput | GameHistoryUpdateWithWhereUniqueWithoutWinnerInput[]
    updateMany?: GameHistoryUpdateManyWithWhereWithoutWinnerInput | GameHistoryUpdateManyWithWhereWithoutWinnerInput[]
    deleteMany?: GameHistoryScalarWhereInput | GameHistoryScalarWhereInput[]
  }

  export type TournamentUncheckedUpdateManyWithoutWinnerNestedInput = {
    create?: XOR<TournamentCreateWithoutWinnerInput, TournamentUncheckedCreateWithoutWinnerInput> | TournamentCreateWithoutWinnerInput[] | TournamentUncheckedCreateWithoutWinnerInput[]
    connectOrCreate?: TournamentCreateOrConnectWithoutWinnerInput | TournamentCreateOrConnectWithoutWinnerInput[]
    upsert?: TournamentUpsertWithWhereUniqueWithoutWinnerInput | TournamentUpsertWithWhereUniqueWithoutWinnerInput[]
    createMany?: TournamentCreateManyWinnerInputEnvelope
    set?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    disconnect?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    delete?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    connect?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    update?: TournamentUpdateWithWhereUniqueWithoutWinnerInput | TournamentUpdateWithWhereUniqueWithoutWinnerInput[]
    updateMany?: TournamentUpdateManyWithWhereWithoutWinnerInput | TournamentUpdateManyWithWhereWithoutWinnerInput[]
    deleteMany?: TournamentScalarWhereInput | TournamentScalarWhereInput[]
  }

  export type TournamentPlayerUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TournamentPlayerCreateWithoutUserInput, TournamentPlayerUncheckedCreateWithoutUserInput> | TournamentPlayerCreateWithoutUserInput[] | TournamentPlayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TournamentPlayerCreateOrConnectWithoutUserInput | TournamentPlayerCreateOrConnectWithoutUserInput[]
    upsert?: TournamentPlayerUpsertWithWhereUniqueWithoutUserInput | TournamentPlayerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TournamentPlayerCreateManyUserInputEnvelope
    set?: TournamentPlayerWhereUniqueInput | TournamentPlayerWhereUniqueInput[]
    disconnect?: TournamentPlayerWhereUniqueInput | TournamentPlayerWhereUniqueInput[]
    delete?: TournamentPlayerWhereUniqueInput | TournamentPlayerWhereUniqueInput[]
    connect?: TournamentPlayerWhereUniqueInput | TournamentPlayerWhereUniqueInput[]
    update?: TournamentPlayerUpdateWithWhereUniqueWithoutUserInput | TournamentPlayerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TournamentPlayerUpdateManyWithWhereWithoutUserInput | TournamentPlayerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TournamentPlayerScalarWhereInput | TournamentPlayerScalarWhereInput[]
  }

  export type TournamentMatchUncheckedUpdateManyWithoutPlayerANestedInput = {
    create?: XOR<TournamentMatchCreateWithoutPlayerAInput, TournamentMatchUncheckedCreateWithoutPlayerAInput> | TournamentMatchCreateWithoutPlayerAInput[] | TournamentMatchUncheckedCreateWithoutPlayerAInput[]
    connectOrCreate?: TournamentMatchCreateOrConnectWithoutPlayerAInput | TournamentMatchCreateOrConnectWithoutPlayerAInput[]
    upsert?: TournamentMatchUpsertWithWhereUniqueWithoutPlayerAInput | TournamentMatchUpsertWithWhereUniqueWithoutPlayerAInput[]
    createMany?: TournamentMatchCreateManyPlayerAInputEnvelope
    set?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    disconnect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    delete?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    connect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    update?: TournamentMatchUpdateWithWhereUniqueWithoutPlayerAInput | TournamentMatchUpdateWithWhereUniqueWithoutPlayerAInput[]
    updateMany?: TournamentMatchUpdateManyWithWhereWithoutPlayerAInput | TournamentMatchUpdateManyWithWhereWithoutPlayerAInput[]
    deleteMany?: TournamentMatchScalarWhereInput | TournamentMatchScalarWhereInput[]
  }

  export type TournamentMatchUncheckedUpdateManyWithoutPlayerBNestedInput = {
    create?: XOR<TournamentMatchCreateWithoutPlayerBInput, TournamentMatchUncheckedCreateWithoutPlayerBInput> | TournamentMatchCreateWithoutPlayerBInput[] | TournamentMatchUncheckedCreateWithoutPlayerBInput[]
    connectOrCreate?: TournamentMatchCreateOrConnectWithoutPlayerBInput | TournamentMatchCreateOrConnectWithoutPlayerBInput[]
    upsert?: TournamentMatchUpsertWithWhereUniqueWithoutPlayerBInput | TournamentMatchUpsertWithWhereUniqueWithoutPlayerBInput[]
    createMany?: TournamentMatchCreateManyPlayerBInputEnvelope
    set?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    disconnect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    delete?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    connect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    update?: TournamentMatchUpdateWithWhereUniqueWithoutPlayerBInput | TournamentMatchUpdateWithWhereUniqueWithoutPlayerBInput[]
    updateMany?: TournamentMatchUpdateManyWithWhereWithoutPlayerBInput | TournamentMatchUpdateManyWithWhereWithoutPlayerBInput[]
    deleteMany?: TournamentMatchScalarWhereInput | TournamentMatchScalarWhereInput[]
  }

  export type TournamentMatchUncheckedUpdateManyWithoutWinnerNestedInput = {
    create?: XOR<TournamentMatchCreateWithoutWinnerInput, TournamentMatchUncheckedCreateWithoutWinnerInput> | TournamentMatchCreateWithoutWinnerInput[] | TournamentMatchUncheckedCreateWithoutWinnerInput[]
    connectOrCreate?: TournamentMatchCreateOrConnectWithoutWinnerInput | TournamentMatchCreateOrConnectWithoutWinnerInput[]
    upsert?: TournamentMatchUpsertWithWhereUniqueWithoutWinnerInput | TournamentMatchUpsertWithWhereUniqueWithoutWinnerInput[]
    createMany?: TournamentMatchCreateManyWinnerInputEnvelope
    set?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    disconnect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    delete?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    connect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    update?: TournamentMatchUpdateWithWhereUniqueWithoutWinnerInput | TournamentMatchUpdateWithWhereUniqueWithoutWinnerInput[]
    updateMany?: TournamentMatchUpdateManyWithWhereWithoutWinnerInput | TournamentMatchUpdateManyWithWhereWithoutWinnerInput[]
    deleteMany?: TournamentMatchScalarWhereInput | TournamentMatchScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type GameHistoryCreateNestedManyWithoutRoomInput = {
    create?: XOR<GameHistoryCreateWithoutRoomInput, GameHistoryUncheckedCreateWithoutRoomInput> | GameHistoryCreateWithoutRoomInput[] | GameHistoryUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: GameHistoryCreateOrConnectWithoutRoomInput | GameHistoryCreateOrConnectWithoutRoomInput[]
    createMany?: GameHistoryCreateManyRoomInputEnvelope
    connect?: GameHistoryWhereUniqueInput | GameHistoryWhereUniqueInput[]
  }

  export type GameHistoryUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<GameHistoryCreateWithoutRoomInput, GameHistoryUncheckedCreateWithoutRoomInput> | GameHistoryCreateWithoutRoomInput[] | GameHistoryUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: GameHistoryCreateOrConnectWithoutRoomInput | GameHistoryCreateOrConnectWithoutRoomInput[]
    createMany?: GameHistoryCreateManyRoomInputEnvelope
    connect?: GameHistoryWhereUniqueInput | GameHistoryWhereUniqueInput[]
  }

  export type GameHistoryUpdateManyWithoutRoomNestedInput = {
    create?: XOR<GameHistoryCreateWithoutRoomInput, GameHistoryUncheckedCreateWithoutRoomInput> | GameHistoryCreateWithoutRoomInput[] | GameHistoryUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: GameHistoryCreateOrConnectWithoutRoomInput | GameHistoryCreateOrConnectWithoutRoomInput[]
    upsert?: GameHistoryUpsertWithWhereUniqueWithoutRoomInput | GameHistoryUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: GameHistoryCreateManyRoomInputEnvelope
    set?: GameHistoryWhereUniqueInput | GameHistoryWhereUniqueInput[]
    disconnect?: GameHistoryWhereUniqueInput | GameHistoryWhereUniqueInput[]
    delete?: GameHistoryWhereUniqueInput | GameHistoryWhereUniqueInput[]
    connect?: GameHistoryWhereUniqueInput | GameHistoryWhereUniqueInput[]
    update?: GameHistoryUpdateWithWhereUniqueWithoutRoomInput | GameHistoryUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: GameHistoryUpdateManyWithWhereWithoutRoomInput | GameHistoryUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: GameHistoryScalarWhereInput | GameHistoryScalarWhereInput[]
  }

  export type GameHistoryUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<GameHistoryCreateWithoutRoomInput, GameHistoryUncheckedCreateWithoutRoomInput> | GameHistoryCreateWithoutRoomInput[] | GameHistoryUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: GameHistoryCreateOrConnectWithoutRoomInput | GameHistoryCreateOrConnectWithoutRoomInput[]
    upsert?: GameHistoryUpsertWithWhereUniqueWithoutRoomInput | GameHistoryUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: GameHistoryCreateManyRoomInputEnvelope
    set?: GameHistoryWhereUniqueInput | GameHistoryWhereUniqueInput[]
    disconnect?: GameHistoryWhereUniqueInput | GameHistoryWhereUniqueInput[]
    delete?: GameHistoryWhereUniqueInput | GameHistoryWhereUniqueInput[]
    connect?: GameHistoryWhereUniqueInput | GameHistoryWhereUniqueInput[]
    update?: GameHistoryUpdateWithWhereUniqueWithoutRoomInput | GameHistoryUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: GameHistoryUpdateManyWithWhereWithoutRoomInput | GameHistoryUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: GameHistoryScalarWhereInput | GameHistoryScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutGameHistoryWinsInput = {
    create?: XOR<UserCreateWithoutGameHistoryWinsInput, UserUncheckedCreateWithoutGameHistoryWinsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGameHistoryWinsInput
    connect?: UserWhereUniqueInput
  }

  export type RoomCreateNestedOneWithoutGamesInput = {
    create?: XOR<RoomCreateWithoutGamesInput, RoomUncheckedCreateWithoutGamesInput>
    connectOrCreate?: RoomCreateOrConnectWithoutGamesInput
    connect?: RoomWhereUniqueInput
  }

  export type UserUpdateOneWithoutGameHistoryWinsNestedInput = {
    create?: XOR<UserCreateWithoutGameHistoryWinsInput, UserUncheckedCreateWithoutGameHistoryWinsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGameHistoryWinsInput
    upsert?: UserUpsertWithoutGameHistoryWinsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGameHistoryWinsInput, UserUpdateWithoutGameHistoryWinsInput>, UserUncheckedUpdateWithoutGameHistoryWinsInput>
  }

  export type RoomUpdateOneRequiredWithoutGamesNestedInput = {
    create?: XOR<RoomCreateWithoutGamesInput, RoomUncheckedCreateWithoutGamesInput>
    connectOrCreate?: RoomCreateOrConnectWithoutGamesInput
    upsert?: RoomUpsertWithoutGamesInput
    connect?: RoomWhereUniqueInput
    update?: XOR<XOR<RoomUpdateToOneWithWhereWithoutGamesInput, RoomUpdateWithoutGamesInput>, RoomUncheckedUpdateWithoutGamesInput>
  }

  export type UserCreateNestedOneWithoutTournamentsWonInput = {
    create?: XOR<UserCreateWithoutTournamentsWonInput, UserUncheckedCreateWithoutTournamentsWonInput>
    connectOrCreate?: UserCreateOrConnectWithoutTournamentsWonInput
    connect?: UserWhereUniqueInput
  }

  export type TournamentPlayerCreateNestedManyWithoutTournamentInput = {
    create?: XOR<TournamentPlayerCreateWithoutTournamentInput, TournamentPlayerUncheckedCreateWithoutTournamentInput> | TournamentPlayerCreateWithoutTournamentInput[] | TournamentPlayerUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TournamentPlayerCreateOrConnectWithoutTournamentInput | TournamentPlayerCreateOrConnectWithoutTournamentInput[]
    createMany?: TournamentPlayerCreateManyTournamentInputEnvelope
    connect?: TournamentPlayerWhereUniqueInput | TournamentPlayerWhereUniqueInput[]
  }

  export type TournamentMatchCreateNestedManyWithoutTournamentInput = {
    create?: XOR<TournamentMatchCreateWithoutTournamentInput, TournamentMatchUncheckedCreateWithoutTournamentInput> | TournamentMatchCreateWithoutTournamentInput[] | TournamentMatchUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TournamentMatchCreateOrConnectWithoutTournamentInput | TournamentMatchCreateOrConnectWithoutTournamentInput[]
    createMany?: TournamentMatchCreateManyTournamentInputEnvelope
    connect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
  }

  export type TournamentPlayerUncheckedCreateNestedManyWithoutTournamentInput = {
    create?: XOR<TournamentPlayerCreateWithoutTournamentInput, TournamentPlayerUncheckedCreateWithoutTournamentInput> | TournamentPlayerCreateWithoutTournamentInput[] | TournamentPlayerUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TournamentPlayerCreateOrConnectWithoutTournamentInput | TournamentPlayerCreateOrConnectWithoutTournamentInput[]
    createMany?: TournamentPlayerCreateManyTournamentInputEnvelope
    connect?: TournamentPlayerWhereUniqueInput | TournamentPlayerWhereUniqueInput[]
  }

  export type TournamentMatchUncheckedCreateNestedManyWithoutTournamentInput = {
    create?: XOR<TournamentMatchCreateWithoutTournamentInput, TournamentMatchUncheckedCreateWithoutTournamentInput> | TournamentMatchCreateWithoutTournamentInput[] | TournamentMatchUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TournamentMatchCreateOrConnectWithoutTournamentInput | TournamentMatchCreateOrConnectWithoutTournamentInput[]
    createMany?: TournamentMatchCreateManyTournamentInputEnvelope
    connect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
  }

  export type UserUpdateOneWithoutTournamentsWonNestedInput = {
    create?: XOR<UserCreateWithoutTournamentsWonInput, UserUncheckedCreateWithoutTournamentsWonInput>
    connectOrCreate?: UserCreateOrConnectWithoutTournamentsWonInput
    upsert?: UserUpsertWithoutTournamentsWonInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTournamentsWonInput, UserUpdateWithoutTournamentsWonInput>, UserUncheckedUpdateWithoutTournamentsWonInput>
  }

  export type TournamentPlayerUpdateManyWithoutTournamentNestedInput = {
    create?: XOR<TournamentPlayerCreateWithoutTournamentInput, TournamentPlayerUncheckedCreateWithoutTournamentInput> | TournamentPlayerCreateWithoutTournamentInput[] | TournamentPlayerUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TournamentPlayerCreateOrConnectWithoutTournamentInput | TournamentPlayerCreateOrConnectWithoutTournamentInput[]
    upsert?: TournamentPlayerUpsertWithWhereUniqueWithoutTournamentInput | TournamentPlayerUpsertWithWhereUniqueWithoutTournamentInput[]
    createMany?: TournamentPlayerCreateManyTournamentInputEnvelope
    set?: TournamentPlayerWhereUniqueInput | TournamentPlayerWhereUniqueInput[]
    disconnect?: TournamentPlayerWhereUniqueInput | TournamentPlayerWhereUniqueInput[]
    delete?: TournamentPlayerWhereUniqueInput | TournamentPlayerWhereUniqueInput[]
    connect?: TournamentPlayerWhereUniqueInput | TournamentPlayerWhereUniqueInput[]
    update?: TournamentPlayerUpdateWithWhereUniqueWithoutTournamentInput | TournamentPlayerUpdateWithWhereUniqueWithoutTournamentInput[]
    updateMany?: TournamentPlayerUpdateManyWithWhereWithoutTournamentInput | TournamentPlayerUpdateManyWithWhereWithoutTournamentInput[]
    deleteMany?: TournamentPlayerScalarWhereInput | TournamentPlayerScalarWhereInput[]
  }

  export type TournamentMatchUpdateManyWithoutTournamentNestedInput = {
    create?: XOR<TournamentMatchCreateWithoutTournamentInput, TournamentMatchUncheckedCreateWithoutTournamentInput> | TournamentMatchCreateWithoutTournamentInput[] | TournamentMatchUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TournamentMatchCreateOrConnectWithoutTournamentInput | TournamentMatchCreateOrConnectWithoutTournamentInput[]
    upsert?: TournamentMatchUpsertWithWhereUniqueWithoutTournamentInput | TournamentMatchUpsertWithWhereUniqueWithoutTournamentInput[]
    createMany?: TournamentMatchCreateManyTournamentInputEnvelope
    set?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    disconnect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    delete?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    connect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    update?: TournamentMatchUpdateWithWhereUniqueWithoutTournamentInput | TournamentMatchUpdateWithWhereUniqueWithoutTournamentInput[]
    updateMany?: TournamentMatchUpdateManyWithWhereWithoutTournamentInput | TournamentMatchUpdateManyWithWhereWithoutTournamentInput[]
    deleteMany?: TournamentMatchScalarWhereInput | TournamentMatchScalarWhereInput[]
  }

  export type TournamentPlayerUncheckedUpdateManyWithoutTournamentNestedInput = {
    create?: XOR<TournamentPlayerCreateWithoutTournamentInput, TournamentPlayerUncheckedCreateWithoutTournamentInput> | TournamentPlayerCreateWithoutTournamentInput[] | TournamentPlayerUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TournamentPlayerCreateOrConnectWithoutTournamentInput | TournamentPlayerCreateOrConnectWithoutTournamentInput[]
    upsert?: TournamentPlayerUpsertWithWhereUniqueWithoutTournamentInput | TournamentPlayerUpsertWithWhereUniqueWithoutTournamentInput[]
    createMany?: TournamentPlayerCreateManyTournamentInputEnvelope
    set?: TournamentPlayerWhereUniqueInput | TournamentPlayerWhereUniqueInput[]
    disconnect?: TournamentPlayerWhereUniqueInput | TournamentPlayerWhereUniqueInput[]
    delete?: TournamentPlayerWhereUniqueInput | TournamentPlayerWhereUniqueInput[]
    connect?: TournamentPlayerWhereUniqueInput | TournamentPlayerWhereUniqueInput[]
    update?: TournamentPlayerUpdateWithWhereUniqueWithoutTournamentInput | TournamentPlayerUpdateWithWhereUniqueWithoutTournamentInput[]
    updateMany?: TournamentPlayerUpdateManyWithWhereWithoutTournamentInput | TournamentPlayerUpdateManyWithWhereWithoutTournamentInput[]
    deleteMany?: TournamentPlayerScalarWhereInput | TournamentPlayerScalarWhereInput[]
  }

  export type TournamentMatchUncheckedUpdateManyWithoutTournamentNestedInput = {
    create?: XOR<TournamentMatchCreateWithoutTournamentInput, TournamentMatchUncheckedCreateWithoutTournamentInput> | TournamentMatchCreateWithoutTournamentInput[] | TournamentMatchUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TournamentMatchCreateOrConnectWithoutTournamentInput | TournamentMatchCreateOrConnectWithoutTournamentInput[]
    upsert?: TournamentMatchUpsertWithWhereUniqueWithoutTournamentInput | TournamentMatchUpsertWithWhereUniqueWithoutTournamentInput[]
    createMany?: TournamentMatchCreateManyTournamentInputEnvelope
    set?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    disconnect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    delete?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    connect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    update?: TournamentMatchUpdateWithWhereUniqueWithoutTournamentInput | TournamentMatchUpdateWithWhereUniqueWithoutTournamentInput[]
    updateMany?: TournamentMatchUpdateManyWithWhereWithoutTournamentInput | TournamentMatchUpdateManyWithWhereWithoutTournamentInput[]
    deleteMany?: TournamentMatchScalarWhereInput | TournamentMatchScalarWhereInput[]
  }

  export type TournamentCreateNestedOneWithoutPlayersInput = {
    create?: XOR<TournamentCreateWithoutPlayersInput, TournamentUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: TournamentCreateOrConnectWithoutPlayersInput
    connect?: TournamentWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTournamentSlotsInput = {
    create?: XOR<UserCreateWithoutTournamentSlotsInput, UserUncheckedCreateWithoutTournamentSlotsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTournamentSlotsInput
    connect?: UserWhereUniqueInput
  }

  export type TournamentUpdateOneRequiredWithoutPlayersNestedInput = {
    create?: XOR<TournamentCreateWithoutPlayersInput, TournamentUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: TournamentCreateOrConnectWithoutPlayersInput
    upsert?: TournamentUpsertWithoutPlayersInput
    connect?: TournamentWhereUniqueInput
    update?: XOR<XOR<TournamentUpdateToOneWithWhereWithoutPlayersInput, TournamentUpdateWithoutPlayersInput>, TournamentUncheckedUpdateWithoutPlayersInput>
  }

  export type UserUpdateOneRequiredWithoutTournamentSlotsNestedInput = {
    create?: XOR<UserCreateWithoutTournamentSlotsInput, UserUncheckedCreateWithoutTournamentSlotsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTournamentSlotsInput
    upsert?: UserUpsertWithoutTournamentSlotsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTournamentSlotsInput, UserUpdateWithoutTournamentSlotsInput>, UserUncheckedUpdateWithoutTournamentSlotsInput>
  }

  export type TournamentCreateNestedOneWithoutMatchesInput = {
    create?: XOR<TournamentCreateWithoutMatchesInput, TournamentUncheckedCreateWithoutMatchesInput>
    connectOrCreate?: TournamentCreateOrConnectWithoutMatchesInput
    connect?: TournamentWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMatchAsPlayerAInput = {
    create?: XOR<UserCreateWithoutMatchAsPlayerAInput, UserUncheckedCreateWithoutMatchAsPlayerAInput>
    connectOrCreate?: UserCreateOrConnectWithoutMatchAsPlayerAInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMatchAsPlayerBInput = {
    create?: XOR<UserCreateWithoutMatchAsPlayerBInput, UserUncheckedCreateWithoutMatchAsPlayerBInput>
    connectOrCreate?: UserCreateOrConnectWithoutMatchAsPlayerBInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMatchWinsInput = {
    create?: XOR<UserCreateWithoutMatchWinsInput, UserUncheckedCreateWithoutMatchWinsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMatchWinsInput
    connect?: UserWhereUniqueInput
  }

  export type TournamentMatchCreateNestedOneWithoutPreviousMatchesInput = {
    create?: XOR<TournamentMatchCreateWithoutPreviousMatchesInput, TournamentMatchUncheckedCreateWithoutPreviousMatchesInput>
    connectOrCreate?: TournamentMatchCreateOrConnectWithoutPreviousMatchesInput
    connect?: TournamentMatchWhereUniqueInput
  }

  export type TournamentMatchCreateNestedManyWithoutNextMatchInput = {
    create?: XOR<TournamentMatchCreateWithoutNextMatchInput, TournamentMatchUncheckedCreateWithoutNextMatchInput> | TournamentMatchCreateWithoutNextMatchInput[] | TournamentMatchUncheckedCreateWithoutNextMatchInput[]
    connectOrCreate?: TournamentMatchCreateOrConnectWithoutNextMatchInput | TournamentMatchCreateOrConnectWithoutNextMatchInput[]
    createMany?: TournamentMatchCreateManyNextMatchInputEnvelope
    connect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
  }

  export type TournamentMatchUncheckedCreateNestedManyWithoutNextMatchInput = {
    create?: XOR<TournamentMatchCreateWithoutNextMatchInput, TournamentMatchUncheckedCreateWithoutNextMatchInput> | TournamentMatchCreateWithoutNextMatchInput[] | TournamentMatchUncheckedCreateWithoutNextMatchInput[]
    connectOrCreate?: TournamentMatchCreateOrConnectWithoutNextMatchInput | TournamentMatchCreateOrConnectWithoutNextMatchInput[]
    createMany?: TournamentMatchCreateManyNextMatchInputEnvelope
    connect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type TournamentUpdateOneRequiredWithoutMatchesNestedInput = {
    create?: XOR<TournamentCreateWithoutMatchesInput, TournamentUncheckedCreateWithoutMatchesInput>
    connectOrCreate?: TournamentCreateOrConnectWithoutMatchesInput
    upsert?: TournamentUpsertWithoutMatchesInput
    connect?: TournamentWhereUniqueInput
    update?: XOR<XOR<TournamentUpdateToOneWithWhereWithoutMatchesInput, TournamentUpdateWithoutMatchesInput>, TournamentUncheckedUpdateWithoutMatchesInput>
  }

  export type UserUpdateOneWithoutMatchAsPlayerANestedInput = {
    create?: XOR<UserCreateWithoutMatchAsPlayerAInput, UserUncheckedCreateWithoutMatchAsPlayerAInput>
    connectOrCreate?: UserCreateOrConnectWithoutMatchAsPlayerAInput
    upsert?: UserUpsertWithoutMatchAsPlayerAInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMatchAsPlayerAInput, UserUpdateWithoutMatchAsPlayerAInput>, UserUncheckedUpdateWithoutMatchAsPlayerAInput>
  }

  export type UserUpdateOneWithoutMatchAsPlayerBNestedInput = {
    create?: XOR<UserCreateWithoutMatchAsPlayerBInput, UserUncheckedCreateWithoutMatchAsPlayerBInput>
    connectOrCreate?: UserCreateOrConnectWithoutMatchAsPlayerBInput
    upsert?: UserUpsertWithoutMatchAsPlayerBInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMatchAsPlayerBInput, UserUpdateWithoutMatchAsPlayerBInput>, UserUncheckedUpdateWithoutMatchAsPlayerBInput>
  }

  export type UserUpdateOneWithoutMatchWinsNestedInput = {
    create?: XOR<UserCreateWithoutMatchWinsInput, UserUncheckedCreateWithoutMatchWinsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMatchWinsInput
    upsert?: UserUpsertWithoutMatchWinsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMatchWinsInput, UserUpdateWithoutMatchWinsInput>, UserUncheckedUpdateWithoutMatchWinsInput>
  }

  export type TournamentMatchUpdateOneWithoutPreviousMatchesNestedInput = {
    create?: XOR<TournamentMatchCreateWithoutPreviousMatchesInput, TournamentMatchUncheckedCreateWithoutPreviousMatchesInput>
    connectOrCreate?: TournamentMatchCreateOrConnectWithoutPreviousMatchesInput
    upsert?: TournamentMatchUpsertWithoutPreviousMatchesInput
    disconnect?: TournamentMatchWhereInput | boolean
    delete?: TournamentMatchWhereInput | boolean
    connect?: TournamentMatchWhereUniqueInput
    update?: XOR<XOR<TournamentMatchUpdateToOneWithWhereWithoutPreviousMatchesInput, TournamentMatchUpdateWithoutPreviousMatchesInput>, TournamentMatchUncheckedUpdateWithoutPreviousMatchesInput>
  }

  export type TournamentMatchUpdateManyWithoutNextMatchNestedInput = {
    create?: XOR<TournamentMatchCreateWithoutNextMatchInput, TournamentMatchUncheckedCreateWithoutNextMatchInput> | TournamentMatchCreateWithoutNextMatchInput[] | TournamentMatchUncheckedCreateWithoutNextMatchInput[]
    connectOrCreate?: TournamentMatchCreateOrConnectWithoutNextMatchInput | TournamentMatchCreateOrConnectWithoutNextMatchInput[]
    upsert?: TournamentMatchUpsertWithWhereUniqueWithoutNextMatchInput | TournamentMatchUpsertWithWhereUniqueWithoutNextMatchInput[]
    createMany?: TournamentMatchCreateManyNextMatchInputEnvelope
    set?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    disconnect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    delete?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    connect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    update?: TournamentMatchUpdateWithWhereUniqueWithoutNextMatchInput | TournamentMatchUpdateWithWhereUniqueWithoutNextMatchInput[]
    updateMany?: TournamentMatchUpdateManyWithWhereWithoutNextMatchInput | TournamentMatchUpdateManyWithWhereWithoutNextMatchInput[]
    deleteMany?: TournamentMatchScalarWhereInput | TournamentMatchScalarWhereInput[]
  }

  export type TournamentMatchUncheckedUpdateManyWithoutNextMatchNestedInput = {
    create?: XOR<TournamentMatchCreateWithoutNextMatchInput, TournamentMatchUncheckedCreateWithoutNextMatchInput> | TournamentMatchCreateWithoutNextMatchInput[] | TournamentMatchUncheckedCreateWithoutNextMatchInput[]
    connectOrCreate?: TournamentMatchCreateOrConnectWithoutNextMatchInput | TournamentMatchCreateOrConnectWithoutNextMatchInput[]
    upsert?: TournamentMatchUpsertWithWhereUniqueWithoutNextMatchInput | TournamentMatchUpsertWithWhereUniqueWithoutNextMatchInput[]
    createMany?: TournamentMatchCreateManyNextMatchInputEnvelope
    set?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    disconnect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    delete?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    connect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    update?: TournamentMatchUpdateWithWhereUniqueWithoutNextMatchInput | TournamentMatchUpdateWithWhereUniqueWithoutNextMatchInput[]
    updateMany?: TournamentMatchUpdateManyWithWhereWithoutNextMatchInput | TournamentMatchUpdateManyWithWhereWithoutNextMatchInput[]
    deleteMany?: TournamentMatchScalarWhereInput | TournamentMatchScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
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

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
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
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type GameHistoryCreateWithoutWinnerInput = {
    id?: string
    gameName?: string
    players?: string
    data?: string
    createdAt?: Date | string
    room: RoomCreateNestedOneWithoutGamesInput
  }

  export type GameHistoryUncheckedCreateWithoutWinnerInput = {
    id?: string
    roomId: string
    gameName?: string
    players?: string
    data?: string
    createdAt?: Date | string
  }

  export type GameHistoryCreateOrConnectWithoutWinnerInput = {
    where: GameHistoryWhereUniqueInput
    create: XOR<GameHistoryCreateWithoutWinnerInput, GameHistoryUncheckedCreateWithoutWinnerInput>
  }

  export type GameHistoryCreateManyWinnerInputEnvelope = {
    data: GameHistoryCreateManyWinnerInput | GameHistoryCreateManyWinnerInput[]
    skipDuplicates?: boolean
  }

  export type TournamentCreateWithoutWinnerInput = {
    id?: string
    name: string
    gameType?: string
    status?: string
    maxPlayers?: number
    bracket?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    players?: TournamentPlayerCreateNestedManyWithoutTournamentInput
    matches?: TournamentMatchCreateNestedManyWithoutTournamentInput
  }

  export type TournamentUncheckedCreateWithoutWinnerInput = {
    id?: string
    name: string
    gameType?: string
    status?: string
    maxPlayers?: number
    bracket?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    players?: TournamentPlayerUncheckedCreateNestedManyWithoutTournamentInput
    matches?: TournamentMatchUncheckedCreateNestedManyWithoutTournamentInput
  }

  export type TournamentCreateOrConnectWithoutWinnerInput = {
    where: TournamentWhereUniqueInput
    create: XOR<TournamentCreateWithoutWinnerInput, TournamentUncheckedCreateWithoutWinnerInput>
  }

  export type TournamentCreateManyWinnerInputEnvelope = {
    data: TournamentCreateManyWinnerInput | TournamentCreateManyWinnerInput[]
    skipDuplicates?: boolean
  }

  export type TournamentPlayerCreateWithoutUserInput = {
    id?: string
    seed?: number
    joinedAt?: Date | string
    tournament: TournamentCreateNestedOneWithoutPlayersInput
  }

  export type TournamentPlayerUncheckedCreateWithoutUserInput = {
    id?: string
    tournamentId: string
    seed?: number
    joinedAt?: Date | string
  }

  export type TournamentPlayerCreateOrConnectWithoutUserInput = {
    where: TournamentPlayerWhereUniqueInput
    create: XOR<TournamentPlayerCreateWithoutUserInput, TournamentPlayerUncheckedCreateWithoutUserInput>
  }

  export type TournamentPlayerCreateManyUserInputEnvelope = {
    data: TournamentPlayerCreateManyUserInput | TournamentPlayerCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TournamentMatchCreateWithoutPlayerAInput = {
    id?: string
    round?: number
    bracketIndex?: number
    status?: string
    playedAt?: Date | string | null
    tournament: TournamentCreateNestedOneWithoutMatchesInput
    playerB?: UserCreateNestedOneWithoutMatchAsPlayerBInput
    winner?: UserCreateNestedOneWithoutMatchWinsInput
    nextMatch?: TournamentMatchCreateNestedOneWithoutPreviousMatchesInput
    previousMatches?: TournamentMatchCreateNestedManyWithoutNextMatchInput
  }

  export type TournamentMatchUncheckedCreateWithoutPlayerAInput = {
    id?: string
    tournamentId: string
    round?: number
    bracketIndex?: number
    playerBId?: string | null
    winnerId?: string | null
    nextMatchId?: string | null
    status?: string
    playedAt?: Date | string | null
    previousMatches?: TournamentMatchUncheckedCreateNestedManyWithoutNextMatchInput
  }

  export type TournamentMatchCreateOrConnectWithoutPlayerAInput = {
    where: TournamentMatchWhereUniqueInput
    create: XOR<TournamentMatchCreateWithoutPlayerAInput, TournamentMatchUncheckedCreateWithoutPlayerAInput>
  }

  export type TournamentMatchCreateManyPlayerAInputEnvelope = {
    data: TournamentMatchCreateManyPlayerAInput | TournamentMatchCreateManyPlayerAInput[]
    skipDuplicates?: boolean
  }

  export type TournamentMatchCreateWithoutPlayerBInput = {
    id?: string
    round?: number
    bracketIndex?: number
    status?: string
    playedAt?: Date | string | null
    tournament: TournamentCreateNestedOneWithoutMatchesInput
    playerA?: UserCreateNestedOneWithoutMatchAsPlayerAInput
    winner?: UserCreateNestedOneWithoutMatchWinsInput
    nextMatch?: TournamentMatchCreateNestedOneWithoutPreviousMatchesInput
    previousMatches?: TournamentMatchCreateNestedManyWithoutNextMatchInput
  }

  export type TournamentMatchUncheckedCreateWithoutPlayerBInput = {
    id?: string
    tournamentId: string
    round?: number
    bracketIndex?: number
    playerAId?: string | null
    winnerId?: string | null
    nextMatchId?: string | null
    status?: string
    playedAt?: Date | string | null
    previousMatches?: TournamentMatchUncheckedCreateNestedManyWithoutNextMatchInput
  }

  export type TournamentMatchCreateOrConnectWithoutPlayerBInput = {
    where: TournamentMatchWhereUniqueInput
    create: XOR<TournamentMatchCreateWithoutPlayerBInput, TournamentMatchUncheckedCreateWithoutPlayerBInput>
  }

  export type TournamentMatchCreateManyPlayerBInputEnvelope = {
    data: TournamentMatchCreateManyPlayerBInput | TournamentMatchCreateManyPlayerBInput[]
    skipDuplicates?: boolean
  }

  export type TournamentMatchCreateWithoutWinnerInput = {
    id?: string
    round?: number
    bracketIndex?: number
    status?: string
    playedAt?: Date | string | null
    tournament: TournamentCreateNestedOneWithoutMatchesInput
    playerA?: UserCreateNestedOneWithoutMatchAsPlayerAInput
    playerB?: UserCreateNestedOneWithoutMatchAsPlayerBInput
    nextMatch?: TournamentMatchCreateNestedOneWithoutPreviousMatchesInput
    previousMatches?: TournamentMatchCreateNestedManyWithoutNextMatchInput
  }

  export type TournamentMatchUncheckedCreateWithoutWinnerInput = {
    id?: string
    tournamentId: string
    round?: number
    bracketIndex?: number
    playerAId?: string | null
    playerBId?: string | null
    nextMatchId?: string | null
    status?: string
    playedAt?: Date | string | null
    previousMatches?: TournamentMatchUncheckedCreateNestedManyWithoutNextMatchInput
  }

  export type TournamentMatchCreateOrConnectWithoutWinnerInput = {
    where: TournamentMatchWhereUniqueInput
    create: XOR<TournamentMatchCreateWithoutWinnerInput, TournamentMatchUncheckedCreateWithoutWinnerInput>
  }

  export type TournamentMatchCreateManyWinnerInputEnvelope = {
    data: TournamentMatchCreateManyWinnerInput | TournamentMatchCreateManyWinnerInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutUserInput = {
    id?: string
    type?: string
    title: string
    body?: string | null
    read?: boolean
    createdAt?: Date | string
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: string
    type?: string
    title: string
    body?: string | null
    read?: boolean
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type GameHistoryUpsertWithWhereUniqueWithoutWinnerInput = {
    where: GameHistoryWhereUniqueInput
    update: XOR<GameHistoryUpdateWithoutWinnerInput, GameHistoryUncheckedUpdateWithoutWinnerInput>
    create: XOR<GameHistoryCreateWithoutWinnerInput, GameHistoryUncheckedCreateWithoutWinnerInput>
  }

  export type GameHistoryUpdateWithWhereUniqueWithoutWinnerInput = {
    where: GameHistoryWhereUniqueInput
    data: XOR<GameHistoryUpdateWithoutWinnerInput, GameHistoryUncheckedUpdateWithoutWinnerInput>
  }

  export type GameHistoryUpdateManyWithWhereWithoutWinnerInput = {
    where: GameHistoryScalarWhereInput
    data: XOR<GameHistoryUpdateManyMutationInput, GameHistoryUncheckedUpdateManyWithoutWinnerInput>
  }

  export type GameHistoryScalarWhereInput = {
    AND?: GameHistoryScalarWhereInput | GameHistoryScalarWhereInput[]
    OR?: GameHistoryScalarWhereInput[]
    NOT?: GameHistoryScalarWhereInput | GameHistoryScalarWhereInput[]
    id?: StringFilter<"GameHistory"> | string
    winnerId?: StringNullableFilter<"GameHistory"> | string | null
    roomId?: StringFilter<"GameHistory"> | string
    gameName?: StringFilter<"GameHistory"> | string
    players?: StringFilter<"GameHistory"> | string
    data?: StringFilter<"GameHistory"> | string
    createdAt?: DateTimeFilter<"GameHistory"> | Date | string
  }

  export type TournamentUpsertWithWhereUniqueWithoutWinnerInput = {
    where: TournamentWhereUniqueInput
    update: XOR<TournamentUpdateWithoutWinnerInput, TournamentUncheckedUpdateWithoutWinnerInput>
    create: XOR<TournamentCreateWithoutWinnerInput, TournamentUncheckedCreateWithoutWinnerInput>
  }

  export type TournamentUpdateWithWhereUniqueWithoutWinnerInput = {
    where: TournamentWhereUniqueInput
    data: XOR<TournamentUpdateWithoutWinnerInput, TournamentUncheckedUpdateWithoutWinnerInput>
  }

  export type TournamentUpdateManyWithWhereWithoutWinnerInput = {
    where: TournamentScalarWhereInput
    data: XOR<TournamentUpdateManyMutationInput, TournamentUncheckedUpdateManyWithoutWinnerInput>
  }

  export type TournamentScalarWhereInput = {
    AND?: TournamentScalarWhereInput | TournamentScalarWhereInput[]
    OR?: TournamentScalarWhereInput[]
    NOT?: TournamentScalarWhereInput | TournamentScalarWhereInput[]
    id?: StringFilter<"Tournament"> | string
    name?: StringFilter<"Tournament"> | string
    gameType?: StringFilter<"Tournament"> | string
    status?: StringFilter<"Tournament"> | string
    maxPlayers?: IntFilter<"Tournament"> | number
    bracket?: StringNullableFilter<"Tournament"> | string | null
    winnerId?: StringNullableFilter<"Tournament"> | string | null
    createdAt?: DateTimeFilter<"Tournament"> | Date | string
    updatedAt?: DateTimeFilter<"Tournament"> | Date | string
  }

  export type TournamentPlayerUpsertWithWhereUniqueWithoutUserInput = {
    where: TournamentPlayerWhereUniqueInput
    update: XOR<TournamentPlayerUpdateWithoutUserInput, TournamentPlayerUncheckedUpdateWithoutUserInput>
    create: XOR<TournamentPlayerCreateWithoutUserInput, TournamentPlayerUncheckedCreateWithoutUserInput>
  }

  export type TournamentPlayerUpdateWithWhereUniqueWithoutUserInput = {
    where: TournamentPlayerWhereUniqueInput
    data: XOR<TournamentPlayerUpdateWithoutUserInput, TournamentPlayerUncheckedUpdateWithoutUserInput>
  }

  export type TournamentPlayerUpdateManyWithWhereWithoutUserInput = {
    where: TournamentPlayerScalarWhereInput
    data: XOR<TournamentPlayerUpdateManyMutationInput, TournamentPlayerUncheckedUpdateManyWithoutUserInput>
  }

  export type TournamentPlayerScalarWhereInput = {
    AND?: TournamentPlayerScalarWhereInput | TournamentPlayerScalarWhereInput[]
    OR?: TournamentPlayerScalarWhereInput[]
    NOT?: TournamentPlayerScalarWhereInput | TournamentPlayerScalarWhereInput[]
    id?: StringFilter<"TournamentPlayer"> | string
    tournamentId?: StringFilter<"TournamentPlayer"> | string
    userId?: StringFilter<"TournamentPlayer"> | string
    seed?: IntFilter<"TournamentPlayer"> | number
    joinedAt?: DateTimeFilter<"TournamentPlayer"> | Date | string
  }

  export type TournamentMatchUpsertWithWhereUniqueWithoutPlayerAInput = {
    where: TournamentMatchWhereUniqueInput
    update: XOR<TournamentMatchUpdateWithoutPlayerAInput, TournamentMatchUncheckedUpdateWithoutPlayerAInput>
    create: XOR<TournamentMatchCreateWithoutPlayerAInput, TournamentMatchUncheckedCreateWithoutPlayerAInput>
  }

  export type TournamentMatchUpdateWithWhereUniqueWithoutPlayerAInput = {
    where: TournamentMatchWhereUniqueInput
    data: XOR<TournamentMatchUpdateWithoutPlayerAInput, TournamentMatchUncheckedUpdateWithoutPlayerAInput>
  }

  export type TournamentMatchUpdateManyWithWhereWithoutPlayerAInput = {
    where: TournamentMatchScalarWhereInput
    data: XOR<TournamentMatchUpdateManyMutationInput, TournamentMatchUncheckedUpdateManyWithoutPlayerAInput>
  }

  export type TournamentMatchScalarWhereInput = {
    AND?: TournamentMatchScalarWhereInput | TournamentMatchScalarWhereInput[]
    OR?: TournamentMatchScalarWhereInput[]
    NOT?: TournamentMatchScalarWhereInput | TournamentMatchScalarWhereInput[]
    id?: StringFilter<"TournamentMatch"> | string
    tournamentId?: StringFilter<"TournamentMatch"> | string
    round?: IntFilter<"TournamentMatch"> | number
    bracketIndex?: IntFilter<"TournamentMatch"> | number
    playerAId?: StringNullableFilter<"TournamentMatch"> | string | null
    playerBId?: StringNullableFilter<"TournamentMatch"> | string | null
    winnerId?: StringNullableFilter<"TournamentMatch"> | string | null
    nextMatchId?: StringNullableFilter<"TournamentMatch"> | string | null
    status?: StringFilter<"TournamentMatch"> | string
    playedAt?: DateTimeNullableFilter<"TournamentMatch"> | Date | string | null
  }

  export type TournamentMatchUpsertWithWhereUniqueWithoutPlayerBInput = {
    where: TournamentMatchWhereUniqueInput
    update: XOR<TournamentMatchUpdateWithoutPlayerBInput, TournamentMatchUncheckedUpdateWithoutPlayerBInput>
    create: XOR<TournamentMatchCreateWithoutPlayerBInput, TournamentMatchUncheckedCreateWithoutPlayerBInput>
  }

  export type TournamentMatchUpdateWithWhereUniqueWithoutPlayerBInput = {
    where: TournamentMatchWhereUniqueInput
    data: XOR<TournamentMatchUpdateWithoutPlayerBInput, TournamentMatchUncheckedUpdateWithoutPlayerBInput>
  }

  export type TournamentMatchUpdateManyWithWhereWithoutPlayerBInput = {
    where: TournamentMatchScalarWhereInput
    data: XOR<TournamentMatchUpdateManyMutationInput, TournamentMatchUncheckedUpdateManyWithoutPlayerBInput>
  }

  export type TournamentMatchUpsertWithWhereUniqueWithoutWinnerInput = {
    where: TournamentMatchWhereUniqueInput
    update: XOR<TournamentMatchUpdateWithoutWinnerInput, TournamentMatchUncheckedUpdateWithoutWinnerInput>
    create: XOR<TournamentMatchCreateWithoutWinnerInput, TournamentMatchUncheckedCreateWithoutWinnerInput>
  }

  export type TournamentMatchUpdateWithWhereUniqueWithoutWinnerInput = {
    where: TournamentMatchWhereUniqueInput
    data: XOR<TournamentMatchUpdateWithoutWinnerInput, TournamentMatchUncheckedUpdateWithoutWinnerInput>
  }

  export type TournamentMatchUpdateManyWithWhereWithoutWinnerInput = {
    where: TournamentMatchScalarWhereInput
    data: XOR<TournamentMatchUpdateManyMutationInput, TournamentMatchUncheckedUpdateManyWithoutWinnerInput>
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    body?: StringNullableFilter<"Notification"> | string | null
    read?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type UserCreateWithoutNotificationsInput = {
    id?: string
    email: string
    password: string
    username: string
    wins?: number
    losses?: number
    rating?: number
    createdAt?: Date | string
    gameHistoryWins?: GameHistoryCreateNestedManyWithoutWinnerInput
    tournamentsWon?: TournamentCreateNestedManyWithoutWinnerInput
    tournamentSlots?: TournamentPlayerCreateNestedManyWithoutUserInput
    matchAsPlayerA?: TournamentMatchCreateNestedManyWithoutPlayerAInput
    matchAsPlayerB?: TournamentMatchCreateNestedManyWithoutPlayerBInput
    matchWins?: TournamentMatchCreateNestedManyWithoutWinnerInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string
    email: string
    password: string
    username: string
    wins?: number
    losses?: number
    rating?: number
    createdAt?: Date | string
    gameHistoryWins?: GameHistoryUncheckedCreateNestedManyWithoutWinnerInput
    tournamentsWon?: TournamentUncheckedCreateNestedManyWithoutWinnerInput
    tournamentSlots?: TournamentPlayerUncheckedCreateNestedManyWithoutUserInput
    matchAsPlayerA?: TournamentMatchUncheckedCreateNestedManyWithoutPlayerAInput
    matchAsPlayerB?: TournamentMatchUncheckedCreateNestedManyWithoutPlayerBInput
    matchWins?: TournamentMatchUncheckedCreateNestedManyWithoutWinnerInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameHistoryWins?: GameHistoryUpdateManyWithoutWinnerNestedInput
    tournamentsWon?: TournamentUpdateManyWithoutWinnerNestedInput
    tournamentSlots?: TournamentPlayerUpdateManyWithoutUserNestedInput
    matchAsPlayerA?: TournamentMatchUpdateManyWithoutPlayerANestedInput
    matchAsPlayerB?: TournamentMatchUpdateManyWithoutPlayerBNestedInput
    matchWins?: TournamentMatchUpdateManyWithoutWinnerNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameHistoryWins?: GameHistoryUncheckedUpdateManyWithoutWinnerNestedInput
    tournamentsWon?: TournamentUncheckedUpdateManyWithoutWinnerNestedInput
    tournamentSlots?: TournamentPlayerUncheckedUpdateManyWithoutUserNestedInput
    matchAsPlayerA?: TournamentMatchUncheckedUpdateManyWithoutPlayerANestedInput
    matchAsPlayerB?: TournamentMatchUncheckedUpdateManyWithoutPlayerBNestedInput
    matchWins?: TournamentMatchUncheckedUpdateManyWithoutWinnerNestedInput
  }

  export type GameHistoryCreateWithoutRoomInput = {
    id?: string
    gameName?: string
    players?: string
    data?: string
    createdAt?: Date | string
    winner?: UserCreateNestedOneWithoutGameHistoryWinsInput
  }

  export type GameHistoryUncheckedCreateWithoutRoomInput = {
    id?: string
    winnerId?: string | null
    gameName?: string
    players?: string
    data?: string
    createdAt?: Date | string
  }

  export type GameHistoryCreateOrConnectWithoutRoomInput = {
    where: GameHistoryWhereUniqueInput
    create: XOR<GameHistoryCreateWithoutRoomInput, GameHistoryUncheckedCreateWithoutRoomInput>
  }

  export type GameHistoryCreateManyRoomInputEnvelope = {
    data: GameHistoryCreateManyRoomInput | GameHistoryCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type GameHistoryUpsertWithWhereUniqueWithoutRoomInput = {
    where: GameHistoryWhereUniqueInput
    update: XOR<GameHistoryUpdateWithoutRoomInput, GameHistoryUncheckedUpdateWithoutRoomInput>
    create: XOR<GameHistoryCreateWithoutRoomInput, GameHistoryUncheckedCreateWithoutRoomInput>
  }

  export type GameHistoryUpdateWithWhereUniqueWithoutRoomInput = {
    where: GameHistoryWhereUniqueInput
    data: XOR<GameHistoryUpdateWithoutRoomInput, GameHistoryUncheckedUpdateWithoutRoomInput>
  }

  export type GameHistoryUpdateManyWithWhereWithoutRoomInput = {
    where: GameHistoryScalarWhereInput
    data: XOR<GameHistoryUpdateManyMutationInput, GameHistoryUncheckedUpdateManyWithoutRoomInput>
  }

  export type UserCreateWithoutGameHistoryWinsInput = {
    id?: string
    email: string
    password: string
    username: string
    wins?: number
    losses?: number
    rating?: number
    createdAt?: Date | string
    tournamentsWon?: TournamentCreateNestedManyWithoutWinnerInput
    tournamentSlots?: TournamentPlayerCreateNestedManyWithoutUserInput
    matchAsPlayerA?: TournamentMatchCreateNestedManyWithoutPlayerAInput
    matchAsPlayerB?: TournamentMatchCreateNestedManyWithoutPlayerBInput
    matchWins?: TournamentMatchCreateNestedManyWithoutWinnerInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGameHistoryWinsInput = {
    id?: string
    email: string
    password: string
    username: string
    wins?: number
    losses?: number
    rating?: number
    createdAt?: Date | string
    tournamentsWon?: TournamentUncheckedCreateNestedManyWithoutWinnerInput
    tournamentSlots?: TournamentPlayerUncheckedCreateNestedManyWithoutUserInput
    matchAsPlayerA?: TournamentMatchUncheckedCreateNestedManyWithoutPlayerAInput
    matchAsPlayerB?: TournamentMatchUncheckedCreateNestedManyWithoutPlayerBInput
    matchWins?: TournamentMatchUncheckedCreateNestedManyWithoutWinnerInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGameHistoryWinsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGameHistoryWinsInput, UserUncheckedCreateWithoutGameHistoryWinsInput>
  }

  export type RoomCreateWithoutGamesInput = {
    id?: string
    code: string
    status?: string
    gameType: string
    players?: string
    currentState?: string | null
    winnerId?: string | null
    ownerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomUncheckedCreateWithoutGamesInput = {
    id?: string
    code: string
    status?: string
    gameType: string
    players?: string
    currentState?: string | null
    winnerId?: string | null
    ownerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomCreateOrConnectWithoutGamesInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutGamesInput, RoomUncheckedCreateWithoutGamesInput>
  }

  export type UserUpsertWithoutGameHistoryWinsInput = {
    update: XOR<UserUpdateWithoutGameHistoryWinsInput, UserUncheckedUpdateWithoutGameHistoryWinsInput>
    create: XOR<UserCreateWithoutGameHistoryWinsInput, UserUncheckedCreateWithoutGameHistoryWinsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGameHistoryWinsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGameHistoryWinsInput, UserUncheckedUpdateWithoutGameHistoryWinsInput>
  }

  export type UserUpdateWithoutGameHistoryWinsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tournamentsWon?: TournamentUpdateManyWithoutWinnerNestedInput
    tournamentSlots?: TournamentPlayerUpdateManyWithoutUserNestedInput
    matchAsPlayerA?: TournamentMatchUpdateManyWithoutPlayerANestedInput
    matchAsPlayerB?: TournamentMatchUpdateManyWithoutPlayerBNestedInput
    matchWins?: TournamentMatchUpdateManyWithoutWinnerNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGameHistoryWinsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tournamentsWon?: TournamentUncheckedUpdateManyWithoutWinnerNestedInput
    tournamentSlots?: TournamentPlayerUncheckedUpdateManyWithoutUserNestedInput
    matchAsPlayerA?: TournamentMatchUncheckedUpdateManyWithoutPlayerANestedInput
    matchAsPlayerB?: TournamentMatchUncheckedUpdateManyWithoutPlayerBNestedInput
    matchWins?: TournamentMatchUncheckedUpdateManyWithoutWinnerNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RoomUpsertWithoutGamesInput = {
    update: XOR<RoomUpdateWithoutGamesInput, RoomUncheckedUpdateWithoutGamesInput>
    create: XOR<RoomCreateWithoutGamesInput, RoomUncheckedCreateWithoutGamesInput>
    where?: RoomWhereInput
  }

  export type RoomUpdateToOneWithWhereWithoutGamesInput = {
    where?: RoomWhereInput
    data: XOR<RoomUpdateWithoutGamesInput, RoomUncheckedUpdateWithoutGamesInput>
  }

  export type RoomUpdateWithoutGamesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    gameType?: StringFieldUpdateOperationsInput | string
    players?: StringFieldUpdateOperationsInput | string
    currentState?: NullableStringFieldUpdateOperationsInput | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUncheckedUpdateWithoutGamesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    gameType?: StringFieldUpdateOperationsInput | string
    players?: StringFieldUpdateOperationsInput | string
    currentState?: NullableStringFieldUpdateOperationsInput | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutTournamentsWonInput = {
    id?: string
    email: string
    password: string
    username: string
    wins?: number
    losses?: number
    rating?: number
    createdAt?: Date | string
    gameHistoryWins?: GameHistoryCreateNestedManyWithoutWinnerInput
    tournamentSlots?: TournamentPlayerCreateNestedManyWithoutUserInput
    matchAsPlayerA?: TournamentMatchCreateNestedManyWithoutPlayerAInput
    matchAsPlayerB?: TournamentMatchCreateNestedManyWithoutPlayerBInput
    matchWins?: TournamentMatchCreateNestedManyWithoutWinnerInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTournamentsWonInput = {
    id?: string
    email: string
    password: string
    username: string
    wins?: number
    losses?: number
    rating?: number
    createdAt?: Date | string
    gameHistoryWins?: GameHistoryUncheckedCreateNestedManyWithoutWinnerInput
    tournamentSlots?: TournamentPlayerUncheckedCreateNestedManyWithoutUserInput
    matchAsPlayerA?: TournamentMatchUncheckedCreateNestedManyWithoutPlayerAInput
    matchAsPlayerB?: TournamentMatchUncheckedCreateNestedManyWithoutPlayerBInput
    matchWins?: TournamentMatchUncheckedCreateNestedManyWithoutWinnerInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTournamentsWonInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTournamentsWonInput, UserUncheckedCreateWithoutTournamentsWonInput>
  }

  export type TournamentPlayerCreateWithoutTournamentInput = {
    id?: string
    seed?: number
    joinedAt?: Date | string
    user: UserCreateNestedOneWithoutTournamentSlotsInput
  }

  export type TournamentPlayerUncheckedCreateWithoutTournamentInput = {
    id?: string
    userId: string
    seed?: number
    joinedAt?: Date | string
  }

  export type TournamentPlayerCreateOrConnectWithoutTournamentInput = {
    where: TournamentPlayerWhereUniqueInput
    create: XOR<TournamentPlayerCreateWithoutTournamentInput, TournamentPlayerUncheckedCreateWithoutTournamentInput>
  }

  export type TournamentPlayerCreateManyTournamentInputEnvelope = {
    data: TournamentPlayerCreateManyTournamentInput | TournamentPlayerCreateManyTournamentInput[]
    skipDuplicates?: boolean
  }

  export type TournamentMatchCreateWithoutTournamentInput = {
    id?: string
    round?: number
    bracketIndex?: number
    status?: string
    playedAt?: Date | string | null
    playerA?: UserCreateNestedOneWithoutMatchAsPlayerAInput
    playerB?: UserCreateNestedOneWithoutMatchAsPlayerBInput
    winner?: UserCreateNestedOneWithoutMatchWinsInput
    nextMatch?: TournamentMatchCreateNestedOneWithoutPreviousMatchesInput
    previousMatches?: TournamentMatchCreateNestedManyWithoutNextMatchInput
  }

  export type TournamentMatchUncheckedCreateWithoutTournamentInput = {
    id?: string
    round?: number
    bracketIndex?: number
    playerAId?: string | null
    playerBId?: string | null
    winnerId?: string | null
    nextMatchId?: string | null
    status?: string
    playedAt?: Date | string | null
    previousMatches?: TournamentMatchUncheckedCreateNestedManyWithoutNextMatchInput
  }

  export type TournamentMatchCreateOrConnectWithoutTournamentInput = {
    where: TournamentMatchWhereUniqueInput
    create: XOR<TournamentMatchCreateWithoutTournamentInput, TournamentMatchUncheckedCreateWithoutTournamentInput>
  }

  export type TournamentMatchCreateManyTournamentInputEnvelope = {
    data: TournamentMatchCreateManyTournamentInput | TournamentMatchCreateManyTournamentInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutTournamentsWonInput = {
    update: XOR<UserUpdateWithoutTournamentsWonInput, UserUncheckedUpdateWithoutTournamentsWonInput>
    create: XOR<UserCreateWithoutTournamentsWonInput, UserUncheckedCreateWithoutTournamentsWonInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTournamentsWonInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTournamentsWonInput, UserUncheckedUpdateWithoutTournamentsWonInput>
  }

  export type UserUpdateWithoutTournamentsWonInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameHistoryWins?: GameHistoryUpdateManyWithoutWinnerNestedInput
    tournamentSlots?: TournamentPlayerUpdateManyWithoutUserNestedInput
    matchAsPlayerA?: TournamentMatchUpdateManyWithoutPlayerANestedInput
    matchAsPlayerB?: TournamentMatchUpdateManyWithoutPlayerBNestedInput
    matchWins?: TournamentMatchUpdateManyWithoutWinnerNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTournamentsWonInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameHistoryWins?: GameHistoryUncheckedUpdateManyWithoutWinnerNestedInput
    tournamentSlots?: TournamentPlayerUncheckedUpdateManyWithoutUserNestedInput
    matchAsPlayerA?: TournamentMatchUncheckedUpdateManyWithoutPlayerANestedInput
    matchAsPlayerB?: TournamentMatchUncheckedUpdateManyWithoutPlayerBNestedInput
    matchWins?: TournamentMatchUncheckedUpdateManyWithoutWinnerNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TournamentPlayerUpsertWithWhereUniqueWithoutTournamentInput = {
    where: TournamentPlayerWhereUniqueInput
    update: XOR<TournamentPlayerUpdateWithoutTournamentInput, TournamentPlayerUncheckedUpdateWithoutTournamentInput>
    create: XOR<TournamentPlayerCreateWithoutTournamentInput, TournamentPlayerUncheckedCreateWithoutTournamentInput>
  }

  export type TournamentPlayerUpdateWithWhereUniqueWithoutTournamentInput = {
    where: TournamentPlayerWhereUniqueInput
    data: XOR<TournamentPlayerUpdateWithoutTournamentInput, TournamentPlayerUncheckedUpdateWithoutTournamentInput>
  }

  export type TournamentPlayerUpdateManyWithWhereWithoutTournamentInput = {
    where: TournamentPlayerScalarWhereInput
    data: XOR<TournamentPlayerUpdateManyMutationInput, TournamentPlayerUncheckedUpdateManyWithoutTournamentInput>
  }

  export type TournamentMatchUpsertWithWhereUniqueWithoutTournamentInput = {
    where: TournamentMatchWhereUniqueInput
    update: XOR<TournamentMatchUpdateWithoutTournamentInput, TournamentMatchUncheckedUpdateWithoutTournamentInput>
    create: XOR<TournamentMatchCreateWithoutTournamentInput, TournamentMatchUncheckedCreateWithoutTournamentInput>
  }

  export type TournamentMatchUpdateWithWhereUniqueWithoutTournamentInput = {
    where: TournamentMatchWhereUniqueInput
    data: XOR<TournamentMatchUpdateWithoutTournamentInput, TournamentMatchUncheckedUpdateWithoutTournamentInput>
  }

  export type TournamentMatchUpdateManyWithWhereWithoutTournamentInput = {
    where: TournamentMatchScalarWhereInput
    data: XOR<TournamentMatchUpdateManyMutationInput, TournamentMatchUncheckedUpdateManyWithoutTournamentInput>
  }

  export type TournamentCreateWithoutPlayersInput = {
    id?: string
    name: string
    gameType?: string
    status?: string
    maxPlayers?: number
    bracket?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    winner?: UserCreateNestedOneWithoutTournamentsWonInput
    matches?: TournamentMatchCreateNestedManyWithoutTournamentInput
  }

  export type TournamentUncheckedCreateWithoutPlayersInput = {
    id?: string
    name: string
    gameType?: string
    status?: string
    maxPlayers?: number
    bracket?: string | null
    winnerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    matches?: TournamentMatchUncheckedCreateNestedManyWithoutTournamentInput
  }

  export type TournamentCreateOrConnectWithoutPlayersInput = {
    where: TournamentWhereUniqueInput
    create: XOR<TournamentCreateWithoutPlayersInput, TournamentUncheckedCreateWithoutPlayersInput>
  }

  export type UserCreateWithoutTournamentSlotsInput = {
    id?: string
    email: string
    password: string
    username: string
    wins?: number
    losses?: number
    rating?: number
    createdAt?: Date | string
    gameHistoryWins?: GameHistoryCreateNestedManyWithoutWinnerInput
    tournamentsWon?: TournamentCreateNestedManyWithoutWinnerInput
    matchAsPlayerA?: TournamentMatchCreateNestedManyWithoutPlayerAInput
    matchAsPlayerB?: TournamentMatchCreateNestedManyWithoutPlayerBInput
    matchWins?: TournamentMatchCreateNestedManyWithoutWinnerInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTournamentSlotsInput = {
    id?: string
    email: string
    password: string
    username: string
    wins?: number
    losses?: number
    rating?: number
    createdAt?: Date | string
    gameHistoryWins?: GameHistoryUncheckedCreateNestedManyWithoutWinnerInput
    tournamentsWon?: TournamentUncheckedCreateNestedManyWithoutWinnerInput
    matchAsPlayerA?: TournamentMatchUncheckedCreateNestedManyWithoutPlayerAInput
    matchAsPlayerB?: TournamentMatchUncheckedCreateNestedManyWithoutPlayerBInput
    matchWins?: TournamentMatchUncheckedCreateNestedManyWithoutWinnerInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTournamentSlotsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTournamentSlotsInput, UserUncheckedCreateWithoutTournamentSlotsInput>
  }

  export type TournamentUpsertWithoutPlayersInput = {
    update: XOR<TournamentUpdateWithoutPlayersInput, TournamentUncheckedUpdateWithoutPlayersInput>
    create: XOR<TournamentCreateWithoutPlayersInput, TournamentUncheckedCreateWithoutPlayersInput>
    where?: TournamentWhereInput
  }

  export type TournamentUpdateToOneWithWhereWithoutPlayersInput = {
    where?: TournamentWhereInput
    data: XOR<TournamentUpdateWithoutPlayersInput, TournamentUncheckedUpdateWithoutPlayersInput>
  }

  export type TournamentUpdateWithoutPlayersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gameType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    maxPlayers?: IntFieldUpdateOperationsInput | number
    bracket?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    winner?: UserUpdateOneWithoutTournamentsWonNestedInput
    matches?: TournamentMatchUpdateManyWithoutTournamentNestedInput
  }

  export type TournamentUncheckedUpdateWithoutPlayersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gameType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    maxPlayers?: IntFieldUpdateOperationsInput | number
    bracket?: NullableStringFieldUpdateOperationsInput | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matches?: TournamentMatchUncheckedUpdateManyWithoutTournamentNestedInput
  }

  export type UserUpsertWithoutTournamentSlotsInput = {
    update: XOR<UserUpdateWithoutTournamentSlotsInput, UserUncheckedUpdateWithoutTournamentSlotsInput>
    create: XOR<UserCreateWithoutTournamentSlotsInput, UserUncheckedCreateWithoutTournamentSlotsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTournamentSlotsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTournamentSlotsInput, UserUncheckedUpdateWithoutTournamentSlotsInput>
  }

  export type UserUpdateWithoutTournamentSlotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameHistoryWins?: GameHistoryUpdateManyWithoutWinnerNestedInput
    tournamentsWon?: TournamentUpdateManyWithoutWinnerNestedInput
    matchAsPlayerA?: TournamentMatchUpdateManyWithoutPlayerANestedInput
    matchAsPlayerB?: TournamentMatchUpdateManyWithoutPlayerBNestedInput
    matchWins?: TournamentMatchUpdateManyWithoutWinnerNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTournamentSlotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameHistoryWins?: GameHistoryUncheckedUpdateManyWithoutWinnerNestedInput
    tournamentsWon?: TournamentUncheckedUpdateManyWithoutWinnerNestedInput
    matchAsPlayerA?: TournamentMatchUncheckedUpdateManyWithoutPlayerANestedInput
    matchAsPlayerB?: TournamentMatchUncheckedUpdateManyWithoutPlayerBNestedInput
    matchWins?: TournamentMatchUncheckedUpdateManyWithoutWinnerNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TournamentCreateWithoutMatchesInput = {
    id?: string
    name: string
    gameType?: string
    status?: string
    maxPlayers?: number
    bracket?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    winner?: UserCreateNestedOneWithoutTournamentsWonInput
    players?: TournamentPlayerCreateNestedManyWithoutTournamentInput
  }

  export type TournamentUncheckedCreateWithoutMatchesInput = {
    id?: string
    name: string
    gameType?: string
    status?: string
    maxPlayers?: number
    bracket?: string | null
    winnerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    players?: TournamentPlayerUncheckedCreateNestedManyWithoutTournamentInput
  }

  export type TournamentCreateOrConnectWithoutMatchesInput = {
    where: TournamentWhereUniqueInput
    create: XOR<TournamentCreateWithoutMatchesInput, TournamentUncheckedCreateWithoutMatchesInput>
  }

  export type UserCreateWithoutMatchAsPlayerAInput = {
    id?: string
    email: string
    password: string
    username: string
    wins?: number
    losses?: number
    rating?: number
    createdAt?: Date | string
    gameHistoryWins?: GameHistoryCreateNestedManyWithoutWinnerInput
    tournamentsWon?: TournamentCreateNestedManyWithoutWinnerInput
    tournamentSlots?: TournamentPlayerCreateNestedManyWithoutUserInput
    matchAsPlayerB?: TournamentMatchCreateNestedManyWithoutPlayerBInput
    matchWins?: TournamentMatchCreateNestedManyWithoutWinnerInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMatchAsPlayerAInput = {
    id?: string
    email: string
    password: string
    username: string
    wins?: number
    losses?: number
    rating?: number
    createdAt?: Date | string
    gameHistoryWins?: GameHistoryUncheckedCreateNestedManyWithoutWinnerInput
    tournamentsWon?: TournamentUncheckedCreateNestedManyWithoutWinnerInput
    tournamentSlots?: TournamentPlayerUncheckedCreateNestedManyWithoutUserInput
    matchAsPlayerB?: TournamentMatchUncheckedCreateNestedManyWithoutPlayerBInput
    matchWins?: TournamentMatchUncheckedCreateNestedManyWithoutWinnerInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMatchAsPlayerAInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMatchAsPlayerAInput, UserUncheckedCreateWithoutMatchAsPlayerAInput>
  }

  export type UserCreateWithoutMatchAsPlayerBInput = {
    id?: string
    email: string
    password: string
    username: string
    wins?: number
    losses?: number
    rating?: number
    createdAt?: Date | string
    gameHistoryWins?: GameHistoryCreateNestedManyWithoutWinnerInput
    tournamentsWon?: TournamentCreateNestedManyWithoutWinnerInput
    tournamentSlots?: TournamentPlayerCreateNestedManyWithoutUserInput
    matchAsPlayerA?: TournamentMatchCreateNestedManyWithoutPlayerAInput
    matchWins?: TournamentMatchCreateNestedManyWithoutWinnerInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMatchAsPlayerBInput = {
    id?: string
    email: string
    password: string
    username: string
    wins?: number
    losses?: number
    rating?: number
    createdAt?: Date | string
    gameHistoryWins?: GameHistoryUncheckedCreateNestedManyWithoutWinnerInput
    tournamentsWon?: TournamentUncheckedCreateNestedManyWithoutWinnerInput
    tournamentSlots?: TournamentPlayerUncheckedCreateNestedManyWithoutUserInput
    matchAsPlayerA?: TournamentMatchUncheckedCreateNestedManyWithoutPlayerAInput
    matchWins?: TournamentMatchUncheckedCreateNestedManyWithoutWinnerInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMatchAsPlayerBInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMatchAsPlayerBInput, UserUncheckedCreateWithoutMatchAsPlayerBInput>
  }

  export type UserCreateWithoutMatchWinsInput = {
    id?: string
    email: string
    password: string
    username: string
    wins?: number
    losses?: number
    rating?: number
    createdAt?: Date | string
    gameHistoryWins?: GameHistoryCreateNestedManyWithoutWinnerInput
    tournamentsWon?: TournamentCreateNestedManyWithoutWinnerInput
    tournamentSlots?: TournamentPlayerCreateNestedManyWithoutUserInput
    matchAsPlayerA?: TournamentMatchCreateNestedManyWithoutPlayerAInput
    matchAsPlayerB?: TournamentMatchCreateNestedManyWithoutPlayerBInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMatchWinsInput = {
    id?: string
    email: string
    password: string
    username: string
    wins?: number
    losses?: number
    rating?: number
    createdAt?: Date | string
    gameHistoryWins?: GameHistoryUncheckedCreateNestedManyWithoutWinnerInput
    tournamentsWon?: TournamentUncheckedCreateNestedManyWithoutWinnerInput
    tournamentSlots?: TournamentPlayerUncheckedCreateNestedManyWithoutUserInput
    matchAsPlayerA?: TournamentMatchUncheckedCreateNestedManyWithoutPlayerAInput
    matchAsPlayerB?: TournamentMatchUncheckedCreateNestedManyWithoutPlayerBInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMatchWinsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMatchWinsInput, UserUncheckedCreateWithoutMatchWinsInput>
  }

  export type TournamentMatchCreateWithoutPreviousMatchesInput = {
    id?: string
    round?: number
    bracketIndex?: number
    status?: string
    playedAt?: Date | string | null
    tournament: TournamentCreateNestedOneWithoutMatchesInput
    playerA?: UserCreateNestedOneWithoutMatchAsPlayerAInput
    playerB?: UserCreateNestedOneWithoutMatchAsPlayerBInput
    winner?: UserCreateNestedOneWithoutMatchWinsInput
    nextMatch?: TournamentMatchCreateNestedOneWithoutPreviousMatchesInput
  }

  export type TournamentMatchUncheckedCreateWithoutPreviousMatchesInput = {
    id?: string
    tournamentId: string
    round?: number
    bracketIndex?: number
    playerAId?: string | null
    playerBId?: string | null
    winnerId?: string | null
    nextMatchId?: string | null
    status?: string
    playedAt?: Date | string | null
  }

  export type TournamentMatchCreateOrConnectWithoutPreviousMatchesInput = {
    where: TournamentMatchWhereUniqueInput
    create: XOR<TournamentMatchCreateWithoutPreviousMatchesInput, TournamentMatchUncheckedCreateWithoutPreviousMatchesInput>
  }

  export type TournamentMatchCreateWithoutNextMatchInput = {
    id?: string
    round?: number
    bracketIndex?: number
    status?: string
    playedAt?: Date | string | null
    tournament: TournamentCreateNestedOneWithoutMatchesInput
    playerA?: UserCreateNestedOneWithoutMatchAsPlayerAInput
    playerB?: UserCreateNestedOneWithoutMatchAsPlayerBInput
    winner?: UserCreateNestedOneWithoutMatchWinsInput
    previousMatches?: TournamentMatchCreateNestedManyWithoutNextMatchInput
  }

  export type TournamentMatchUncheckedCreateWithoutNextMatchInput = {
    id?: string
    tournamentId: string
    round?: number
    bracketIndex?: number
    playerAId?: string | null
    playerBId?: string | null
    winnerId?: string | null
    status?: string
    playedAt?: Date | string | null
    previousMatches?: TournamentMatchUncheckedCreateNestedManyWithoutNextMatchInput
  }

  export type TournamentMatchCreateOrConnectWithoutNextMatchInput = {
    where: TournamentMatchWhereUniqueInput
    create: XOR<TournamentMatchCreateWithoutNextMatchInput, TournamentMatchUncheckedCreateWithoutNextMatchInput>
  }

  export type TournamentMatchCreateManyNextMatchInputEnvelope = {
    data: TournamentMatchCreateManyNextMatchInput | TournamentMatchCreateManyNextMatchInput[]
    skipDuplicates?: boolean
  }

  export type TournamentUpsertWithoutMatchesInput = {
    update: XOR<TournamentUpdateWithoutMatchesInput, TournamentUncheckedUpdateWithoutMatchesInput>
    create: XOR<TournamentCreateWithoutMatchesInput, TournamentUncheckedCreateWithoutMatchesInput>
    where?: TournamentWhereInput
  }

  export type TournamentUpdateToOneWithWhereWithoutMatchesInput = {
    where?: TournamentWhereInput
    data: XOR<TournamentUpdateWithoutMatchesInput, TournamentUncheckedUpdateWithoutMatchesInput>
  }

  export type TournamentUpdateWithoutMatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gameType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    maxPlayers?: IntFieldUpdateOperationsInput | number
    bracket?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    winner?: UserUpdateOneWithoutTournamentsWonNestedInput
    players?: TournamentPlayerUpdateManyWithoutTournamentNestedInput
  }

  export type TournamentUncheckedUpdateWithoutMatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gameType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    maxPlayers?: IntFieldUpdateOperationsInput | number
    bracket?: NullableStringFieldUpdateOperationsInput | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    players?: TournamentPlayerUncheckedUpdateManyWithoutTournamentNestedInput
  }

  export type UserUpsertWithoutMatchAsPlayerAInput = {
    update: XOR<UserUpdateWithoutMatchAsPlayerAInput, UserUncheckedUpdateWithoutMatchAsPlayerAInput>
    create: XOR<UserCreateWithoutMatchAsPlayerAInput, UserUncheckedCreateWithoutMatchAsPlayerAInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMatchAsPlayerAInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMatchAsPlayerAInput, UserUncheckedUpdateWithoutMatchAsPlayerAInput>
  }

  export type UserUpdateWithoutMatchAsPlayerAInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameHistoryWins?: GameHistoryUpdateManyWithoutWinnerNestedInput
    tournamentsWon?: TournamentUpdateManyWithoutWinnerNestedInput
    tournamentSlots?: TournamentPlayerUpdateManyWithoutUserNestedInput
    matchAsPlayerB?: TournamentMatchUpdateManyWithoutPlayerBNestedInput
    matchWins?: TournamentMatchUpdateManyWithoutWinnerNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMatchAsPlayerAInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameHistoryWins?: GameHistoryUncheckedUpdateManyWithoutWinnerNestedInput
    tournamentsWon?: TournamentUncheckedUpdateManyWithoutWinnerNestedInput
    tournamentSlots?: TournamentPlayerUncheckedUpdateManyWithoutUserNestedInput
    matchAsPlayerB?: TournamentMatchUncheckedUpdateManyWithoutPlayerBNestedInput
    matchWins?: TournamentMatchUncheckedUpdateManyWithoutWinnerNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutMatchAsPlayerBInput = {
    update: XOR<UserUpdateWithoutMatchAsPlayerBInput, UserUncheckedUpdateWithoutMatchAsPlayerBInput>
    create: XOR<UserCreateWithoutMatchAsPlayerBInput, UserUncheckedCreateWithoutMatchAsPlayerBInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMatchAsPlayerBInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMatchAsPlayerBInput, UserUncheckedUpdateWithoutMatchAsPlayerBInput>
  }

  export type UserUpdateWithoutMatchAsPlayerBInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameHistoryWins?: GameHistoryUpdateManyWithoutWinnerNestedInput
    tournamentsWon?: TournamentUpdateManyWithoutWinnerNestedInput
    tournamentSlots?: TournamentPlayerUpdateManyWithoutUserNestedInput
    matchAsPlayerA?: TournamentMatchUpdateManyWithoutPlayerANestedInput
    matchWins?: TournamentMatchUpdateManyWithoutWinnerNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMatchAsPlayerBInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameHistoryWins?: GameHistoryUncheckedUpdateManyWithoutWinnerNestedInput
    tournamentsWon?: TournamentUncheckedUpdateManyWithoutWinnerNestedInput
    tournamentSlots?: TournamentPlayerUncheckedUpdateManyWithoutUserNestedInput
    matchAsPlayerA?: TournamentMatchUncheckedUpdateManyWithoutPlayerANestedInput
    matchWins?: TournamentMatchUncheckedUpdateManyWithoutWinnerNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutMatchWinsInput = {
    update: XOR<UserUpdateWithoutMatchWinsInput, UserUncheckedUpdateWithoutMatchWinsInput>
    create: XOR<UserCreateWithoutMatchWinsInput, UserUncheckedCreateWithoutMatchWinsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMatchWinsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMatchWinsInput, UserUncheckedUpdateWithoutMatchWinsInput>
  }

  export type UserUpdateWithoutMatchWinsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameHistoryWins?: GameHistoryUpdateManyWithoutWinnerNestedInput
    tournamentsWon?: TournamentUpdateManyWithoutWinnerNestedInput
    tournamentSlots?: TournamentPlayerUpdateManyWithoutUserNestedInput
    matchAsPlayerA?: TournamentMatchUpdateManyWithoutPlayerANestedInput
    matchAsPlayerB?: TournamentMatchUpdateManyWithoutPlayerBNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMatchWinsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameHistoryWins?: GameHistoryUncheckedUpdateManyWithoutWinnerNestedInput
    tournamentsWon?: TournamentUncheckedUpdateManyWithoutWinnerNestedInput
    tournamentSlots?: TournamentPlayerUncheckedUpdateManyWithoutUserNestedInput
    matchAsPlayerA?: TournamentMatchUncheckedUpdateManyWithoutPlayerANestedInput
    matchAsPlayerB?: TournamentMatchUncheckedUpdateManyWithoutPlayerBNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TournamentMatchUpsertWithoutPreviousMatchesInput = {
    update: XOR<TournamentMatchUpdateWithoutPreviousMatchesInput, TournamentMatchUncheckedUpdateWithoutPreviousMatchesInput>
    create: XOR<TournamentMatchCreateWithoutPreviousMatchesInput, TournamentMatchUncheckedCreateWithoutPreviousMatchesInput>
    where?: TournamentMatchWhereInput
  }

  export type TournamentMatchUpdateToOneWithWhereWithoutPreviousMatchesInput = {
    where?: TournamentMatchWhereInput
    data: XOR<TournamentMatchUpdateWithoutPreviousMatchesInput, TournamentMatchUncheckedUpdateWithoutPreviousMatchesInput>
  }

  export type TournamentMatchUpdateWithoutPreviousMatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    round?: IntFieldUpdateOperationsInput | number
    bracketIndex?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tournament?: TournamentUpdateOneRequiredWithoutMatchesNestedInput
    playerA?: UserUpdateOneWithoutMatchAsPlayerANestedInput
    playerB?: UserUpdateOneWithoutMatchAsPlayerBNestedInput
    winner?: UserUpdateOneWithoutMatchWinsNestedInput
    nextMatch?: TournamentMatchUpdateOneWithoutPreviousMatchesNestedInput
  }

  export type TournamentMatchUncheckedUpdateWithoutPreviousMatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    tournamentId?: StringFieldUpdateOperationsInput | string
    round?: IntFieldUpdateOperationsInput | number
    bracketIndex?: IntFieldUpdateOperationsInput | number
    playerAId?: NullableStringFieldUpdateOperationsInput | string | null
    playerBId?: NullableStringFieldUpdateOperationsInput | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    nextMatchId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TournamentMatchUpsertWithWhereUniqueWithoutNextMatchInput = {
    where: TournamentMatchWhereUniqueInput
    update: XOR<TournamentMatchUpdateWithoutNextMatchInput, TournamentMatchUncheckedUpdateWithoutNextMatchInput>
    create: XOR<TournamentMatchCreateWithoutNextMatchInput, TournamentMatchUncheckedCreateWithoutNextMatchInput>
  }

  export type TournamentMatchUpdateWithWhereUniqueWithoutNextMatchInput = {
    where: TournamentMatchWhereUniqueInput
    data: XOR<TournamentMatchUpdateWithoutNextMatchInput, TournamentMatchUncheckedUpdateWithoutNextMatchInput>
  }

  export type TournamentMatchUpdateManyWithWhereWithoutNextMatchInput = {
    where: TournamentMatchScalarWhereInput
    data: XOR<TournamentMatchUpdateManyMutationInput, TournamentMatchUncheckedUpdateManyWithoutNextMatchInput>
  }

  export type GameHistoryCreateManyWinnerInput = {
    id?: string
    roomId: string
    gameName?: string
    players?: string
    data?: string
    createdAt?: Date | string
  }

  export type TournamentCreateManyWinnerInput = {
    id?: string
    name: string
    gameType?: string
    status?: string
    maxPlayers?: number
    bracket?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TournamentPlayerCreateManyUserInput = {
    id?: string
    tournamentId: string
    seed?: number
    joinedAt?: Date | string
  }

  export type TournamentMatchCreateManyPlayerAInput = {
    id?: string
    tournamentId: string
    round?: number
    bracketIndex?: number
    playerBId?: string | null
    winnerId?: string | null
    nextMatchId?: string | null
    status?: string
    playedAt?: Date | string | null
  }

  export type TournamentMatchCreateManyPlayerBInput = {
    id?: string
    tournamentId: string
    round?: number
    bracketIndex?: number
    playerAId?: string | null
    winnerId?: string | null
    nextMatchId?: string | null
    status?: string
    playedAt?: Date | string | null
  }

  export type TournamentMatchCreateManyWinnerInput = {
    id?: string
    tournamentId: string
    round?: number
    bracketIndex?: number
    playerAId?: string | null
    playerBId?: string | null
    nextMatchId?: string | null
    status?: string
    playedAt?: Date | string | null
  }

  export type NotificationCreateManyUserInput = {
    id?: string
    type?: string
    title: string
    body?: string | null
    read?: boolean
    createdAt?: Date | string
  }

  export type GameHistoryUpdateWithoutWinnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameName?: StringFieldUpdateOperationsInput | string
    players?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomUpdateOneRequiredWithoutGamesNestedInput
  }

  export type GameHistoryUncheckedUpdateWithoutWinnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    gameName?: StringFieldUpdateOperationsInput | string
    players?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameHistoryUncheckedUpdateManyWithoutWinnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    gameName?: StringFieldUpdateOperationsInput | string
    players?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TournamentUpdateWithoutWinnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gameType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    maxPlayers?: IntFieldUpdateOperationsInput | number
    bracket?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    players?: TournamentPlayerUpdateManyWithoutTournamentNestedInput
    matches?: TournamentMatchUpdateManyWithoutTournamentNestedInput
  }

  export type TournamentUncheckedUpdateWithoutWinnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gameType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    maxPlayers?: IntFieldUpdateOperationsInput | number
    bracket?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    players?: TournamentPlayerUncheckedUpdateManyWithoutTournamentNestedInput
    matches?: TournamentMatchUncheckedUpdateManyWithoutTournamentNestedInput
  }

  export type TournamentUncheckedUpdateManyWithoutWinnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gameType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    maxPlayers?: IntFieldUpdateOperationsInput | number
    bracket?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TournamentPlayerUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    seed?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tournament?: TournamentUpdateOneRequiredWithoutPlayersNestedInput
  }

  export type TournamentPlayerUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tournamentId?: StringFieldUpdateOperationsInput | string
    seed?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TournamentPlayerUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tournamentId?: StringFieldUpdateOperationsInput | string
    seed?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TournamentMatchUpdateWithoutPlayerAInput = {
    id?: StringFieldUpdateOperationsInput | string
    round?: IntFieldUpdateOperationsInput | number
    bracketIndex?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tournament?: TournamentUpdateOneRequiredWithoutMatchesNestedInput
    playerB?: UserUpdateOneWithoutMatchAsPlayerBNestedInput
    winner?: UserUpdateOneWithoutMatchWinsNestedInput
    nextMatch?: TournamentMatchUpdateOneWithoutPreviousMatchesNestedInput
    previousMatches?: TournamentMatchUpdateManyWithoutNextMatchNestedInput
  }

  export type TournamentMatchUncheckedUpdateWithoutPlayerAInput = {
    id?: StringFieldUpdateOperationsInput | string
    tournamentId?: StringFieldUpdateOperationsInput | string
    round?: IntFieldUpdateOperationsInput | number
    bracketIndex?: IntFieldUpdateOperationsInput | number
    playerBId?: NullableStringFieldUpdateOperationsInput | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    nextMatchId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    previousMatches?: TournamentMatchUncheckedUpdateManyWithoutNextMatchNestedInput
  }

  export type TournamentMatchUncheckedUpdateManyWithoutPlayerAInput = {
    id?: StringFieldUpdateOperationsInput | string
    tournamentId?: StringFieldUpdateOperationsInput | string
    round?: IntFieldUpdateOperationsInput | number
    bracketIndex?: IntFieldUpdateOperationsInput | number
    playerBId?: NullableStringFieldUpdateOperationsInput | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    nextMatchId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TournamentMatchUpdateWithoutPlayerBInput = {
    id?: StringFieldUpdateOperationsInput | string
    round?: IntFieldUpdateOperationsInput | number
    bracketIndex?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tournament?: TournamentUpdateOneRequiredWithoutMatchesNestedInput
    playerA?: UserUpdateOneWithoutMatchAsPlayerANestedInput
    winner?: UserUpdateOneWithoutMatchWinsNestedInput
    nextMatch?: TournamentMatchUpdateOneWithoutPreviousMatchesNestedInput
    previousMatches?: TournamentMatchUpdateManyWithoutNextMatchNestedInput
  }

  export type TournamentMatchUncheckedUpdateWithoutPlayerBInput = {
    id?: StringFieldUpdateOperationsInput | string
    tournamentId?: StringFieldUpdateOperationsInput | string
    round?: IntFieldUpdateOperationsInput | number
    bracketIndex?: IntFieldUpdateOperationsInput | number
    playerAId?: NullableStringFieldUpdateOperationsInput | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    nextMatchId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    previousMatches?: TournamentMatchUncheckedUpdateManyWithoutNextMatchNestedInput
  }

  export type TournamentMatchUncheckedUpdateManyWithoutPlayerBInput = {
    id?: StringFieldUpdateOperationsInput | string
    tournamentId?: StringFieldUpdateOperationsInput | string
    round?: IntFieldUpdateOperationsInput | number
    bracketIndex?: IntFieldUpdateOperationsInput | number
    playerAId?: NullableStringFieldUpdateOperationsInput | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    nextMatchId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TournamentMatchUpdateWithoutWinnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    round?: IntFieldUpdateOperationsInput | number
    bracketIndex?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tournament?: TournamentUpdateOneRequiredWithoutMatchesNestedInput
    playerA?: UserUpdateOneWithoutMatchAsPlayerANestedInput
    playerB?: UserUpdateOneWithoutMatchAsPlayerBNestedInput
    nextMatch?: TournamentMatchUpdateOneWithoutPreviousMatchesNestedInput
    previousMatches?: TournamentMatchUpdateManyWithoutNextMatchNestedInput
  }

  export type TournamentMatchUncheckedUpdateWithoutWinnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    tournamentId?: StringFieldUpdateOperationsInput | string
    round?: IntFieldUpdateOperationsInput | number
    bracketIndex?: IntFieldUpdateOperationsInput | number
    playerAId?: NullableStringFieldUpdateOperationsInput | string | null
    playerBId?: NullableStringFieldUpdateOperationsInput | string | null
    nextMatchId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    previousMatches?: TournamentMatchUncheckedUpdateManyWithoutNextMatchNestedInput
  }

  export type TournamentMatchUncheckedUpdateManyWithoutWinnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    tournamentId?: StringFieldUpdateOperationsInput | string
    round?: IntFieldUpdateOperationsInput | number
    bracketIndex?: IntFieldUpdateOperationsInput | number
    playerAId?: NullableStringFieldUpdateOperationsInput | string | null
    playerBId?: NullableStringFieldUpdateOperationsInput | string | null
    nextMatchId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NotificationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameHistoryCreateManyRoomInput = {
    id?: string
    winnerId?: string | null
    gameName?: string
    players?: string
    data?: string
    createdAt?: Date | string
  }

  export type GameHistoryUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameName?: StringFieldUpdateOperationsInput | string
    players?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    winner?: UserUpdateOneWithoutGameHistoryWinsNestedInput
  }

  export type GameHistoryUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    gameName?: StringFieldUpdateOperationsInput | string
    players?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameHistoryUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    gameName?: StringFieldUpdateOperationsInput | string
    players?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TournamentPlayerCreateManyTournamentInput = {
    id?: string
    userId: string
    seed?: number
    joinedAt?: Date | string
  }

  export type TournamentMatchCreateManyTournamentInput = {
    id?: string
    round?: number
    bracketIndex?: number
    playerAId?: string | null
    playerBId?: string | null
    winnerId?: string | null
    nextMatchId?: string | null
    status?: string
    playedAt?: Date | string | null
  }

  export type TournamentPlayerUpdateWithoutTournamentInput = {
    id?: StringFieldUpdateOperationsInput | string
    seed?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTournamentSlotsNestedInput
  }

  export type TournamentPlayerUncheckedUpdateWithoutTournamentInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    seed?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TournamentPlayerUncheckedUpdateManyWithoutTournamentInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    seed?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TournamentMatchUpdateWithoutTournamentInput = {
    id?: StringFieldUpdateOperationsInput | string
    round?: IntFieldUpdateOperationsInput | number
    bracketIndex?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    playerA?: UserUpdateOneWithoutMatchAsPlayerANestedInput
    playerB?: UserUpdateOneWithoutMatchAsPlayerBNestedInput
    winner?: UserUpdateOneWithoutMatchWinsNestedInput
    nextMatch?: TournamentMatchUpdateOneWithoutPreviousMatchesNestedInput
    previousMatches?: TournamentMatchUpdateManyWithoutNextMatchNestedInput
  }

  export type TournamentMatchUncheckedUpdateWithoutTournamentInput = {
    id?: StringFieldUpdateOperationsInput | string
    round?: IntFieldUpdateOperationsInput | number
    bracketIndex?: IntFieldUpdateOperationsInput | number
    playerAId?: NullableStringFieldUpdateOperationsInput | string | null
    playerBId?: NullableStringFieldUpdateOperationsInput | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    nextMatchId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    previousMatches?: TournamentMatchUncheckedUpdateManyWithoutNextMatchNestedInput
  }

  export type TournamentMatchUncheckedUpdateManyWithoutTournamentInput = {
    id?: StringFieldUpdateOperationsInput | string
    round?: IntFieldUpdateOperationsInput | number
    bracketIndex?: IntFieldUpdateOperationsInput | number
    playerAId?: NullableStringFieldUpdateOperationsInput | string | null
    playerBId?: NullableStringFieldUpdateOperationsInput | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    nextMatchId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TournamentMatchCreateManyNextMatchInput = {
    id?: string
    tournamentId: string
    round?: number
    bracketIndex?: number
    playerAId?: string | null
    playerBId?: string | null
    winnerId?: string | null
    status?: string
    playedAt?: Date | string | null
  }

  export type TournamentMatchUpdateWithoutNextMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    round?: IntFieldUpdateOperationsInput | number
    bracketIndex?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tournament?: TournamentUpdateOneRequiredWithoutMatchesNestedInput
    playerA?: UserUpdateOneWithoutMatchAsPlayerANestedInput
    playerB?: UserUpdateOneWithoutMatchAsPlayerBNestedInput
    winner?: UserUpdateOneWithoutMatchWinsNestedInput
    previousMatches?: TournamentMatchUpdateManyWithoutNextMatchNestedInput
  }

  export type TournamentMatchUncheckedUpdateWithoutNextMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    tournamentId?: StringFieldUpdateOperationsInput | string
    round?: IntFieldUpdateOperationsInput | number
    bracketIndex?: IntFieldUpdateOperationsInput | number
    playerAId?: NullableStringFieldUpdateOperationsInput | string | null
    playerBId?: NullableStringFieldUpdateOperationsInput | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    previousMatches?: TournamentMatchUncheckedUpdateManyWithoutNextMatchNestedInput
  }

  export type TournamentMatchUncheckedUpdateManyWithoutNextMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    tournamentId?: StringFieldUpdateOperationsInput | string
    round?: IntFieldUpdateOperationsInput | number
    bracketIndex?: IntFieldUpdateOperationsInput | number
    playerAId?: NullableStringFieldUpdateOperationsInput | string | null
    playerBId?: NullableStringFieldUpdateOperationsInput | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RoomCountOutputTypeDefaultArgs instead
     */
    export type RoomCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RoomCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TournamentCountOutputTypeDefaultArgs instead
     */
    export type TournamentCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TournamentCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TournamentMatchCountOutputTypeDefaultArgs instead
     */
    export type TournamentMatchCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TournamentMatchCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NotificationDefaultArgs instead
     */
    export type NotificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NotificationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RoomDefaultArgs instead
     */
    export type RoomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RoomDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GameHistoryDefaultArgs instead
     */
    export type GameHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GameHistoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TournamentDefaultArgs instead
     */
    export type TournamentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TournamentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TournamentPlayerDefaultArgs instead
     */
    export type TournamentPlayerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TournamentPlayerDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TournamentMatchDefaultArgs instead
     */
    export type TournamentMatchArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TournamentMatchDefaultArgs<ExtArgs>

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