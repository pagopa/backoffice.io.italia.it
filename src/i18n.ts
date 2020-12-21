// tslint:disable no-duplicate-string object-literal-sort-keys

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Find citizen": "Find citizen",
      Submit: "Submit",
      "Citizen profile": "Citizen profile",
      "Payment methods": "Payment methods",
      "Searched string": "Searched string",
      "Fiscal code": "Fiscal code",
      "On-boarding date": "On-boarding date",
      State: "State",
      "Insert date": "Insert date",
      "Update date": "Update date",
      "Error 400": "Invalid string",
      "Error 401": "Authentication problem",
      "Error 404": "No match found with",
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
      "Cashback period": "Cashback period",
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
      "Cancellation Date": "Cancellation Date"
    }
  },
  it: {
    translation: {
      "Find citizen": "Cerca cittadino",
      Submit: "Invio",
      "Citizen profile": "Profilo cittadino",
      "Payment methods": "Metodi di pagamento",
      "Searched string": "Stringa ricercata",
      "Fiscal code": "Codice fiscale",
      "On-boarding date": "Data on-boarding",
      State: "Stato",
      "Insert date": "Data inserimento",
      "Update date": "Data aggiornamento",
      "Error 400": "Stringa di ricerca non valida",
      "Error 401": "Token di autenticazione non valido",
      "Error 404": "Nessuna corrispondenza trovata con il codice",
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
      "Cashback period": "Periodo cashback",
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
      "Cancellation Date": "Data cancellazione"
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
