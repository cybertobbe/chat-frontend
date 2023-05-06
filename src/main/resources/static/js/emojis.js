// https://picmojs.com/
import { createPopup } from 'https://unpkg.com/@picmo/popup-picker@latest/dist/index.js?module';

const trigger = document.getElementById('emoji-button');
const textArea = document.getElementById('textArea_message');

const picker = createPopup({
    // picker options go here
}, {
    referenceElement: trigger,
    triggerElement: trigger
});

trigger.onclick = ()=> {picker.open()}

picker.addEventListener('emoji:select', selection => {
    insertAtCursor(textArea, selection.emoji);
});

function insertAtCursor(myField, myValue) {
    if (myField.selectionStart || myField.selectionStart === 0) {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos)
            + myValue
            + myField.value.substring(endPos, myField.value.length);
    } else {
        myField.value += myValue;
    }
}
