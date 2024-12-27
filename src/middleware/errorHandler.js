export async function errorHandler(err, c) {
    console.error(`Error: ${err.message}`);
    const status = err.status || 500;
    const message = status === 500 ? 'Internal Server Error' : err.message;
    
    return c.json({ 
        error: message,
        status 
    }, status);
}