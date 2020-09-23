import { JournalEntry } from './JournalEntry.js'
import { useJournalEntries, getEntries, deleteJournalEntry } from './JournalEntryProvider.js'
import { getEntryTags, useEntryTags } from '../tags/JournalEntryTagsProvider.js'

const contentElement = document.querySelector("#journal-entries");

export const JournalEntryList = () => {
    
    getEntries()
    .then(_ => {
        const journalEntries = useJournalEntries();
        render(journalEntries)
    })
};

const render = (journalEntries) => {
    
    var entriesHTML = "";
    journalEntries.map(entry => {
        getEntryTags(entry.id)
        .then(_ => {
            const entryTags = useEntryTags()
            debugger;
            entriesHTML += JournalEntry(entry, entryTags);
        })
        .then(_ =>{
            contentElement.innerHTML = entriesHTML;
        })
    }) 
}

const eventHub = document.querySelector('#container');

eventHub.addEventListener('journalStateChanged', event => {

    getEntries()
    .then(_ => {
        const radios = document.getElementsByName('mood-filter')
        let selectedRadio
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
              // do whatever you want with the checked radio
              selectedRadio = radios[i]
          
              // only one radio can be logically checked, don't check the rest
              break;
            }
        }
        const journalEntries = useJournalEntries();
        if(selectedRadio !== undefined){
            const [radio, mood, moodId] = selectedRadio.id.split("--")
            const moodEntries = journalEntries.filter(entry => {
                return entry.moodId === parseInt(moodId)
            })
            render(moodEntries)
        }
        else{
            render(journalEntries)
        }
    })
})

eventHub.addEventListener("click", event => {
    if(event.target.id.startsWith("deleteEntry--")){
        const [prefix, id] = event.target.id.split("--")
        deleteJournalEntry(id)
    }
})

