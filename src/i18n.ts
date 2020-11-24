import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Find citizen": "Find citizen",
      "Submit": "Submit",
      "Citizen profile": "Citizen profile",
      "Payment methods": "Payment methods",
      "Searched string": "Searched string",
      "Fiscal code": "Fiscal code",
      "On-boarding date": "On-boarding date",
      "State": "State",
      "Insert date": "Insert date",
      "Update date": "Update date",
      "Error 400": "Invalid string",
      "Error 401": "Authentication problem",
      "Error 404": "No match found with",
      "Error 500": "Generic error",
      "Detail" : "See detail",
      "Transactions list": "Transactions list",
      "Transaction details": "Transaction details"

    }
  },
  it: {
    translation: {
        "Find citizen": "Cerca cittadino",
        "Submit": "Invio",
        "Citizen profile": "Profilo cittadino",
        "Payment methods": "Metodi di pagamento",
        "Searched string": "Stringa ricercata",
        "Fiscal code": "Codice fiscale",
        "On-boarding date": "Data on-boarding",
        "State": "Stato",
        "Insert date": "Data inserimento",
        "Update date": "Data aggiornamento",
        "Error 400": "Stringa di ricerca non valida",
        "Error 401": "Token di autenticazione non valido",
        "Error 404": "Nessuna corrispondenza trovata con il codice",
        "Error 500": "Errore generico",
        "Detail" : "Visualizza dettaglio",
        "Transactions list" : "Lista transazioni",
        "Transaction details": "Dettaglio transazione"

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
  });

  export default i18n;