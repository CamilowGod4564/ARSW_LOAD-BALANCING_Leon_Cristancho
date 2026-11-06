const url = 'https://labfibonacci-appfunction-grhdevamehfubhcs.spaincentral-01.azurewebsites.net/api/Fibonacci';

async function hacerPeticion(id) {
    const inicio = Date.now();
    try {
        const respuesta = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nth: 1000000 })
        });
        
        if (!respuesta.ok) {
            throw new Error('HTTP Error ' + respuesta.status);
        }
        
        const datos = await respuesta.json();
        const fin = Date.now();
        console.log('Peticion ' + id + ' - Status: ' + respuesta.status + ' - Tiempo: ' + (fin - inicio) + 'ms');
    } catch (error) {
        const fin = Date.now();
        console.log('Peticion ' + id + ' - Error: ' + error.message + ' - Tiempo: ' + (fin - inicio) + 'ms');
    }
}

console.log('Iniciando 10 peticiones concurrentes...');
for (let i = 1; i <= 10; i++) {
    hacerPeticion(i);
}