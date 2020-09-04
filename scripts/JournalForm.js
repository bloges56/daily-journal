import { saveJournalEntry } from './JournalEntryProvider.js'

const eventHub = document.querySelector('#container');

eventHub.addEventListener('click', event => {
    if(event.target.id === "saveForm"){

        var date = document.querySelector('#journal-date')
        var concept = document.querySelector('#journal-concepts')
        var entry = document.querySelector('#journal-entry')
        var mood = document.querySelector('#journal-mood')

        const newJournalEntry = {
            "date": date.value,
            "concept": concept.value,
            "entry": entry.value,
            "mood": mood.value
        }

        saveJournalEntry(newJournalEntry);

        concept.value = ""
        entry.value = ""
    }
})


export const JournalForm = () => {
    const contentTarget = document.querySelector('#new-form')

    contentTarget.innerHTML = `
        <h2>New Journal Entry</h2>
        <form action="">
            <fieldset class="journal-section" id="journal-date-cont">
                <label for="journalDate">Date of entry</label>
                <input type="date" name="journalDate" id="journal-date">
            </fieldset>
            <fieldset class="journal-section" id="journal-concepts-cont">
                <label for="journal-concepts">Concepts Covered</label>
                <input name="journal-concepts" id="journal-concepts">
            </fieldset>
            <fieldset class="journal-section" id="journal-entry-cont">
                <label for="journal-entry">Journal Entry</label>
                <textarea id="journal-entry"></textarea>
            </fieldset>
            <fieldset class="journal-section" id="journal-mood-cont">
                <label for="journal-mood">Mood for the day</label>
                <select name="journal-mood" id="journal-mood">
                    <option value="sad">Sad</option>
                    <option value="angry">Angry</option>
                    <option value="happy">Happy</option>
                    <option value="proud">Proud</option>
                    <option value="scared">Scared</option>
                    <option value="disgusted">Disgusted</option>
                    <option value="stressed">Stressed</option>
                </select>
            </fieldset>
        </form>
        <button id="saveForm">Save Form</button>
    `
}