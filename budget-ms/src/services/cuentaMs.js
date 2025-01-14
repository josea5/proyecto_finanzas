import axios from 'axios'

// Falta lógica para la conexión
async function getCuentaById ({id}) {
    try {
        const response = await axios.get(`${cuenta_ms_link_PORT}/${id}`);
        return response.data
    }
    catch (error) {
        console.error('Error al llamar al Microservicio Cuenta:', error);
        throw error;
    }
}