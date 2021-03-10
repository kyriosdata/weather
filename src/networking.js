const { http, https } = require("follow-redirects");

/**
 * Executa chamada para a url fornecida cujo resultado está formatado
 * usando JSON.
 *
 * @param {string} url URL a ser requisitada
 * @param {function} callback Função que recebe dois argumentos,
 * o primeiro indica erro (se definido) e o segundo indica o resultado
 * obtido com a requisição.
 */
function getJson(url, callback) {
  function resposta(innerCallback) {
    return (res) => {
      const chunks = [];

      res.on("data", (chunk) => chunks.push(chunk));

      res.on("end", function () {
        try {
          const body = Buffer.concat(chunks);
          const json = body.toString();
          const objeto = JSON.parse(json);

          if (objeto.error) {
            innerCallback(objeto.error);
          } else {
            innerCallback(undefined, objeto);
          }
        } catch (error) {
          innerCallback(error);
        }
      });
    };
  }

  const request = url.startsWith("https") ? https : http;

  if (callback) {
    const callOnError = (error) => callback(error);
    request.get(url, resposta(callback)).on("error", callOnError).end();
  } else {
    const fakeCallback = (resolve, reject) => {
      const resolveOrReject = (e, s) => (e ? reject(e) : resolve(s));
      request.get(url, resposta(resolveOrReject)).on("error", reject).end();
    };

    return new Promise(fakeCallback);
  }
}

module.exports = getJson;
