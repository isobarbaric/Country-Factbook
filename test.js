

const userAction = async () => {
    const response = await fetch('https://restcountries.com/v3.1/name/' + 'Canada')
    const jsonified = await response.json()
    console.log(jsonified);
}

userAction();
