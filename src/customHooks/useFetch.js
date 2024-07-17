// import { useEffect, useState } from "react";

export const fetchData = async (url) => {
  const fetchAPI = await fetch(url);
  const data = await fetchAPI.json();
  return data;
};
