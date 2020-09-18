import { getMoods, useMoods } from './JournalMoodProvider.js'

const contentTarget = document.querySelector("#mood-filter-container")

const eventHub = document.querySelector('#container')

const dispatchMoodEvent = (mood) => {
    const moodEvent = new CustomEvent("moodSelected", {
        detail: {
            moodId: mood
        }
    })
    eventHub.dispatchEvent(moodEvent)
}

getMoods()
.then(_ => {
    const moods = useMoods()
    contentTarget.innerHTML = `
        <form id="moods-filter-form">
            <fieldset>
                <legend>Filter Journal Entries by Mood</legend>
                ${moods.map(mood => {
                    return `
                        <input type="radio" id="radio--mood--${mood.id}" name="mood-filter" value="${mood.mood}">
                        <label for="${mood.mood}">${mood.mood}</label>
                    `
                }).join("")}
            </fieldset>
        </form>
    `
    eventHub.addEventListener("change", event => {
        if(event.target.name === "mood-filter"){
            const [radio, mood, moodId] = event.target.id.split("--")
            dispatchMoodEvent(parseInt(moodId))
        }
    })
})




