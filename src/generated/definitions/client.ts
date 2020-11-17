/**
 * Do not edit this file it is auto-generated by io-utils / gen-api-models.
 * See https://github.com/pagopa/io-utils
 */
/* tslint:disable */

import {
  RequestParams,
  TypeofApiCall,
  TypeofApiParams,
  createFetchRequestForApi,
  ReplaceRequestParams
} from "italia-ts-commons/lib/requests";
import { identity } from "fp-ts/lib/function";

import {
  GetBPDCitizenT,
  GetBPDCitizenDefaultDecoder,
  GetBPDTransactionsT,
  GetBPDTransactionsDefaultDecoder
} from "./requestTypes";

// This is a placeholder for undefined when dealing with object keys
// Typescript doesn't perform well when narrowing a union type which includes string and undefined
// (example: "foo" | "bar" | undefined)
// We use this as a placeholder for type parameters indicating "no key"
type __UNDEFINED_KEY = "_____";

export type ApiOperation = TypeofApiCall<GetBPDCitizenT> &
  TypeofApiCall<GetBPDTransactionsT>;

export type ParamKeys = keyof (TypeofApiParams<GetBPDCitizenT> &
  TypeofApiParams<GetBPDTransactionsT>);

/**
 * Defines an adapter for TypeofApiCall which omit one or more parameters in the signature
 * @param ApiT the type which defines the operation to expose
 * @param K the parameter to omit. undefined means no parameters will be omitted
 */
export type OmitApiCallParams<
  ApiT,
  K extends ParamKeys | __UNDEFINED_KEY = __UNDEFINED_KEY
> = (
  op: TypeofApiCall<ApiT>
) => K extends __UNDEFINED_KEY
  ? TypeofApiCall<ApiT>
  : TypeofApiCall<ReplaceRequestParams<ApiT, Omit<RequestParams<ApiT>, K>>>;

/**
 * Defines an adapter for TypeofApiCall which omit one or more parameters in the signature
 * @param ApiT the type which defines the operation to expose
 * @param K the parameter to omit. undefined means no parameters will be omitted
 */
export type WithDefaultsT<
  K extends ParamKeys | __UNDEFINED_KEY = __UNDEFINED_KEY
> = OmitApiCallParams<GetBPDCitizenT | GetBPDTransactionsT, K>;

/**
 * Defines a collection of api operations
 * @param K name of the parameters that the Clients masks from the operations
 */
export type Client<
  K extends ParamKeys | __UNDEFINED_KEY = __UNDEFINED_KEY
> = K extends __UNDEFINED_KEY
  ? {
      readonly GetBPDCitizen: TypeofApiCall<GetBPDCitizenT>;

      readonly GetBPDTransactions: TypeofApiCall<GetBPDTransactionsT>;
    }
  : {
      readonly GetBPDCitizen: TypeofApiCall<
        ReplaceRequestParams<
          GetBPDCitizenT,
          Omit<RequestParams<GetBPDCitizenT>, K>
        >
      >;

      readonly GetBPDTransactions: TypeofApiCall<
        ReplaceRequestParams<
          GetBPDTransactionsT,
          Omit<RequestParams<GetBPDTransactionsT>, K>
        >
      >;
    };

/**
 * Create an instance of a client
 * @param params hash map of parameters thata define the client:
 *  - baseUrl: the base url for every api call (required)
 *  - fetchApi: an implementation of the fetch() web API, depending on the platform (required)
 *  - basePath: optional path to be appended to the baseUrl
 *  - withDefaults: optional adapter to be applied to every operation, to omit some paramenters
 * @returns a collection of api operations
 */
export function createClient<K extends ParamKeys>(params: {
  baseUrl: string;
  // tslint:disable-next-line:no-any
  fetchApi: typeof fetch;
  withDefaults: WithDefaultsT<K>;
  basePath?: string;
}): Client<K>;
export function createClient(params: {
  baseUrl: string;
  // tslint:disable-next-line:no-any
  fetchApi: typeof fetch;
  withDefaults?: undefined;
  basePath?: string;
}): Client;
export function createClient<K extends ParamKeys>({
  baseUrl,
  // tslint:disable-next-line:no-any
  fetchApi,
  withDefaults,
  basePath = "/api/v1"
}: {
  baseUrl: string;
  // tslint:disable-next-line:no-any
  fetchApi: typeof fetch;
  withDefaults?: WithDefaultsT<K>;
  basePath?: string;
}) {
  const options = {
    baseUrl,
    fetchApi
  };

  const GetBPDCitizenT: ReplaceRequestParams<
    GetBPDCitizenT,
    RequestParams<GetBPDCitizenT>
  > = {
    method: "get",

    headers: () => ({}),

    response_decoder: GetBPDCitizenDefaultDecoder(),
    url: ({}) => `${basePath}/bpd/citizen`,

    query: () => ({})
  };
  const GetBPDCitizen: TypeofApiCall<GetBPDCitizenT> = createFetchRequestForApi(
    GetBPDCitizenT,
    options
  );

  const GetBPDTransactionsT: ReplaceRequestParams<
    GetBPDTransactionsT,
    RequestParams<GetBPDTransactionsT>
  > = {
    method: "get",

    headers: () => ({}),

    response_decoder: GetBPDTransactionsDefaultDecoder(),
    url: ({}) => `${basePath}/bpd/transactions`,

    query: () => ({})
  };
  const GetBPDTransactions: TypeofApiCall<GetBPDTransactionsT> = createFetchRequestForApi(
    GetBPDTransactionsT,
    options
  );

  return {
    GetBPDCitizen: (withDefaults || identity)(GetBPDCitizen),
    GetBPDTransactions: (withDefaults || identity)(GetBPDTransactions)
  };
}
