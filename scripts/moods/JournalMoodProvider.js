var moods = []

export const getMoods = () => {
    return fetch('http://localhost:8088/moods')
    .then(response => response.json())
    .then(parsedResponse => {
        moods = parsedResponse
    })
}

export const useMoods = () => {
    return moods.slice()
}