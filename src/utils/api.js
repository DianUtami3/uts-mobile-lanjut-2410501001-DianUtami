const BASE_URL = "https://api.tvmaze.com";

async function request(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error("Gagal memuat data");
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeout);
    throw new Error("Gagal memuat data");
  }
}

export async function getShows() {
  return request(`${BASE_URL}/shows`);
}

export async function getShowDetail(id) {
  return request(`${BASE_URL}/shows/${id}`);
}

export async function searchShows(keyword) {
  const data = await request(
    `${BASE_URL}/search/shows?q=${encodeURIComponent(keyword)}`
  );

  return data.map((item) => item.show);
}