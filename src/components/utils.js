export function capitalizeFirstLetter(str) {
  return str?.charAt(0).toUpperCase() + str?.slice(1);
}
export function uniqueArray(data) {
  const uniqueArray = data.filter(
    (obj, index, self) =>
      index ===
      self.findIndex((t) => t.value === obj.value && t.label === obj.label)
  );
  return uniqueArray;
}

export function convertToSelectLocation(data) {
  const loc = data?.map((location) => {
    return {
      value: location.location,
      label: location.location,
    };
  });
  return loc;
}
export function convertToSelecjobRole(data) {
  const loc = data?.map((location) => {
    return {
      value: location.jobRole,
      label: location.jobRole,
    };
  });
  return loc;
}
