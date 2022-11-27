//api themoviedb key 1176b13dc6f5a10ca9f6e263a421c5f9
export const API_THEMOVIEDB = "1176b13dc6f5a10ca9f6e263a421c5f9";
export const fetcher = (...args) => fetch(...args).then((res) => res.json());
