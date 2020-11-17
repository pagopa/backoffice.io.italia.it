/**
 * Do not edit this file it is auto-generated by io-utils / gen-api-models.
 * See https://github.com/pagopa/io-utils
 */
/* tslint:disable */

import * as t from "io-ts";

// required attributes
const BPDTransactionR = t.interface({
  hpan: t.string,

  trx_timestamp: t.string,

  acquirer_descr: t.string,

  id_trx_acquirer: t.string
});

// optional attributes
const BPDTransactionO = t.partial({
  acquirer_id: t.string,

  id_trx_issuer: t.string,

  operation_type_id: t.string,

  circuit_type: t.string,

  amount: t.number,

  amount_currency: t.string,

  score: t.number,

  award_period_id: t.number,

  insert_date: t.string,

  insert_user: t.string,

  update_date: t.string,

  update_user: t.string,

  merchant_id: t.string,

  correlation_id: t.string,

  bin: t.string,

  terminal_id: t.string,

  enabled: t.boolean
});

export const BPDTransaction = t.exact(
  t.intersection([BPDTransactionR, BPDTransactionO], "BPDTransaction")
);

export type BPDTransaction = t.TypeOf<typeof BPDTransaction>;
