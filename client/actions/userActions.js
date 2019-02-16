export function renameUser(name) {
  return {
    type: 'RENAME_USER',
    name,
  };
}

export function toggleAuthenticated() {
  return {
    type: 'TOGGLE_AUTHENTICATED',
  };
}
