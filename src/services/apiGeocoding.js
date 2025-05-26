export async function getAddress({ latitude, longitude }) {
  //receives lng and lat from getGeoLocation Promise and it fetches the speccific address from this API by passing in lat and lng which in turn returns the exact address
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`,
  );
  if (!res.ok) throw Error('Failed getting address');

  const data = await res.json();
  return data;
}
