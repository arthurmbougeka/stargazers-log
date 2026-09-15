const list = document.querySelector("#starred");
const status = document.querySelector("#status");

function isRepositoryEvent(event) {
  return event
    && typeof event.name === "string"
    && typeof event.starred === "string";
}

fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Could not load starred repositories (${response.status}).`);
    }
    return response.json();
  })
  .then((events) => {
    if (!Array.isArray(events) || !events.every(isRepositoryEvent)) {
      throw new Error("The repository data has an invalid format.");
    }

    events.forEach((event) => {
      const item = document.createElement("li");
      item.textContent = `${event.name} - starred ${event.starred}`;
      list.appendChild(item);
    });
    status.textContent = `${events.length} starred repositories loaded.`;
  })
  .catch((error) => {
    status.textContent = error.message;
    status.classList.add("error");
  });
