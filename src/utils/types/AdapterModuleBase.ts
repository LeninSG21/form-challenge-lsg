type NoValue = undefined | void;

type Adapter<TEntry, TResult> = (entry: TEntry) => TResult;

type ToRequest<TRequest, TRequestModel> =
  | TRequest
  | TRequestModel extends NoValue
  ? Record<never, never>
  : { toRequest: Adapter<TRequestModel, TRequest> };

type ToModel<TResponse, TModel> = TResponse | TModel extends NoValue
  ? Record<never, never>
  : { toModel: Adapter<TResponse, TModel> };

export type AdapterModuleBase<TRequest, TRequestModel, TResponse, TModel> =
  () => ToModel<TResponse, TModel> & ToRequest<TRequest, TRequestModel>;
