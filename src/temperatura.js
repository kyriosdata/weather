const getJson = require("./networking");

const weatherUrl = (key, local) =>
  `http://api.weatherstack.com/current?access_key=${key}&query=${local}&units=m`;

/**
 * Função que recupera a temperatura para a cidade cuja posição geográfica é
 * fornecida. Usa o serviço 'weatherstack.com'.
 *
 * Exige a definição da variável de ambiente 'WEATHER_STACK_KEY' contendo a
 * chave para acesso ao serviço supracitado.
 *
 * @param {object} local Objeto com as propriedades 'cidade', 'latitude' e 'longitude'.
 * @param {function} callback Função com dois argumentos, 'error' e 'data', fornecidos
 * nesta ordem quando chamada.
 */
function temperaturaCallback(
  { cidade, latitude, longitude, formatted_address },
  callback
) {
  const temperaturaPara = (error, weatherAnswer) => {
    if (error) {
      callback("Não foi possível obter temperatura. " + error.info);
    } else {
      const temperature = weatherAnswer.current.temperature;
      callback(undefined, {
        cidade,
        formatted_address,
        temperatura: temperature,
      });
    }
  };

  const posicao = `${latitude},${longitude}`;
  const wurl = weatherUrl(process.env.WEATHER_STACK_KEY, posicao);
  getJson(wurl, temperaturaPara);
}

function temperaturaPromisse(posicao) {
  const { latitude, longitude, cidade, formatted_address } = posicao;
  const latlong = `${latitude},${longitude}`;
  const wurl = weatherUrl(process.env.WEATHER_STACK_KEY, latlong);
  return getJson(wurl)
    .then((r) => {
      return {
        cidade,
        formatted_address,
        temperatura: r.current.temperature,
      };
    })
    .catch((e) => ({ msg: e }));
}

const gyn = {
  cidade: "goiania",
  latitude: -16.6868912,
  longitude: -49.2647943,
  formatted_address: "Goiânia, GO, Brasil",
};

//temperaturaPromisse(gyn).then(console.log);

function temperatura(objeto, callback) {
  if (callback) {
    temperaturaCallback(objeto, callback);
  } else {
    return temperaturaPromisse(objeto);
  }
}

module.exports = temperatura;
