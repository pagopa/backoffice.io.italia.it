// tslint:disable no-duplicate-string object-literal-sort-keys

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Find citizen": "Find citizen",
      Submit: "Submit",
      "Citizen profile": "Citizen profile",
      "Payment methods": "Payment methods Cashback",
      "Searched string": "Searched string",
      "Fiscal code": "Fiscal code",
      "On-boarding date": "On-boarding date",
      State: "State",
      "Insert date": "Insert date",
      "Update date": "Update date",
      "Error 400": "Invalid string",
      "Error 401": "Authentication problem",
      "Error 403 token": "Support token is invalid or expired",
      "Error 403 authorization":
        "You do not have enough permission to complete the operation",
      "Error 404": "No match found with",
      "Error 429": "Rate limit exceeded",
      "Error 500": "Generic error",
      Detail: "See detail",
      "Transactions list": "Transactions list",
      "Transactions list by method": "Transactions list by method",
      "Transaction details": "Transaction details",
      Datetime: "Datetime",
      Acquirer: "Acquirer",
      "Circuit name": "Circuit name",
      Amount: "Amount",
      HPAN: "HPAN",
      "ABI Acquirer": "ABI Acquirer",
      "Acquirer transaction ID": "# Acquirer trans.",
      "Issuer transaction ID": "# Issuer trans.",
      "Operation type": "Operation type",
      Score: "Score",
      "Cashback period": "Period",
      Close: "Close",
      Cancelled: "Cancelled",
      Yes: "Yes",
      No: "No",
      "Crono method": "History of this payment method",
      Enrollment: "Enrollment",
      Cancellation: "Cancellation",
      Enabled: "Enabled",
      Channel: "Channel",
      "Token until": "Authentication granted until ",
      Name: "Name",
      Surname: "Surname",
      "Cancellation Date": "Cancellation Date",
      Elab: "Elab.",
      Awards: "Award",
      Award: "Award",
      Refound: "Refound",
      Cashback: "Cashback",
      Transactions: "Transactions",
      Ranking: "Ranking",
      "Start date": "Start date",
      "End date": "End date",
      IBAN: "IBAN",
      Grace: "Grace",
      Revert: "Revert",
      Search: "Search",
      TransactionTableDesc: "Click the column's name to sort data",
      "Circuit Brand": "Circuit Brand",
      "Masked PAN": "Masked PAN",
      "Other payment methods": "Other payment methods"
    }
  },
  it: {
    translation: {
      "Find citizen": "Cerca cittadino",
      Submit: "Invio",
      "Citizen profile": "Profilo cittadino",
      "Payment methods": "Metodi di pagamento Cashback",
      "Searched string": "Stringa ricercata",
      "Fiscal code": "Codice fiscale",
      "On-boarding date": "Data on-boarding",
      State: "Stato",
      "Insert date": "Data inserimento",
      "Update date": "Data aggiornamento",
      "Error 400": "Stringa di ricerca non valida",
      "Error 401": "Token di autenticazione non valido",
      "Error 403 token": "Support token invalido o scaduto",
      "Error 403 authorization":
        "Non hai sufficienti permessi per completare l'operazione",
      "Error 404": "Nessuna corrispondenza trovata con il codice",
      "Error 429": "Raggiunto il limite di chiamate all'API",
      "Error 500": "Errore generico",
      Detail: "Visualizza dettaglio",
      "Transactions list": "Lista transazioni",
      "Transactions list by method": "Lista transazioni per metodo",
      "Transaction details": "Dettaglio transazione",
      Datetime: "Data e ora",
      Acquirer: "Acquirer",
      "Circuit name": "Nome circuito",
      Amount: "Importo",
      HPAN: "HPAN",
      "ABI Acquirer": "Acquirer ABI",
      "Acquirer transaction ID": "# trans. acquirer",
      "Issuer transaction ID": "# trans. issuer",
      "Operation type": "Tipo operazione",
      Score: "Punti",
      "Cashback period": "Periodo",
      Close: "Chiudi",
      Cancelled: "Cancellato",
      Yes: "Sì",
      No: "No",
      "Crono method": "Cronologia relativa a questo metodo",
      Enrollment: "Iscrizione",
      Cancellation: "Cancellazione",
      Enabled: "Abilitazione",
      Channel: "Canale di iscrizione",
      "Token until": "Autenticazione valida fino alle",
      Name: "Nome",
      Surname: "Cognome",
      "Cancellation Date": "Data cancellazione",
      Elab: "Elab.",
      Awards: "Periodi",
      Award: "Periodo",
      Refound: "Rimborso",
      Cashback: "Cashback",
      Transactions: "Transazioni",
      Ranking: "Classifica",
      "Start date": "Data inizio",
      "End date": "Data fine",
      IBAN: "IBAN",
      Grace: "Tolleranza",
      Revert: "Storno",
      Search: "Cerca",
      TransactionTableDesc: "Clicca sul nome della colonna per ordinare i dati",
      "Circuit Brand": "Marchio circuito",
      "Masked PAN": "PAN offuscato",
      "Other payment methods": "Altri metodi di pagamento"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "it",

    keySeparator: false,

    interpolation: {
      escapeValue: false
    }
  })
  // tslint:disable-next-line no-console
  .catch(console.error);

export default i18n;
