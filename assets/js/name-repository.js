//NAME STORAGE AND RETRIEVAL FUNCTIONS
function getName() {
    return sessionStorage.getItem("name");
}

function storeName(name) {
    sessionStorage.setItem("name", name);
}

function removeName() {
    sessionStorage.removeItem("name");
}

function validateName(name) {
    return name != null &&
        name.length > 0; 
}

function validateNameLength(name){
    return name.length < 18; //SET HARD CHARACTER LIMIT TO PROTECT STYLING FROM EXTRA LONG NAME STRINGS
}

function setElementNameWithStrong(element, name) {
    element.html(`<strong>${name}</strong>`);
}

function setElementName(element, name){
    element.text(name); 
}