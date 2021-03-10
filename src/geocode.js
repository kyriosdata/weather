const getJson = require("./networking");

const geoUrl = (local, key) =>
  `https://maps.googleapis.com/maps/api/geocode/json?address=${local}&key=${key}&language=pt-br`;

/**
 * Função que recupera a posição geográfica para uma cidade cujo nome é
 * fornecido. A Geocoding API (Google), empregada na implementação pode,
 * de fato, obter a posição geográfica de um endereço. Consulte
 * https://developers.google.com/maps/documentation/geocoding/overview
 * para detalhes.
 *
 * A variável de ambiente GOOGLE_API_KEY deve estar definida com o valor
 * da chave utilizada para acesso ao serviço Geocoding Google API.
 *
 * @param {string} cidade Nome da cidade cuja posição geográfica será
 * @param {function} callback Função que recebe dois argumentos, nesta ordem,
 * erro e dados. Onde dados é um objeto contendo as propriedades 'cidade',
 * 'latitude' e 'longitude'.
 */
function geoCallback(cidade, callback) {
  const localizacao = (error, geocodeAnswer) => {
    if (error) {
      callback(error);
    } else if (geocodeAnswer.results.length === 0) {
      const detalhe = geocodeAnswer.error_message;
      if (detalhe) {
        callback("Não foi possível obter localização. " + detalhe);
      } else {
        callback(`Nenhum resultado encontrado para ${cidade}`);
      }
    } else {
      const location = geocodeAnswer.results[0].geometry.location;
      callback(undefined, {
        cidade: cidade,
        latitude: location.lat,
        longitude: location.lng,
        formatted_address: geocodeAnswer.results[0].formatted_address,
      });
    }
  };

  const encoded = encodeURIComponent(cidade);
  const geocodeUrl = geoUrl(encoded, process.env.GOOGLE_API_KEY);
  getJson(geocodeUrl, localizacao);
}

function geoPromisse(cidade) {
  const encoded = encodeURIComponent(cidade);
  const geocodeUrl = geoUrl(encoded, process.env.GOOGLE_API_KEY);
  return getJson(geocodeUrl).then((r) => {
    if (r.results.length === 0) {
      const detalhe = r.error_message;
      if (detalhe) {
        return { msg: "Não foi possível obter localização. " + detalhe };
      } else {
        return { msg: `Nenhum resultado encontrado para ${cidade}` };
      }
    } else {
      const location = r.results[0].geometry.location;
      return {
        cidade: cidade,
        latitude: location.lat,
        longitude: location.lng,
        formatted_address: r.results[0].formatted_address,
      };
    }
  });
}

function geocode(cidade, callback) {
  if (callback) {
    geoCallback(cidade, callback);
  } else {
    return geoPromisse(cidade);
  }
}

module.exports = geocode;
