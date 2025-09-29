// functions/update.js

exports.handler = async (event, context) => {
  try {
    const data = JSON.parse(event.body);

    // Burada gelen değerleri alıyoruz
    const kazimGucu = data.kazimGucu;
    const mevcutKazim = data.mevcutKazim;

    // Şimdilik sadece geri döndürelim
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Veri başarıyla alındı!",
        kazimGucu,
        mevcutKazim
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Geçersiz istek" }),
    };
  }
};
