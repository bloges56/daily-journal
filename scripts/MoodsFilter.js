import { getMoods, useMoods } from './JournalMoodProvider.js'
import { dispatchStateChangeEvent } from './JournalEntryProvider.js'

const contentTarget = document.querySelector("#mood-filter-container")

const eventHub = document.querySelector('#container')

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
            dispatchStateChangeEvent()
        }
    })
})




