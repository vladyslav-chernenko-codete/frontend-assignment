import { IJoke } from "@/models/Joke";

const API = "https://retoolapi.dev/zu9TVE/jokes";

export const getJokes = async () => {
  const response = await fetch(API);
  return response.json();
};

export const getJokesWithParams = async (params: URLSearchParams) => {
  const response = await fetch(`${API}?` + params).then((response) => {
    const total = Number(response.headers.get("x-total-count"));
    const data = response.json();
    return Promise.all([data, total]);
  });

  return response;
};

export const getJokeById = async (jokeId) => {
  const response = await fetch(`${API}/${jokeId}`);
  return response.json();
};

export const deleteJoke = async (jokeId: number) => {
  const response = await fetch(`${API}/${jokeId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const addJoke = async (data: IJoke) => {
  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateJoke = async (data: IJoke) => {
  const response = await fetch(`${API}/${data.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
