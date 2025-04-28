export const Servidor = 'http://localhost:3003';

export const medicamentoguardar = Servidor + '/inventario/guardar';  
export const medicamentoeditar = Servidor + '/inventario/editar';  
export const medicamentoeliminar = Servidor + '/inventario/eliminar';  
export const medicamentolistar = Servidor + '/inventario/listar';  
export const medicamentobuscar = Servidor + '/inventario/buscar-medicamentos';  
export const medicamentoid = Servidor + '/inventario/buscar/';
export const medicamentobuscarv = Servidor + '/inventario/buscar/vence/:fecha';

export const pacienteguardar = Servidor + '/pacientes/guardar';  
export const pacienteeditar = Servidor + '/pacientes/editar';  
export const pacienteeliminar = Servidor + '/pacientes/eliminar';  
export const pacientelistar = Servidor + '/pacientes/listar';  
export const pacientebuscar = Servidor + '/pacientes/buscarpacientes'
export const pacienteguardarimagen = Servidor + 'pacientes/:id/guardar-imagen';
export const imagenpaciente = Servidor + '/imagenes/paciente/';

export const citasguardar = Servidor + '/citas/guardar';  
export const citaseditar = Servidor + '/citas/editar';  
export const citaseliminar = Servidor + '/citas/eliminar';  
export const citaslistar = Servidor + '/citas/listar';  
export const citasbuscar = Servidor + '/citas/buscar-citas';
export const citasbuscarid = Servidor + '/citas/buscarid';