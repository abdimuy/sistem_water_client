import API from './config';
import ENTRYPOINTS from './entrypoints';

let axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
    withCredentials: true
  }
};

const clientsServices = {
  setUser: (userData) => new Promise((resolve, reject) => {
    API.post(ENTRYPOINTS.REGISTER, userData)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
        console.log(error);
      });
  }),
  login: (userData) => new Promise((resolve, reject) => {
    API.post(ENTRYPOINTS.LOGIN, userData, axiosConfig)
      .then((response) => {
        console.log(response);

        resolve(response);
      })
      .catch((error) => {
        reject(error);
        console.log(error);
      });
  }),
  isAuthenticated: () => new Promise((resolve, reject) => {
    API.get(ENTRYPOINTS.IS_AUTHENTICATED, { withCredentials: true })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
        console.log(error);
      });
  }),
  logout: () => new Promise((resolve, reject) => {
    API.get(ENTRYPOINTS.LOGOUT)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
        console.log(error);
      });
  }),
  getAll: () => new Promise((resolve, reject) => {
    API.get(ENTRYPOINTS.LIST_CLIENTS)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        reject('Error al obtener los datos')
      });
  }),
  getClient: (idClient) => new Promise((resolve, reject) => {
    API.get(ENTRYPOINTS.GET_CLIENT + idClient)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        reject('Error al obtener el cliente');
      });
  })
  ,
    setClient: (bodyJSON) => new Promise((resolve, reject) => {
    API.post(
      ENTRYPOINTS.SET_CLIENT_AND_WATER_CONNECTION,
      bodyJSON,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err)
        reject('Error al guardar el cliente');
        // reject('Asegurese de ingresar todos los datos obligatorios al formulario');
      })
  }),
  uptdateClient: (bodyJSON, idClient) => new Promise((resolve, reject) => {
    API.put(
      ENTRYPOINTS.PUT_CLIENT + idClient,
      bodyJSON,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject('Error al editar el cliente');
      })
  }),
  setHidrante: (bodyJSON) => new Promise((resolve, reject) => {
    API.post(
      ENTRYPOINTS.SET_HIDRANTE,
      bodyJSON,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err)
        reject('Asegurese de ingresar todos los datos obligatorios al formulario');
      });
  }),
  getWaterConnections: () => new Promise((resolve, reject) => {
    API.get(
      ENTRYPOINTS.LIST_WATER_CONNECTIONS,
    )
      .then((list) => {
        resolve(list.data)
      })
      .catch((err) => {
        console.log(err);
        reject('Error al obtener los datos');
      });
  }),
  getWaterConnectionWithoutClient: () => new Promise((resolve, reject) => {
    API.get(
      ENTRYPOINTS.GET_WATER_CONNECTION_WITHOUT_CLIENT,
    ).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      console.log(err);
      reject('Error al obtener los datos');
    });
  }),
  getWaterConnection: (idWaterConnection) => new Promise((resolve, reject) => {
    API.get(
      ENTRYPOINTS.LIST_WATER_CONNECTIONS + idWaterConnection,
    )
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        reject('Error al obtener los datos');
      });
  }),
  setReport: (bodyJSON) => new Promise((resolve, reject) => {
    API.post(
      ENTRYPOINTS.REPORTS,
      bodyJSON,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject('Al crear el reporte');
      });
  }),
  getTransactions: (dateStart, dateEnd) => {
    return new Promise((resolve, reject) => {
      API.get(
        ENTRYPOINTS.TRANSACTIONS_RANGE + `?dateStart=${dateStart}&dateEnd=${dateEnd}`,
      ).then((res) => {
        resolve(res.data);
      }).catch((err) => {
        console.log(err);
        reject('Error al obtener los datos');
      });
    });
  },
  setDebt: (bodyJSON, idTimeConnection) => new Promise((resolve, reject) => {
    API.post(
      ENTRYPOINTS.DEBTS + idTimeConnection,
      bodyJSON,
      { headers: { 'Content-Type': 'application/json' } }
    ).then((res) => {
      resolve(res);
    }).catch((err) => {
      console.log(err);
      reject('Error al crear el reporte');
    })
  }),
  getColonias: () => new Promise((resolve, reject) => {
    API.get(
      ENTRYPOINTS.COLONIAS,
    ).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      console.log(err);
      reject('Error al obtener los datos');
    });
  }),
  getSigning: (id) => new Promise ((resolve, reject) => {
    API.get(
      ENTRYPOINTS.SIGNING_NAME + id,
    ).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      console.log(err);
      reject('Error al obtener los datos');
    });
  }),
  updateSigningName: (bodyJSON, id) => new Promise((resolve, reject) => {
    API.put(
      ENTRYPOINTS.SIGNING_NAME + id,
      bodyJSON,
      { headers: { 'Content-Type': 'application/json' } }
    ).then((res) => {
      resolve(res);
    }).catch((err) => {
      console.log(err);
      reject('Error al actualizar el nombre');
    })
  }),
  updateSigningImage1: (formData) => new Promise((resolve, reject) => {
    API.post(
      ENTRYPOINTS.FIRST_SIGNING,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    ).then((res) => {
      resolve(res);
    }).catch((err) => {
      console.log(err);
      reject('Error al actualizar la imagen');
    })
  }),
  updateSigningImage2: (formData) => new Promise((resolve, reject) => {
    API.post(
      ENTRYPOINTS.SECOND_SIGNING,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    ).then((res) => {
      resolve(res);
    }).catch((err) => {
      console.log(err);
      reject('Error al actualizar la imagen');
    })
  })
};

export default clientsServices;