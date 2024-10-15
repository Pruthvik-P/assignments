async function clock(){
     const date = new Date();

    const hours24 = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    const hours12 = ((date.getHours() + 11) % 12 + 1).toString().padStart(2,"0");
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

    console.log(`24-hour format: ${hours24}:${minutes}:${seconds}`);
    console.log(`12-hour format: ${hours12}:${minutes}:${seconds} ${ampm}`);

    setTimeout(clock, 1000);
}

clock( )