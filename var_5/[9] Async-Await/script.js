'use strict'

async function fetchAndProcessData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${response.status}`);
    return await response.json();
  } catch (error) {
    return `Error: ${error.message}`; 
  }
}
(async () => {
  const data = await fetchAndProcessData('https://jsonplaceholder.typicode.com/todos/1');
  console.log(data);
})();