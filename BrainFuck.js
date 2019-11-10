$('document').ready(function () {
    console.log('page was loaded');
    $('#codeInput').on('input', function () {
        var code = $('#codeInput').val();
        globalVars.args = code;
        reset();
        compiler.compile(code);
        presentDataCells();
    });
})
function reset() {
    resetDataCells();
    globalVars.pointerIndex = 0;
    globalVars.inputIndex = 0;
    // setupInputArray();
    setErrorText('');
}
function setupLoopArray() {
}
// function setupInputArray() {
//     var inputs = $('#inputs').val();
//     for (var i = 0; i < inputs.length; i++) {
//         globalVars.inputs[i] = inputs.charAt(i);
//     }
//     console.log('inputArray' + globalVars.inputs);
// }
function resetDataCells() {
    console.log(globalVars.dataCells.length);
    for (var i = 0; i < globalVars.dataCells.length; i++) {
        globalVars.dataCells[i] = 0;
    }
}
function presentDataCells() {
    var cells = globalVars.dataCells;
    console.log(cells);
    var $label = $('#cellsPresentation')
    var labelString = ""
    for (var i = 0; i < cells.length; i++) {
        if (i == globalVars.pointerIndex)
            labelString += '[' + cells[i] + '*]';
        else
            labelString += '[' + cells[i] + ']'
    }
    $label.html(labelString);
}
var globalVars = {
    pointerIndex: 0,
    dataCells: new Array(8),
    args: "",
    inputs: function () { return document.querySelector("#inputs").value; },
    inputIndex: 0,
    currentCellValue: function () { return globalVars.dataCells[globalVars.pointerIndex]; },
    console: function () { return document.querySelector("#console"); },
    compilerIndex: 0,
    loopStartIndex: 0,
    loopEndIndex: 0,
    canCompile: true,

}
var compiler = {
    arg_index: 0,
    compile: function (code) {
        console.log('compiling');
        globalVars.console().value = "";
        let i = compiler.arg_index;
        for (i = 0; i < code.length; i++) {
            console.log(i);
            var char = code.charAt(i);
            if (functions[char] && globalVars.canCompile)
                functions[char](i);
        }
    }
}
var functions = {
    '<': function () {
        globalVars.pointerIndex--;
    },
    '>': function () {
        globalVars.pointerIndex++;
    },
    '+': function () {
        console.log('entered + function')
        globalVars.dataCells[globalVars.pointerIndex]++;
    },
    '-': function () {
        let current_val = globalVars.dataCells[globalVars.pointerIndex];
        if (current_val > 0)
            current_val--;
    },
    '.': function () {
        let app_console = globalVars.console();
        let output = String.fromCharCode(globalVars.currentCellValue());
        app_console.value = app_console.value + String.fromCharCode(globalVars.currentCellValue());
        console.log("Wrote " + output + " to console")
    },
    ',': function () {
        globalVars.dataCells[globalVars.pointerIndex] =
            globalVars.inputs().charCodeAt(globalVars.inputIndex);
        globalVars.inputIndex++;
    },
    '[': function (i) {

        // globalVars.loopStartIndex = i;
        // if (globalVars.currentCellValue() == 0 && globalVars.loopEndIndex > globalVars.loopStartIndex) {
        //     i = globalVars.loopEndIndex;
        // }
        // if (globalVars.dataCells[globalVars.pointerIndex] == 0 && globalVars.loopEndIndex < globalVars.loopStartINdex) {
        //     endIndex = globalVars.args.substr(i).indexOf(']')
        //     if (endIndex == -1) {
        //         console.error('unclose loop error');
        //         setErrorMessage('you have an unclosed loop');
        //         globalVars.canCompile = false;
        //     }
        //     else {
        //         globalVars.loopEndIndex = endIndex;
        //     }
        // }
    },
    ']': function () {
        if (globalVars.dataCells[globalVars.pointerIndex] != 0)
            i = globalVars.loopStartIndex
        else {
            i = globalVars.loopEndIndex + 1;
        }

    }
}
function setErrorText(text) {
    var newError = $('li');
    newError.html(text);
    newError.css('text-decoration-color: red; text-decoration-style: solid')
    $('#errorMessages').append(newError[0]);
}