// import { useEffect, useState } from "react";

export const fetchData = async (url) => {
  console.log(url, "url");
  try {
    const fetchAPI = await fetch(url);
    const data = await fetchAPI.json();
    return data;
  } catch (e) {
    alert(e);
  }
};