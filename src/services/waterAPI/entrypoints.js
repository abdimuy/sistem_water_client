const entrypoints = {
  BASE_URL: 'http://137.184.181.164:3000/',
  REGISTER: 'register/',
  LIST_CLIENTS: 'clients/',
  GET_CLIENT: 'clients/',
  PUT_CLIENT: 'clients/',
  SET_CLIENT_AND_WATER_CONNECTION: 'client_and_water_connection/',
  GET_WATER_CONNECTION_WITHOUT_CLIENT: 'water_connections/without_client',
  GET_HIDRANTES: 'clients/hidrantes/',
  UNSUBSCRIBE_HIDRANTE: 'hidrantes/',
  SET_HIDRANTE: 'clients/',
  LIST_WATER_CONNECTIONS: 'water_connections/',
  LOGIN: 'login/',
  IS_AUTHENTICATED: 'is_authenticated/',
  LOGOUT: 'logout/',
  REPORTS: 'reports/',
  TRANSACTIONS: 'transactions/',
  REPORT_TRANSACTION_PDF: 'transactions/reportTransactions',
  TRANSACTIONS_RANGE: 'transactions/range/',
  DEBTS: 'debs/',
  COLONIAS: 'colonias/',
  FIRST_SIGNING: 'report_pdf/signing_image_1',
  SECOND_SIGNING: 'report_pdf/signing_image_2',
  SIGNING_NAME: 'report_pdf/signing_name/',
}

export default entrypoints;