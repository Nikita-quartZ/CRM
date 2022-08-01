export function sortingId(object, bool) {
  console.log(object);
  for (let i = 0; i < object.length - 1; i++) {
    for (let j = i + 1; j < object.length; j++) {
      if (object[j].id < object[i].id) {
        const timingVar = object[i];
        object[i] = object[j];
        object[j] = timingVar;
      }
    }
  }
  if (bool) {
    return object.reverse();
  } else {
    return object;
  }
}

export function sortingCreatedDate(object, bool) {
  for (let i = 0; i < object.length - 1; i++) {
    for (let j = i + 1; j < object.length; j++) {
      if (new Date(object[j].createdAt) < new Date(object[i].createdAt)) {
        const timingVar = object[i];
        object[i] = object[j];
        object[j] = timingVar;
      }
    }
  }
  if (bool) {
    return object.reverse();
  } else {
    return object;
  }
}

export function sortingUpdatedDate(object, bool) {
  for (let i = 0; i < object.length - 1; i++) {
    for (let j = i + 1; j < object.length; j++) {
      if (new Date(object[j].updatedAt) < new Date(object[i].updatedAt)) {
        const timingVar = object[i];
        object[i] = object[j];
        object[j] = timingVar;
      }
    }
  }
  if (bool) {
    return object.reverse();
  } else {
    return object;
  }
}

export function sortingName(object, bool) {
  for (let i = 0; i < object.length - 1; i++) {
    for (let j = i + 1; j < object.length; j++) {
      if (
        object[j].surname + " " + object[j].name + " " + object[j].lastName <
        object[i].surname + " " + object[i].name + " " + object[i].lastName
      ) {
        const timingVar = object[i];
        object[i] = object[j];
        object[j] = timingVar;
      }
    }
  }
  if (bool) {
    return object.reverse();
  } else {
    return object;
  }
}

export function searchClients(search, object) {
  const results = [];
  for (const item of object) {
    if (
      !(item.surname + " " + item.name + " " + item.lastName)
        .toLowerCase()
        .indexOf(search.toLowerCase())
    ) {
      results.push(item);
    }
  }
  return results;
}
