const MAX_LEN = 5; 

export function generate() { 
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < MAX_LEN; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

