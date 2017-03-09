accountsUIBootstrap3.setLanguage('es');
accountsUIBootstrap3.map('es', {
  _resetPasswordDialog: {
    title: 'Restablece tu contraseña',
    cancel: 'Cancelar',
    submit: 'Guardar',
  },
  _enrollAccountDialog: {
    title: 'Escribe una contraseña',
    cancel: 'Cerrar',
    submit: 'Guardar contraseña',
  },
});
Accounts.ui.config(
  {
    passwordSignupFields: 'USERNAME_ONLY',
  });
