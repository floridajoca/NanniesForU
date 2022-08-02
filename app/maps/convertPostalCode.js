export async function convertPostalCode(postalCode) {
    let response = await fetch(`http://api.zippopotam.us/CA/${postalCode}`);

    response =  await response.json()
    return {
        lat: response.places[0].latitude,
        lng: response.places[0].longitude,
    }
}
